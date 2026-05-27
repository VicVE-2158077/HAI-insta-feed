// Mock dataset of Reels. interestSignals are used by the algorithm under
// the hood — they're never shown verbatim to the user.

export const reels = [
  {
    id: 'r1',
    creator: 'chef_marco',
    caption: '30-second pasta carbonara that actually works 🍝',
    color: 'linear-gradient(135deg, #f8b500, #fceabb)',
    emoji: '🍝',
    durationSec: 32,
    likes: 12400,
    comments: 218,
    shares: 1300,
    audio: { type: 'original', label: 'Original audio' },
    interestSignals: { Cooking: 8, 'Italian food': 6 }
  },
  {
    id: 'r2',
    creator: 'runwithlena',
    caption: 'Marathon training week 6 — long run vlog',
    color: 'linear-gradient(135deg, #56ab2f, #a8e063)',
    emoji: '🏃‍♀️',
    durationSec: 58,
    likes: 8200,
    comments: 142,
    shares: 410,
    audio: { type: 'song', label: 'Run Boy Run · Woodkid' },
    interestSignals: { Fitness: 7, Running: 9 }
  },
  {
    id: 'r3',
    creator: 'bytesize.dev',
    caption: 'Why your React app is slow (and how to fix it)',
    color: 'linear-gradient(135deg, #2c3e50, #4ca1af)',
    emoji: '💻',
    durationSec: 47,
    likes: 24800,
    comments: 932,
    shares: 3100,
    audio: { type: 'original', label: 'Original audio' },
    interestSignals: { Tech: 8, 'Web development': 9 }
  },
  {
    id: 'r4',
    creator: 'vanlife.kai',
    caption: 'Sunrise over the Dolomites, no filter',
    color: 'linear-gradient(135deg, #ff6e7f, #bfe9ff)',
    emoji: '🏔️',
    durationSec: 22,
    likes: 56000,
    comments: 780,
    shares: 4200,
    audio: { type: 'song', label: 'Weightless · Marconi Union' },
    interestSignals: { Travel: 7, Nature: 6 }
  },
  {
    id: 'r5',
    creator: 'drama.daily',
    caption: "You won't BELIEVE what happened next",
    color: 'linear-gradient(135deg, #654ea3, #eaafc8)',
    emoji: '😱',
    durationSec: 14,
    likes: 230000,
    comments: 18200,
    shares: 41000,
    audio: { type: 'original', label: 'Original audio' },
    interestSignals: { 'Celebrity gossip': 5, Clickbait: 6 }
  },
  {
    id: 'r6',
    creator: 'minimal.spaces',
    caption: 'Tiny apartment tour — 18m² in Tokyo',
    color: 'linear-gradient(135deg, #c9d6ff, #e2e2e2)',
    emoji: '🏠',
    durationSec: 41,
    likes: 14300,
    comments: 322,
    shares: 980,
    audio: { type: 'song', label: 'Komorebi · Ichiko Aoba' },
    interestSignals: { 'Interior design': 7, Minimalism: 6 }
  },
  {
    id: 'r7',
    creator: 'catsofig',
    caption: 'When the laser dot finally stops moving',
    color: 'linear-gradient(135deg, #f7971e, #ffd200)',
    emoji: '🐱',
    durationSec: 11,
    likes: 412000,
    comments: 9100,
    shares: 38000,
    audio: { type: 'original', label: 'Original audio' },
    interestSignals: { Pets: 8, Cats: 9, Humor: 4 }
  },
  {
    id: 'r8',
    creator: 'studyhard.bea',
    caption: 'My morning routine as a med student',
    color: 'linear-gradient(135deg, #36d1dc, #5b86e5)',
    emoji: '📚',
    durationSec: 53,
    likes: 9800,
    comments: 410,
    shares: 220,
    audio: { type: 'song', label: 'Sunrise · Norah Jones' },
    interestSignals: { Productivity: 6, 'Student life': 8 }
  },
  {
    id: 'r9',
    creator: 'vinyl.weekly',
    caption: 'New jazz pressings I picked up this weekend',
    color: 'linear-gradient(135deg, #283c86, #45a247)',
    emoji: '🎷',
    durationSec: 38,
    likes: 6700,
    comments: 188,
    shares: 90,
    audio: { type: 'song', label: 'So What · Miles Davis' },
    interestSignals: { Music: 7, Jazz: 8 }
  },
  {
    id: 'r10',
    creator: 'finance.with.sam',
    caption: '3 ETFs every 20-something should know',
    color: 'linear-gradient(135deg, #11998e, #38ef7d)',
    emoji: '📈',
    durationSec: 49,
    likes: 18900,
    comments: 622,
    shares: 2100,
    audio: { type: 'original', label: 'Original audio' },
    interestSignals: { 'Personal finance': 8, Investing: 7 }
  }
];

export function fmtCount(n) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(n >= 10_000_000 ? 0 : 1) + 'M';
  if (n >= 1_000) return (n / 1_000).toFixed(n >= 10_000 ? 0 : 1) + 'K';
  return String(n);
}
