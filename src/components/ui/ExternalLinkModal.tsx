import React from 'react';
import { ExternalLink, ShieldAlert, X } from 'lucide-react';

interface ExternalLinkModalProps {
  url: string;
  onContinue: () => void;
  onCancel: () => void;
}

export const ExternalLinkModal: React.FC<ExternalLinkModalProps> = ({ url, onContinue, onCancel }) => (
  <div className="external-modal-backdrop" onMouseDown={onCancel}>
    <section
      className="external-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="external-modal-title"
      onMouseDown={(event) => event.stopPropagation()}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-amber-300/20 bg-amber-300/10 text-amber-200">
            <ShieldAlert className="h-5 w-5" />
          </div>
          <div>
            <h2 id="external-modal-title" className="text-sm font-semibold text-white">You're about to leave DS OS</h2>
            <p className="mt-1 text-xs text-slate-400">This link opens outside the portfolio.</p>
          </div>
        </div>
        <button type="button" onClick={onCancel} className="rounded-md p-1 text-slate-400 hover:bg-white/10 hover:text-white" aria-label="Cancel opening external link">
          <X className="h-4 w-4" />
        </button>
      </div>
      <div className="external-url mt-5" title={url}>{url}</div>
      <div className="mt-5 flex justify-end gap-2">
        <button type="button" onClick={onCancel} className="rounded-lg border border-white/10 bg-white/5 px-3.5 py-2 text-xs text-slate-200 hover:bg-white/10">Cancel</button>
        <button type="button" onClick={onContinue} className="flex items-center gap-2 rounded-lg border border-sky-300/30 bg-sky-400/15 px-3.5 py-2 text-xs font-medium text-sky-100 hover:bg-sky-400/25">
          Continue <ExternalLink className="h-3.5 w-3.5" />
        </button>
      </div>
    </section>
  </div>
);