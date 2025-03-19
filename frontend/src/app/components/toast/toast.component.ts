import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css'
})
export class ToastComponent {
  mostrar = false;
  mensagem = '';

  exibirMensagem(mensagem: string){
    this.mensagem = mensagem;
    this.mostrar = true;

    setTimeout(() => {
      this.mostrar = false;
    }, 3000);
  }
}
