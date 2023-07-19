import { Component, OnInit } from '@angular/core';
import { AuthModel } from './models/auth-model';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  email:string="";
  password:string="";
  constructor(private authService:AuthService,private router:Router) { }

  ngOnInit() {
  }


  login(){
    const authModel=new AuthModel();
    authModel.email=this.email;
    authModel.password=this.password;
    this.authService.login(authModel).subscribe((res:any)=>{
      localStorage.setItem('token',res.data.token);
      this.router.navigate(['/tabs']);
    })
  }
}
