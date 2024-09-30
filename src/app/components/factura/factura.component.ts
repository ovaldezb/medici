import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Concepto } from 'src/app/models/conceptos';
import { Emisor } from 'src/app/models/emisor';
import { FormaPago } from 'src/app/models/formapago';
import { Impuestos } from 'src/app/models/impuestos';
import { ImpuestosConcepto } from 'src/app/models/ImpuestosConcepto';
import { Receptor } from 'src/app/models/receptor';
import { RegimenFiscal } from 'src/app/models/regimenfiscal';
import { Retenciones } from 'src/app/models/retenciones';
import { Timbrado } from 'src/app/models/timbrado';
import { Traslados } from 'src/app/models/traslados';
import { UsoCFDI } from 'src/app/models/usoCfdi';
import { Venta } from 'src/app/models/venta';
import { FacturacionService } from 'src/app/service/facturacion.service';
import { Global } from 'src/app/service/Global';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.css'],
  providers:[FacturacionService]
})
export class FacturaComponent implements OnInit{

  private idTicket       :String='';
  private listaUsoCfdi   :UsoCFDI[]=[];
  private timbrado       :Timbrado={} as Timbrado;
  public idTicketBusqueda:string='';
  public venta           :Venta=new Venta('',[],new Date(),0,0,0,0,'','','',0,0,'','','',false,false,new Date(),'');
  public totalIva        :number=0;
  public listaUsoCfdiFiltrado:UsoCFDI[]=[];
  public listaRegimenFiscal:RegimenFiscal[]=[];
  public listaFormaPago  :FormaPago[]=[];
  public receptor        :Receptor= new Receptor('','','','','','');
  public formaPago       :String='';
  public isLoadingVenta  :Boolean=false;
  public isLoadingRfc    :Boolean=false;
  
  constructor(
    private route:ActivatedRoute,
    private facturaService:FacturacionService){
    this.idTicket = route.snapshot.params['idFactura'] ;
  }

  ngOnInit(): void {
    if(this.idTicket!=''){
      this.buscaVentaById();
    }
    this.obtieneListaUsoCfdi();
    this.obtieneListaFormaPago();
    this.obtieneListaRegimenFiscal();
  }

  buscaVentaById():void{
    this.facturaService.obtieneDatosVenta('idventa','ventaId',this.idTicket)
    .subscribe((res:any)=>{
      if(res.status===Global.OK && res.body.venta != null){
        this.venta = res.body.venta;
        this.formaPago = this.venta.formaPago;
      }else{
        Swal.fire({
          icon:'warning',
          titleText:'No se encontraron datos para el id de venta '+this.idTicket,
          text:this.idTicketBusqueda,
          timer:Global.TIMER_OFF
        });
        this.limpiar();
      }
    },(error:any)=>{
      Swal.fire({
        icon:'warning',
        titleText:'No se encontraron datos para el id de venta '+this.idTicket,
        text:this.idTicketBusqueda,
        timer:Global.TIMER_OFF
      });
      this.venta.isFacturado = true;
    });
  }

  obtieneListaUsoCfdi():void{
    this.facturaService.obtieneListaUsoCfdis()
    .subscribe((res:any)=>{
      if(res.status===Global.OK && res.body.listaUsoCfdi.length > 0){
        this.listaUsoCfdi = res.body.listaUsoCfdi;
      }
    });
  }

  obtieneListaRegimenFiscal():void{
    this.facturaService.obtieneListaRegimenFiscal()
    .subscribe((res:any)=>{
      if(res.status === Global.OK && res.body.listaRegimenFiscal.length>0){
        this.listaRegimenFiscal = res.body.listaRegimenFiscal;
      }
    });
  }

  obtieneListaFormaPago():void{
    this.facturaService.obtieneListaFormaPago()
    .subscribe((res:any)=>{
      if(res.status===Global.OK && res.body.listaFormaPago.length>0){
        this.listaFormaPago = res.body.listaFormaPago;
      }
    })
  }

  buscaUsoCfdi(event:any):void{
    this.listaUsoCfdiFiltrado = this.listaUsoCfdi.filter((cfdi)=>cfdi.regfiscalreceptor.indexOf(this.listaRegimenFiscal[event.target["selectedIndex"]].regimenfiscal)>=0)
  }

  buscaVenta():void{
    this.isLoadingVenta = true;
    this.facturaService.obtieneDatosVenta('idticket','ticketId',this.idTicketBusqueda)
    .subscribe((res:any)=>{
      this.isLoadingVenta = false;
      if(res.status===Global.OK && res.body.venta != null){
        this.venta = res.body.venta;
        this.formaPago = this.venta.formaPago;
      }else{
        Swal.fire({
          icon:'warning',
          titleText:'No se encontraron datos para el ticket de venta',
          text:this.idTicketBusqueda,
          timer:Global.TIMER_OFF
        });
        this.limpiar();
      }
    });
  }

