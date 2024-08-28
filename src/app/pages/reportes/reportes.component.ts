import { Component, OnInit } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { ReportesService } from 'src/app/services/reportes/reportes.service';
@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {
  provinciasChartData: ChartData<'pie'> = {
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: []
    }]
  };

  categoriasChartData: ChartData<'pie'> = {
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: []
    }]
  };

  noVentasReporteChartData: ChartData<'pie'> = {
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: []
    }]
  };


  UsuarioReporteChartData: ChartData<'pie'> = {
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: []
    }]
  };

  chartOptions: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },tooltip: {
        callbacks: {
          label: function(tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw}`;
          }
        }

      }
    }
  };


  constructor(private reportesService: ReportesService) { }

  ngOnInit(): void {
    this.loadCategorias();
    this.loadProvincias();
    this.loadTercerReporte();
    this.loadCuartoReporte();
  }


  loadCategorias(): void {
    this.reportesService.getCategorias().subscribe(data => {
      this.categoriasChartData = {
        labels: data.map(item => item.categoria_nombre),
        datasets: [{
          data: data.map(item => item.total_ventas),
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        }]
      };
    });
  }

  loadProvincias(): void {
    this.reportesService.getProvincias().subscribe(data => {
      this.provinciasChartData = {
        labels: data.map(item => item.provincia),
        datasets: [{
          data: data.map(item => item.total_ventas),
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        }]
      };
    });
  };

  loadTercerReporte(): void {
    this.reportesService.getMenosVendido().subscribe(data => {
      this.noVentasReporteChartData = {
        labels: data.map(item => item.categoria_nombre),
        datasets: [{
          data: data.map(item => item.total_no_vendidos),
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        }]
      };
    });
  }

  loadCuartoReporte(): void {
    this.reportesService.getClienteCompra().subscribe(data => {
      this.UsuarioReporteChartData = {
        labels: data.map(item => item.nombre),
        datasets: [{
          data: data.map(item => item.total_compras),
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        }]
      };
    });
  }

  updateCategorias(): void {
    this.loadCategorias();
  }

  updateProvincias(): void {
    this.loadProvincias();
  }

  updateTercerReporte(): void {
    this.loadTercerReporte();
  }

  updateCuartoReporte(): void{
    this.loadCuartoReporte();
  }
}
