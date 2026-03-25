import React, { createContext, useState, useContext, ReactNode } from 'react';

import { PEXELS_IMAGES } from '../constants/images';

const initialAchievements = [
  {
    id: 'dubai-2026',
    title: 'Dubai Marathon 2026',
    date: 'Jan 2026',
    status: 'ONGOING',
    progress: 75,
    color: 'bg-green-500',
    description: 'Training for the first major marathon of 2026. Aiming for a sub-3:30 finish in the desert heat.',
    image: PEXELS_IMAGES[0],
    verified: false,
    weeks: '12/16',
    distance: '340km',
    time: '28h 12m',
    pace: '4:32/km',
    goal: 'Sub 3:30:00',
    metrics: [
      { label: '# of Logs', value: '24' },
      { label: 'Distance', value: '340', unit: 'km' },
      { label: 'Time', value: '28h 12m' },
      { label: 'Avg Pace', value: '4:32', unit: '/km' },
    ],
    logs: [
      { id: 'l1', title: 'Long Run Sunday', date: 'Mar 22, 2026', distance: '32km', time: '2:45:00', pace: '5:09/km', note: 'Felt strong, nutrition on point.' },
      { id: 'l2', title: 'Interval Session', date: 'Mar 19, 2026', distance: '12km', time: '52:00', pace: '4:20/km', note: '8x800m at goal pace.' },
    ]
  },
  {
    id: 'utmb-2026',
    title: 'UTMB Mont-Blanc',
    date: 'Aug 2026',
    status: 'ONGOING',
    progress: 30,
    color: 'bg-orange-500',
    description: 'The ultimate trail running challenge. Preparing for the grueling elevation changes and technical terrain of the Alps.',
    image: PEXELS_IMAGES[1],
    verified: false,
    weeks: '4/24',
    distance: '156km',
    time: '22h 45m',
    pace: '8:15/km',
    goal: 'Finish under 40h',
    metrics: [
      { label: '# of Logs', value: '12' },
      { label: 'Elevation', value: '8,450', unit: 'm' },
      { label: 'Distance', value: '156', unit: 'km' },
      { label: 'Avg Pace', value: '8:15', unit: '/km' },
    ],
    logs: [
      { id: 'l3', title: 'Vertical K', date: 'Mar 23, 2026', distance: '5km', time: '1:05:00', pace: '13:00/km', note: 'Steep climb, testing poles.' },
    ]
  },
  {
    id: 'tokyo-2026',
    title: 'Tokyo Marathon',
    date: 'Mar 2026',
    status: 'ONGOING',
    progress: 55,
    color: 'bg-blue-500',
    description: 'One of the six World Marathon Majors. Excited to experience the incredible organization and crowd support in Tokyo.',
    image: PEXELS_IMAGES[2],
    verified: false,
    weeks: '8/12',
    distance: '210km',
    time: '18h 45m',
    pace: '4:55/km',
    goal: 'Personal Best',
    metrics: [
      { label: '# of Logs', value: '18' },
      { label: 'Distance', value: '210', unit: 'km' },
      { label: 'Time', value: '18h 45m' },
      { label: 'Avg Pace', value: '4:55', unit: '/km' },
    ],
  },
  {
    id: 'barcelona-2025',
    title: 'Barcelona Marathon',
    date: 'Nov 2025',
    status: 'COMPLETED',
    progress: 100,
    color: 'bg-slate-900',
    description: 'A beautiful course through the heart of Barcelona. Successfully completed the training block and the race.',
    image: PEXELS_IMAGES[3],
    verified: true,
    weeks: '16/16',
    distance: '42.2km',
    time: '3:28:44',
    pace: '4:57/km',
    goal: 'Sub 3:30:00',
  },
  {
    id: 'london-10k-2025',
    title: 'London 10K',
    date: 'Jul 2025',
    status: 'COMPLETED',
    progress: 100,
    color: 'bg-orange-500',
    description: 'A fast and flat 10K through central London. Great for setting a personal best.',
    image: PEXELS_IMAGES[4],
    verified: true,
    weeks: '4/4',
    distance: '10km',
    time: '42:15',
    pace: '4:13/km',
    goal: 'Sub 45:00',
  },
  {
    id: 'berlin-2024',
    title: 'Berlin Marathon',
    date: 'Sep 2024',
    status: 'COMPLETED',
    progress: 100,
    color: 'bg-blue-500',
    description: 'The fastest marathon course in the world. Incredible atmosphere and perfect running conditions.',
    image: PEXELS_IMAGES[5],
    verified: true,
    weeks: '16/16',
    distance: '42.2km',
    time: '3:35:12',
    pace: '5:06/km',
    goal: 'First Marathon',
  }
];

interface AchievementsContextType {
  achievements: any[];
  setAchievements: React.Dispatch<React.SetStateAction<any[]>>;
}

const AchievementsContext = createContext<AchievementsContextType | undefined>(undefined);

export const AchievementsProvider = ({ children }: { children: ReactNode }) => {
  const [achievements, setAchievements] = useState(initialAchievements);
  return (
    <AchievementsContext.Provider value={{ achievements, setAchievements }}>
      {children}
    </AchievementsContext.Provider>
  );
};

export const useAchievements = () => {
  const context = useContext(AchievementsContext);
  if (!context) {
    throw new Error('useAchievements must be used within an AchievementsProvider');
  }
  return context;
};