  submit():void{
    Swal.fire({
      icon:'question',
      html: '<table class="table table-bordered">'+
            ' <tr><td colspan="2">Son correctos los datos?</td></tr>'+
            ' <tr><td class=\'text-end\' style="font-size:10px">Razón Social:</td><td style="font-size:12px">'+this.receptor.Nombre+'</td></tr>'+
            ' <tr><td class=\'text-end\' style="font-size:10px">RFC:</td><td style="font-size:12px">'+this.receptor.Rfc+'</td></tr>'+
            ' <tr><td class=\'text-end\' style="font-size:10px">Domicilio Fiscal:</td><td style="font-size:12px">'+this.receptor.DomicilioFiscalReceptor+'</td></tr>'+
            ' <tr><td class=\'text-end\' style="font-size:10px">Correo Electrónico:</td><td style="font-size:12px">'+this.receptor.email+'</td></tr>'+
            ' <tr><td class=\'text-end\' style="font-size:10px">Régimen Fiscal:</td><td style="font-size:12px">'+this.listaRegimenFiscal.find(({regimenfiscal}) => regimenfiscal===this.receptor.RegimenFiscalReceptor)?.descripcion +'</td></tr>'+
            ' <tr><td class=\'text-end\' style="font-size:10px">Uso CFDI:</td><td style="font-size:12px">'+this.listaUsoCfdi.find(({usoCfdi}) => usoCfdi===this.receptor.UsoCFDI)?.descripcion +'</td></tr>'+
            '</table>',
      showCancelButton:true,
      confirmButtonText:'Si'
    })
    .then(resultado=>{
      if(resultado.isConfirmed){
        if(this.receptor._id==='' || this.receptor._id === undefined){
          this.facturaService.guardarDatosFactura(this.receptor)
          .subscribe((res:any)=>{
            //console.log(res);
          });
        }
        
        this.facturaService.emisionFactura(this.llenaFactura(),this.venta._id)
        .subscribe((res:any)=>{
          console.log(res);
          if(res.status===Global.OK){
            Swal.fire({
              title:'La Factura se ha generado exitosamente',
              timer:Global.TIMER_OFF
            });
            this.limpiar();
          }
        });
      }
    })
  }

  buscaDatosFactura(event:any):void{
    if(event.keyCode===Global.ENTER){
      this.isLoadingRfc=true;
      this.facturaService.obtieneDatosFacturaByRFC(this.receptor.Rfc)
      .subscribe((res:any)=>{
        this.isLoadingRfc = false;
        if(res.status===Global.OK && res.body.datosFactura!=null){
          this.receptor = res.body.datosFactura
        }else{
          Swal.fire({
            titleText:'No se encontró información para el RFC',
            text:this.receptor.Rfc,
            timer:Global.TIMER_OFF
          });
          this.receptor = new Receptor('','','','','');
        }
        
      });
    }
  }

  limpiar():void{
    this.receptor = new Receptor('','','','','');
    this.venta = new Venta('',[],new Date(),0,0,0,0,'','','',0,0,'','','',false,false,new Date(),'');
    this.idTicketBusqueda = '';
    this.formaPago = '';
  }

