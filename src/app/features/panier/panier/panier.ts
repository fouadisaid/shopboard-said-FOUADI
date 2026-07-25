import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { PanierService } from '../../../core/services/panier';

@Component({
  selector: 'app-panier',
  imports: [],
  templateUrl: './panier.html',
  styleUrl: './panier.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Panier {
  private router = inject(Router);
  panierService = inject(PanierService);

  continuerAchats(): void {
    this.router.navigate(['/produits']);
  }
}