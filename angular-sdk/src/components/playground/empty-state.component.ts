import { Component, Input } from '@angular/core';

@Component({
  selector: 'pg-empty-state',
  standalone: true,
  template: `
    <div class="pg-empty-state"
      style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;width:100%;color:var(--pg-text-muted);text-align:center;gap:1rem;padding:2rem;">
      <div style="font-size:3rem;opacity:0.3">{{ icon || '⚙️' }}</div>
      <h3 style="margin:0;font-weight:600;color:var(--pg-text)">{{ title }}</h3>
      <p style="margin:0;max-width:300px" [innerHTML]="description"></p>
    </div>
  `,
})
export class EmptyStateComponent {
  @Input() icon = '';
  @Input() title = '';
  @Input() description = '';
}
