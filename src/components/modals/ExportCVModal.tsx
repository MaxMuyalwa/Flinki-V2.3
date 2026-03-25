import { FileText, Download, Share2, ArrowLeft, Check } from 'lucide-react';
import { useState } from 'react';
import Logo from '../brand/Logo';
import Modal from '../ui/Modal';
import { SARAH_AVATAR } from '../../constants/images';

interface ExportCVModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ExportCVModal({ isOpen, onClose }: ExportCVModalProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Export Flinki CV">
      <div className="space-y-6">
        {/* CV Preview Mockup */}
        <div className="relative overflow-hidden rounded-lg border border-border bg-white p-4 sm:p-6 shadow-inner">
          <div className="flex items-start justify-between">
            <div>
              <Logo className="h-4 sm:h-5 mb-2 sm:mb-3" />
              <h3 className="text-lg sm:text-xl font-bold text-slate-900">Abigail Ndala</h3>
              <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-orange-500">Endurance Athlete</p>
            </div>
            <img
              src={SARAH_AVATAR}
              alt="Abigail"
              className="h-10 w-10 sm:h-12 sm:w-12 rounded-full object-cover grayscale"
              referrerPolicy="no-referrer"
            />
          </div>
          
          <div className="mt-4 sm:mt-6 grid grid-cols-2 gap-y-3 sm:gap-y-4 gap-x-2 sm:gap-x-3 border-y border-border py-3 sm:py-4 sm:grid-cols-4 sm:gap-3">
            {[
              { label: 'Total Achievements', val: '47' },
              { label: 'Official Results', val: '12' },
              { label: 'Kilometers Logged', val: '8,420' },
              { label: 'Profile Trust Score', val: '94%' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-base font-bold text-slate-900">{stat.val}</p>
                <p className="text-[7px] font-bold uppercase tracking-widest text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 space-y-3">
            <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">Featured Milestones</p>
            <div className="flex gap-3">
              <div className="h-10 w-10 rounded-lg bg-secondary" />
              <div className="flex-1">
                <p className="text-xs font-bold text-slate-900">Dubai Marathon 2026</p>
                <p className="text-[9px] text-muted-foreground">Standard Chartered Dubai Marathon. Completed comprehensive 16-week training block.</p>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-border pt-4 text-center">
            <p className="text-[7px] text-muted-foreground">The data presented in this document has been compiled and verified by Flinki's multi-layered trust engine.</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <button className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-slate-900 py-3 text-[10px] font-black uppercase tracking-widest text-white shadow-xl shadow-slate-900/20 hover:bg-blue-500 transition-all active:scale-95">
            <Download className="h-4 w-4" />
            Save as PDF
          </button>
          <button 
            onClick={handleCopy}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border-2 border-border bg-card py-3 text-[10px] font-black uppercase tracking-widest hover:bg-secondary transition-all active:scale-95"
          >
            {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Share2 className="h-4 w-4" />}
            {copied ? 'Copied!' : 'Copy Link'}
          </button>
        </div>

        <button 
          onClick={onClose}
          className="flex w-full items-center justify-center gap-2 text-[9px] font-black uppercase tracking-widest text-muted-foreground hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="h-3 w-3" />
          Back to Profile
        </button>
      </div>
    </Modal>
  );
}
