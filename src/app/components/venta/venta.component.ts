import { Component, OnInit, Renderer2 } from '@angular/core';
import { faBasketShopping, 
          faBarcode, 
          faMagnifyingGlass,
          faTrashCan,
          faMagnifyingGlassDollar,
          faCashRegister,
          faMoneyBill,
          faCreditCard,
          faMoneyBillTransfer,
          faMoneyCheckDollar,
          faFileCirclePlus,
          faFileCircleMinus,
          faCircleCheck,
          faPrescriptionBottle,
          faBan,
          faEye } from '@fortawesome/free-solid-svg-icons';
import { min } from 'moment';
import { Concepto } from 'src/app/models/conceptos';
import { Emisor } from 'src/app/models/emisor';
import { EntradaEfectivo } from 'src/app/models/entradaEfectivo';
import { Impuestos } from 'src/app/models/impuestos';
import { ImpuestosConcepto } from 'src/app/models/ImpuestosConcepto';
import { Producto } from 'src/app/models/producto';
import { Receptor } from 'src/app/models/receptor';
import { Retenciones } from 'src/app/models/retenciones';
import { SalidaEfectivo } from 'src/app/models/salidaEfectivo';
import { Timbrado } from 'src/app/models/timbrado';
import { Traslados } from 'src/app/models/traslados';
import { Venta } from 'src/app/models/venta';
import { VentaProducto } from 'src/app/models/ventaproducto';
import { CognitoService } from 'src/app/service/cognito.service';
import { FacturacionService } from 'src/app/service/facturacion.service';
import { Global } from 'src/app/service/Global';
import { ProductoService } from 'src/app/service/producto.service';
import { SucursalService } from 'src/app/service/sucursal.service';
import { VentasService } from 'src/app/service/ventas.service';
import Swal from 'sweetalert2';

export interface Banco {
  value: string,
  viewValue: string
}

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css'],
  providers:[ProductoService,VentasService, CognitoService,SucursalService,FacturacionService]
})

export class VentaComponent implements OnInit{

  constructor(
      private productoService:ProductoService, 
      private renderer:Renderer2,
      private ventasService:VentasService,
      private sucursalService:SucursalService,
      private cognitoService:CognitoService,
      private facturaService:FacturacionService){}

  ngOnInit(): void {
    this.getTicket();
    this.formaPago(Global.EFECTIVO);
    this.renderer.selectRootElement('#codigobarras').focus();
    this.cognitoService.getUser().then(user=>{
      this.cajero = user.attributes.given_name+' '+user.attributes.middle_name+' '+user.attributes.family_name;
      this.idSucursal = user.attributes['custom:sucursal'];
      this.sucursalService.getSucursalById(this.idSucursal)
      .subscribe(res=>{
        if(res.status===Global.OK){
          this.sucursal = res.body.sucursal.identificador;
        }
      });
    })
  }

