import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home/home').then((m) => m.Home),
  },
  {
    path: 'produits',
    loadComponent: () =>
      import('./features/produits/produit-list/produit-list').then(
        (m) => m.ProduitList
      ),
  },
  {
    path: 'produits/:id',
    loadComponent: () =>
      import('./features/produits/produit-detail/produit-detail').then(
        (m) => m.ProduitDetail
      ),
  },
  {
    path: 'panier',
    loadComponent: () =>
      import('./features/panier/panier/panier').then((m) => m.Panier),
  },
  {
    path: 'admin',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/admin/admin/admin').then((m) => m.Admin),
  },
  { path: '**', redirectTo: '' },
];