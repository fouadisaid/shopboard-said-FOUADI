import { ProduitDto } from './produit.dto';

export interface ProduitVm extends Pick<ProduitDto, 'id' | 'nom'> {
  prixFormate: string;
  estDisponible: boolean;
  dateAjout: string;
  badgeStatut: 'En stock' | 'Rupture' | 'Stock faible';
}