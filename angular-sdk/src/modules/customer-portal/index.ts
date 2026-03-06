import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerPortalComponent, MetrifoxService } from '@metrifox/angular-sdk';
import type { CustomerPortalTheme } from '@metrifox/angular-sdk';
import { EmptyStateComponent } from '../../components/playground/empty-state.component';
import { extractThemeConfig } from '../../utils/object';
import type { ConfigValue } from '../../types/widget';

@Component({
  selector: 'customer-portal-widget',
  standalone: true,
  imports: [CommonModule, CustomerPortalComponent, EmptyStateComponent],
  template: `
    @if (clientKey && customerKey) {
      <div style="width:100%;height:100%">
        <metrifox-customer-portal [customerKey]="customerKey"></metrifox-customer-portal>
      </div>
    } @else {
      <pg-empty-state
        title="Configuration Required"
        description="Please enter your <strong>Client Key</strong> and <strong>Customer Key</strong> in the configuration panel to render the portal.">
      </pg-empty-state>
    }
  `,
})
export class CustomerPortalWidgetComponent implements OnChanges {
  @Input() customerKey = '';
  @Input() clientKey = '';
  @Input() configValues: Record<string, ConfigValue> = {};

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['clientKey'] || changes['configValues']) {
      if (this.clientKey) {
        const themeObj = extractThemeConfig(this.configValues as Record<string, unknown>, 'customerPortal');
        MetrifoxService.initialize({
          clientKey: this.clientKey,
          theme: Object.keys(themeObj).length > 0 ? { customerPortal: themeObj as CustomerPortalTheme } : undefined,
        });
      }
    }
  }
}
