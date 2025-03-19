import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tabela',
  standalone: true,
  templateUrl: './tabela.component.html',
  styleUrl: './tabela.component.css',
  imports: [CommonModule, FormsModule]  // Adicionando FormsModule para suporte ao [(ngModel)]
})
export class TabelaComponent {
  modalAberto = false;

  produtos = [
    { id: 1, nome: 'Produto 1', preco: 19.99, estoque: 50 },
    { id: 2, nome: 'Produto 2', preco: 49.90, estoque: 30 },
    { id: 3, nome: 'Produto 3', preco: 99.50, estoque: 10 }
  ];

  novoProduto = {nome: '', preco: 0, estoque: 0};

  abrirModal() {
    this.modalAberto = true;
  }

  fecharModal() {
    this.modalAberto = false;
  }

  cadastrarProduto(){
    if (this.novoProduto.nome && this.novoProduto.preco > 0 && this.novoProduto.estoque >=0) {
      const novoId = this.produtos.length + 1;
      const produtoCadastrado = { id: novoId, ...this.novoProduto };

      this.produtos.push(produtoCadastrado);
      this.fecharModal();

      // Resetando o formulário
      this.novoProduto = { nome: '', preco: 0, estoque: 0};
    } else {
      alert('Preencha os campos corretamente!');
    }
  }
}
