import { Component, Input, Output, EventEmitter, Pipe, PipeTransform } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Pipe({ name: 'formatLabel', standalone: true })
export class FormatLabelPipe implements PipeTransform {
  transform(key: string): string {
    return key.replace(/([A-Z])/g, ' $1').replace(/^./, (s) => s.toUpperCase());
  }
}

@Component({
  selector: 'pg-theme-panel',
  standalone: true,
  imports: [CommonModule, FormsModule, FormatLabelPipe],
  template: `
    @for (sectionKey of visibleSections; track sectionKey) {
      <div class="tp-root-section">
        <button class="tp-root-header" (click)="toggleRootSection(sectionKey)">
          <h3 class="tp-root-title">{{ sectionKey | formatLabel }}</h3>
          <span class="tp-chevron" [class.open]="isRootOpen(sectionKey)">›</span>
        </button>
        @if (sectionDescriptions[sectionKey]) {
          <p class="tp-root-description">{{ sectionDescriptions[sectionKey] }}</p>
        }
        @if (isRootOpen(sectionKey)) {
          <div class="tp-root-content">
            <ng-container *ngTemplateOutlet="recursiveGroup; context: { $implicit: getThemeSection(sectionKey), path: sectionKey, level: 0 }"></ng-container>
          </div>
        }
      </div>
    }

    <ng-template #recursiveGroup let-data let-path="path" let-level="level">
      <div [class]="'tp-group level-' + level">
        @for (entry of objectEntries(data); track entry[0]) {
          @if (isObject(entry[1])) {
            <div class="tp-section">
              <button type="button" class="tp-section-header" (click)="toggleSection(path + '.' + entry[0])"
                [style.paddingLeft.px]="level > 0 ? 8 : 0">
                <span class="tp-section-title">{{ entry[0] | formatLabel }}</span>
                <span class="tp-chevron" [class.open]="isSectionOpen(path + '.' + entry[0])">›</span>
              </button>
              @if (isSectionOpen(path + '.' + entry[0])) {
                <div class="tp-section-content">
                  <ng-container *ngTemplateOutlet="recursiveGroup; context: { $implicit: entry[1], path: path + '.' + entry[0], level: level + 1 }"></ng-container>
                </div>
              }
            </div>
          } @else {
            <div class="tp-config-item">
              <label class="tp-label">{{ entry[0] | formatLabel }}</label>
              @if (isBooleanValue(entry[1])) {
                <label class="tp-toggle">
                  <input type="checkbox" [checked]="entry[1] === true"
                    (change)="emitChange(path + '.' + entry[0], asCheckbox($event))">
                  <span>{{ entry[1] === true ? 'On' : 'Off' }}</span>
                </label>
              } @else if (isColorValue(entry[0], entry[1])) {
                <div class="tp-color-input">
                  <div class="tp-color-swatch-wrapper">
                    <input type="color" [value]="asString(entry[1])" (input)="emitChange(path + '.' + entry[0], inputValue($event))" class="tp-color-swatch">
                    <div class="tp-color-preview" [style.backgroundColor]="asString(entry[1])"></div>
                  </div>
                  <input type="text" [value]="asString(entry[1])" (input)="emitChange(path + '.' + entry[0], inputValue($event))" class="tp-text-input tp-color-text">
                </div>
              } @else if (isSliderValue(entry[0])) {
                <div class="tp-slider-input">
                  <input type="range" min="0" max="32" [value]="parseNumeric(entry[1])"
                    (input)="emitChange(path + '.' + entry[0], inputValue($event) + 'px')" class="tp-range">
                  <input type="text" [value]="asString(entry[1])"
                    (input)="emitChange(path + '.' + entry[0], inputValue($event))" class="tp-text-input tp-slider-text">
                </div>
              } @else {
                <input type="text" [value]="asString(entry[1])"
                  (input)="emitChange(path + '.' + entry[0], inputValue($event))" class="tp-text-input">
              }
              @if (entry[0] === 'fontFamily') {
                <span class="tp-field-hint">Inherits from the host app by default. Pass any font-family string to override and ensure the font is loaded in your app.</span>
              }
            </div>
          }
        }
      </div>
    </ng-template>
  `,
})
export class ThemePanelComponent {
  @Input() theme: Record<string, unknown> = {};
  @Input() searchQuery = '';
  @Input() sectionDescriptions: Record<string, string> = {};
  @Output() themeChange = new EventEmitter<{ path: string; value: unknown }>();

  private openRootSections = new Set<string>();
  private openSections = new Set<string>();

  get visibleSections(): string[] {
    const sections = Object.keys(this.theme);
    const q = this.searchQuery.trim().toLowerCase();
    return q ? sections.filter((s) => s.toLowerCase().includes(q)) : sections;
  }

  getThemeSection(key: string): Record<string, unknown> {
    return (this.theme[key] ?? {}) as Record<string, unknown>;
  }

  isRootOpen(key: string): boolean {
    if (this.searchQuery.trim()) return true;
    return !this.openRootSections.has(key + '__closed');
  }

  toggleRootSection(key: string): void {
    const closedKey = key + '__closed';
    if (this.openRootSections.has(closedKey)) {
      this.openRootSections.delete(closedKey);
    } else {
      this.openRootSections.add(closedKey);
    }
  }

  isSectionOpen(path: string): boolean {
    return !this.openSections.has(path + '__closed');
  }

  toggleSection(path: string): void {
    const closedKey = path + '__closed';
    if (this.openSections.has(closedKey)) {
      this.openSections.delete(closedKey);
    } else {
      this.openSections.add(closedKey);
    }
  }

  objectEntries(obj: unknown): [string, unknown][] {
    if (typeof obj !== 'object' || obj === null) return [];
    return Object.entries(obj);
  }

  isObject(val: unknown): boolean {
    return typeof val === 'object' && val !== null && !Array.isArray(val);
  }

  isBooleanValue(val: unknown): boolean {
    return typeof val === 'boolean';
  }

  isColorValue(key: string, val: unknown): boolean {
    const s = String(val ?? '');
    return s.startsWith('#') || s.startsWith('rgb') ||
      key.toLowerCase().includes('color') || key.toLowerCase().includes('background');
  }

  isSliderValue(key: string): boolean {
    return key.toLowerCase().includes('radius') || key.toLowerCase().includes('padding') || key.toLowerCase().includes('gap');
  }

  asString(val: unknown): string {
    return typeof val === 'string' ? val : String(val ?? '');
  }

  parseNumeric(val: unknown): number {
    return parseInt(String(val ?? '0').replace(/[^0-9]/g, ''), 10) || 0;
  }

  inputValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

  asCheckbox(event: Event): boolean {
    return (event.target as HTMLInputElement).checked;
  }

  emitChange(path: string, value: unknown): void {
    this.themeChange.emit({ path, value });
  }
}
