import { Link } from 'react-router-dom';
import { SARAH_AVATAR } from '../../constants/images';

export default function PostComposer() {
  const openCreateModal = () => {
    window.dispatchEvent(new CustomEvent('open-modal', { detail: 'create-post' }));
  };

  const openGoalModal = () => {
    window.dispatchEvent(new CustomEvent('open-modal', { detail: 'create-goal' }));
  };

  const openExportModal = () => {
    window.dispatchEvent(new CustomEvent('open-modal', { detail: 'export-cv' }));
  };

  return (
    <div className="bg-white p-5">
      <div className="flex items-center gap-4">
        <Link to="/profile" className="h-10 w-10 shrink-0 overflow-hidden rounded-full border border-border bg-secondary/50 flex">
          <img 
            src={SARAH_AVATAR} 
            alt="Profile" 
            className="h-full w-full object-cover"
            referrerPolicy="no-referrer"
          />
        </Link>
        <button 
          onClick={openCreateModal}
          className="flex-1 rounded-full border border-[#DCE6F2] bg-slate-50/50 py-2 sm:py-2.5 px-4 sm:px-5 text-left text-xs sm:text-sm font-medium text-[#5E768D] hover:bg-slate-100 transition-all hover:border-blue-500/30"
        >
          Share your journey...
        </button>
      </div>
      
      <div className="mt-5 flex items-center justify-center sm:justify-start border-t border-border pt-4 px-1">
        <div className="flex items-center gap-8 sm:gap-12">
          <button onClick={openGoalModal} className="group transition-all">
            <span className="text-[10px] font-black uppercase tracking-widest text-orange-500 group-hover:opacity-80 transition-all whitespace-nowrap">Goal/Challenge</span>
          </button>
          
          <button onClick={openExportModal} className="group transition-all">
            <span className="text-[10px] font-black uppercase tracking-widest text-blue-500 group-hover:opacity-80 transition-all whitespace-nowrap">Export CV</span>
          </button>
        </div>
      </div>
    </div>
  );
}
