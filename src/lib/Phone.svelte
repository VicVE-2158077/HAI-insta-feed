<script>
  import Feed from './Feed.svelte';
  import Interests from './Interests.svelte';
  import Icon from './Icon.svelte';
  import { interestsPanelOpen } from '../stores/algorithm.js';

  function closePanel() {
    interestsPanelOpen.set(false);
  }
</script>

<div class="frame">
  <div class="phone">
    <div class="status-bar">
      <span class="time">9:41</span>
      <div class="notch" />
      <span class="status-right">
        <span class="signal">●●●</span>
        <span class="wifi">⌃</span>
        <span class="battery">▮</span>
      </span>
    </div>

    <div class="screen-stack">
      <Feed />

      <!-- AI / interests slide-out, anchored to the right of the phone -->
      <div class="overlay" class:open={$interestsPanelOpen} aria-hidden={!$interestsPanelOpen}>
        <button class="backdrop" on:click={closePanel} tabindex={$interestsPanelOpen ? 0 : -1} aria-label="Close" />
        <div class="panel">
          {#if $interestsPanelOpen}
            <Interests />
          {/if}
        </div>
      </div>
    </div>

    <nav class="bottom-nav">
      <button class="nav-btn" aria-label="Home">
        <Icon name="home" size={26} strokeWidth={1.8} />
      </button>
      <button class="nav-btn" aria-label="Search">
        <Icon name="search" size={26} strokeWidth={1.8} />
      </button>
      <button class="nav-btn active" aria-label="Reels">
        <Icon name="reels" size={26} strokeWidth={1.8} />
      </button>
      <button class="nav-btn" aria-label="Shop">
        <Icon name="shop" size={26} strokeWidth={1.8} />
      </button>
      <button class="nav-btn" aria-label="Profile">
        <Icon name="user" size={26} strokeWidth={1.8} />
      </button>
    </nav>
  </div>
</div>

<style>
  .frame {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;
    padding: 16px;
    background: #050505;
  }
  .phone {
    position: relative;
    height: min(98vh, 1000px);
    aspect-ratio: 9 / 19.5;
    max-width: 95vw;
    border-radius: 48px;
    background: #000;
    box-shadow:
      0 24px 80px rgba(0, 0, 0, 0.7),
      0 0 0 11px #161616,
      0 0 0 12px #2a2a2a;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    color: #fff;
  }

  .status-bar {
    position: relative;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 28px;
    font-size: 14px;
    font-weight: 600;
    flex-shrink: 0;
    z-index: 6;
  }
  .notch {
    position: absolute;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    width: 120px;
    height: 26px;
    background: #000;
    border-radius: 16px;
  }
  .status-right {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
  }
  .battery {
    border: 1px solid #fff;
    border-radius: 3px;
    padding: 0 5px;
    font-size: 9px;
    line-height: 13px;
  }

  .screen-stack {
    flex: 1;
    min-height: 0;
    overflow: hidden;
    position: relative;
    display: flex;
  }
  .screen-stack > :global(.view) {
    flex: 1;
    min-height: 0;
  }

  /* slide-out panel */
  .overlay {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 20;
  }
  .overlay.open {
    pointer-events: auto;
  }
  .backdrop {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0);
    border: none;
    padding: 0;
    cursor: default;
    transition: background 280ms;
  }
  .overlay.open .backdrop {
    background: rgba(0, 0, 0, 0.55);
  }
  .panel {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 92%;
    background: #000;
    transform: translateX(100%);
    transition: transform 300ms cubic-bezier(0.2, 0.85, 0.25, 1);
    box-shadow: -16px 0 40px rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
  }
  .overlay.open .panel {
    transform: translateX(0);
  }

  /* bottom nav */
  .bottom-nav {
    height: 62px;
    background: #000;
    border-top: 1px solid #161616;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-shrink: 0;
    z-index: 5;
  }
  .nav-btn {
    background: transparent;
    border: none;
    color: #777;
    padding: 8px 12px;
    display: grid;
    place-items: center;
    transition: color 0.15s, transform 0.1s;
  }
  .nav-btn.active {
    color: #fff;
  }
  .nav-btn:active {
    transform: scale(0.9);
  }
</style>
