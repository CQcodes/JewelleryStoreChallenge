import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PriceService } from '../shared/services/price.service';

@Component({
  selector: 'app-calculator-component',
  templateUrl: './calculator.component.html'
})
export class CalculatorComponent implements OnInit  {

  public calculateForm: FormGroup;
  public error = '';
  public calculatedPrice = 0;

  constructor(private formBuilder:FormBuilder, private priceService: PriceService){}

  get form(){
    return this.calculateForm.controls;
  }

  ngOnInit() {
    this.calculateForm = this.formBuilder.group({
      price: ['',Validators.required],
      weight:['',Validators.required],
      discount:['',Validators.required]
    });
  }

  public onSubmit(e: Event){
    e.stopPropagation();
    e.preventDefault();

    if(this.calculateForm.invalid){
      this.error = "invalid email or password.";
      return false;
    }

    this.priceService.calculate(this.form.price.value, this.form.weight.value,this.form.discount.value)
    .pipe().subscribe(data => {
        this.calculatedPrice = data;
      },
      error => {
        this.error = "An unknown error has occured.";
      }
    );

    return false;
  }
}
