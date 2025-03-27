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
  imports: [CommonModule, BaseChartDirective], // BaseChartDirective is correct
  templateUrl: './grafico.component.html',
  styleUrls: ['./grafico.component.css'] // Corrected to 'styleUrls' (plural)
})
export class GraficoComponent {
  @ViewChild('graficoCanvas', { static: false }) graficoCanvas!: ElementRef;
  @ViewChild('tabela', { static: false }) tabela!: ElementRef;

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true // Display chart legend
      }
    }
  };

  public barChartLabels: string[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  barChartType: 'bar' = 'bar';

  public barChartData: ChartData<'bar'> = {
    labels: this.barChartLabels,
    datasets: [
      { data: [120, 150, 180, 200, 170, 220, 250], label: 'Recent Sales', backgroundColor: '#4F46E5' } // Chart color
    ]
  };

  constructor() {
    console.log('Chart configuration:', this.barChartData);
  }

  gerarPDF() {
    const doc = new jsPDF();

    // Add title
    doc.setFontSize(16);
    doc.text('Sales Report', 10, 10);

    // Capture and add the chart to the PDF
    html2canvas(this.graficoCanvas.nativeElement).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      doc.addImage(imgData, 'PNG', 10, 20, 180, 120); // Chart position and size in the PDF

      // Capture and add the table to the PDF
      doc.text('Table Data', 10, 150); // Table title
      autoTable(doc, { html: this.tabela.nativeElement, startY: 160 });

      doc.save('sales_report.pdf');
    });
  }

  exportarCSV() {
    let csvContent = "data:text/csv/charset=utf-8";
    csvContent += "Day,Sales\n"; // Header

    this.barChartData.datasets[0].data.forEach((venda, i) => {
      const linha = `${this.barChartLabels[i]},${venda}`;
      csvContent += linha + "\n";
    });

    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "sales_report.csv");
    document.body.appendChild(link);
    link.click()
  }
}