  timbrado:Timbrado={} as Timbrado;
  idSucursal:string='';
  sucursal:string='';
  cajero:string='';
  entrada:number=0;
  salida:number=0;
  comentarioEntrada:string='';
  comentarioSalida:string='';
  numeroTicket:string='';
  salidaEfectivo:SalidaEfectivo=new SalidaEfectivo('',0,'','', new Date);
  entradaEfectivo:EntradaEfectivo=new EntradaEfectivo('',0,'','', new Date);
  venta:Venta=new Venta('',[],new Date(),0,0,0,0,'','','',0,0,'','','',false);
  faEye = faEye;
  faBasketShopping = faBasketShopping;
  faMoneyBillTransfer = faMoneyBillTransfer;
  faMoneyCheckDollar = faMoneyCheckDollar;
  faMoneyBill = faMoneyBill;
  faBarcode = faBarcode;
  faCreditCard = faCreditCard;
  faMagnifyingGlass = faMagnifyingGlass;
  faTrashCan = faTrashCan;
  faCashRegister = faCashRegister;
  faFileCirclePlus = faFileCirclePlus;
  faFileCircleMinus = faFileCircleMinus;
  faMagnifyingGlassDollar = faMagnifyingGlassDollar;
  faPrescriptionBottle = faPrescriptionBottle;
  faCircleCheck = faCircleCheck;
  faBan = faBan;
  total:number = 0;
  codigobarras:string='';
  HighLightRow:number=-1;
  HighLightRowBusqueda:number = -1;
  isModalBusquedaOpen:boolean=false;
  isModalCobrarOpen:boolean=false;
  isModalEntradaOpen:boolean=false;
  isModalSalidaOpen:boolean=false;
  desc:string='';
  productosEncontrados:Producto[]=[];
  isSpinnerBuscaProdudctoOpen:boolean = false;
  isSpinnerAgregaProductoOpen:boolean=false;
  isSpinnerCobrandoOpen:boolean = false;
  isSpinnerEntradaOpen:boolean=false;
  isFPEfectivo:boolean=false;
  isFPTarjeta:boolean=false;
  isFPTransferencia:boolean=false;
  isFPCheque:boolean=false;
  efectivo:number=0;
  cambio:number=0;
  noAprobacion:string='';
  noTransferencia:string='';
  banco:string='';
  formPagoId:string='';
  isVerEntradasOpen:boolean=false;
  isVerSalidasOpen:boolean=false;
  listaSalidas:SalidaEfectivo[]=[];
  listaEntradas:EntradaEfectivo[]=[];
  isRequiereFactura:Boolean=false;
  bancos:Banco[]=[
    {value:'Banamex',viewValue:'BANAMEX'},
    {value:'Santander',viewValue:'Banco Santander'},
    {value:'BBVA',viewValue:'BBVA'},
    {value:'Banorte',viewValue:'Banorte'}];

  agregaProducto():void{
    if(this.existeProducto()){
      Swal.fire({
        titleText:'El producto ya está en la nota',
        timer:Global.TIMER_OFF
      });
      this.codigobarras = '';
      return;
    }
    this.isSpinnerAgregaProductoOpen = true;
    this.productoService.findProductoByCodigoBarras(this.codigobarras)
    .subscribe(res=>{
      this.isSpinnerAgregaProductoOpen = false;
      if(res.status===Global.OK && res.body.producto != null){
        const producto = res.body.producto;
        if(producto.existencia === Global.EMPTY){
          Swal.fire({
            titleText:'Actualmente este producto no cuenta con existencias',
            text:'No se puede agregar a la nota',
            icon:'warning'
          });
          return;
        }
        const ventaPro = new VentaProducto(1, producto);
        this.venta.ventaProducto.push(ventaPro);
        this.calculaTotal();
        this.onFocus();
      }else{
        Swal.fire({
          titleText:'No se encontró el producto '+this.codigobarras,
          timer:Global.TIMER_OFF
        });
      }
      this.codigobarras = '';
    })
  }

  existeProducto():boolean{
    const duplicados = this.venta.ventaProducto.filter(prod =>{
     return  Number(prod.producto.codigoBarras) == Number(this.codigobarras)
    });
    return duplicados.length > 0;
  }

  onFocus():void{
    setTimeout(()=>{
      this.renderer.selectRootElement('#cantidad'+(this.venta.ventaProducto.length-1)).focus();
      this.HighLightRow = this.venta.ventaProducto.length-1;
    },100);
  }

