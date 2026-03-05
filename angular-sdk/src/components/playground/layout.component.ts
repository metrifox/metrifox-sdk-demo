import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MetrifoxService } from '@metrifox/angular-sdk';
import type { CustomerPortalTheme } from '@metrifox/angular-sdk';
import { ConfigPanelComponent } from './config-panel.component';
import { PreviewComponent } from './preview.component';
import { ThemePanelComponent } from './theme-panel.component';
import { EditableCodeViewComponent } from './editable-code-view.component';
import { SEARCH_ICON, GITHUB_ICON } from './playground-icons';
import { TABS, PREVIEW_MODES } from './constants';
import { setNestedValue, flattenTheme } from './utils/theme-utils';
import { buildCodeSnippet } from './utils/code-snippet';
import type { WidgetDefinition, ConfigValue } from '../../types/widget';
import { THEME } from '../../types/enums';

@Component({
  selector: 'pg-layout',
  standalone: true,
  imports: [CommonModule, FormsModule, ConfigPanelComponent, PreviewComponent, ThemePanelComponent, EditableCodeViewComponent],
  template: `
    <div [class]="'pg-layout new-design pg-theme-' + themeMode">
      <!-- Sidebar -->
      <aside class="pg-sidebar-left">
        <div class="pg-sidebar-header">
          <div class="pg-logo">
            <img src="assets/metrifox-logo.png" alt="Metrifox" class="pg-logo-img">
          </div>
          <div class="pg-widget-select-wrap">
            <label for="pg-widget-select" class="pg-widget-select-label">Widget</label>
            <select id="pg-widget-select" class="pg-widget-select" [ngModel]="activeWidgetId" (ngModelChange)="selectWidget($event)">
              @for (w of widgets; track w.id) {
                <option [value]="w.id">{{ w.name }}</option>
              }
            </select>
            @if (activeWidget.description) {
              <p class="pg-widget-description">{{ activeWidget.description }}</p>
            }
          </div>
        </div>

        <div class="pg-sidebar-content">
          @if (apiConfigs.length > 0) {
            <div class="pg-config-group">
              <h3 class="pg-group-title">API Configuration</h3>
              <div class="pg-group-content">
                <pg-config-panel
                  [configs]="apiConfigs"
                  [values]="currentWidgetValues"
                  (onChange)="setWidgetConfig($event.key, $event.value)">
                </pg-config-panel>
              </div>
            </div>
          }

          <div class="pg-config-group">
            <h3 class="pg-group-title">Theme settings</h3>
            <div class="pg-theme-search-wrap">
              <span class="pg-theme-search-icon" [innerHTML]="searchIconHtml"></span>
              <input type="text" placeholder="Search theme..." [ngModel]="searchQuery" (ngModelChange)="searchQuery = $event" class="pg-theme-search-input" aria-label="Search theme">
            </div>
            <pg-theme-panel
              [theme]="activeTheme"
              [searchQuery]="searchQuery"
              [sectionDescriptions]="activeWidget.sectionDescriptions || {}"
              (themeChange)="setTheme($event.path, $event.value)">
            </pg-theme-panel>
          </div>
        </div>
      </aside>

      <!-- Main Area -->
      <main class="pg-main-area">
        <header class="pg-topbar">
          <div class="pg-tabs">
            @for (tab of tabs; track tab.id) {
              <button [class]="'pg-tab' + (activeTab === tab.id ? ' active' : '')" (click)="activeTab = tab.id">
                {{ tab.label }}
                @if (tab.badge) {
                  <span class="pg-badge">{{ tab.badge }}</span>
                }
              </button>
            }
          </div>
          <div class="pg-toolbar">
            <a [href]="activeWidget.docsUrl || 'https://docs.metrifox.com/sdks/frontend/angular'" target="_blank" rel="noopener noreferrer" class="pg-header-link">Docs</a>
            <a href="https://github.com/metrifox/metrifox-sdk-demo" target="_blank" rel="noopener noreferrer" class="pg-header-link" title="View source on GitHub">
              <span class="pg-header-link-text">View Source</span>
              <span class="pg-header-link-icon" [innerHTML]="githubIconHtml"></span>
            </a>
            <div class="pg-divider"></div>
            @for (mode of previewModes; track mode) {
              <button [class]="'pg-icon-btn' + (previewMode === mode ? ' active' : '')" (click)="previewMode = mode">
                {{ capitalize(mode) }}
              </button>
            }
            <div class="pg-divider"></div>
            <button class="pg-icon-btn" (click)="toggleTheme()">
              {{ themeMode === 'light' ? '🌙' : '☀️' }}
            </button>
          </div>
        </header>

        <div class="pg-content">
          @if (activeTab === 'preview') {
            <pg-preview
              [widgetId]="activeWidgetId"
              [configValues]="combinedValues"
              [mode]="previewMode">
            </pg-preview>
          }
          @if (activeTab === 'json') {
            <pg-editable-code-view
              [value]="jsonEditText"
              [isCopied]="copied === 'json'"
              copyLabel="Copy JSON"
              ariaLabel="JSON config"
              (onChange)="handleJsonChange($event)"
              (onCopy)="handleCopy(jsonEditText, 'json')">
            </pg-editable-code-view>
          }
          @if (activeTab === 'code') {
            <pg-editable-code-view
              [value]="codeEditText"
              [isCopied]="copied === 'code'"
              copyLabel="Copy code"
              ariaLabel="Code snippet"
              (onChange)="codeEditText = $event"
              (onCopy)="handleCopy(codeEditText, 'code')">
            </pg-editable-code-view>
          }
        </div>
      </main>
    </div>
  `,
})
export class PlaygroundLayoutComponent implements OnInit, OnDestroy {
  @Input() widgets: WidgetDefinition[] = [];

