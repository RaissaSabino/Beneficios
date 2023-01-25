import { Component, OnInit, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import  axios  from 'axios';
import { Events } from '../Events';
import { Graph } from '../Graph';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  eventos: Array<Events> = []
  grafico: Array<Graph> = []
  datas: Array<Date> = []
  quantidadesEntregues: Array<number> = []
  arrIdEventB: Array<number> = []
  arrIdProd: Array<number> = []
  stockRestantes: Array<number> = []
  stockTotais: Array<number> = []
  qtd: number;
  qtdFinal: number;
  nomesProd: Array<string> = []

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 0
      }
    },
    plugins: {
      legend: {
        display: true,
      },
      datalabels: {
        anchor: 'end',
        align: 'end'
      }
    }
  };
  public barChartType: ChartType = 'bar';
  public barChartPlugins = [
    DataLabelsPlugin
  ];

  public barChartData: ChartData<'bar'> = {
    labels: [ '2006', '2007', '2008', '2009', '2010', '2011', '2012' ],
    datasets: [
      { data: [ 65, 59, 80, 81, 56, 55, 40 ], label: 'Series A' },
      { data: [ 28, 48, 40, 19, 86, 27, 90 ], label: 'Series B' }
    ]
  };

  // events
  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public randomize(): void {
    // Only Change 3 values
    this.barChartData.datasets[0].data = [
      Math.round(Math.random() * 100),
      59,
      80,
      Math.round(Math.random() * 100),
      56,
      Math.round(Math.random() * 100),
      40 ];

    this.chart?.update();
  }

  constructor() { }

  ngOnInit(): void {

    var config = {
      method: 'get',
      url: 'http://localhost:5265/events/getAll',
      headers: {},
      data: '',
    };

    var instance = this;
    axios(config)
      .then(function (response) {
        instance.eventos = response.data;
        console.log(instance.eventos);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  pegaDados(){
    let select = document.getElementById("evento") as HTMLSelectElement;
    let option = select.options[select.selectedIndex];

    var config = {
      method: 'get',
      url: 'http://localhost:5265/eventsBeneficiaryProduct/graficoGeral/' + option.value,
      headers: {},
      data: '',
    };

    var instance = this;
    axios(config)
      .then(function (response) {
        instance.grafico = response.data;
        instance.stockTotais = [];
        instance.stockRestantes = [];
        instance.arrIdEventB = [];
        instance.arrIdProd = [];
        instance.nomesProd = [];
        for(var i = 0; i < instance.grafico.length; i++){
          
          instance.stockTotais.push(instance.grafico[i].stockTotal)
          instance.stockRestantes.push(instance.grafico[i].stockRestante)
          instance.arrIdEventB.push(instance.grafico[i].id)
          instance.arrIdProd.push(instance.grafico[i].produto.id)
          // instance.quantidadesEntregues.push(instance.grafico[i].deliveredQuantity);
          instance.nomesProd.push(instance.grafico[i].produto.name)

        }

        for(var i = 0; i < instance.grafico.length; i++){
          var prodAntigo;

          var indiceProd = instance.arrIdProd.indexOf(instance.grafico[i].produto.id)
          var indiceEventB = instance.arrIdEventB.indexOf(instance.grafico[i].id)

          console.log(instance.quantidadesEntregues);

          if(indiceEventB != indiceProd){
            instance.qtd = instance.quantidadesEntregues[indiceEventB]
            instance.qtdFinal = instance.quantidadesEntregues[indiceProd]

            instance.quantidadesEntregues.splice(indiceProd, 1, instance.qtdFinal + instance.qtd)
            instance.stockRestantes.splice(indiceEventB, 1, 0);
          }

          console.log(instance.quantidadesEntregues);


          if(prodAntigo == instance.grafico[i].produto.id){

          }
        }

        for(var i = 0; i < instance.grafico.length; i++){
          if(instance.stockRestantes[i] == 0){
            instance.stockRestantes.splice(i,1);
            instance.stockTotais.splice(i,1);
            instance.nomesProd.splice(i,1);
            i = i-1;
          }
        }

        console.log(instance.nomesProd);
        console.log(instance.stockTotais);
        console.log(instance.stockRestantes);

        // console.log(instance.quantidadesEntregues);
        // instance.quantidadesEntregues.push(1);
        instance.barChartData = {
          labels: instance.nomesProd ,
          datasets: [
            {data: instance.stockTotais, label: "Stock Total" },
            {data : instance.stockRestantes, label: "Stock Restante"},
          ]
        };
        console.log(instance.grafico);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

}


