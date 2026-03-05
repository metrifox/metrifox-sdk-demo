import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PricingTableComponent, MetrifoxService } from '@metrifox/angular-sdk';
import { EmptyStateComponent } from '../../components/playground/empty-state.component';
import { extractThemeConfig } from '../../utils/object';
import type { ConfigValue } from '../../types/widget';

@Component({
  selector: 'pricing-table-widget',
  standalone: true,
  imports: [CommonModule, PricingTableComponent, EmptyStateComponent],
  template: `
    @if (clientKey && checkoutKey && productKey) {
      <div style="width:100%;height:100%">
        <metrifox-pricing-table
          [checkoutUsername]="checkoutKey"
          [productKey]="productKey">
        </metrifox-pricing-table>
      </div>
    } @else {
      <pg-empty-state
        title="Configuration Required"
        description="Please enter your <strong>Client Key</strong>, <strong>Checkout Username</strong>, and <strong>Product Key</strong> to view the pricing table.">
      </pg-empty-state>
    }
  `,
})
export class PricingTableWidgetComponent implements OnChanges {
  @Input() clientKey = '';
  @Input() checkoutKey = '';
  @Input() productKey = '';
  @Input() configValues: Record<string, ConfigValue> = {};

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['clientKey'] || changes['configValues']) {
      if (this.clientKey) {
        const themeObj = extractThemeConfig(this.configValues as Record<string, unknown>, 'pricingTable');
        MetrifoxService.initialize({
          clientKey: this.clientKey,
          theme: Object.keys(themeObj).length > 0 ? themeObj : undefined,
        });
      }
    }
  }
}
