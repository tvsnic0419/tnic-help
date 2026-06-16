import fs from 'fs';
import path from 'path';

export interface MdxDocument {
  slug: string;
  frontmatter: Record<string, string>;
  body: string;
}

export function parseMdx(raw: string): { frontmatter: Record<string, string>; body: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { frontmatter: {}, body: raw };

  const frontmatter: Record<string, string> = {};
  match[1].split('\n').forEach((line) => {
    const idx = line.indexOf(':');
    if (idx > 0) {
      const key = line.slice(0, idx).trim();
      const val = line.slice(idx + 1).trim().replace(/^["']|["']$/g, '');
      frontmatter[key] = val;
    }
  });
  return { frontmatter, body: match[2].trim() };
}

export function loadMdx(slug: string): MdxDocument | null {
  const filePath = path.join(process.cwd(), 'content', 'hallmarks', `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, 'utf8');
  const { frontmatter, body } = parseMdx(raw);
  return { slug, frontmatter, body };
}

export function listMdxSlugs(): string[] {
  const dir = path.join(process.cwd(), 'content', 'hallmarks');
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace('.mdx', ''));
}