  calculaTotal():void{
    if(this.venta.ventaProducto.length===0) return;
    if(this.HighLightRow > -1 && this.venta.ventaProducto[this.HighLightRow].cantidad > this.venta.ventaProducto[this.HighLightRow].producto.existencia ){
      Swal.fire({
        titleText:'No hay suficiente existencia',
        text:'para agregar '+this.venta.ventaProducto[this.HighLightRow].cantidad + ' piezas del producto: '+this.venta.ventaProducto[this.HighLightRow].producto.descripcion,
        icon:'error'
      });
      this.venta.ventaProducto[this.HighLightRow].cantidad = this.venta.ventaProducto[this.HighLightRow].producto.existencia;
    }
    this.total = this.venta.ventaProducto.reduce((acc, prod)=>{
      return acc + (prod.cantidad * prod.producto.precioVenta)
    },0)
  }

  borraProducto():void{
    this.venta.ventaProducto.splice(this.HighLightRow,1);
    this.HighLightRow = -1;
    this.calculaTotal();
  }

  selectRow(index:number):void{
    this.HighLightRow = index;
    this.renderer.selectRootElement('#cantidad'+index).focus();
  }

  selectRowEncontrado(index:number):void{
    this.HighLightRowBusqueda = index;
  }

  agregarProductoEncontrado():void{
    const producto = this.productosEncontrados[this.HighLightRowBusqueda];
    if(producto.existencia===0){
      Swal.fire({
        text:'No hay existencias de este producto, no se puede agregar',
        timer:Global.TIMER_OFF,
        icon:'warning'
      });
      this.HighLightRowBusqueda = -1;
      return;
    }
    this.productosEncontrados = [];
    this.closeModal('busqueda');
    const ventaPro = new VentaProducto(1, producto);
    this.venta.ventaProducto.push(ventaPro);
    this.calculaTotal();
    this.onFocus();
  }

  agregaProductoEnter(event:any):void{
    if(event.keyCode === Global.ENTER){
      this.agregaProducto();
    }
  }

  buscaProdKeyUp(event:any):void{
    if(event.keyCode===Global.ENTER && this.desc.length >=3){
      this.buscaProdDesc();
    }
  }

  buscaProdDesc():void{
    this.isSpinnerBuscaProdudctoOpen = true;
    this.productoService.findProductoByDesc(this.desc)
    .subscribe(res=>{
      this.isSpinnerBuscaProdudctoOpen = false;
      if(res.status === Global.OK && res.body.productos.length>0){
        this.productosEncontrados = res.body.productos;
      }else{
        Swal.fire({
          titleText:'No se encontró el producto con la descripción '+this.desc,
          timer: Global.TIMER_OFF
        });
        this.desc = '';
        this.productosEncontrados = [];
      }
    });
  }

  addEntradaEfectivo():void{
    this.entradaEfectivo = new EntradaEfectivo('',this.entrada,this.comentarioEntrada,this.sucursal,new Date());
    this.ventasService.agregaEntradaSalidaEfectivo(this.entradaEfectivo,'entrada')
    .subscribe(res=>{
      if(res.status === Global.OK){
        Swal.fire({
          titleText:'Se agrego entrada de efectivo',
          icon:'success',
          timer:Global.TIMER_OFF
        });
      }
    })
  }

  addSalidaEfectivo():void{
    this.salidaEfectivo = new SalidaEfectivo('',this.salida,this.comentarioSalida,this.sucursal, new Date());
    this.ventasService.agregaEntradaSalidaEfectivo(this.salidaEfectivo,'salida')
    .subscribe(res=>{
      if(res.status === Global.OK){
        Swal.fire({
          titleText:'Se agrego salida de efectivo',
          icon:'success',
          timer:Global.TIMER_OFF
        });
      }
    });
  }

  formaPago(formaPago:string):void{
    this.formPagoId=formaPago;
    switch(formaPago){
      case 'efectivo':
        this.isFPEfectivo = true;
        this.isFPTarjeta = false;
        this.isFPTransferencia = false;
        this.isFPCheque = false;
        break;
      case 'tarjeta':
        this.isFPEfectivo = false;
        this.isFPTarjeta = true;
        this.isFPTransferencia = false;
        this.isFPCheque = false;
        break;
      case 'transferencia':
        this.isFPEfectivo = false;
        this.isFPTarjeta = false;
        this.isFPTransferencia = true;
        this.isFPCheque = false;
        break;
      default:
        return;
    }
  }

