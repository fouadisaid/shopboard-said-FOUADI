import { Injectable, signal, computed, effect } from '@angular/core';
import { ProduitVm } from '../models/produit.vm';
import { PanierArticle } from '../models/panier-article';

const SEUIL_LIVRAISON_GRATUITE = 50000; // en unités de prix (XOF, après /100)
const FRAIS_LIVRAISON = 2500;
const STORAGE_KEY = 'shopboard_panier';

@Injectable({
  providedIn: 'root',
})
export class PanierService {
  private _articles = signal<PanierArticle[]>(this.chargerDepuisStorage());

  articles = this._articles.asReadonly();

  nombreArticles = computed(() =>
    this._articles().reduce((total, a) => total + a.quantite, 0)
  );

  sousTotal = computed(() =>
    this._articles().reduce(
      (total, a) => total + a.produit.prix * a.quantite,
      0
    )
  );

  livraison = computed(() =>
    this.sousTotal() > SEUIL_LIVRAISON_GRATUITE ? 0 : FRAIS_LIVRAISON
  );

  total = computed(() => this.sousTotal() + this.livraison());

  totalFormate = computed(() =>
    new Intl.NumberFormat('fr-SN', {
      style: 'currency',
      currency: 'XOF',
      maximumFractionDigits: 0,
    }).format(this.total())
  );

  constructor() {
    effect(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this._articles()));
    });
  }

  ajouter(produit: ProduitVm): void {
    this._articles.update((articles) => {
      const existant = articles.find((a) => a.produit.id === produit.id);
      if (existant) {
        return articles.map((a) =>
          a.produit.id === produit.id ? { ...a, quantite: a.quantite + 1 } : a
        );
      }
      return [...articles, { produit, quantite: 1 }];
    });
  }

  retirer(produitId: string): void {
    this._articles.update((articles) =>
      articles
        .map((a) =>
          a.produit.id === produitId ? { ...a, quantite: a.quantite - 1 } : a
        )
        .filter((a) => a.quantite > 0)
    );
  }

  vider(): void {
    this._articles.set([]);
  }

  private chargerDepuisStorage(): PanierArticle[] {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }
}