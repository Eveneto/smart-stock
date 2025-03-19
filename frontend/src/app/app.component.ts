import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TabelaComponent } from './components/tabela/tabela.component';
import { GraficoComponent } from './components/grafico/grafico.component'; // Importe o componente
import { ToastComponent } from './components/toast/toast.component'; // Importe o Toast
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterOutlet, TabelaComponent, GraficoComponent, ToastComponent]// Adicione GraficoComponent aqui
})
export class AppComponent {
  title = 'frontend';

  @ViewChild(ToastComponent) toast!: ToastComponent;

  mostrarToast() {
    this.toast.exibirMensagem('Produto cadastrado com sucesso!');
  }

}
