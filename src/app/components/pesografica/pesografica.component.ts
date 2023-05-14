import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { Chart , registerables} from 'chart.js';
@Component({
  selector: 'app-pesografica',
  templateUrl: './pesografica.component.html',
  styleUrls: ['./pesografica.component.css']
})
export class PesograficaComponent implements AfterViewInit{
  public canvas:any;
  public ctx:any;
  public pieChart:any;

  @ViewChild('pieCanvas') pieCanvas!: { nativeElement: any };
  
  ngAfterViewInit(): void {
    this.pieChartBrowser();
  }

  pieChartBrowser(): void {
    Chart.register(...registerables);
    this.canvas = this.pieCanvas.nativeElement;
    this.ctx = this.canvas.getContext('2d');
    this.pieChart = new Chart(this.ctx, {
      type: 'line', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: ['2022-05-10', '2022-05-11', '2022-05-12','2022-05-13',
								 '2022-05-14', '2022-05-15', '2022-05-16','2022-05-17', ], 
	       datasets: [
          {
            label: "Sales",
            data: ['467','576', '572', '79', '92',
								 '574', '573', '576'],
            backgroundColor: 'blue'
          },
          {
            label: "Profit",
            data: ['542', '542', '536', '327', '17',
									 '0.00', '538', '541'],
            backgroundColor: 'limegreen'
          }  
        ]
      },
      options: {
        aspectRatio:2.5
      }
      
    });
  }
    /*this.pieChart = new Chart(this.ctx, {
      type: 'pie',
      data: {
        labels: ['Apple', 'Google', 'Facebook', 'Infosys', 'Hp', 'Accenture'],
        datasets: [
          {
            backgroundColor: [
              '#2ecc71',
              '#3498db',
              '#95a5a6',
              '#9b59b6',
              '#f1c40f',
              '#e74c3c',
            ],
            data: [12, 19, 3, 17, 28, 24],
          },
        ],
      },
    });
  }*/
  /*createChart():void{
    Chart.register(...registerables);
    
    const data = {// values on X-Axis
      labels: ['2022-05-10', '2022-05-11', '2022-05-12','2022-05-13','2022-05-14', '2022-05-15', '2022-05-16','2022-05-17' ], 
       datasets: [
        {
          label: "Sales",
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data: [467,576, 572, 79, 92, 574, 573, 576],
        }  
      ]
    };
    const data = {
      labels: ['January','February','March','April','May'],
      datasets: [
      {
        label: 'My First dataset',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: [10, 5, 2, 20, 30, 45],
      }]
    };
    const options = {
      scales: {
        y: {
          beginAtZero: true,
          display: false
        }
      }
    };

    const config : ChartConfiguration={
      type:'line',
      data: data,
      options: options
    };
    const chartItem : ChartItem = document.getElementById('MyChart') as ChartItem;
    new Chart(chartItem,config);
  }*/

}
