import { PEXELS_IMAGES } from '../constants/images';

export const mockUsers = {
  'Marcus Thorne': {
    name: 'Marcus Thorne',
    headline: 'Triathlete | Ironman Finisher',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=240&h=240&fit=crop&crop=face',
    banner: PEXELS_IMAGES[4],
    location: 'San Francisco, USA',
    website: 'marcusthorne.com',
    stats: { distance: '450.2', elevation: '3,200', pace: '4:15' },
    groups: [
      { name: 'SF Tri Club', members: '1,240', avatar: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=100&h=100&fit=crop' },
      { name: 'Ironman Finishers', members: '8,500', avatar: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=100&h=100&fit=crop' }
    ],
    activityLogs: [
      { id: '1', title: 'Ironman Training - Swim', type: 'SWIM', date: 'Mar 24, 2026', distance: '3.8km', duration: '1:15:00', pace: '1:58/100m' },
      { id: '2', title: 'Brick Session', type: 'BRICK', date: 'Mar 22, 2026', distance: '40km / 10km', duration: '2:30:00', pace: '32km/h / 4:30/km' }
    ],
    achievements: [
      { 
        id: 'ironman-2025', 
        title: 'Ironman 2025', 
        date: 'Oct 2025', 
        status: 'COMPLETED', 
        progress: 100, 
        color: 'bg-slate-900',
        description: 'The ultimate endurance test. Successfully completed the full Ironman distance in under 11 hours.',
        image: PEXELS_IMAGES[5],
        metrics: [
          { label: 'Distance', value: '226', unit: 'km' },
          { label: 'Time', value: '10h 45m' },
          { label: 'Avg Pace', value: '4:55', unit: '/km' }
        ]
      }
    ]
  },
  'Elena Rodriguez': {
    name: 'Elena Rodriguez',
    headline: 'Trail Runner | Mountain Explorer',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=240&h=240&fit=crop&crop=face',
    banner: PEXELS_IMAGES[6],
    location: 'Chamonix, France',
    website: 'elenatrails.fr',
    stats: { distance: '890.5', elevation: '12,400', pace: '5:30' },
    groups: [
      { name: 'Chamonix Trail Club', members: '450', avatar: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=100&h=100&fit=crop' },
      { name: 'UTMB Finishers', members: '2,100', avatar: 'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?w=100&h=100&fit=crop' }
    ],
    activityLogs: [
      { id: '1', title: 'Vertical Kilometer Training', type: 'TRAIL', date: 'Mar 23, 2026', distance: '5.2km', duration: '1:05:00', pace: '12:30/km', elevation: '1,000m' },
      { id: '2', title: 'Long Trail Run', type: 'TRAIL', date: 'Mar 20, 2026', distance: '32km', duration: '4:15:00', pace: '7:58/km', elevation: '2,200m' }
    ],
    achievements: [
      { 
        id: 'utmb-2025', 
        title: 'UTMB 2025', 
        date: 'Aug 2025', 
        status: 'COMPLETED', 
        progress: 100, 
        color: 'bg-orange-500',
        description: 'The most prestigious trail race in the world. 170km around Mont Blanc with 10,000m of elevation gain.',
        image: PEXELS_IMAGES[7],
        metrics: [
          { label: 'Distance', value: '171', unit: 'km' },
          { label: 'Elevation', value: '10,040', unit: 'm' },
          { label: 'Time', value: '32h 15m' }
        ]
      }
    ]
  },
  'David Goggins': {
    name: 'David Goggins',
    headline: 'Ultra Marathoner | Author | Speaker',
    avatar: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=240&h=240&fit=crop',
    banner: PEXELS_IMAGES[8],
    location: 'Las Vegas, USA',
    website: 'davidgoggins.com',
    stats: { distance: '1200.0', elevation: '25,000', pace: '6:00' },
    groups: [
      { name: 'Hardest Workers', members: '1M+', avatar: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=100&h=100&fit=crop' }
    ],
    activityLogs: [
      { id: '1', title: 'Morning Run', type: 'RUN', date: 'Mar 25, 2026', distance: '20 miles', duration: '2:40:00', pace: '8:00/mile' },
      { id: '2', title: 'Pull-ups Session', type: 'STRENGTH', date: 'Mar 24, 2026', distance: '-', duration: '1:00:00', pace: '4,000 reps' }
    ],
    achievements: [
      { 
        id: 'moab-240', 
        title: 'Moab 240', 
        date: 'Oct 2025', 
        status: 'COMPLETED', 
        progress: 100, 
        color: 'bg-blue-500',
        description: '240 miles through the desert. No sleep, just grit.',
        image: PEXELS_IMAGES[9],
        metrics: [
          { label: 'Distance', value: '240', unit: 'miles' },
          { label: 'Time', value: '72h 12m' }
        ]
      }
    ]
  },
  'Eliud Kipchoge': {
    name: 'Eliud Kipchoge',
    headline: 'Olympic Champion | 1:59:40 Marathoner',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=240&h=240&fit=crop',
    banner: PEXELS_IMAGES[10],
    location: 'Kaptagat, Kenya',
    website: 'eliudkipchoge.com',
    stats: { distance: '1500.0', elevation: '500', pace: '2:50' },
    groups: [
      { name: 'NN Running Team', members: '50', avatar: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=100&h=100&fit=crop' }
    ],
    activityLogs: [
      { id: '1', title: 'Track Session', type: 'RUN', date: 'Mar 25, 2026', distance: '15km', duration: '45:00', pace: '3:00/km' },
      { id: '2', title: 'Long Run', type: 'RUN', date: 'Mar 23, 2026', distance: '40km', duration: '2:10:00', pace: '3:15/km' }
    ],
    achievements: [
      { 
        id: 'berlin-2025', 
        title: 'Berlin Marathon 2025', 
        date: 'Sep 2025', 
        status: 'COMPLETED', 
        progress: 100, 
        color: 'bg-green-500',
        description: 'Another world-class performance in Berlin.',
        image: PEXELS_IMAGES[11],
        metrics: [
          { label: 'Distance', value: '42.2', unit: 'km' },
          { label: 'Time', value: '2:01:09' }
        ]
      }
    ]
  }
};
