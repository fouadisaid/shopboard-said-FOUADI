import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProduitService } from '../../../core/services/produit';

@Component({
  selector: 'app-produit-list',
  imports: [],
  templateUrl: './produit-list.html',
  styleUrl: './produit-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProduitList {
  private produitService = inject(ProduitService);

  produits = toSignal(this.produitService.getAll(), { initialValue: [] });
}