import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastComponent } from '../toast/toast.component'; // Import Toast

@Component({
  selector: 'app-tabela',
  standalone: true,
  templateUrl: './tabela.component.html',
  styleUrl: './tabela.component.css',
  imports: [CommonModule, FormsModule, ToastComponent] // Add ToastComponent here
})
export class TabelaComponent {
  @ViewChild(ToastComponent) toast!: ToastComponent; // Reference to Toast

  modalAberto = false;

  produtos = [
    { id: 1, nome: 'Product 1', preco: 19.99, estoque: 50 },
    { id: 2, nome: 'Product 2', preco: 49.90, estoque: 30 },
    { id: 3, nome: 'Product 3', preco: 99.50, estoque: 10 }
  ];

  novoProduto = { nome: '', preco: 0, estoque: 0 };

  abrirModal() {
    this.modalAberto = true;
  }

  fecharModal() {
    this.modalAberto = false;
  }

  cadastrarProduto() {
    if (this.novoProduto.nome && this.novoProduto.preco > 0 && this.novoProduto.estoque >= 0) {
      const novoId = this.produtos.length + 1;
      const produtoCadastrado = { id: novoId, ...this.novoProduto };

      this.produtos.push(produtoCadastrado);
      this.fecharModal();

      // Show Toast
      this.toast.exibirMensagem('Product successfully registered!', 'success');

      // Reset form
      this.novoProduto = { nome: '', preco: 0, estoque: 0 };
    } else {
      this.toast.exibirMensagem('Please fill in all fields correctly!', 'error');
    }
  }
}
