# Réponses théoriques — TP Angular ShopBoard

**Étudiant :** Said Moindjié FOUADI — DITI3

---

## Séance 1

**Ex 1.1 — Node.js < v20 ?**
Mettre à jour vers une version LTS supportée (paire : 20, 22, 24). Utiliser un gestionnaire de versions type **nvm** pour éviter les conflits entre projets plutôt que réinstaller Node manuellement.

**Ex 1.2 — Création du projet**

1. `--standalone` : génère des composants sans `NgModule` ; chaque composant déclare ses dépendances via son propre tableau `imports`.
2. `app.component.ts` = composant racine (template + logique). `app.config.ts` = configuration globale des providers (`provideRouter`, `provideHttpClient`, etc.) — remplace l'ancien `AppModule`.
3. Il n'y a plus de `NgModule` racine à bootstrapper. `bootstrapApplication(AppComponent, appConfig)` injecte directement le composant racine et sa config de providers, sans passer par `platformBrowserDynamic().bootstrapModule()`.

---

## Séance 2

**Ex 2.1 — Structure JSON de `/produits`**
Un tableau JSON brut (`Produit[]`), sans enveloppe. Chaque clé racine de `db.json` devient un endpoint REST ; chaque objet est aussi accessible via `/produits/:id`.

**Ex 2.2 — Schéma du flux de données**

```
JSON Server → HttpClient → ProduitService.getAll() → Observable<Produit[]> → Template
```

**Ex 2.3 — Bonus : `toSignal()` vs `subscribe()`**
`toSignal()` intègre l'Observable au système de signals d'Angular : pas de désabonnement manuel (évite les fuites mémoire), compatible `OnPush`/zoneless, lisible directement dans le template (`produits()`) sans `ngOnInit`/`ngOnDestroy` ni `async` pipe.

---

## Séance 3

**Ex 3.1 — Pourquoi `stock: number | null` ?**
L'API peut renvoyer `null` (stock non renseigné). Typer uniquement `number` masquerait ce cas et risquerait un crash à l'exécution si non géré.

**Ex 3.1 — Pourquoi Union Type plutôt que `string` pour `categorie` ?**
Un Union Type restreint les valeurs possibles à un ensemble fini connu à la compilation : TypeScript détecte une faute de frappe ou une valeur invalide avant l'exécution, avec autocomplétion IDE. `string` accepterait n'importe quelle chaîne sans contrôle.

**Ex 3.2C.1 — Utility Type pour `mettreAJour(id, donnees)`**
`Partial<ProduitDto>` : l'utilisateur ne modifie que certains champs, donc toutes les propriétés doivent être optionnelles.

**Ex 3.2C.2 — Signature de `creerProduit`**

```typescript
function creerProduit(data: Omit<ProduitDto, 'id' | 'created_at'>): Observable<ProduitDto>;
```

`Omit<T, K>` retire les clés générées côté serveur (`id`, `created_at`) que le client ne doit pas envoyer.

**Ex 3.3 — Pourquoi `ApiResponse<T>` générique ?**
Un générique évite de dupliquer l'interface pour chaque type de données (produits, utilisateurs...). `ApiResponse<ProduitDto[]>` garantit que `.data` est bien typé, tout en réutilisant la même structure d'enveloppe.

---

## Séance 4

**Ex 4.1.1 — Tableau d'état (signal/computed/effect)**

| Appel             | valeur() | double() | estPair() | historique() |
| ----------------- | -------- | -------- | --------- | ------------ |
| Départ            | 0        | 0        | true      | [0]          |
| incrementer() n°1 | 1        | 2        | false     | [0, 1]       |
| incrementer() n°2 | 2        | 4        | true      | [0, 1, 2]    |
| incrementer() n°3 | 3        | 6        | false     | [0, 1, 2, 3] |

**Ex 4.1.2 — Pourquoi `computed()` plus performant qu'une méthode dans le template ?**
`computed()` mémoïse son résultat et ne le recalcule que si un signal lu a changé. Une méthode appelée dans le template est ré-exécutée à chaque cycle de détection de changement, même sans changement réel.

**Ex 4.1.3 — Cas d'usage de `effect()` (hors logging)**

- Synchroniser un signal avec `localStorage` (ex : persister le panier).
- Déclencher un scroll automatique ou une animation en réaction au changement d'un signal (ex : liste de messages).

`effect()` sert à exécuter un effet de bord, jamais à dériver une valeur (rôle réservé à `computed()`).

**Ex 4.2 — Pourquoi `_articles.asReadonly()` plutôt que `_articles` direct ?**
Exposer le signal brut permettrait à n'importe quel composant d'appeler `.set()`/`.update()` depuis l'extérieur, cassant l'encapsulation. `asReadonly()` retourne une vue en lecture seule : les composants lisent l'état (`articles()`) mais seul le service, via ses méthodes publiques (`ajouter`, `retirer`, `vider`), peut le modifier.

## Séance 5

**Ex 5.1 — Template A (@if/@else)**
​`html
@if (isLoading) {
  <app-spinner></app-spinner>
} @else {
  <app-produit-list [produits]="produits"></app-produit-list>
}
​`

**Ex 5.1 — Template B (@for/@empty)**
​```html
@for (p of produits; track p.id) {
<app-produit-card
[produit]="p"
(ajouterAuPanier)="onAjout($event)">
</app-produit-card>
} @empty {
  <p>Aucun produit</p>
}
​```

**Ex 5.1 — Template C (@switch)**
​`html
@switch (produit.badgeStatut) {
  @case ('En stock') {
    <span class="badge badge-vert">En stock</span>
  }
  @case ('Stock faible') {
    <span class="badge badge-orange">Stock faible</span>
  }
  @case ('Rupture') {
    <span class="badge badge-rouge">Rupture</span>
  }
}
​`
**Ex 5.3 — Différence [routerLink] vs router.navigate() ?**
`[routerLink]` s'utilise dans le template HTML sur un élément cliquable — Angular gère nativement l'accessibilité (lien réel, Ctrl+clic, URL affichée au survol). `router.navigate()` s'utilise en TypeScript quand la navigation dépend d'une logique métier (validation, réponse API, clic sur un élément non-lien). Règle générale : `[routerLink]` pour les liens statiques, `router.navigate()` pour la navigation conditionnelle/programmatique.
