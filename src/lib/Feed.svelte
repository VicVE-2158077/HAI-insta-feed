<script>
  import { onMount } from 'svelte';
  import Reel from './Reel.svelte';
  import Icon from './Icon.svelte';
  import { reels } from '../data/reels.js';
  import {
    ghostMode,
    bumpInterest,
    interestsPanelOpen,
    lastViewedInterestsAt,
    unseenInterestChanges
  } from '../stores/algorithm.js';

  let container;
  let activeIndex = 0;

  // Infinite feed: cycle through the source reels, appending a fresh
  // batch each time the user gets close to the end. Each item has a
  // unique key so Svelte mounts a brand-new Reel component — its like /
  // save / follow state starts clean, and watching/liking it fires the
  // algorithm signal all over again.
  let feedItems = [];
  let nextKey = 0;
  let cyclePos = 0;

  function appendBatch() {
    const items = [];
    for (let i = 0; i < reels.length; i++) {
      items.push({ reel: reels[cyclePos % reels.length], key: nextKey++ });
      cyclePos++;
    }
    feedItems = [...feedItems, ...items];
  }

  appendBatch();

  let watchTimer = null;
  function fireWatch(reel) {
    if (!reel) return;
    clearTimeout(watchTimer);
    watchTimer = setTimeout(() => {
      if ($ghostMode) return;
      for (const [name, weight] of Object.entries(reel.interestSignals || {})) {
        bumpInterest(name, weight * 0.35);
      }
    }, 2500);
  }

  function onScroll() {
    if (!container) return;
    const h = container.clientHeight;
    const idx = Math.round(container.scrollTop / h);

    if (idx !== activeIndex) {
      activeIndex = idx;
      const item = feedItems[idx];
      if (item) fireWatch(item.reel);
    }

    if (idx >= feedItems.length - 3) appendBatch();
  }

  function toggleGhost() {
    ghostMode.update((v) => !v);
  }

  function openInterests() {
    lastViewedInterestsAt.set(Date.now());
    interestsPanelOpen.set(true);
  }

  onMount(() => fireWatch(feedItems[0]?.reel));
</script>

<div class="view">
  <div class="ig-header">
    <span class="logo">Reels</span>
    <div class="header-actions">
      <button
        class="hdr-btn"
        class:on={$ghostMode}
        on:click={toggleGhost}
        title={$ghostMode ? 'Private browsing on' : 'Browse privately'}
        aria-label="Toggle private browsing"
      >
        <Icon name={$ghostMode ? 'ghost-fill' : 'ghost'} size={26} strokeWidth={1.8} />
      </button>
      <button
        class="hdr-btn"
        on:click={openInterests}
        title="See and edit what we think you like"
        aria-label="Your interests"
      >
        <Icon name="sparkles" size={24} strokeWidth={1.8} />
        {#if $unseenInterestChanges > 0}
          <span class="hdr-badge" aria-hidden="true" />
        {/if}
      </button>
    </div>
  </div>

  {#if $ghostMode}
    <div class="ghost-banner">
      Private browsing — this won't change your feed
    </div>
  {/if}

  <div class="scroller" bind:this={container} on:scroll={onScroll}>
    {#each feedItems as item (item.key)}
      <Reel reel={item.reel} />
    {/each}
  </div>
</div>

<style>
  .view {
    flex: 1;
    min-height: 0;
    display: flex;
    flex-direction: column;
    background: #000;
  }

  .ig-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 18px 12px;
    flex-shrink: 0;
    z-index: 5;
  }
  .logo {
    font-family: 'Brush Script MT', 'Segoe Script', cursive;
    font-size: 32px;
    font-weight: 400;
    letter-spacing: 0.02em;
    color: #fff;
  }
  .header-actions {
    display: flex;
    gap: 4px;
  }
  .hdr-btn {
    position: relative;
    background: transparent;
    border: none;
    color: #fff;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    transition: background 0.15s, color 0.15s;
  }
  .hdr-btn:hover {
    background: rgba(255, 255, 255, 0.08);
  }
  .hdr-btn.on {
    color: var(--ghost);
  }
  .hdr-badge {
    position: absolute;
    top: 6px;
    right: 6px;
    width: 8px;
    height: 8px;
    background: var(--accent);
    border-radius: 50%;
    box-shadow: 0 0 0 2px #000;
  }

  .ghost-banner {
    background: rgba(78, 168, 255, 0.15);
    color: var(--ghost);
    text-align: center;
    font-size: 12px;
    font-weight: 600;
    padding: 7px 12px;
    border-top: 1px solid rgba(78, 168, 255, 0.3);
    border-bottom: 1px solid rgba(78, 168, 255, 0.3);
    flex-shrink: 0;
    z-index: 4;
  }

  .scroller {
    flex: 1;
    min-height: 0;
    overflow-y: auto;
    scroll-snap-type: y mandatory;
    scrollbar-width: none;
    position: relative;
  }
  .scroller::-webkit-scrollbar {
    display: none;
  }
  .scroller > :global(.reel) {
    height: 100%;
  }
</style>
