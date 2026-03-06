export const TABS = [
  { id: 'preview' as const, label: 'Live Preview' },
  { id: 'json' as const, label: 'JSON Config' },
  { id: 'code' as const, label: 'Code Snippet', badge: 'Angular' },
];

export const PREVIEW_MODES = ['desktop', 'tablet', 'mobile'] as const;
