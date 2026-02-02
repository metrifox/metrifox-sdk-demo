import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  MetrifoxService,
  CustomerPortalComponent,
  PricingTableComponent,
  CustomerDataLoadedEvent,
  PlanSelectedEvent,
  ErrorEvent,
} from '@metrifox/angular-sdk';
import type { CustomerPortalTheme } from '@metrifox/angular-sdk';
import {
  CUSTOMER_PORTAL_THEME_CONFIG,
  getThemeFromConfig,
  getThemeSections,
  type ThemeConfigEntry,
} from './theme-config';

type WidgetType = 'customer-portal' | 'pricing-table';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, CustomerPortalComponent, PricingTableComponent],
  template: `
    <div class="pg-layout" [attr.data-theme]="theme">
      <!-- Sidebar -->
      <aside class="pg-sidebar">
        <div class="pg-logo">
          <span class="pg-brand-text">Metrifox</span>
        </div>
        <nav class="pg-nav">
          <p class="pg-section-title">Widgets</p>
          <ul>
            <li>
              <button
                class="pg-nav-item"
                [class.active]="activeWidget === 'customer-portal'"
                (click)="selectWidget('customer-portal')">
                <span class="pg-nav-icon">👤</span>
                <span>Customer Portal</span>
                <span class="pg-tag-live">Live</span>
              </button>
            </li>
            <li>
              <button
                class="pg-nav-item"
                [class.active]="activeWidget === 'pricing-table'"
                (click)="selectWidget('pricing-table')">
                <span class="pg-nav-icon">🏷️</span>
                <span>Pricing Table</span>
                <span class="pg-tag-live">Live</span>
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      <!-- Main Content -->
      <main class="pg-main">
        <header class="pg-header">
          <h2>{{ getWidgetName() }}</h2>
          <div class="pg-header-actions">
            <a href="https://docs.metrifox.com/sdks/frontend/angular" target="_blank" class="pg-link-btn">
              Docs ↗
            </a>
            <div class="pg-header-divider"></div>
            <a href="https://github.com/metrifox/metrifox-sdk-demo" target="_blank" rel="noopener noreferrer" class="pg-icon-link" title="View on GitHub">
              <svg height="20" width="20" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
              </svg>
            </a>
            <button class="pg-theme-toggle" (click)="toggleTheme()">
              {{ theme === 'light' ? '🌙' : '☀️' }}
            </button>
          </div>
        </header>

        <div class="pg-preview-wrapper">
          <div class="pg-preview-stage">
            <div class="pg-stage-label">Preview Stage</div>
            <div class="pg-stage-content">
              <!-- Customer Portal -->
              @if (activeWidget === 'customer-portal') {
                @if (config['clientKey'] && config['customerKey']) {
                  <metrifox-customer-portal
                    [customerKey]="config['customerKey']"
                    (dataLoaded)="onDataLoaded($event)"
                    (errorOccurred)="onError($event)">
                  </metrifox-customer-portal>
                } @else {
                  <div class="pg-empty-state">
                    <h3>Configuration Required</h3>
                    <p>Please enter your <strong>Client Key</strong> and <strong>Customer Key</strong> in the configuration panel to render the portal.</p>
                  </div>
                }
              }

              <!-- Pricing Table -->
              @if (activeWidget === 'pricing-table') {
                @if (config['clientKey'] && config['checkoutKey'] && config['productKey']) {
                  <metrifox-pricing-table
                    [checkoutUsername]="config['checkoutKey']"
                    [productKey]="config['productKey']"
                    (planSelected)="onPlanSelected($event)"
                    (errorOccurred)="onError($event)">
                  </metrifox-pricing-table>
                } @else {
                  <div class="pg-empty-state">
                    <h3>Configuration Required</h3>
                    <p>Please enter your <strong>Client Key</strong>, <strong>Checkout Username</strong>, and <strong>Product Key</strong> to view the pricing table.</p>
                  </div>
                }
              }
            </div>
          </div>
        </div>
      </main>

      <!-- Config Panel -->
      <aside class="pg-config-sidebar">
        <div class="pg-config-header">
          <h3>Configuration</h3>
        </div>
        <div class="pg-config-content">
          <!-- API Section -->
          <div class="pg-config-section">
            <div class="pg-section-label">API</div>

            <div class="pg-form-group">
              <label class="pg-label">Client Key</label>
              <input
                type="text"
                class="pg-input"
                [ngModel]="config['clientKey']"
                (ngModelChange)="updateConfig('clientKey', $event)"
                placeholder="Enter your client key">
            </div>

            @if (activeWidget === 'customer-portal') {
              <div class="pg-form-group">
                <label class="pg-label">Customer Key</label>
                <input
                  type="text"
                  class="pg-input"
                  [ngModel]="config['customerKey']"
                  (ngModelChange)="updateConfig('customerKey', $event)"
                  placeholder="Enter your customer key">
              </div>
            }

            @if (activeWidget === 'pricing-table') {
              <div class="pg-form-group">
                <label class="pg-label">Checkout Username</label>
                <input
                  type="text"
                  class="pg-input"
                  [ngModel]="config['checkoutKey']"
                  (ngModelChange)="updateConfig('checkoutKey', $event)"
                  placeholder="Enter checkout username">
              </div>

              <div class="pg-form-group">
                <label class="pg-label">Product Key</label>
                <input
                  type="text"
                  class="pg-input"
                  [ngModel]="config['productKey']"
                  (ngModelChange)="updateConfig('productKey', $event)"
                  placeholder="Enter product key">
              </div>
            }
          </div>

          <!-- Theme Section (Customer Portal only, like React SDK demo) -->
          @if (activeWidget === 'pricing-table') {
            <p class="pg-theme-hint">Theme options appear when <strong>Customer Portal</strong> is selected.</p>
          }
          @if (activeWidget === 'customer-portal') {
            <div class="pg-config-section pg-theme-block">
              <div class="pg-section-label pg-theme-block-label">Theme</div>
              @for (section of themeSections; track section) {
                <div class="pg-config-section">
                  <div class="pg-section-label">{{ section }}</div>
                  @for (entry of getThemeEntriesForSection(section); track entry.key) {
                    <div class="pg-form-group">
                      <label class="pg-label">{{ entry.label }}</label>
                      <div class="pg-color-row">
                        <input
                          type="color"
                          class="pg-input-color"
                          [ngModel]="getThemeValue(entry)"
                          (ngModelChange)="updateConfig(entry.key, $event)">
                        <input
                          type="text"
                          class="pg-input pg-input-hex"
                          [ngModel]="getThemeValue(entry)"
                          (ngModelChange)="updateConfig(entry.key, $event)"
                          [placeholder]="entry.defaultValue">
                      </div>
                    </div>
                  }
                </div>
              }
            </div>
          }
        </div>
      </aside>
    </div>
  `,
  styles: []
})
export class AppComponent implements OnInit {
  activeWidget: WidgetType = 'customer-portal';
  theme: 'light' | 'dark' = 'light';

