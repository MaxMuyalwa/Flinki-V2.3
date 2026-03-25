export const PEXELS_IMAGES = [
  'https://images.pexels.com/photos/4606708/pexels-photo-4606708.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/1564466/pexels-photo-1564466.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/2567037/pexels-photo-2567037.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/2524739/pexels-photo-2524739.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/2402734/pexels-photo-2402734.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/36436500/pexels-photo-36436500.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/2403516/pexels-photo-2403516.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/4775192/pexels-photo-4775192.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/5961762/pexels-photo-5961762.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/4065510/pexels-photo-4065510.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/5037288/pexels-photo-5037288.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/5319579/pexels-photo-5319579.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/3114/pexels-photo-3114.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/36182434/pexels-photo-36182434.jpeg?auto=compress&cs=tinysrgb&w=1200',
];

export const getRandomPexelsImage = () => {
  return PEXELS_IMAGES[Math.floor(Math.random() * PEXELS_IMAGES.length)];
};

export const SARAH_AVATAR = PEXELS_IMAGES[7];
