import { Component, OnInit } from '@angular/core';
import { faPlusCircle, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Medicamento } from 'src/app/models/medicamento';
import { Global } from 'src/app/service/Global';
import { MedicamentoService } from 'src/app/service/medicamento.service';
@Component({
  selector: 'app-medicamento',
  templateUrl: './medicamento.component.html',
  styleUrls: ['./medicamento.component.css'],
  providers:[MedicamentoService]
})
export class MedicamentoComponent implements OnInit {
  
  constructor(private medicamentoService:MedicamentoService){}

  faPlusCircle = faPlusCircle;
  faTrashCan = faTrashCan;
  public count:number=0;
  public medicamentos:Medicamento[]=[];
  public pagNumber:number=0;
  public numeros:number[]=[];
  public currentPage:number=0;
  public HighlightRow:number=-1;
  public pageClasses:string[]=[];
  public pageClassesBase:string[]=[];
  public siguienteClass:string='page-item';
  public anteriorClass:string='page-item disabled';
  ngOnInit(): void {
    this.getMedicamentos(Global.PAGE_INIT);
  }

  getMedicamentos(page:number):void{
    this.medicamentoService.getAllMedicamentos(page)
    .subscribe(res=>{
      if(res.status===Global.OK && res.body.listaMedicamentos.medicamentos.length>0){
        this.medicamentos = res.body.listaMedicamentos.medicamentos;
        this.count = res.body.count.count;
        this.pagNumber = Math.ceil(this.count/Global.PAGE_SIZE);
        this.numeros = Array(this.pagNumber).fill(0).map((x,i)=>i);
        this.pageClasses = Array(this.pagNumber).fill('page-link');
        this.pageClasses[page]='page-link disabled';
      }
    });
  }

  gotoPage(page:number):void{
    this.HighlightRow = -1;
    this.currentPage = page;
    this.anteriorClass = 'page-item';
    this.siguienteClass = 'page-item';
    if(this.currentPage===0){
      this.anteriorClass = 'page-item disabled';
    }else if(this.currentPage===this.numeros.length-1){
      this.siguienteClass = 'page-item disabled';
    }
    this.getMedicamentos(page);
  }

  next():void{
    this.HighlightRow = -1;
    this.gotoPage(this.currentPage+1);
  }

  prev():void{
    this.HighlightRow = -1;
    this.gotoPage(this.currentPage-1);
  }

  selectRow(index:number):void{
    this.HighlightRow = index;
  }

}
