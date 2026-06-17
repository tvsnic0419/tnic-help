'use client';

import { useEffect, useState } from 'react';
import { Mail, Bell, CheckCircle2, X } from 'lucide-react';
import { SITE } from '@/lib/site';
import {
  getBriefSubscription,
  saveBriefSubscription,
  clearBriefSubscription,
} from '@/lib/brief-subscribe';

export function BriefSubscribePanel() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [savedEmail, setSavedEmail] = useState<string | null>(null);

  useEffect(() => {
    const record = getBriefSubscription();
    if (record) {
      setSubscribed(true);
      setSavedEmail(record.email);
      setEmail(record.email);
    }
  }, []);

  const subscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    saveBriefSubscription(email.trim());
    setSubscribed(true);
    setSavedEmail(email.trim());

    const subject = encodeURIComponent('Protocol Brief — email subscribe');
    const body = encodeURIComponent(
      [
        'Please add me to the Protocol Brief digest list.',
        '',
        `Email: ${email.trim()}`,
        'Frequency: weekly (when delivery launches)',
        '',
        'I understand TNiC is educational only — not medical advice.',
      ].join('\n'),
    );
    window.location.href = `mailto:${SITE.contactEmail}?subject=${subject}&body=${body}`;
  };

  const unsubscribe = () => {
    clearBriefSubscription();
    setSubscribed(false);
    setSavedEmail(null);
    setEmail('');
  };

  return (
    <section
      id="brief-subscribe"
      className="rounded-2xl border border-accent-violet/25 bg-gradient-to-br from-accent-violet/5 to-transparent p-6 md:p-8 mb-10"
      aria-labelledby="brief-subscribe-heading"
    >
      <div className="flex items-start gap-3 mb-4">
        <Bell className="w-5 h-5 text-accent-violet shrink-0 mt-0.5" />
        <div>
          <h2 id="brief-subscribe-heading" className="font-bold text-lg">
            Get Protocol Brief by email
          </h2>
          <p className="text-sm text-muted-foreground mt-1 max-w-xl">
            Optional weekly digest when delivery launches. Your preference is saved locally now;
            complete the mailto step so we can add you to the list. No backend required today —
            local-first stays the default.
          </p>
        </div>
      </div>

      {subscribed && savedEmail ? (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass rounded-xl p-4">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-accent-emerald shrink-0" />
            <div>
              <p className="text-sm font-semibold">Subscribed locally</p>
              <p className="text-xs text-muted-foreground font-mono">{savedEmail}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={unsubscribe}
            className="focus-ring inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground hover:text-accent-rose rounded"
          >
            <X className="w-3.5 h-3.5" /> Clear preference
          </button>
        </div>
      ) : (
        <form onSubmit={subscribe} className="flex flex-col sm:flex-row gap-3 max-w-lg">
          <div className="relative flex-1">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-xl border border-border bg-card pl-10 pr-4 py-3 text-sm focus-ring"
              aria-label="Email for Protocol Brief"
            />
          </div>
          <button
            type="submit"
            className="focus-ring shrink-0 inline-flex items-center justify-center gap-2 bg-accent-violet/20 border border-accent-violet/30 text-accent-violet px-5 py-3 rounded-xl font-semibold text-sm hover:bg-accent-violet/30 transition"
          >
            <Bell className="w-4 h-4" />
            Subscribe
          </button>
        </form>
      )}
    </section>
  );
}