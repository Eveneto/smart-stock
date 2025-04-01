import { Component, ViewChild } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router'; // Adicionado RouterModule
import { TabelaComponent } from './components/tabela/tabela.component';
import { GraficoComponent } from './components/grafico/grafico.component';
import { ToastComponent } from './components/toast/toast.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterModule, RouterOutlet, TabelaComponent, GraficoComponent, ToastComponent] // Adicionado RouterModule
})
export class AppComponent {
  title = 'frontend';

  @ViewChild(ToastComponent) toast!: ToastComponent;

  constructor(private translate: TranslateService) {
    console.log('🌍 Inicializando o sistema de tradução...');

    this.translate.setDefaultLang('pt'); // Define português como idioma padrão
    const lang = localStorage.getItem('language') || 'pt';

    console.log(`📌 Idioma salvo no localStorage: ${lang}`);
    this.loadLanguage(lang);
  }

  mudarIdioma(lang: string) {
    console.log(`🔄 Alterando idioma para: ${lang}`);
    this.loadLanguage(lang);
    localStorage.setItem('language', lang);
  }

  private loadLanguage(lang: string) {
    const translationFileUrl = `/assets/i18n/${lang}.json`;
    console.log(`📂 Tentando carregar: ${translationFileUrl}`);

    this.translate.use(lang).subscribe(() => {
      console.log(`✅ Idioma alterado com sucesso para: ${this.translate.currentLang}`);
    }, err => {
      console.error(`❌ Erro ao carregar o arquivo: ${translationFileUrl}`, err);
    });
  }

  mostrarToast() {
    this.toast.exibirMensagem('Produto cadastrado com sucesso!');
  }
}
