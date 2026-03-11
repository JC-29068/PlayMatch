export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  age?: number;
  gender?: string;
  location?: string;
  preferredSports: string[];
  skillLevel: 'Beginner' | 'Intermediate' | 'Advanced' | 'Pro';
  stats: {
    matchesPlayed: number;
    winRatio: number;
    rating: number;
  };
  badges: string[];
  avatarUrl?: string;
}

export interface Match {
  id: string;
  title: string;
  sport: string;
  date: string;
  time: string;
  location: string;
  coordinates?: { lat: number; lng: number };
  currentPlayers: number;
  requiredPlayers: number;
  skillLevel: string;
  creatorId: string;
  participants: User[];
  weather?: { temp: number; condition: string };
  status: 'Open' | 'In Progress' | 'Completed';
  liveScore?: { teamA: number; teamB: number };
}

export interface Turf {
  id: string;
  name: string;
  images: string[];
  hourlyRate: number;
  rating: number;
  location: string;
  availableSlots: string[];
  amenities: string[];
}

export interface Booking {
  id: string;
  turfId: string;
  userId: string;
  date: string;
  timeSlot: string;
  status: 'Pending' | 'Confirmed' | 'Cancelled';
  amount: number;
}

export interface CommunityPost {
  id: string;
  authorId: string;
  authorName: string;
  content: string;
  type: 'Discussion' | 'Recruitment';
  likes: number;
  comments: number;
  timestamp: string;
}
