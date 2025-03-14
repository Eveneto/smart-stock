import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tabela',
  standalone: true,
  templateUrl: './tabela.component.html',
  styleUrl: './tabela.component.css',
  imports: [CommonModule]
})
export class TabelaComponent {
  produtos = [
    { id: 1, nome: 'Produto 1', preco: 19.99, estoque: 50 },
    { id: 2, nome: 'Produto 2', preco: 49.90, estoque: 30 },
    { id: 3, nome: 'Produto 3', preco: 99.50, estoque: 10 }
  ];
}
