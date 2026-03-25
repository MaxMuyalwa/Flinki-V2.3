import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AchievementsProvider } from './context/AchievementsContext';
import Index from './pages/Index';
import Explore from './pages/Explore';
import Profile from './pages/Profile';
import UserProfile from './pages/UserProfile';
import Photos from './pages/Photos';
import NotFound from './pages/NotFound';
import Navbar from './components/layout/Navbar';
import BottomNav from './components/layout/BottomNav';
import ScrollToTop from './components/layout/ScrollToTop';
import CreatePostModal from './components/modals/CreatePostModal';
import SyncAppsModal from './components/modals/SyncAppsModal';
import ExportCVModal from './components/modals/ExportCVModal';
import TrophyModal from './components/modals/TrophyModal';
import CommentModal from './components/modals/CommentModal';
import DeleteConfirmationModal from './components/modals/DeleteConfirmationModal';
import ShareAchievementModal from './components/modals/ShareAchievementModal';
import MessageModal from './components/modals/MessageModal';

import { Toaster } from 'sonner';

export default function App() {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [modalData, setModalData] = useState<any>(null);

  useEffect(() => {
    const handleOpenModal = (e: any) => {
      setActiveModal(e.detail.type || e.detail);
      setModalData(e.detail.data || null);
    };
    const handleOpenShareModal = (e: any) => {
      setActiveModal('share-achievement');
      setModalData(e.detail);
    };
    window.addEventListener('open-modal', handleOpenModal);
    window.addEventListener('open-share-modal', handleOpenShareModal);
    return () => {
      window.removeEventListener('open-modal', handleOpenModal);
      window.removeEventListener('open-share-modal', handleOpenShareModal);
    };
  }, []);

  const handleDeleteConfirm = () => {
    if (modalData?.id) {
      window.dispatchEvent(new CustomEvent('delete-post', { detail: { id: modalData.id } }));
    }
  };

  return (
    <AchievementsProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen bg-background font-sans antialiased pb-24 lg:pb-0">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Profile />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/feed" element={<Index />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/profile/:userName" element={<UserProfile />} />
              <Route path="/photos" element={<Photos />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <BottomNav />
          <Toaster 
            position="top-center"
            toastOptions={{
              className: 'bg-flinki-navy text-white border-flinki-orange border-2 font-bold rounded-xl shadow-lg shadow-flinki-orange/20',
              style: {
                background: '#1A1B41',
                color: '#FFFFFF',
                borderColor: '#F27D26',
              }
            }}
          />

          {/* Modals */}
          <CreatePostModal 
            isOpen={activeModal === 'create-post'} 
            onClose={() => setActiveModal(null)} 
          />
          <SyncAppsModal 
            isOpen={activeModal === 'sync-apps'} 
            onClose={() => setActiveModal(null)} 
          />
          <ExportCVModal 
            isOpen={activeModal === 'export-cv'} 
            onClose={() => setActiveModal(null)} 
          />
          <TrophyModal 
            isOpen={activeModal === 'trophies'} 
            onClose={() => setActiveModal(null)} 
            onShare={(trophy) => {
              window.dispatchEvent(new CustomEvent('open-share-modal', { detail: trophy }));
            }}
          />
          <CommentModal
            isOpen={activeModal === 'comment'}
            onClose={() => setActiveModal(null)}
            postTitle={modalData?.title || 'Post'}
          />
          <DeleteConfirmationModal
            isOpen={activeModal === 'delete-confirmation'}
            onClose={() => setActiveModal(null)}
            onConfirm={handleDeleteConfirm}
            title="Delete Post"
          />
          <ShareAchievementModal
            isOpen={activeModal === 'share-achievement'}
            onClose={() => setActiveModal(null)}
            achievement={modalData}
          />
          <MessageModal
            isOpen={activeModal === 'message'}
            onClose={() => setActiveModal(null)}
            recipientName={modalData?.name || 'User'}
          />
        </div>
      </BrowserRouter>
    </AchievementsProvider>
  );
}

