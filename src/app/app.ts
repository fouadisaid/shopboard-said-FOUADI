import { Component } from '@angular/core';
import { RouterOutlet} from '@angular/router';
import { Header } from './shared/components/header/header';
import { Navbar } from './shared/components/navbar/navbar';
import { ProduitList } from './features/produits/produit-list/produit-list';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Navbar,ProduitList],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  title = 'shopboard';
}