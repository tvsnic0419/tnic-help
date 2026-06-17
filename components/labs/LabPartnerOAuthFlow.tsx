'use client';

import { Suspense, useCallback, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Link2, Package, CheckCircle2, AlertCircle, LogOut } from 'lucide-react';
import { usePlatform } from '@/context/PlatformContext';
import {
  LAB_OAUTH_SESSION_KEY,
  labPartners,
  DEMO_PARTNER_ID,
  type LabOAuthSession,
} from '@/lib/lab-partner-oauth';
import { parsePartnerJson } from '@/lib/lab-partner-import';
import { labPartnerPanels } from '@/lib/lab-partners';

function LabPartnerOAuthFlowInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { importLabs } = usePlatform();
  const [session, setSession] = useState<LabOAuthSession | null>(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [selectedPanel, setSelectedPanel] = useState('longevity-baseline');

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LAB_OAUTH_SESSION_KEY);
      if (!raw) return;
      const s = JSON.parse(raw) as LabOAuthSession;
      if (new Date(s.expires_at) > new Date()) {
        setSession(s);
      } else {
        localStorage.removeItem(LAB_OAUTH_SESSION_KEY);
      }
    } catch {
      /* ignore */
    }
  }, []);

  const exchangeCode = useCallback(
    async (code: string, partnerId: string) => {
      setLoading(true);
      try {
        const res = await fetch('/api/labs/partner/oauth/token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code, partner_id: partnerId }),
        });
        const data = await res.json();
        if (!res.ok) {
          setMsg({ type: 'error', text: data.error ?? 'OAuth exchange failed' });
          return;
        }
        const newSession: LabOAuthSession = {
          partner_id: data.partner_id,
          access_token: data.access_token,
          connected_at: data.connected_at,
          expires_at: data.expires_at,
        };
        localStorage.setItem(LAB_OAUTH_SESSION_KEY, JSON.stringify(newSession));
        setSession(newSession);
        const partnerName = labPartners.find((p) => p.id === partnerId)?.name ?? partnerId;
        setMsg({ type: 'success', text: `Connected to ${partnerName}` });
      } catch {
        setMsg({ type: 'error', text: 'OAuth exchange failed' });
      } finally {
        setLoading(false);
        const url = new URL(window.location.href);
        url.searchParams.delete('oauth_code');
        url.searchParams.delete('partner');
        router.replace(`${url.pathname}${url.search}${url.hash}`);
      }
    },
    [router],
  );

  useEffect(() => {
    const code = searchParams.get('oauth_code');
    const partner = searchParams.get('partner') ?? DEMO_PARTNER_ID;
    if (code) exchangeCode(code, partner);
  }, [searchParams, exchangeCode]);

  const connect = () => {
    window.location.href = `/api/labs/partner/oauth/start?partner=${DEMO_PARTNER_ID}`;
  };

  const disconnect = () => {
    localStorage.removeItem(LAB_OAUTH_SESSION_KEY);
    setSession(null);
    setMsg(null);
  };

  const placeOrder = async () => {
    if (!session) return;
    setLoading(true);
    try {
      const res = await fetch('/api/labs/partner/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ panel_id: selectedPanel, partner_id: session.partner_id }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setMsg({ type: 'error', text: data.error ?? 'Order failed' });
        return;
      }
      if (data.import_payload) {
        const result = parsePartnerJson(data.import_payload);
        if (result.entries.length === 0) {
          setMsg({ type: 'error', text: result.errors[0] ?? 'No importable results' });
          return;
        }
        const count = importLabs(result.entries);
        setMsg({
          type: 'success',
          text: `Order ${data.order_id} — imported ${count} biomarker${count === 1 ? '' : 's'}`,
        });
      } else {
        setMsg({ type: 'success', text: `Order ${data.order_id} placed — results pending` });
      }
    } catch {
      setMsg({ type: 'error', text: 'Order request failed' });
    } finally {
      setLoading(false);
    }
  };

  const demoPartner = labPartners.find((p) => p.id === DEMO_PARTNER_ID);
  const orderablePanels = labPartnerPanels.filter((p) => p.status !== 'waitlist');

  return (
    <div id="lab-partner-oauth" className="glass rounded-xl p-5 mb-6">
      <div className="flex items-center gap-2 mb-2">
        <Link2 className="w-4 h-4 text-accent-cyan" />
        <p className="text-label text-accent-cyan">Order at home · OAuth preview</p>
      </div>
      <p className="text-sm text-muted-foreground mb-4 max-w-2xl">
        Connect the demo lab partner, place an at-home panel order, and auto-import results into your
        Labs hub — no manual CSV upload. Live partners ship when OAuth credentials are configured.
      </p>

      {msg && (
        <div
          className={`flex items-center gap-2 text-xs px-3 py-2 rounded-lg mb-4 ${
            msg.type === 'success'
              ? 'bg-accent-emerald/10 text-accent-emerald'
              : 'bg-accent-rose/10 text-accent-rose'
          }`}
        >
          {msg.type === 'success' ? (
            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
          ) : (
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          )}
          {msg.text}
        </div>
      )}

      {session ? (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm">
              <span className="text-accent-emerald font-semibold">Connected</span>
              <span className="text-muted-foreground">
                {' '}
                · {labPartners.find((p) => p.id === session.partner_id)?.name ?? session.partner_id}
              </span>
            </p>
            <button
              type="button"
              onClick={disconnect}
              className="focus-ring inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground hover:text-accent-rose rounded"
            >
              <LogOut className="w-3.5 h-3.5" />
              Disconnect
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 max-w-xl">
            <select
              value={selectedPanel}
              onChange={(e) => setSelectedPanel(e.target.value)}
              className="flex-1 rounded-xl border border-border bg-card px-4 py-3 text-sm focus-ring"
              aria-label="Panel to order"
            >
              {orderablePanels.map((panel) => (
                <option key={panel.id} value={panel.id}>
                  {panel.name}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={placeOrder}
              disabled={loading}
              className="focus-ring inline-flex items-center justify-center gap-2 bg-accent-cyan/20 border border-accent-cyan/30 text-accent-cyan px-5 py-3 rounded-xl font-semibold text-sm hover:bg-accent-cyan/30 transition shrink-0 disabled:opacity-60"
            >
              <Package className="w-4 h-4" />
              {loading ? 'Ordering…' : 'Order & import'}
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={connect}
          disabled={loading}
          className="focus-ring inline-flex items-center gap-2 bg-accent-cyan/20 border border-accent-cyan/30 text-accent-cyan px-5 py-3 rounded-xl font-semibold text-sm hover:bg-accent-cyan/30 transition disabled:opacity-60"
        >
          <Link2 className="w-4 h-4" />
          {loading ? 'Connecting…' : `Connect ${demoPartner?.name ?? 'demo partner'}`}
        </button>
      )}

      <p className="text-[10px] text-muted-foreground mt-4 font-mono">
        API: GET /api/labs/partner/oauth/start · POST /api/labs/partner/oauth/token · POST
        /api/labs/partner/order · POST /api/labs/partner/webhook
      </p>
    </div>
  );
}

export function LabPartnerOAuthFlow() {
  return (
    <Suspense fallback={<p className="text-xs text-muted-foreground mb-6">Loading partner OAuth…</p>}>
      <LabPartnerOAuthFlowInner />
    </Suspense>
  );
}