  themeSections: string[] = [];

  config: Record<string, string> = {
    clientKey: 'tPVJP9Sw87rO4OWMpDtXDRzjDH1iw4bh_uShZqh1xUU',
    customerKey: 'cust-mkpo1rd3u91j',
    checkoutKey: 'sandbox-adedapo-s-inc',
    productKey: 'product_metrifox_billing_product_fc6c',
  };

  private buildDefaultConfig(): void {
    for (const entry of CUSTOMER_PORTAL_THEME_CONFIG) {
      this.config[entry.key] = entry.defaultValue;
    }
  }

  getThemeEntriesForSection(section: string): ThemeConfigEntry[] {
    return CUSTOMER_PORTAL_THEME_CONFIG.filter((e) => e.section === section);
  }

  getThemeValue(entry: ThemeConfigEntry): string {
    return this.config[entry.key] ?? entry.defaultValue;
  }

  ngOnInit() {
    this.buildDefaultConfig();
    this.themeSections = getThemeSections();
    this.initializeSDK();
  }

  initializeSDK() {
    const clientKey = this.config['clientKey'];
    if (!clientKey) return;
    const themeObj = getThemeFromConfig(this.config);
    MetrifoxService.initialize({
      clientKey,
      theme: Object.keys(themeObj).length > 0 ? { customerPortal: themeObj as CustomerPortalTheme } : undefined,
    });
  }

  applyTheme() {
    if (!MetrifoxService.isInitialized()) return;
    const themeObj = getThemeFromConfig(this.config);
    MetrifoxService.updateTheme({ customerPortal: themeObj as CustomerPortalTheme });
  }

  selectWidget(widget: WidgetType) {
    this.activeWidget = widget;
  }

  getWidgetName(): string {
    return this.activeWidget === 'customer-portal' ? 'Customer Portal' : 'Pricing Table';
  }

  toggleTheme() {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
  }

  updateConfig(key: string, value: string) {
    this.config[key] = value;

    if (key === 'clientKey' && value) {
      this.initializeSDK();
    } else if (key.startsWith('theme.customerPortal.')) {
      this.applyTheme();
    }
  }

  onDataLoaded(_data: CustomerDataLoadedEvent) { }

  onPlanSelected(_event: PlanSelectedEvent) { }

  onError(_error: ErrorEvent) { }
}
