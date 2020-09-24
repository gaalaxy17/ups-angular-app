import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';

declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: any = {
    dsUser: null,
    dsPass: null
  };

  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
  }

  ngOnInit() {
   

    // get return url from route parameters or default to '/'

  }

  // convenience getter for easy access to form fields
  login(){
    this.authService.login(this.form.dsUser, this.form.dsPass).subscribe((results)=>{
      this.router.navigateByUrl("/dashboard");
    })
  }
}
