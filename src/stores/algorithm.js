import { writable, derived } from 'svelte/store';

// Underlying "what the AI thinks you like" model.
// score and source stay internal — the UI exposes only buckets and chips.
const initial = [
  { name: 'Cooking', score: 62, source: 'inferred', muted: false, lastChangedAt: 0 },
  { name: 'Italian food', score: 41, source: 'inferred', muted: false, lastChangedAt: 0 },
  { name: 'Fitness', score: 55, source: 'declared', muted: false, lastChangedAt: 0 },
  { name: 'Running', score: 48, source: 'inferred', muted: false, lastChangedAt: 0 },
  { name: 'Tech', score: 71, source: 'declared', muted: false, lastChangedAt: 0 },
  { name: 'Web development', score: 66, source: 'inferred', muted: false, lastChangedAt: 0 },
  { name: 'Travel', score: 39, source: 'inferred', muted: false, lastChangedAt: 0 },
  { name: 'Celebrity gossip', score: 28, source: 'inferred', muted: true, lastChangedAt: 0 },
  { name: 'Clickbait', score: 22, source: 'inferred', muted: true, lastChangedAt: 0 },
  { name: 'Pets', score: 35, source: 'inferred', muted: false, lastChangedAt: 0 },
  { name: 'Personal finance', score: 44, source: 'inferred', muted: false, lastChangedAt: 0 }
];

export const interests = writable(initial);
export const ghostMode = writable(false);

// Whether the AI / interests panel is slid out over the feed.
export const interestsPanelOpen = writable(false);

// Timestamp of the last time the user opened the panel — used
// to compute a "new since you last looked" badge on the header button.
export const lastViewedInterestsAt = writable(Date.now());

export const unseenInterestChanges = derived(
  [interests, lastViewedInterestsAt],
  ([$interests, $lastViewed]) =>
    $interests.filter((i) => (i.lastChangedAt || 0) > $lastViewed).length
);

export function bumpInterest(name, delta) {
  interests.update((list) => {
    const idx = list.findIndex((i) => i.name.toLowerCase() === name.toLowerCase());
    const now = Date.now();
    if (idx === -1) {
      list.push({
        name,
        score: Math.max(0, Math.min(100, delta)),
        source: 'inferred',
        muted: false,
        lastChangedAt: now
      });
    } else {
      const cur = list[idx];
      if (cur.muted) return list;
      list[idx] = {
        ...cur,
        score: Math.max(0, Math.min(100, cur.score + delta)),
        lastChangedAt: now
      };
    }
    return list;
  });
}

export function mute(name) {
  interests.update((list) =>
    list.map((i) => (i.name === name ? { ...i, muted: true, lastChangedAt: Date.now() } : i))
  );
}

export function unmute(name) {
  interests.update((list) =>
    list.map((i) => (i.name === name ? { ...i, muted: false, lastChangedAt: Date.now() } : i))
  );
}

// Promote / demote an interest between the three UI buckets.
// 'up'   : less   → sometimes → into
// 'down' : into   → sometimes → less (muted)
// Scores are snapped into the middle of each bucket so the move sticks.
const BUCKET_SCORE = { into: 70, sometimes: 40 };
export function moveInterest(name, direction) {
  interests.update((list) => {
    const idx = list.findIndex((i) => i.name === name);
    if (idx === -1) return list;
    const cur = list[idx];
    const now = Date.now();

    const bucket = cur.muted ? 'less' : cur.score >= 55 ? 'into' : 'sometimes';
    let next = { ...cur, lastChangedAt: now };

    if (direction === 'up') {
      if (bucket === 'less') {
        next.muted = false;
        next.score = BUCKET_SCORE.sometimes;
      } else if (bucket === 'sometimes') {
        next.score = BUCKET_SCORE.into;
      }
    } else if (direction === 'down') {
      if (bucket === 'into') {
        next.score = BUCKET_SCORE.sometimes;
      } else if (bucket === 'sometimes') {
        next.muted = true;
      }
    }

    list[idx] = next;
    return list;
  });
}

// Three simple buckets the UI shows as labelled chip groups.
// No scores, no sources, no deltas — those stay backstage.
export const buckets = derived(interests, ($interests) => {
  const into = [];
  const sometimes = [];
  const less = [];
  for (const i of $interests) {
    if (i.muted) less.push(i);
    else if (i.score >= 55) into.push(i);
    else if (i.score >= 20) sometimes.push(i);
  }
  into.sort((a, b) => b.score - a.score);
  sometimes.sort((a, b) => b.score - a.score);
  less.sort((a, b) => b.score - a.score);
  return { into, sometimes, less };
});
