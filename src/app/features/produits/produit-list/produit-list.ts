import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProduitService } from '../../../core/services/produit';
import { toProduitVm } from '../../../shared/utils/mappers';

@Component({
  selector: 'app-produit-list',
  imports: [],
  templateUrl: './produit-list.html',
  styleUrl: './produit-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProduitList {
  private produitService = inject(ProduitService);

  private produitsDto = toSignal(this.produitService.getAll(), { initialValue: [] });

  produits = computed(() => this.produitsDto().map(toProduitVm));
}