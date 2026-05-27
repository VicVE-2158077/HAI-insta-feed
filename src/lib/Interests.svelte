<script>
  import { buckets, moveInterest, interests, interestsPanelOpen } from '../stores/algorithm.js';
  import Icon from './Icon.svelte';

  $: changedSet = new Set(
    $interests
      .filter((i) => Date.now() - (i.lastChangedAt || 0) < 5000)
      .map((i) => i.name)
  );

  function close() {
    interestsPanelOpen.set(false);
  }
</script>

<div class="view">
  <header>
    <div class="header-spacer" />
    <h1>Your interests</h1>
    <button class="close" on:click={close} aria-label="Close">
      <Icon name="x" size={22} strokeWidth={2.2} />
    </button>
  </header>

  <div class="body">
    <p class="lede">
      These are the topics Instagram uses to choose your Reels.<br />
      Tap to change.
    </p>

    <section class="group">
      <div class="group-head">
        <span class="group-title">You're into</span>
        <span class="group-hint">↓ for less</span>
      </div>
      <div class="chips">
        {#each $buckets.into as i (i.name)}
          <span class="chip into" class:flash={changedSet.has(i.name)}>
            {i.name}
            <button
              class="chip-btn"
              on:click={() => moveInterest(i.name, 'down')}
              aria-label="Show less {i.name}"
              title="Show less"
            >
              <Icon name="chevron-down" size={14} strokeWidth={2.6} />
            </button>
          </span>
        {/each}
        {#if $buckets.into.length === 0}
          <span class="empty">Nothing yet — start liking some Reels.</span>
        {/if}
      </div>
    </section>

    <section class="group">
      <div class="group-head">
        <span class="group-title">Sometimes</span>
        <span class="group-hint">↑ more  ·  ↓ less</span>
      </div>
      <div class="chips">
        {#each $buckets.sometimes as i (i.name)}
          <span class="chip sometimes" class:flash={changedSet.has(i.name)}>
            {i.name}
            <button
              class="chip-btn"
              on:click={() => moveInterest(i.name, 'up')}
              aria-label="Show more {i.name}"
              title="Show more"
            >
              <Icon name="chevron-up" size={14} strokeWidth={2.6} />
            </button>
            <button
              class="chip-btn"
              on:click={() => moveInterest(i.name, 'down')}
              aria-label="Show less {i.name}"
              title="Show less"
            >
              <Icon name="chevron-down" size={14} strokeWidth={2.6} />
            </button>
          </span>
        {/each}
        {#if $buckets.sometimes.length === 0}
          <span class="empty">Nothing here right now.</span>
        {/if}
      </div>
    </section>

    <section class="group">
      <div class="group-head">
        <span class="group-title">Show less of</span>
        <span class="group-hint">↑ to bring back</span>
      </div>
      <div class="chips">
        {#each $buckets.less as i (i.name)}
          <span class="chip less" class:flash={changedSet.has(i.name)}>
            {i.name}
            <button
              class="chip-btn"
              on:click={() => moveInterest(i.name, 'up')}
              aria-label="Bring back {i.name}"
              title="Bring back"
            >
              <Icon name="chevron-up" size={14} strokeWidth={2.6} />
            </button>
          </span>
        {/each}
        {#if $buckets.less.length === 0}
          <span class="empty">Nothing hidden.</span>
        {/if}
      </div>
    </section>

    <div class="footnote">Changes apply right away.</div>
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

  header {
    display: grid;
    grid-template-columns: 40px 1fr 40px;
    align-items: center;
    padding: 10px 12px;
    border-bottom: 1px solid #161616;
    flex-shrink: 0;
  }
  h1 {
    margin: 0;
    font-size: 16px;
    font-weight: 600;
    text-align: center;
    letter-spacing: -0.01em;
  }
  .close {
    background: transparent;
    border: none;
    color: #fff;
    width: 36px;
    height: 36px;
    display: grid;
    place-items: center;
    border-radius: 50%;
  }
  .close:hover {
    background: rgba(255, 255, 255, 0.06);
  }
  .header-spacer {
    width: 36px;
  }

  .body {
    flex: 1;
    min-height: 0;
    overflow-y: auto;
    padding-bottom: 24px;
  }

  .lede {
    margin: 18px 20px 0;
    font-size: 14px;
    color: #aaa;
    line-height: 1.5;
  }

  .group {
    padding: 22px 20px 0;
  }
  .group-head {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    margin-bottom: 12px;
  }
  .group-title {
    font-size: 14px;
    font-weight: 600;
    color: #fff;
  }
  .group-hint {
    font-size: 11px;
    color: #777;
  }

  .chips {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  .empty {
    color: #555;
    font-size: 12px;
    font-style: italic;
  }

  .chip {
    display: inline-flex;
    align-items: center;
    gap: 2px;
    padding: 4px 4px 4px 14px;
    border-radius: 999px;
    font-size: 14px;
    line-height: 1;
    border: 1px solid transparent;
    transition: background 0.2s, border-color 0.2s, color 0.2s;
  }
  .chip.into {
    background: #1a1a1a;
    border-color: #2a2a2a;
    color: #fff;
  }
  .chip.sometimes {
    background: #131313;
    border-color: #232323;
    color: #d4d4d4;
  }
  .chip.less {
    background: transparent;
    border-color: #2a2a2a;
    color: #777;
  }

  .chip.flash {
    animation: pulse 1.4s ease;
  }
  @keyframes pulse {
    0%   { box-shadow: 0 0 0 0 rgba(225, 48, 108, 0.6); border-color: #e1306c; }
    60%  { box-shadow: 0 0 0 9px rgba(225, 48, 108, 0); }
    100% { box-shadow: 0 0 0 0 rgba(225, 48, 108, 0); }
  }

  .chip-btn {
    background: transparent;
    border: none;
    color: inherit;
    opacity: 0.55;
    width: 26px;
    height: 26px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    padding: 0;
    margin-left: 2px;
    transition: opacity 0.15s, background 0.15s;
  }
  .chip-btn:hover {
    opacity: 1;
    background: rgba(255, 255, 255, 0.1);
  }
  .chip-btn:active {
    transform: scale(0.9);
  }

  .footnote {
    margin: 28px 20px 0;
    font-size: 12px;
    color: #555;
    text-align: center;
  }
</style>
