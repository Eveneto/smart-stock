import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData } from 'chart.js';
import 'chart.js/auto';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-grafico',
  standalone: true,
  imports: [CommonModule, BaseChartDirective], // BaseChartDirective está correto
  templateUrl: './grafico.component.html',
  styleUrls: ['./grafico.component.css'] // Corrigido para 'styleUrls' (plural)
})
export class GraficoComponent {
  @ViewChild('graficoCanvas', { static: false }) graficoCanvas!: ElementRef;
  @ViewChild('tabela', { static: false }) tabela!: ElementRef;

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true // Exibir legenda do gráfico
      }
    }
  };

  public barChartLabels: string[] = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
  barChartType: 'bar' = 'bar';

  public barChartData: ChartData<'bar'> = {
    labels: this.barChartLabels,
    datasets: [
      { data: [120, 150, 180, 200, 170, 220, 250], label: 'Vendas Recentes', backgroundColor: '#4F46E5' } // Cor do gráfico
    ]
  };

  constructor() {
    console.log('Configuração do gráfico:', this.barChartData);
  }

  gerarPDF() {
    const doc = new jsPDF();

    // Adiciona título
    doc.setFontSize(16);
    doc.text('Relatório de Vendas', 10, 10);

    // Captura e adiciona o gráfico ao PDF
    html2canvas(this.graficoCanvas.nativeElement).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      doc.addImage(imgData, 'PNG', 10, 20, 180, 120); // Posição e tamanho do gráfico no PDF

      // Captura e adiciona a tabela ao PDF
      doc.text('Dados da Tabela', 10, 150); // Título da tabela
      autoTable(doc, { html: this.tabela.nativeElement, startY: 160 });

      doc.save('relatorio_vendas.pdf');
    });
  }

  exportarCSV() {
    let csvContent = "data:text/csv/charset=utf-8";
    csvContent += "Dia,Vendas\n"; // Cabeçalho

    this.barChartData.datasets[0].data.forEach((venda, i) => {
      const linha = `${this.barChartLabels[i]},${venda}`;
      csvContent += linha +"\n";
    });

    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "relatorio_vendas.csv");
    document.body.appendChild(link);
    link.click()
  }
}
