import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service'
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  userLoginForm : FormGroup
  loginError : string;
  constructor(private fb: FormBuilder,  private authService : AuthService, private router : Router) { 
  
  }
    
  
  ngOnInit() {
    this.createLoginForm();    
  }
  
  
  createLoginForm(){
    this.userLoginForm = this.fb.group({
      name : ['',[Validators.required,Validators.minLength(2),Validators.maxLength(25)]],
      password : ['',[Validators.required,Validators.minLength(2),Validators.maxLength(25)]],
    })

    this.userLoginForm.valueChanges
    .subscribe( data=> {
        this.loginError='';
    })
  }
  

  loginUser() {
    this.loginError = "";
    let user = this.userLoginForm.value;
    this.authService.loginUser(user)
    .subscribe(
       res => {
         if(res.success){
          console.log('login success');
          localStorage.setItem('token',res.data.token);
          localStorage.setItem('user',res.data.user.name);
          localStorage.setItem('id',res.data.user._id);          
          this.router.navigate(['/user/userlist']);
         }
         //console.log(res);
         if(res.success===false){
           this.loginError = res.message; 
         }
    },
    err => console.log(err))
  }

}
