import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Trophy, Smartphone, MapPin, Heart, MessageCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

import { PEXELS_IMAGES, SARAH_AVATAR } from '../constants/images';

const photos = [
  {
    id: 1,
    url: PEXELS_IMAGES[12],
    caption: 'Training session in London. Pushing the limits!',
    device: 'Garmin Forerunner 955',
    achievement: 'Dubai Marathon 2026 Training',
    location: 'London, UK',
    likes: 124,
    comments: 12,
  },
  {
    id: 2,
    url: PEXELS_IMAGES[13],
    caption: 'Barcelona Marathon finish line. What a feeling!',
    device: 'Apple Watch Ultra',
    achievement: 'Barcelona Marathon 2025',
    location: 'Barcelona, Spain',
    likes: 452,
    comments: 34,
  },
  {
    id: 3,
    url: PEXELS_IMAGES[0],
    caption: 'Morning trail run. The views were incredible.',
    device: 'Strava App',
    achievement: 'Weekly Trail Goal',
    location: 'Peak District, UK',
    likes: 89,
    comments: 5,
  },
  {
    id: 4,
    url: PEXELS_IMAGES[1],
    caption: 'New gear day! Ready for the next block.',
    device: 'Manual Log',
    achievement: 'Gear Milestone',
    location: 'London, UK',
    likes: 67,
    comments: 8,
  },
];

export default function Photos() {
  const [selectedPhoto, setSelectedPhoto] = useState<typeof photos[0] | null>(null);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-flinki-blue">
          <ArrowLeft className="h-4 w-4" />
          Back to Feed
        </Link>
        <h1 className="text-2xl font-bold">Photos Gallery</h1>
      </div>

      {/* Instagram-like Grid */}
      <div className="grid grid-cols-3 gap-1 sm:gap-4">
        {photos.map((photo) => (
          <div 
            key={photo.id} 
            className="relative aspect-square cursor-pointer group overflow-hidden bg-muted"
            onClick={() => setSelectedPhoto(photo)}
          >
            <img 
              src={photo.url} 
              alt={photo.caption} 
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 text-white">
              <div className="flex items-center gap-1.5 font-bold">
                <Heart className="h-5 w-5 fill-white" /> {photo.likes}
              </div>
              <div className="flex items-center gap-1.5 font-bold">
                <MessageCircle className="h-5 w-5 fill-white" /> {photo.comments}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Photo Details Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPhoto(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative flex w-full max-w-5xl flex-col md:flex-row overflow-hidden rounded-2xl bg-card shadow-2xl h-[90vh] md:h-auto md:max-h-[90vh]"
            >
              {/* Image Side */}
              <div className="flex-1 bg-black flex items-center justify-center min-h-0">
                <img 
                  src={selectedPhoto.url} 
                  alt={selectedPhoto.caption} 
                  className="h-full w-full object-contain" 
                  referrerPolicy="no-referrer" 
                />
              </div>
              
              {/* Details Side */}
              <div className="w-full md:w-[400px] shrink-0 flex flex-col bg-card border-t md:border-t-0 md:border-l border-border">
                <div className="flex items-center justify-between border-b border-border p-3 sm:p-4 shrink-0">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <img src={SARAH_AVATAR} alt="Abigail Ndala" className="h-6 w-6 sm:h-8 sm:w-8 rounded-full object-cover" referrerPolicy="no-referrer" />
                    <h2 className="font-bold text-xs sm:text-sm">Abigail Ndala</h2>
                  </div>
                  <button 
                    onClick={() => setSelectedPhoto(null)} 
                    className="rounded-full p-1.5 sm:p-2 hover:bg-secondary transition-colors"
                  >
                    <X className="h-4 w-4 sm:h-5 sm:w-5" />
                  </button>
                </div>
                
                <div className="p-3 sm:p-6 flex-1 overflow-y-auto flex flex-col justify-center">
                  <p className="mb-3 sm:mb-6 text-xs sm:text-sm leading-relaxed text-foreground line-clamp-2 sm:line-clamp-none"><span className="font-bold mr-2">Abigail Ndala</span>{selectedPhoto.caption}</p>
                  
                  <div className="grid grid-cols-3 sm:grid-cols-1 gap-2 sm:gap-4">
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-1 sm:gap-3 rounded-lg bg-secondary/50 p-2 sm:p-3 text-center sm:text-left">
                      <Smartphone className="h-4 w-4 sm:h-5 sm:w-5 text-flinki-blue shrink-0" />
                      <div className="min-w-0 w-full">
                        <p className="text-[8px] sm:text-[10px] font-bold uppercase tracking-widest text-muted-foreground truncate">Device</p>
                        <p className="text-[10px] sm:text-sm font-bold truncate">{selectedPhoto.device}</p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-1 sm:gap-3 rounded-lg bg-secondary/50 p-2 sm:p-3 text-center sm:text-left">
                      <Trophy className="h-4 w-4 sm:h-5 sm:w-5 text-flinki-orange shrink-0" />
                      <div className="min-w-0 w-full">
                        <p className="text-[8px] sm:text-[10px] font-bold uppercase tracking-widest text-muted-foreground truncate">Goal</p>
                        <p className="text-[10px] sm:text-sm font-bold truncate">{selectedPhoto.achievement}</p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-1 sm:gap-3 rounded-lg bg-secondary/50 p-2 sm:p-3 text-center sm:text-left">
                      <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-flinki-green shrink-0" />
                      <div className="min-w-0 w-full">
                        <p className="text-[8px] sm:text-[10px] font-bold uppercase tracking-widest text-muted-foreground truncate">Location</p>
                        <p className="text-[10px] sm:text-sm font-bold truncate">{selectedPhoto.location}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-border p-3 sm:p-4 shrink-0">
                  <div className="flex items-center gap-4 sm:gap-6 mb-2 sm:mb-3">
                    <button className="flex items-center gap-1.5 text-foreground hover:text-flinki-blue transition-colors">
                      <Heart className="h-5 w-5 sm:h-6 sm:w-6" />
                    </button>
                    <button className="flex items-center gap-1.5 text-foreground hover:text-flinki-blue transition-colors">
                      <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-xs sm:text-sm">{selectedPhoto.likes} likes</p>
                    <p className="text-[9px] sm:text-[10px] text-muted-foreground uppercase tracking-widest">2 days ago</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
