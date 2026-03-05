import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerPortalComponent, PricingTableComponent } from '@metrifox/angular-sdk';
import { EmptyStateComponent } from './empty-state.component';
import type { ConfigValue } from '../../types/widget';

@Component({
  selector: 'pg-preview',
  standalone: true,
  imports: [CommonModule, CustomerPortalComponent, PricingTableComponent, EmptyStateComponent],
  template: `
    <div class="pg-preview-container">
      <div class="pg-preview-window" [ngClass]="mode">
        <div class="pg-window-header">
          <div class="pg-traffic-lights">
            <span class="pg-light pg-red"></span>
            <span class="pg-light pg-yellow"></span>
            <span class="pg-light pg-green"></span>
          </div>
          <div class="pg-address-bar">
            customer-portal.metrifox.com/billing
          </div>
          <div class="pg-window-actions">
            <div class="pg-header-icon"></div>
            <div class="pg-header-icon rounded"></div>
          </div>
        </div>
        <div class="pg-window-content">
          @if (widgetId === 'customer-portal') {
            @if (configValues['clientKey'] && configValues['customerKey']) {
              <metrifox-customer-portal
                [customerKey]="asString(configValues['customerKey'])">
              </metrifox-customer-portal>
            } @else {
              <pg-empty-state
                title="Configuration Required"
                description="Please enter your <strong>Client Key</strong> and <strong>Customer Key</strong> in the configuration panel to render the portal.">
              </pg-empty-state>
            }
          }
          @if (widgetId === 'pricing-table') {
            @if (configValues['clientKey'] && configValues['checkoutKey'] && configValues['productKey']) {
              <metrifox-pricing-table
                [checkoutUsername]="asString(configValues['checkoutKey'])"
                [productKey]="asString(configValues['productKey'])">
              </metrifox-pricing-table>
            } @else {
              <pg-empty-state
                title="Configuration Required"
                description="Please enter your <strong>Client Key</strong>, <strong>Checkout Username</strong>, and <strong>Product Key</strong> to view the pricing table.">
              </pg-empty-state>
            }
          }
        </div>
      </div>
    </div>
  `,
})
export class PreviewComponent {
  @Input() widgetId = '';
  @Input() configValues: Record<string, ConfigValue> = {};
  @Input() mode: 'desktop' | 'tablet' | 'mobile' = 'desktop';

  asString(val: ConfigValue | undefined): string {
    return String(val ?? '');
  }
}
