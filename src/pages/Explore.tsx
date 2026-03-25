import React from 'react';
import { Search, MapPin, Users, Trophy, Flame, ChevronRight, Star, Clock, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

import { PEXELS_IMAGES } from '../constants/images';

const categories = [
  { id: 'routes', name: 'Routes', icon: MapPin, color: 'bg-blue-500' },
  { id: 'plans', name: 'Plans', icon: Clock, color: 'bg-orange-500' },
  { id: 'challenges', name: 'Challenges', icon: Trophy, color: 'bg-emerald-500' },
  { id: 'clubs', name: 'Clubs', icon: Users, color: 'bg-purple-500' },
];

const trendingRoutes = [
  {
    id: 'r1',
    title: 'Coastal Cliff Run',
    location: 'Cape Town, SA',
    distance: '12.4km',
    elevation: '450m',
    rating: 4.9,
    image: PEXELS_IMAGES[2],
    tags: ['Scenic', 'Technical']
  },
  {
    id: 'r2',
    title: 'City Skyline Loop',
    location: 'Dubai, UAE',
    distance: '8.2km',
    elevation: '20m',
    rating: 4.7,
    image: PEXELS_IMAGES[3],
    tags: ['Flat', 'Night Run']
  }
];

const featuredChallenges = [
  {
    id: 'c1',
    title: '100km March Madness',
    participants: '12.4k',
    daysLeft: 6,
    reward: 'Exclusive Badge',
    image: PEXELS_IMAGES[4]
  }
];

export default function Explore() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-8 pb-32 lg:pb-8">
      {/* Header & Search */}
      <div className="mb-8 space-y-4">
        <h1 className="text-3xl font-black tracking-tight text-slate-900">Explore</h1>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search routes, plans, or athletes..."
            className="w-full rounded-2xl border border-border bg-white py-4 pl-12 pr-4 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10"
          />
        </div>
      </div>

      {/* Categories Grid */}
      <div className="mb-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {categories.map((cat) => (
          <button
            key={cat.id}
            className="group flex flex-col items-center gap-3 rounded-2xl border border-border bg-white p-4 transition-all hover:border-slate-900 hover:shadow-md"
          >
            <div className={`flex h-12 w-12 items-center justify-center rounded-full ${cat.color} text-white shadow-lg shadow-black/5 transition-transform group-hover:scale-110`}>
              <cat.icon className="h-6 w-6" />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-slate-900">{cat.name}</span>
          </button>
        ))}
      </div>

      {/* Featured Challenge */}
      <div className="mb-10">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-lg font-black text-slate-900">
            <Flame className="h-5 w-5 text-orange-500" />
            Featured Challenge
          </h2>
          <button className="text-xs font-bold uppercase tracking-widest text-orange-500 hover:underline">View All</button>
        </div>
        {featuredChallenges.map((challenge) => (
          <div key={challenge.id} className="group relative overflow-hidden rounded-3xl border border-border bg-white shadow-sm transition-all hover:shadow-xl">
            <div className="aspect-[21/9] w-full overflow-hidden">
              <img src={challenge.image} alt={challenge.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <div className="mb-2 flex items-center gap-3">
                <span className="rounded-full bg-orange-500 px-3 py-1 text-[10px] font-black uppercase tracking-widest">Active</span>
                <span className="text-[10px] font-bold uppercase tracking-widest opacity-80">{challenge.participants} joined</span>
              </div>
              <h3 className="mb-1 text-xl font-black">{challenge.title}</h3>
              <p className="text-xs opacity-80">{challenge.daysLeft} days remaining • Reward: {challenge.reward}</p>
            </div>
            <button className="absolute bottom-6 right-6 flex h-12 w-12 items-center justify-center rounded-full bg-white text-slate-900 shadow-lg transition-transform hover:scale-110">
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        ))}
      </div>

      {/* Trending Routes */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black text-slate-900">Trending Routes</h2>
          <button className="text-xs font-bold uppercase tracking-widest text-orange-500 hover:underline">See More</button>
        </div>
        <div className="grid gap-4">
          {trendingRoutes.map((route) => (
            <div key={route.id} className="flex gap-4 rounded-2xl border border-border bg-white p-3 transition-all hover:shadow-md">
              <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl">
                <img src={route.image} alt={route.title} className="h-full w-full object-cover" />
              </div>
              <div className="flex flex-1 flex-col justify-between py-1">
                <div>
                  <div className="mb-1 flex items-center justify-between">
                    <h3 className="text-sm font-black text-slate-900">{route.title}</h3>
                    <div className="flex items-center gap-1 text-xs font-bold text-yellow-500">
                      <Star className="h-3 w-3 fill-current" />
                      {route.rating}
                    </div>
                  </div>
                  <p className="flex items-center gap-1 text-[10px] text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    {route.location}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex gap-3 text-[10px] font-bold text-slate-900">
                    <span>{route.distance}</span>
                    <span className="text-muted-foreground">/</span>
                    <span>{route.elevation} gain</span>
                  </div>
                  <div className="flex gap-1">
                    {route.tags.map(tag => (
                      <span key={tag} className="rounded-full bg-secondary px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider text-muted-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
