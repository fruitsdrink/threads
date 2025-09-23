import { User, Post } from './types';

// Generate 5 unique users
const users: User[] = [
  {
    id: 'user1',
    username: 'alex_tech',
    name: 'Alex Johnson',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    bio: 'Tech enthusiast | Web Developer | Coffee lover',
  },
  {
    id: 'user2',
    username: 'taylor_swiftie',
    name: 'Taylor Chen',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    bio: 'Music producer | Cat mom | Travel junkie',
  },
  {
    id: 'user3',
    username: 'jordan_designs',
    name: 'Jordan Lee',
    image: 'https://randomuser.me/api/portraits/men/22.jpg',
    bio: 'UI/UX Designer | Minimalist | Coffee snob',
  },
  {
    id: 'user4',
    username: 'sam_writes',
    name: 'Sam Wilson',
    image: 'https://randomuser.me/api/portraits/women/63.jpg',
    bio: 'Author | Bookworm | Tea enthusiast',
  },
  {
    id: 'user5',
    username: 'morgan_photos',
    name: 'Morgan Taylor',
    image: 'https://randomuser.me/api/portraits/women/28.jpg',
    bio: 'Photographer | Nature lover | Coffee addict',
  },
];

// Helper function to create a post
const createPost = (
  id: string,
  user: User,
  content: string,
  parentId: string | null = null,
  replies: Post[] = [],
  daysAgo: number = 0
): Post => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  
  return {
    id,
    createdAt: date.toISOString(),
    content,
    user_id: user.id,
    user,
    parent_id: parentId,
    parent: null, // Will be populated later
    replies,
  };
};

// Create posts
const posts: Post[] = [];

// Main posts
const post1 = createPost(
  'post1',
  users[0],
  'Just launched my new portfolio website! Check it out and let me know what you think. #webdev #portfolio',
  null,
  [],
  1
);

const post2 = createPost(
  'post2',
  users[1],
  'Working on a new music track. Can\'t wait to share it with you all! 🎵 #musicproduction',
  null,
  [],
  2
);

const post3 = createPost(
  'post3',
  users[2],
  'Design tip: White space is not your enemy. Sometimes less is more. #design #uidesign',
  null,
  [],
  3
);

// Add replies to post1
const reply1 = createPost(
  'reply1',
  users[3],
  'The animations are so smooth! What framework did you use?',
  'post1',
  [],
  0.5
);

const reply2 = createPost(
  'reply2',
  users[4],
  'Love the dark mode toggle! Great work 👏',
  'post1',
  [],
  0.2
);

const reply3 = createPost(
  'reply3',
  users[1],
  'I used React with Framer Motion for the animations. Thanks for checking it out!',
  'reply1',
  [],
  0.1
);

// Add replies to post2
const reply4 = createPost(
  'reply4',
  users[0],
  'Looking forward to hearing it! What genre is it?',
  'post2',
  [],
  0.8
);

const reply5 = createPost(
  'reply5',
  users[2],
  'I love your work! Can you share your production setup?',
  'post2',
  [],
  0.5
);

// Add more posts
const post4 = createPost(
  'post4',
  users[3],
  'Just finished reading "Atomic Habits". Highly recommend it for anyone looking to build better habits! #reading #selfimprovement',
  null,
  [],
  4
);

const post5 = createPost(
  'post5',
  users[4],
  'Sunset views from my latest photoshoot. Nature never disappoints. 🌅 #photography #nature',
  null,
  [],
  5
);

// Add replies to post5
const reply6 = createPost(
  'reply6',
  users[0],
  'Stunning shot! What camera do you use?',
  'post5',
  [],
  0.3
);

const reply7 = createPost(
  'reply7',
  users[2],
  'The colors are amazing! Did you edit this in Lightroom?',
  'post5',
  [],
  0.1
);

// Additional replies to reach 15 total posts
const reply8 = createPost(
  'reply8',
  users[3],
  'Great tip! Do you have a favorite resource for learning layout systems?',
  'post3',
  [],
  0.6
);

const reply9 = createPost(
  'reply9',
  users[4],
  'Mostly ambient electronic with some chillhop vibes 🎧',
  'reply4',
  [],
  0.4
);

const reply10 = createPost(
  'reply10',
  users[1],
  'That book changed my routine too. Habit stacking is a game changer!',
  'post4',
  [],
  0.7
);

// Add all posts to the array
posts.push(post1, post2, post3, post4, post5);

// Add all replies to their parent posts
const allReplies = [
  reply1,
  reply2,
  reply3,
  reply4,
  reply5,
  reply6,
  reply7,
  reply8,
  reply9,
  reply10,
];

// Function to find a post by ID
const findPost = (id: string): Post | undefined => {
  return [...posts, ...allReplies].find(post => post.id === id);
};

// Build the reply tree
allReplies.forEach(reply => {
  const parent = findPost(reply.parent_id!);
  if (parent) {
    parent.replies.push(reply);
    // Set the parent reference
    reply.parent = parent;
  }
});

export { users, posts };
