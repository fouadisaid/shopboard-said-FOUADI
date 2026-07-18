import { ProduitDto } from '../../core/models/produit.dto';
import { ProduitVm } from '../../core/models/produit.vm';

export function toProduitVm(dto: ProduitDto): ProduitVm {
  const stock = dto.stock ?? 0;

  const prixFormate = new Intl.NumberFormat('fr-SN', {
    style: 'currency',
    currency: 'XOF',
    maximumFractionDigits: 0,
  }).format(dto.prix / 100);

  const dateAjout = new Date(dto.created_at).toLocaleDateString('fr-SN');

  let badgeStatut: ProduitVm['badgeStatut'];
  if (stock === 0) {
    badgeStatut = 'Rupture';
  } else if (stock < 5) {
    badgeStatut = 'Stock faible';
  } else {
    badgeStatut = 'En stock';
  }

  return {
    id: dto.id,
    nom: dto.nom,
    prixFormate,
    estDisponible: stock > 0,
    dateAjout,
    badgeStatut,
  };
}