  activeWidgetId = '';
  themeMode: 'light' | 'dark' = 'light';
  activeTab: 'preview' | 'json' | 'code' = 'preview';
  previewMode: 'desktop' | 'tablet' | 'mobile' = 'desktop';
  searchQuery = '';
  copied: 'json' | 'code' | null = null;
  jsonEditText = '';
  codeEditText = '';

  tabs = TABS;
  previewModes = PREVIEW_MODES;
  searchIconHtml: SafeHtml;
  githubIconHtml: SafeHtml;

  private widgetConfigs: Record<string, Record<string, ConfigValue>> = {};
  private widgetThemeConfigs: Record<string, Record<string, unknown>> = {};
  private jsonDebounceTimer: ReturnType<typeof setTimeout> | null = null;
  private sdkInitialized = false;

  constructor(private sanitizer: DomSanitizer) {
    this.searchIconHtml = this.sanitizer.bypassSecurityTrustHtml(SEARCH_ICON);
    this.githubIconHtml = this.sanitizer.bypassSecurityTrustHtml(GITHUB_ICON);
    if (typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: dark)')?.matches) {
      this.themeMode = 'dark';
    }
  }

  ngOnInit(): void {
    if (this.widgets.length > 0 && !this.activeWidgetId) {
      this.activeWidgetId = this.widgets[0].id;
    }
    this.applyThemeToDOM();
    this.initializeSDK();
  }

  ngOnDestroy(): void {
    if (this.jsonDebounceTimer) clearTimeout(this.jsonDebounceTimer);
  }

  get activeWidget(): WidgetDefinition {
    return this.widgets.find((w) => w.id === this.activeWidgetId) ?? this.widgets[0] ?? { id: '', name: '', description: '', status: 'Live' as const, docsUrl: '', highlights: [] };
  }

  get activeTheme(): Record<string, unknown> {
    return (this.widgetThemeConfigs[this.activeWidgetId] ?? this.activeWidget.defaultTheme ?? {}) as Record<string, unknown>;
  }

  get apiConfigs() {
    return this.activeWidget.configs?.filter((c) => c.section === 'api') ?? [];
  }

  get currentWidgetValues(): Record<string, ConfigValue> {
    const defaults: Record<string, ConfigValue> = {};
    this.activeWidget.configs?.forEach((c) => {
      if (c.defaultValue !== undefined) defaults[c.key] = c.defaultValue;
    });
    return { ...defaults, ...(this.widgetConfigs[this.activeWidgetId] ?? {}) };
  }

  get combinedValues(): Record<string, ConfigValue> {
    const prefix = `theme.${this.activeWidget.themeScope ?? 'customerPortal'}`;
    const flattened = flattenTheme(this.activeTheme, prefix);
    const display = this.activeTheme['display'] as Record<string, ConfigValue> | undefined;
    return { ...this.currentWidgetValues, ...flattened, ...(display ?? {}) } as Record<string, ConfigValue>;
  }

  get codeSnippet(): string {
    return buildCodeSnippet(this.activeWidgetId, this.activeWidget, this.activeTheme, this.currentWidgetValues);
  }

  selectWidget(id: string): void {
    this.activeWidgetId = id;
    this.initializeSDK();
  }

  setWidgetConfig(key: string, value: ConfigValue): void {
    this.widgetConfigs = {
      ...this.widgetConfigs,
      [this.activeWidgetId]: { ...(this.widgetConfigs[this.activeWidgetId] ?? {}), [key]: value },
    };
    if (key === 'clientKey' && value) {
      this.initializeSDK();
    }
  }

  setTheme(path: string, value: unknown): void {
    const current = { ...(this.widgetThemeConfigs[this.activeWidgetId] ?? this.activeTheme) } as Record<string, unknown>;
    this.widgetThemeConfigs = {
      ...this.widgetThemeConfigs,
      [this.activeWidgetId]: setNestedValue(current, path, value) as Record<string, unknown>,
    };
    this.applySDKTheme();
  }

  setFullTheme(theme: Record<string, unknown>): void {
    this.widgetThemeConfigs = { ...this.widgetThemeConfigs, [this.activeWidgetId]: theme };
    this.applySDKTheme();
  }

  toggleTheme(): void {
    this.themeMode = this.themeMode === THEME.LIGHT ? (THEME.DARK as 'dark') : (THEME.LIGHT as 'light');
    this.applyThemeToDOM();
  }

  capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  async handleCopy(content: string, which: 'json' | 'code'): Promise<void> {
    try {
      await navigator.clipboard.writeText(content);
      this.copied = which;
      setTimeout(() => (this.copied = null), 2000);
    } catch { /* ignore */ }
  }

  handleJsonChange(value: string): void {
    this.jsonEditText = value;
    if (this.jsonDebounceTimer) clearTimeout(this.jsonDebounceTimer);
    this.jsonDebounceTimer = setTimeout(() => {
      try {
        const parsed = JSON.parse(value);
        if (parsed !== null && typeof parsed === 'object' && !Array.isArray(parsed)) {
          this.setFullTheme(parsed as Record<string, unknown>);
        }
      } catch { /* invalid JSON */ }
      this.jsonDebounceTimer = null;
    }, 500);
  }

  private applyThemeToDOM(): void {
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      root.classList.remove('light', 'dark');
      root.classList.add(this.themeMode);
      root.setAttribute('data-theme', this.themeMode);
    }
  }

  private initializeSDK(): void {
    const clientKey = this.currentWidgetValues['clientKey'] as string;
    if (!clientKey) return;
    const themeObj = this.activeTheme;
    MetrifoxService.initialize({
      clientKey,
      theme: Object.keys(themeObj).length > 0 ? { customerPortal: themeObj as CustomerPortalTheme } : undefined,
    });
    this.sdkInitialized = true;
  }

  private applySDKTheme(): void {
    if (!this.sdkInitialized) return;
    try {
      MetrifoxService.updateTheme({ customerPortal: this.activeTheme as CustomerPortalTheme });
    } catch { /* SDK may not be initialized yet */ }
  }

  private prevTab = '';
  ngDoCheck(): void {
    if (this.activeTab !== this.prevTab) {
      this.prevTab = this.activeTab;
      if (this.activeTab === 'json') {
        this.jsonEditText = JSON.stringify(this.activeTheme, null, 2);
      }
      if (this.activeTab === 'code') {
        this.codeEditText = this.codeSnippet;
      }
    }
  }
}
