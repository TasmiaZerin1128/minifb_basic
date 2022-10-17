import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { 
    this.registerForm = this.formBuilder.group({
      name: [''],
      email: [''],
      password: [''],
      dob: ['']
    })
  }

  name: string = '';
  email: string = '';
  password: string = '';
  dob: string = '';
  age: number = 0;

  canRegister: boolean = false;
  hasError: boolean = false;
  credError: string = '';

  resError: string = ' ';

  ngOnInit(): void {
  }

  noAuthHeader = {
    headers: new HttpHeaders({
      NoAuth: 'True',
      'Content-Type': 'application/json',
    }),
  };

  registerUser(){
    if(this.check()){
      console.log(this.registerForm.value);
    this.authService.signUp(this.registerForm.value).subscribe(
      (data) => {
        console.log(data.message);
        this.resError = JSON.stringify(data.message);

        if(this.resError.includes("must be a valid email")){
          this.canRegister = false;
          this.hasError = true;
          this.credError = this.resError;
        }
        else{
          this.registerForm.reset();
          console.log('Registered');
          this.router.navigate(['']);
        }
      },
      (err) => {
          console.log(err.message);
          this.canRegister = false;
          this.hasError = true;
      }
    );
    }
  }

  check():boolean{
      this.hasError = true;
      // this.credError = "Please enter the credentials correctly";
      this.age = Number(this.dob);

      console.log("Age " + this.age + "  password " + this.password.length);
      if(this.email=='' || this.password=='' || this.name=='' || this.dob==''){
        this.credError = "Please enter all the fields";
        return false;
      }
      if(this.name.length<4)
      {
        this.credError = "Name should be atleast of 4 characters";
        return false;
      }
      if(this.name.length>25)
      {
        this.credError = "Name should be atmost of 25 characters";
        return false;
      }
      if(this.password.length<6 || this.password.length>16){
        this.credError = "Password must contain atleast 6 characters and atmost 16 characters";
        return false;
      }
      if(this.age<18){
        this.credError = "You must be 18 years old";
        return false;
      }
      this.canRegister = true;
      return true;
  }

}
