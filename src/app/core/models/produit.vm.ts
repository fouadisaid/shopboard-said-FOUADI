import { ProduitDto } from './produit.dto';

export interface ProduitVm extends Pick<ProduitDto, 'id' | 'nom'> {
  prix: number;
  prixFormate: string;
  estDisponible: boolean;
  dateAjout: string;
  badgeStatut: 'En stock' | 'Rupture' | 'Stock faible';
}