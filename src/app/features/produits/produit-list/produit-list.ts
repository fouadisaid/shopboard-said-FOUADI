import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProduitService } from '../../../core/services/produit';
import { PanierService } from '../../../core/services/panier';
import { toProduitVm } from '../../../shared/utils/mappers';
import { ProduitVm } from '../../../core/models/produit.vm';
import { ProduitCard } from '../produit-card/produit-card';

@Component({
  selector: 'app-produit-list',
  imports: [ProduitCard],
  templateUrl: './produit-list.html',
  styleUrl: './produit-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProduitList {
  private produitService = inject(ProduitService);
  private panierService = inject(PanierService);

  private produitsDto = toSignal(this.produitService.getAll(), { initialValue: [] });

  produits = computed(() => this.produitsDto().map(toProduitVm));

  nombreArticles = this.panierService.nombreArticles;
  totalFormate = this.panierService.totalFormate;

  onAjouterAuPanier(produit: ProduitVm): void {
    this.panierService.ajouter(produit);
    
  }

  
}