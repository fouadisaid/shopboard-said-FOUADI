import { ProduitVm } from './produit.vm';

export interface PanierArticle {
  produit: ProduitVm;
  quantite: number;
}