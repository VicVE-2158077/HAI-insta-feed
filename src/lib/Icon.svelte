<script>
  export let name;
  export let size = 24;
  export let strokeWidth = 1.8;
</script>

<svg
  width={size}
  height={size}
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width={strokeWidth}
  stroke-linecap="round"
  stroke-linejoin="round"
>
  {#if name === 'heart'}
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  {:else if name === 'heart-fill'}
    <path
      d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
      fill="currentColor"
      stroke="none"
    />
  {:else if name === 'comment'}
    <path
      d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8z"
    />
  {:else if name === 'send'}
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  {:else if name === 'bookmark'}
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
  {:else if name === 'bookmark-fill'}
    <path
      d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"
      fill="currentColor"
      stroke="none"
    />
  {:else if name === 'more-h'}
    <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
    <circle cx="19" cy="12" r="1.5" fill="currentColor" stroke="none" />
    <circle cx="5" cy="12" r="1.5" fill="currentColor" stroke="none" />
  {:else if name === 'music'}
    <path d="M9 18V5l12-2v13" />
    <circle cx="6" cy="18" r="3" />
    <circle cx="18" cy="16" r="3" />
  {:else if name === 'camera'}
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
    <circle cx="12" cy="13" r="4" />
  {:else if name === 'ghost'}
    <path d="M5 11a7 7 0 0 1 14 0v10q-1.75 1.75 -3.5 0q-1.75 1.75 -3.5 0q-1.75 1.75 -3.5 0q-1.75 1.75 -3.5 0Z" />
    <circle cx="9.5" cy="11" r="0.9" fill="currentColor" stroke="none" />
    <circle cx="14.5" cy="11" r="0.9" fill="currentColor" stroke="none" />
  {:else if name === 'ghost-fill'}
    <path
      d="M5 11a7 7 0 0 1 14 0v10q-1.75 1.75 -3.5 0q-1.75 1.75 -3.5 0q-1.75 1.75 -3.5 0q-1.75 1.75 -3.5 0Z M10.5 11a1 1 0 1 1 -2 0a1 1 0 1 1 2 0Z M15.5 11a1 1 0 1 1 -2 0a1 1 0 1 1 2 0Z"
      fill="currentColor"
      fill-rule="evenodd"
      stroke="none"
    />
  {:else if name === 'home'}
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  {:else if name === 'search'}
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  {:else if name === 'reels'}
    <rect x="3" y="3" width="18" height="18" rx="3" />
    <polygon points="10 9 16 12 10 15 10 9" fill="currentColor" stroke="none" />
  {:else if name === 'shop'}
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  {:else if name === 'user'}
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  {:else if name === 'x'}
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  {:else if name === 'rotate-ccw'}
    <polyline points="1 4 1 10 7 10" />
    <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
  {:else if name === 'info'}
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  {:else if name === 'eye-off'}
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
  {:else if name === 'chevron-right'}
    <polyline points="9 18 15 12 9 6" />
  {:else if name === 'chevron-up'}
    <polyline points="18 15 12 9 6 15" />
  {:else if name === 'chevron-down'}
    <polyline points="6 9 12 15 18 9" />
  {:else if name === 'sparkles'}
    <path d="M11 3l1.6 4.4L17 9l-4.4 1.6L11 15l-1.6-4.4L5 9l4.4-1.6z" />
    <path d="M18 14l.9 2.6L21.5 17.5l-2.6.9L18 21l-.9-2.6L14.5 17.5l2.6-.9z" />
  {/if}
</svg>
