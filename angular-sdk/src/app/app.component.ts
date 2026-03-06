import { Component } from '@angular/core';
import { PlaygroundLayoutComponent } from '../components/playground/layout.component';
import { widgetCatalog } from '../utils/widget';
import type { WidgetDefinition } from '../types/widget';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PlaygroundLayoutComponent],
  template: `<pg-layout [widgets]="widgets"></pg-layout>`,
})
export class AppComponent {
  widgets: WidgetDefinition[] = widgetCatalog;
}
