import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Role } from '../shared/model/role';
import { AuthService } from '../shared/services/auth.service';
import { PriceService } from '../shared/services/price.service';

@Component({
  selector: 'app-calculator-component',
  templateUrl: './calculator.component.html'
})
export class CalculatorComponent implements OnInit  {

  public calculateForm: FormGroup;
  public error = '';
  public calculatedPrice = 0;
  public isPrivilegeUser = false;

  constructor(private formBuilder:FormBuilder, private priceService: PriceService, private authService:AuthService){}

  get form(){
    return this.calculateForm.controls;
  }

  ngOnInit() {
    this.calculateForm = this.formBuilder.group({
      price: ['',Validators.required],
      weight:['',Validators.required],
      discount:['']
    });

    const currentUser = this.authService.currentUserValue;
    if(currentUser.role === Role.privilege){
      this.isPrivilegeUser = true;
    }
  }

  public onSubmit(e: Event){
    e.stopPropagation();
    e.preventDefault();

    // reset values
    this.calculatedPrice = 0;
    this.error = '';

    let discount = null;    
    if(this.isPrivilegeUser && this.form.discount.value){
      discount = this.form.discount.value;
    }
    // form state check
    if(this.calculateForm.invalid){
      this.error = "please enter your input in all the field.";
      return false;
    }

    // invoke price-service
    this.priceService.calculate(this.form.price.value, this.form.weight.value,discount)
    .pipe().subscribe(data => {
        this.calculatedPrice = data;
      },
      error => {        
        console.error(error);
        this.error = "An unknown error has occured.";
      }
    );
  }
}
