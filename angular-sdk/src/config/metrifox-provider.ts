import { MetrifoxService } from '@metrifox/angular-sdk';

export function initializeMetrifox(): void {
  MetrifoxService.initialize({
    clientKey: 'tPVJP9Sw87rO4OWMpDtXDRzjDH1iw4bh_uShZqh1xUU',
  });
}
