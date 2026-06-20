#!/usr/bin/env node
/**
 * Google Search Console: verify tnic.help, submit sitemap, request indexing.
 * Opens Chrome — sign in with Google if prompted (once; session persists).
 *
 * Usage: node scripts/provision-search-console.mjs
 */
import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';
import { addDnsTxt, upsertVercelEnv, SITE_URL } from './lib/vercel.mjs';
import { PRIORITY_INDEX_URLS } from './lib/seo-constants.mjs';

const TIMEOUT = 300_000;
const PROFILE_DIR = join(homedir(), '.tnic-gsc-profile');
const GSC_HOME = 'https://search.google.com/search-console';
const PROPERTY_URL = 'https://tnic.help/';

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function waitForGoogleAuth(page) {
  const deadline = Date.now() + TIMEOUT;
  while (Date.now() < deadline) {
    const url = page.url();
    if (url.includes('search.google.com/search-console') && !url.includes('accounts.google.com')) {
      return;
    }
    if (url.includes('accounts.google.com') || url.includes('signin')) {
      console.log('Sign in with Google in the browser window…');
    }
    await sleep(2000);
  }
  throw new Error('Google sign-in timed out — complete login in the browser and re-run.');
}

async function extractVerification(page) {
  const html = await page.content();
  const text = await page.locator('body').innerText().catch(() => '');

  const dns = text.match(/google-site-verification=[A-Za-z0-9_-]+/)?.[0]
    ?? html.match(/google-site-verification=[A-Za-z0-9_-]+/)?.[0];
  if (dns) return { method: 'dns', token: dns };

  const meta = html.match(/google-site-verification" content="([^"]+)"/)?.[1]
    ?? html.match(/content="([^"]+)" name="google-site-verification"/)?.[1];
  if (meta) return { method: 'html', token: meta };

  return null;
}

async function applyVerification(verification) {
  if (verification.method === 'dns') {
    await addDnsTxt(verification.token);
    console.log('Waiting 30s for DNS propagation…');
    await sleep(30_000);
    return;
  }

  await upsertVercelEnv('GOOGLE_SITE_VERIFICATION', verification.token);
  console.log('Triggering production redeploy for HTML verification tag…');
  await new Promise((resolve, reject) => {
    const deploy = spawn('npx', ['vercel', '--prod', '--yes'], {
      cwd: process.cwd(),
      stdio: 'inherit',
      shell: true,
    });
    deploy.on('exit', (code) => (code === 0 ? resolve() : reject(new Error(`deploy exit ${code}`))));
  }).catch((err) => console.warn(`Deploy trigger failed (${err.message}) — waiting for current production deploy`));
  console.log('Waiting 90s for deploy + verification meta tag…');
  await sleep(90_000);

  const res = await fetch(SITE_URL);
  const body = await res.text();
  if (!body.includes(verification.token)) {
    throw new Error('GOOGLE_SITE_VERIFICATION meta tag not yet live — redeploy and re-run.');
  }
  console.log('HTML verification meta tag confirmed on production.');
}

async function addPropertyIfNeeded(page) {
  await page.goto(`${GSC_HOME}/welcome`, { waitUntil: 'domcontentloaded', timeout: TIMEOUT });

  const addBtn = page.getByRole('button', { name: /add property|start now/i });
  if (await addBtn.count()) {
    await addBtn.first().click({ timeout: 10_000 }).catch(() => {});
  }

  const urlInput = page.locator('input').filter({ hasText: '' }).first();
  const domainTab = page.getByText(/^Domain$/i);
  const urlPrefixTab = page.getByText(/URL prefix/i);

  if (await urlPrefixTab.count()) {
    await urlPrefixTab.first().click({ timeout: 5000 }).catch(() => {});
  } else if (await domainTab.count()) {
    // Domain property also works; DNS verification is the same
    await domainTab.first().click({ timeout: 5000 }).catch(() => {});
  }

  const inputs = page.locator('input[type="text"], input:not([type])');
  if (await inputs.count()) {
    const target = PROPERTY_URL.replace(/\/$/, '');
    await inputs.first().fill(target.includes('https://') ? target : `https://${target}`);
  }

  const continueBtn = page.getByRole('button', { name: /continue|next|add/i });
  if (await continueBtn.count()) {
    await continueBtn.first().click({ timeout: 10_000 }).catch(() => {});
  }

  await sleep(3000);
}

async function verifyProperty(page) {
  let verification = await extractVerification(page);
  if (!verification) {
    const htmlTag = page.getByText(/HTML tag|meta tag/i);
    const dnsTag = page.getByText(/DNS|domain name provider/i);
    if (await dnsTag.count()) await dnsTag.first().click({ timeout: 5000 }).catch(() => {});
    if (await htmlTag.count()) await htmlTag.first().click({ timeout: 5000 }).catch(() => {});
    await sleep(2000);
    verification = await extractVerification(page);
  }

  if (!verification) {
    throw new Error('Could not read Google verification token from Search Console UI.');
  }

  console.log(`Verification method: ${verification.method}`);
  await applyVerification(verification);

  const verifyBtn = page.getByRole('button', { name: /verify/i });
  if (await verifyBtn.count()) {
    await verifyBtn.first().click({ timeout: 15_000 });
    await sleep(5000);
  }
}

async function submitSitemap(page) {
  const property = encodeURIComponent('https://tnic.help/');
  await page.goto(`${GSC_HOME}?resource_id=${property}`, { waitUntil: 'domcontentloaded', timeout: TIMEOUT }).catch(() => {});
  await page.goto(`${GSC_HOME}/sitemaps?resource_id=${property}`, { waitUntil: 'domcontentloaded', timeout: TIMEOUT }).catch(async () => {
    await page.goto(`${GSC_HOME}`, { waitUntil: 'domcontentloaded' });
    await page.getByRole('link', { name: /sitemap/i }).first().click({ timeout: 15_000 }).catch(() => {});
  });

  const addInput = page.locator('input[placeholder*="sitemap" i], input[aria-label*="sitemap" i]').first();
  if (await addInput.count()) {
    await addInput.fill('sitemap.xml');
    const submit = page.getByRole('button', { name: /submit|add/i });
    if (await submit.count()) await submit.first().click();
    console.log('Sitemap submitted: sitemap.xml');
    await sleep(3000);
    return;
  }

  console.log('Sitemap UI not found — submit manually: sitemap.xml');
}

async function requestIndexing(page, url) {
  const property = encodeURIComponent('https://tnic.help/');
  await page.goto(
    `${GSC_HOME}/search-console?resource_id=${property}`,
    { waitUntil: 'domcontentloaded', timeout: TIMEOUT },
  ).catch(() => {});

  const inspectInput = page.locator(
    'input[aria-label*="Inspect" i], input[placeholder*="Inspect" i], input[type="search"]',
  ).first();

  if (!(await inspectInput.count())) {
    console.log(`Skip indexing request (no inspect box): ${url}`);
    return;
  }

  await inspectInput.fill(url);
  await page.keyboard.press('Enter');
  await sleep(4000);

  const requestBtn = page.getByRole('button', { name: /request indexing/i });
  if (await requestBtn.count()) {
    await requestBtn.first().click({ timeout: 10_000 });
    await sleep(2000);
    console.log(`Requested indexing: ${url}`);
    return;
  }

  const already = page.getByText(/already requested|indexed/i);
  if (await already.count()) {
    console.log(`Already indexed/requested: ${url}`);
    return;
  }

  console.log(`Could not request indexing for: ${url}`);
}

async function main() {
  mkdirSync(PROFILE_DIR, { recursive: true });

  const context = await chromium.launchPersistentContext(PROFILE_DIR, {
    channel: 'chrome',
    headless: false,
    viewport: null,
    args: ['--start-maximized'],
  });

  const page = context.pages()[0] ?? (await context.newPage());
  page.setDefaultTimeout(TIMEOUT);

  try {
    await page.goto(GSC_HOME, { waitUntil: 'domcontentloaded', timeout: TIMEOUT });
    await waitForGoogleAuth(page);

    console.log('Authenticated — configuring Search Console property…');
    await addPropertyIfNeeded(page);
    await verifyProperty(page);
    await submitSitemap(page);

    for (const url of PRIORITY_INDEX_URLS) {
      await requestIndexing(page, url);
      await sleep(1500);
    }

    console.log('\nSearch Console setup complete.');
  } finally {
    await context.close();
  }
}

main().catch((err) => {
  console.error(err.message ?? err);
  process.exit(1);
});