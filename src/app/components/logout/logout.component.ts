import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CognitoService } from 'src/app/service/cognito.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit{

  constructor(private router:Router, private cognitoService:CognitoService){}

  ngOnInit():void{
    console.log('OnInit');
    this.cognitoService.signOut().then(()=>{
      //this.router.navigateByUrl('/login');
    }).catch(err=>{
      console.log('Error',err);
    });
  }
}
