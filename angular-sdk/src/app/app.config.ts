import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideMetrifox } from '@metrifox/angular-sdk';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    ...provideMetrifox(), // HttpClient + MetrifoxService so SDK components can inject the service
  ],
};
