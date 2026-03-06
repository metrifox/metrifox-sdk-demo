import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import type { WidgetConfigParam, ConfigValue } from '../../types/widget';

@Component({
  selector: 'pg-config-panel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    @for (section of sections; track section) {
      <div class="pg-config-section">
        <h4 class="pg-section-title uppercase">{{ section }}</h4>
        @for (config of getConfigsForSection(section); track config.key) {
          <div class="pg-form-group">
            <label class="pg-label" [attr.for]="config.key">{{ config.label }}</label>
            @if (config.type === 'text') {
              <input
                [id]="config.key"
                type="text"
                class="pg-input"
                [ngModel]="values[config.key] || ''"
                (ngModelChange)="onChange.emit({ key: config.key, value: $event })"
                [placeholder]="config.placeholder || ''">
            }
            @if (config.type === 'color') {
              <div style="display:flex;align-items:center;gap:8px">
                <input
                  [id]="config.key"
                  type="color"
                  style="width:32px;height:32px;padding:0;border:none;background:transparent"
                  [ngModel]="values[config.key] || '#000000'"
                  (ngModelChange)="onChange.emit({ key: config.key, value: $event })">
                <span style="font-size:14px;font-family:monospace">{{ values[config.key] }}</span>
              </div>
            }
            @if (config.type === 'boolean') {
              <label style="display:flex;align-items:center;gap:8px" class="pg-toggle">
                <input
                  type="checkbox"
                  [checked]="!!values[config.key]"
                  (change)="onChange.emit({ key: config.key, value: asCheckbox($event) })">
                <span>Enabled</span>
              </label>
            }
            @if (config.type === 'select') {
              <select
                class="pg-select"
                [ngModel]="values[config.key] || ''"
                (ngModelChange)="onChange.emit({ key: config.key, value: $event })">
                @for (opt of config.options || []; track opt.value) {
                  <option [value]="opt.value">{{ opt.label }}</option>
                }
              </select>
            }
          </div>
        }
      </div>
    }
  `,
})
export class ConfigPanelComponent {
  @Input() configs: WidgetConfigParam[] = [];
  @Input() values: Record<string, ConfigValue> = {};
  @Output() onChange = new EventEmitter<{ key: string; value: ConfigValue }>();

  get sections(): string[] {
    return Array.from(new Set(this.configs.map((c) => c.section || 'general')));
  }

  getConfigsForSection(section: string): WidgetConfigParam[] {
    return this.configs.filter((c) => (c.section || 'general') === section);
  }

  asCheckbox(event: Event): boolean {
    return (event.target as HTMLInputElement).checked;
  }
}
