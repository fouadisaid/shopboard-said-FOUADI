import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  titreSite = signal('ShopBoard');
  version = signal('v1.0');

  modifierTitre(): void {
    this.titreSite.set('ShopBoard Pro');
  }
}