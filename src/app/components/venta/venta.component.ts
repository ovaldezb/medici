import { Component, OnInit, Renderer2 } from '@angular/core';
import { faThemeisle } from '@fortawesome/free-brands-svg-icons';
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
          faBan,
          faEye } from '@fortawesome/free-solid-svg-icons';
import { EntradaEfectivo } from 'src/app/models/entradaEfectivo';
import { Producto } from 'src/app/models/producto';
import { SalidaEfectivo } from 'src/app/models/salidaEfectivo';
import { Venta } from 'src/app/models/venta';
import { VentaProducto } from 'src/app/models/ventaproducto';
import { CognitoService } from 'src/app/service/cognito.service';
import { Global } from 'src/app/service/Global';
import { ProductoService } from 'src/app/service/producto.service';
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
  providers:[ProductoService,VentasService, CognitoService]
})

export class VentaComponent implements OnInit{

  constructor(
      private productoService:ProductoService, 
      private renderer:Renderer2,
      private ventasService:VentasService,
      private cognitoService:CognitoService){}
  ngOnInit(): void {
    this.getTicket();
    this.formaPago(Global.EFECTIVO);
    this.renderer.selectRootElement('#codigobarras').focus();
    this.cognitoService.getUser().then(user=>{
      this.cajero = user.attributes.given_name+' '+user.attributes.middle_name+' '+user.attributes.family_name;
    })
  }

  cajero:string='';
  entrada:number=0;
  comentarioEntrada:string='';
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
        //console.log(producto);
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
      //return;
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
    this.ventasService.agregaVenta(this.venta)
    .subscribe(res=>{
      this.isSpinnerCobrandoOpen = false;
      if(res.status===Global.OK){
        Swal.fire({
          titleText:'Se registro el cobro',
          icon:'success',
          timer:Global.TIMER_OFF
        });
        this.limpiar();
      }
    });
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
      default:
        return;
    }
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

  pad(n:string, width:number, z?:string):string {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  }
}
