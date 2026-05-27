<script>
  import Icon from './Icon.svelte';
  import { ghostMode, bumpInterest, mute } from '../stores/algorithm.js';
  import { fmtCount } from '../data/reels.js';

  export let reel;
  export let active = false;

  let liked = false;
  let saved = false;
  let following = false;
  let menuOpen = false;
  let whyOpen = false;

  $: ghost = $ghostMode;
  $: avatarLetter = reel.creator[0].toUpperCase();
  // Pick a stable hue per creator handle for the avatar gradient.
  $: avatarHue = [...reel.creator].reduce((a, c) => a + c.charCodeAt(0), 0) % 360;
  $: topSignals = Object.entries(reel.interestSignals || {})
    .sort((a, b) => b[1] - a[1])
    .slice(0, 2)
    .map(([n]) => n);

  function applySignals(sign = 1, magnitude = 1) {
    if (ghost) return;
    const signals = reel.interestSignals || {};
    for (const [name, weight] of Object.entries(signals)) {
      bumpInterest(name, sign * weight * magnitude);
    }
  }

  function onLike() {
    liked = !liked;
    applySignals(liked ? 1 : -1, 0.6);
  }
  function onSave() {
    saved = !saved;
    applySignals(saved ? 1 : -1, 0.8);
  }
  function onFollow() {
    following = !following;
    applySignals(following ? 1 : -1, 1.2);
  }
  function onComment() {
    applySignals(1, 0.4);
  }
  function onShare() {
    applySignals(1, 0.5);
  }
  function onNotInterested() {
    applySignals(-1, 1.5);
    for (const name of Object.keys(reel.interestSignals || {})) mute(name);
    menuOpen = false;
  }
  function onWhy() {
    whyOpen = true;
    menuOpen = false;
  }
</script>