  llenaFactura():Timbrado{
    this.timbrado = {} as Timbrado;
    this.timbrado.Conceptos = [];
    let subTotal:number = 0;
    let total:number = 0;
    let totalImpuestos:number=0.0;
    let impuestoTrasladoBase:number=0.0;
    let impuestoTrasladoImporte:number=0.0;
    let impuestos:Impuestos= {} as Impuestos;
    impuestos.Traslados = [];
    impuestos.Retenciones = [];
    this.venta.ventaProducto.forEach(prod=>{
      let impuestosConcepto:ImpuestosConcepto = {} as ImpuestosConcepto;
      impuestosConcepto.Traslados = [];
      impuestosConcepto.Retenciones = [];
      let subTotalProd:number = prod.producto.precioVenta/Global.Factura.FACTOR_DIV;
      totalImpuestos += Number((subTotalProd * Global.Factura.IVA * prod.cantidad).toFixed(Global.DECIMAL_FIXED));
      subTotal += Number((subTotalProd * prod.cantidad).toFixed(Global.DECIMAL_FIXED));
      total += (prod.producto.precioVenta * prod.cantidad);
      let ValorUnitario:number = subTotalProd;
      let base:number =  Number((subTotalProd*prod.cantidad).toFixed(Global.DECIMAL_FIXED));
      let importeConceptoImpuestoTraslado = Number((subTotalProd*Global.Factura.IVA*prod.cantidad).toFixed(2));
      let traslados = new Traslados(
        base.toFixed(2),
        importeConceptoImpuestoTraslado.toFixed(Global.DECIMAL_FIXED),
        Global.Factura.ImpuestoIVA,
        Global.Factura.TasaOCuotaIVA,
        Global.Factura.Tasa);
      impuestosConcepto.Traslados.push(traslados);
      let retenciones = new Retenciones(
        base.toFixed(Global.DECIMAL_FIXED),
        '0.00',
        Global.Factura.ImpuestoISR,
        Global.Factura.TasaOCuotaISR,
        Global.Factura.Tasa);
      impuestosConcepto.Retenciones.push(retenciones);
      let concepto = new Concepto(
        '51142001',
        'X001',
        prod.cantidad.toFixed(1),
        'H87',
        'Pieza',
        prod.producto.descripcion, //Ojo con este porque puede estar incorrecto
        ValorUnitario.toFixed(Global.DECIMAL_FIXED),
        base.toFixed(Global.DECIMAL_FIXED),
        '0.00',
        Global.Factura.ObjectoImpuesto,
        impuestosConcepto
      );
      this.timbrado.Conceptos.push(concepto);
      impuestoTrasladoBase += base;
      impuestoTrasladoImporte += importeConceptoImpuestoTraslado;
    });
    
    let trasladoImpuesto = new Traslados(
      impuestoTrasladoBase.toFixed(Global.DECIMAL_FIXED),
      impuestoTrasladoImporte.toFixed(Global.DECIMAL_FIXED),
      Global.Factura.ImpuestoIVA,
      Global.Factura.TasaOCuotaIVA,
      Global.Factura.Tasa
    )
    let retencionImpuesto = new Retenciones(
        impuestoTrasladoBase.toFixed(Global.DECIMAL_FIXED),
        '0.00',
        Global.Factura.ImpuestoISR,
        Global.Factura.TasaOCuotaISR,
        Global.Factura.Tasa
      );
    impuestos.TotalImpuestosTrasladados = totalImpuestos.toFixed(2);
    impuestos.TotalImpuestosRetenidos = '0.00';
    impuestos.Traslados.push(trasladoImpuesto);
    impuestos.Retenciones.push(retencionImpuesto);
    
    this.timbrado.Version=Global.Factura.Version;
    this.timbrado.FormaPago=this.venta.formaPago;
    this.timbrado.Serie='SW';
    this.timbrado.Folio=this.venta.noTicket;
    this.timbrado.Fecha=this.getFechaFactura();
    this.timbrado.MetodoPago=Global.Factura.MetodoPago;
    this.timbrado.Sello='';
    this.timbrado.NoCertificado='';
    this.timbrado.Certificado='';
    this.timbrado.CondicionesDePago=Global.Factura.CondicionesPago;
    this.timbrado.SubTotal=subTotal.toFixed(Global.DECIMAL_FIXED);
    this.timbrado.Descuento='0.00';
    this.timbrado.Moneda=Global.Factura.Moneda;
    this.timbrado.TipoCambio=Global.Factura.TipoCambio;
    this.timbrado.Total=total.toFixed(Global.DECIMAL_FIXED);
    this.timbrado.TipoDeComprobante=Global.Factura.TipoComprobante;
    this.timbrado.Exportacion=Global.Factura.Exportacion;
    this.timbrado.LugarExpedicion='45610';
    this.timbrado.Emisor = new Emisor('XOCHILT CASAS CHAVEZ','CACX7605101P8','605');
    this.timbrado.Receptor = new Receptor(this.receptor.Rfc,this.receptor.Nombre,this.receptor.DomicilioFiscalReceptor,this.receptor.RegimenFiscalReceptor,this.receptor.UsoCFDI);
    this.timbrado.Impuestos = impuestos;
    return this.timbrado;
  }

  getFechaFactura():String{
    let hoy = new Date();
    let dia = hoy.getDate() < 10 ? '0'+hoy.getDate() : hoy.getDate();
    let mes = (hoy.getMonth() + 1) < 10 ? '0'+(hoy.getMonth() + 1) : (hoy.getMonth() + 1);
    let year = hoy.getFullYear();
    let hora = hoy.getHours() < 10 ? '0'+hoy.getHours() :hoy.getHours();
    let minuto = hoy.getMinutes() < 10 ? '0'+hoy.getMinutes() : hoy.getMinutes();
    let segundos = hoy.getSeconds() < 10 ? '0'+hoy.getSeconds() : hoy.getSeconds();
    return year+'-'+mes+'-'+dia+'T'+hora+':'+minuto+':'+segundos;
  }

}
