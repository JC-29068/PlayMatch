import { User, Match, Turf, CommunityPost } from '../types';

export const currentUser: User = {
  id: 'u1',
  name: 'Alex Johnson',
  email: 'alex@example.com',
  preferredSports: ['Football', 'Basketball'],
  skillLevel: 'Intermediate',
  stats: { matchesPlayed: 24, winRatio: 65, rating: 4.8 },
  badges: ['Top Scorer', 'Early Bird', 'Team Player'],
  avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026024d'
};

export const mockUsers: User[] = [
  currentUser,
  { id: 'u2', name: 'Sarah Smith', email: 'sarah@example.com', preferredSports: ['Tennis'], skillLevel: 'Advanced', stats: { matchesPlayed: 40, winRatio: 80, rating: 4.9 }, badges: ['Pro Server'] },
  { id: 'u3', name: 'Mike Brown', email: 'mike@example.com', preferredSports: ['Football'], skillLevel: 'Beginner', stats: { matchesPlayed: 5, winRatio: 20, rating: 4.0 }, badges: [] },
];

export const mockMatches: Match[] = [
  {
    id: 'm1',
    title: 'Weekend 5v5 Football',
    sport: 'Football',
    date: '2025-10-25',
    time: '18:00',
    location: 'Downtown Turf',
    currentPlayers: 7,
    requiredPlayers: 10,
    skillLevel: 'Intermediate',
    creatorId: 'u2',
    participants: [mockUsers[0], mockUsers[1]],
    weather: { temp: 22, condition: 'Clear' },
    status: 'Open'
  },
  {
    id: 'm2',
    title: 'Casual Basketball Pickup',
    sport: 'Basketball',
    date: '2025-10-26',
    time: '10:00',
    location: 'Community Center',
    currentPlayers: 3,
    requiredPlayers: 6,
    skillLevel: 'Any',
    creatorId: 'u3',
    participants: [mockUsers[2]],
    weather: { temp: 18, condition: 'Cloudy' },
    status: 'Open'
  }
];

export const mockTurfs: Turf[] = [
  {
    id: 't1',
    name: 'Green Arena',
    images: ['https://images.unsplash.com/photo-1518605368461-1ee7e1625286?auto=format&fit=crop&q=80&w=800'],
    hourlyRate: 50,
    rating: 4.8,
    location: 'North District',
    availableSlots: ['16:00', '17:00', '19:00'],
    amenities: ['Floodlights', 'Changing Rooms', 'Parking']
  },
  {
    id: 't2',
    name: 'City Hoops Court',
    images: ['https://images.unsplash.com/photo-1505666287802-931dc83948e9?auto=format&fit=crop&q=80&w=800'],
    hourlyRate: 35,
    rating: 4.5,
    location: 'Downtown',
    availableSlots: ['10:00', '11:00', '14:00'],
    amenities: ['Indoor', 'Water Cooler']
  }
];

export const mockPosts: CommunityPost[] = [
  { id: 'p1', authorId: 'u2', authorName: 'Sarah Smith', content: 'Looking for a goalkeeper for our Sunday league team!', type: 'Recruitment', likes: 12, comments: 4, timestamp: '2 hours ago' },
  { id: 'p2', authorId: 'u3', authorName: 'Mike Brown', content: 'What are the best basketball shoes for outdoor courts?', type: 'Discussion', likes: 8, comments: 15, timestamp: '5 hours ago' }
];

export const mockDiscoverProfiles = [
  {
    id: 'd1',
    name: 'FC Thunder',
    type: 'Team',
    sport: 'Football',
    skillLevel: 'Advanced',
    distance: '2 miles away',
    image: 'https://images.unsplash.com/photo-1511886929837-354d827aae26?auto=format&fit=crop&q=80&w=800',
    bio: 'Looking for friendly matches this weekend. We play hard but fair!',
    online: true
  },
  {
    id: 'd2',
    name: 'Jake Weary',
    type: 'Player',
    sport: 'Basketball',
    skillLevel: 'Intermediate',
    distance: '1 mile away',
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&q=80&w=800',
    bio: 'Point guard looking for a regular pickup game squad.',
    online: true
  },
  {
    id: 'd3',
    name: 'Net Ninjas',
    type: 'Team',
    sport: 'Tennis',
    skillLevel: 'Pro',
    distance: '5 miles away',
    image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&q=80&w=800',
    bio: 'Doubles team seeking challengers for local tournament prep.',
    online: false
  },
  {
    id: 'd4',
    name: 'Marcus Chen',
    type: 'Player',
    sport: 'Football',
    skillLevel: 'Beginner',
    distance: '0.5 miles away',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=800',
    bio: 'Just moved to the area, looking to get back into playing casually.',
    online: true
  }
];
