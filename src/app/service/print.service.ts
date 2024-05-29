import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Cita } from '../models/citas';

@Injectable({
  providedIn: 'root'
})
export class PrintService {
  public isPrinting:boolean = false;
  //public cita:Cita={} as Cita;

  constructor(private router: Router) { }

  printDocument(documentName: string, documentData: Cita){
    this.isPrinting = true;
    this.router.navigate(['/',{outlets:{'print':['print', documentName, documentData]}}]);
  }

  onDataReady(){
    setTimeout(()=>{
      window.print();
      this.isPrinting = false;
      this.router.navigate([{outlets:{print:null}}]);
    });
  }

}
