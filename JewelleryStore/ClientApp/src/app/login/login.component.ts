import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  private returnUrl = '';
  public error='';

  constructor(private authService: AuthService, private formBuilder:FormBuilder, private router: Router, private route: ActivatedRoute) { }

  get form(){
    return this.loginForm.controls;
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      emailAddress: ['',[Validators.required,Validators.email,Validators.maxLength(256)]],
      password:['',Validators.required]
    });

    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  public onSubmit(e: Event){
    e.stopPropagation();
    e.preventDefault();

    if(this.loginForm.invalid){
      this.error = "invalid email or password.";
      return false;
    }

    this.authService.login(this.form.emailAddress.value, this.form.password.value)
    .pipe(first())
    .subscribe(
      data => {        
        this.router.navigate([this.returnUrl]);
      },
      error => {
        if(error.status === 401){
          this.error = "Invalid username or password.";
        }else{
          this.error = "An unknown error has occured.";
        }
      }
    );
    return false;
  }
}