  calculaCambio():void{
    this.cambio = (this.efectivo - this.total) < 0 ? 0 : (this.efectivo - this.total) ;
  }

  
  cobrar():void{
    this.isSpinnerCobrandoOpen = true;
    this.venta.noTicket = this.numeroTicket;
    this.venta.cajero = this.cajero;
    this.venta.fechaVenta = new Date();
    this.venta.total = this.total;
    this.venta.formaPago = this.formPagoId;
    this.venta.efectivo = this.efectivo;
    this.venta.cambio = this.cambio;
    this.venta.banco = this.banco;
    this.venta.noAprobacion = this.noAprobacion;
    this.venta.noTransferencia = this.noTransferencia;
    this.ventasService.agregaVenta(this.venta,'add')
    .subscribe(res=>{
      this.isSpinnerCobrandoOpen = false;
      if(res.status===Global.OK){
        Swal.fire({
          titleText:'Se registro el cobro',
          icon:'success',
          timer:Global.TIMER_OFF
        });
        this.facturaService.emisionFactura(this.llenaFactura())
        .subscribe((res:any)=>{
          console.log(res);
        });
        this.limpiar();
      }
    });
    
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
      let subTotalProd:number = prod.producto.precioVenta/1.16;
      totalImpuestos += (subTotalProd * 0.16 * prod.cantidad);
      subTotal += (subTotalProd * prod.cantidad);
      total += (prod.producto.precioVenta * prod.cantidad);
      let ValorUnitario:number = subTotalProd;
      let base:number =  subTotalProd*prod.cantidad;
      let importeConceptoImpuestoTraslado = (subTotalProd*0.16*prod.cantidad);
      let traslados = new Traslados(
        base.toFixed(2),
        importeConceptoImpuestoTraslado.toFixed(2),
        Global.Factura.ImpuestoIVA,
        Global.Factura.TasaOCuotaIVA,
        Global.Factura.Tasa);
      impuestosConcepto.Traslados.push(traslados);
      let retenciones = new Retenciones(
        base.toFixed(2),
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
        'Acetaminofén',
        ValorUnitario.toFixed(2),
        base.toFixed(2),
        '0.00',
        Global.Factura.ObjectoImpuesto,
        impuestosConcepto
      );
      this.timbrado.Conceptos.push(concepto);
      impuestoTrasladoBase += base;
      impuestoTrasladoImporte += importeConceptoImpuestoTraslado;
    });
    let trasladoImpuesto = new Traslados(
      impuestoTrasladoBase.toFixed(2),
      impuestoTrasladoImporte.toFixed(2),
      Global.Factura.ImpuestoIVA,
      Global.Factura.TasaOCuotaIVA,
      Global.Factura.Tasa
    )
    let retencionImpuesto = new Retenciones(
        impuestoTrasladoBase.toFixed(2),
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
    this.timbrado.FormaPago='01';
    this.timbrado.Serie='SW';
    this.timbrado.Folio=this.numeroTicket;
    this.timbrado.Fecha=this.getFechaFactura();
    this.timbrado.MetodoPago=Global.Factura.MetodoPago;
    this.timbrado.Sello='';
    this.timbrado.NoCertificado='';
    this.timbrado.Certificado='';
    this.timbrado.CondicionesDePago=Global.Factura.CondicionesPago;
    this.timbrado.SubTotal=subTotal.toFixed(2);
    this.timbrado.Descuento='0.00';
    this.timbrado.Moneda=Global.Factura.Moneda;
    this.timbrado.TipoCambio=Global.Factura.TipoCambio;
    this.timbrado.Total=total.toFixed(2);
    this.timbrado.TipoDeComprobante=Global.Factura.TipoComprobante;
    this.timbrado.Exportacion=Global.Factura.Exportacion;
    this.timbrado.LugarExpedicion='45610';
    this.timbrado.Emisor = new Emisor('XOCHILT CASAS CHAVEZ','CACX7605101P8','605');
    this.timbrado.Receptor = new Receptor('VABO780711D41','OMAR VALDEZ BECERRIL','52756','616','S01');
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

  limpiar():void{
    this.venta=new Venta('',[],new Date(),0,0,0,0,'','','',0,0,'','','',false);
    this.total = 0;
    this.banco = '';
    this.cambio = 0;
    this.efectivo = 0;
    this.formPagoId = '';
    this.noAprobacion = '';
    this.noTransferencia = '';
    this.closeModal('cobrar');
    this.getTicket();
  }

  openModal(nombreModal:string):void{
    switch(nombreModal){
      case 'busqueda':
        this.isModalBusquedaOpen =  true;
        setTimeout(()=>{
          this.renderer.selectRootElement('#descbusqueda').focus();
        },100);
        break;
      case 'cobrar':
        setTimeout(()=>{
          this.renderer.selectRootElement('#efectivo').focus();
        },100); 
        this.isModalCobrarOpen = true;
        break;
      case 'entrada':
        this.isModalEntradaOpen = true;
        break;
        case 'salida':
          this.isModalSalidaOpen = true;
          break;
      default:
        return;
    }
  }

  closeModal(nombreModal:string):void{
    switch(nombreModal){
      case 'busqueda':
        this.isModalBusquedaOpen =  false;
        this.desc = '';
        break;
      case 'cobrar':
        this.isModalCobrarOpen = false;
        break;
      case 'entrada':
        this.isModalEntradaOpen = false;
        break;
      case 'salida':
        this.isModalSalidaOpen = false;
        break;
      default:
        return;
    }
  }

  toggleEntradas():void{
    this.isVerEntradasOpen = !this.isVerEntradasOpen;
    this.getListaEntradas();
  }

  toggleSalidas():void{
    this.isVerSalidasOpen = !this.isVerSalidasOpen;
    this.getListaSalidas();
  }

  getTicket():void{
    this.ventasService.getTicket()
    .subscribe(res=>{
      if(res.status === Global.OK){
        this.numeroTicket = this.pad(res.body.ticket.numero,Global.LONG_TICKET);
      }
    });
  }

  selectAllContent(event:any):void{
    event.target.select();
  }

  limpiaBusqueda():void {
    this.productosEncontrados = [];
    this.HighLightRowBusqueda = -1;
  }

  asociarReceta():void{
    
  }

  getListaEntradas():void{
    let today = new Date();
    let dia = today.getDate()<10 ? '0'+today.getDate():today.getDate();
    let mes = (today.getMonth()+1) < 10 ? '0'+(today.getMonth()+1) : (today.getMonth()+1);
    let year = today.getFullYear();
    this.ventasService.getListaEntradas(year+'-'+mes+'-'+dia,this.sucursal)
    .subscribe(res=>{
      if(res.status === Global.OK && res.body.entradas.length>0){
        this.listaEntradas = res.body.entradas;
      }
    });
  }

  getListaSalidas():void{
    let today = new Date();
    let dia = today.getDate()<10 ? '0'+today.getDate():today.getDate();
    let mes = (today.getMonth()+1) < 10 ? '0'+(today.getMonth()+1) : (today.getMonth()+1);
    let year = today.getFullYear();
    this.ventasService.getListaSalidas(year+'-'+mes+'-'+dia,this.sucursal)
    .subscribe(res=>{
      console.log(res);
      if(res.status === Global.OK && res.body.entradas.length>0){
        this.listaSalidas = res.body.salidas;
      }
    });
  }

  cambioRequiereFactura():void{
    console.log(this.isRequiereFactura);
  }

  pad(n:string, width:number, z?:string):string {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  }
}