<article class="reel" class:active style="background: {reel.color}">
  <span class="emoji" aria-hidden="true">{reel.emoji}</span>

  <div class="gradient-shade" />

  <!-- Bottom-left: caption block -->
  <div class="info">
    <div class="creator-row">
      <span
        class="avatar"
        style="background: linear-gradient(135deg, hsl({avatarHue} 70% 55%), hsl({(avatarHue + 60) % 360} 70% 45%))"
      >
        {avatarLetter}
      </span>
      <span class="handle">{reel.creator}</span>
      <span class="dot-sep">•</span>
      <button class="follow" class:on={following} on:click={onFollow}>
        {following ? 'Following' : 'Follow'}
      </button>
    </div>
    <p class="caption">{reel.caption}</p>
    <div class="audio-row">
      <Icon name="music" size={14} strokeWidth={2.2} />
      <span class="audio-label">{reel.audio.label} · {reel.creator}</span>
    </div>
  </div>

  <!-- Right action stack -->
  <div class="actions">
    <button class="act" class:liked on:click={onLike} aria-label="Like">
      <Icon name={liked ? 'heart-fill' : 'heart'} size={28} strokeWidth={1.6} />
      <span class="count">{fmtCount(reel.likes + (liked ? 1 : 0))}</span>
    </button>
    <button class="act" on:click={onComment} aria-label="Comment">
      <Icon name="comment" size={28} strokeWidth={1.6} />
      <span class="count">{fmtCount(reel.comments)}</span>
    </button>
    <button class="act" on:click={onShare} aria-label="Share">
      <Icon name="send" size={28} strokeWidth={1.6} />
      <span class="count">{fmtCount(reel.shares)}</span>
    </button>
    <button class="act" class:on={saved} on:click={onSave} aria-label="Save">
      <Icon name={saved ? 'bookmark-fill' : 'bookmark'} size={26} strokeWidth={1.6} />
    </button>
    <button class="act" on:click={() => (menuOpen = !menuOpen)} aria-label="More">
      <Icon name="more-h" size={24} strokeWidth={1.6} />
    </button>
  </div>

  {#if menuOpen}
    <button class="scrim" on:click={() => (menuOpen = false)} aria-label="Close" />
    <div class="sheet" role="menu">
      <button class="sheet-item" on:click={onNotInterested}>
        <Icon name="eye-off" size={20} strokeWidth={1.8} />
        <span>Not interested</span>
      </button>
      <button class="sheet-item" on:click={onWhy}>
        <Icon name="info" size={20} strokeWidth={1.8} />
        <span>Why am I seeing this?</span>
      </button>
    </div>
  {/if}

  {#if whyOpen}
    <button class="scrim" on:click={() => (whyOpen = false)} aria-label="Close" />
    <div class="why" role="dialog">
      <h4>Why you're seeing this</h4>
      <p>Based on what you've been into:</p>
      <div class="why-chips">
        {#each topSignals as s}
          <span class="why-chip">{s}</span>
        {/each}
      </div>
      <button class="why-close" on:click={() => (whyOpen = false)}>Got it</button>
    </div>
  {/if}
</article>

<style>
  .reel {
    position: relative;
    width: 100%;
    height: 100%;
    scroll-snap-align: start;
    display: flex;
    overflow: hidden;
  }

  .emoji {
    position: absolute;
    inset: 0;
    display: grid;
    place-items: center;
    font-size: 140px;
    filter: drop-shadow(0 6px 22px rgba(0, 0, 0, 0.35));
    pointer-events: none;
  }

  .gradient-shade {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 35%, rgba(0, 0, 0, 0) 75%, rgba(0, 0, 0, 0.25) 100%);
    pointer-events: none;
  }

  /* ----- info block (bottom-left) ----- */
  .info {
    position: absolute;
    left: 14px;
    right: 70px;
    bottom: 18px;
    color: #fff;
    z-index: 2;
  }
  .creator-row {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 8px;
  }
  .avatar {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    font-size: 12px;
    font-weight: 700;
    color: #fff;
    box-shadow: 0 0 0 1.5px rgba(255, 255, 255, 0.85);
  }
  .handle {
    font-size: 13px;
    font-weight: 600;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
  }
  .dot-sep {
    color: rgba(255, 255, 255, 0.85);
    font-size: 12px;
  }
  .follow {
    background: transparent;
    border: 1px solid rgba(255, 255, 255, 0.9);
    color: #fff;
    font-size: 12px;
    font-weight: 600;
    padding: 3px 10px;
    border-radius: 6px;
  }
  .follow.on {
    background: rgba(255, 255, 255, 0.95);
    color: #111;
    border-color: transparent;
  }

  .caption {
    margin: 0 0 8px 0;
    font-size: 13px;
    line-height: 1.4;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
  }

  .audio-row {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 11px;
    color: rgba(255, 255, 255, 0.95);
  }
  .audio-label {
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* ----- action stack (right) ----- */
  .actions {
    position: absolute;
    right: 10px;
    bottom: 18px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: center;
    color: #fff;
    z-index: 2;
  }
  .act {
    background: transparent;
    border: none;
    color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
    padding: 0;
    filter: drop-shadow(0 1px 3px rgba(0, 0, 0, 0.5));
    transition: transform 0.1s;
  }
  .act:active {
    transform: scale(0.9);
  }
  .act.liked {
    color: #ed4956;
  }
  .count {
    font-size: 11px;
    font-weight: 600;
  }

  /* ----- bottom sheet (more menu) ----- */
  .scrim {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
    border: none;
    z-index: 3;
    cursor: default;
  }
  .sheet {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    background: #1a1a1a;
    border-top-left-radius: 14px;
    border-top-right-radius: 14px;
    padding: 8px 0 16px;
    z-index: 4;
    animation: slideUp 0.18s ease;
  }
  @keyframes slideUp {
    from { transform: translateY(100%); }
    to   { transform: translateY(0); }
  }
  .sheet::before {
    content: '';
    display: block;
    width: 40px;
    height: 4px;
    background: #444;
    border-radius: 2px;
    margin: 6px auto 8px;
  }
  .sheet-item {
    display: flex;
    align-items: center;
    gap: 14px;
    width: 100%;
    padding: 14px 20px;
    background: transparent;
    border: none;
    color: #fff;
    font-size: 14px;
    text-align: left;
  }
  .sheet-item:hover {
    background: rgba(255, 255, 255, 0.05);
  }

  /* ----- "why" dialog ----- */
  .why {
    position: absolute;
    left: 16px;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
    background: #1a1a1a;
    border-radius: 14px;
    padding: 18px 18px 14px;
    z-index: 4;
    color: #fff;
  }
  .why h4 {
    margin: 0 0 4px 0;
    font-size: 14px;
  }
  .why p {
    margin: 0 0 10px 0;
    font-size: 12px;
    color: #aaa;
  }
  .why-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-bottom: 14px;
  }
  .why-chip {
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 999px;
    padding: 4px 10px;
    font-size: 12px;
  }
  .why-close {
    width: 100%;
    background: #fff;
    color: #111;
    border: none;
    padding: 10px;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 600;
  }
</style>
