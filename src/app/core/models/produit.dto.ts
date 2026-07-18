export interface ProduitDto {
  id: string;
  nom: string;
  prix: number;
  stock: number | null;
  categorie: 'Informatique' | 'Accessoires' | 'Vêtements';
  created_at: string;
}