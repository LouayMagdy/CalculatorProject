// @ts-ignore

import { Component } from '@angular/core';
import {ButtonComponent} from "./button/button.component";
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  row1: Array<ButtonComponent> = [];
  row2: Array<ButtonComponent> = [];
  row3: Array<ButtonComponent> = [];
  row4: Array<ButtonComponent> = [];
  row5: Array<ButtonComponent> = [];
  row6: Array<ButtonComponent> = [];
  expression: string;
  result: string;
  operation: boolean;
  equal:boolean;
  title = "LouayCalculator";

  /////integrating Back and front ends via http requests
  send(text:string)
  {
    this.http.get('http://localhost:9090/louayCalculator/calc',{
      responseType:'text',
      params:{
        exp:text,
      },
      observe:'response'
    }).subscribe(response=>{
      this.result=<string>response.body;
      console.log(this.result);
    })
  }


  constructor(private http: HttpClient) {
    let button = new ButtonComponent();
    this.row1 = button.get1stRow();
    this.row2 = button.get2ndRow();
    this.row3 = button.get3rdRow();
    this.row4 = button.get4thRow();
    this.row5 = button.get5thRow();
    this.row6 = button.get6thRow();
    this.expression = "0";
    this.result = "";
    this.operation = false;
    this.equal = false;
  }

  ////displaying text on screen
  setExpression(newEx: string) {
    this.operation = false;
    if (newEx == 'C' || newEx == 'CE') {
      this.expression = '0';
      this.result="";
      this.equal = false;
    }
    else if (newEx == 'Undo' && this.expression != '0') {
      this.equal = false;
      if(this.expression[this.expression.length - 1] == '+' || this.expression[this.expression.length - 1] == '-'
      || this.expression[this.expression.length - 1] == 'x' || this.expression[this.expression.length - 1] == '/' ||
        this.expression[this.expression.length - 1] == 'S') this.operation = false;
      let temp: string = '';
      for (let i = 0; i < this.expression.length - 1; i++) temp += this.expression[i];
      this.expression = temp;
      if(this.expression.length == 0) this.expression = '0';
    }
    else if (newEx == "1/x" && this.expression != '0' && this.expression != '') {
      this.equal = false;
      let temp = "";
      let pos = 0;
      if(this.expression[this.expression.length - 1] == "+" ||
        this.expression[this.expression.length - 1] == "-" ||
        this.expression[this.expression.length - 1] == "x" ||
        this.expression[this.expression.length - 1] == "/" ||
        this.expression[this.expression.length - 1] == ")"){
        this.result = "Error";
        return;
      }
      for(let i = 0; i < this.expression.length; i++) {
        if ((this.expression[i] == '+' || this.expression[i] == '-' ||
          this.expression[i] == 'x' || this.expression[i] == '/' || this.expression[i] == 'S')
          && i + 1 < this.expression.length) pos = i + 1;
      }
      for(let i = 0; i < this.expression.length; i++) {
        if(pos == i) temp += "Reciproc(" ;
        temp += this.expression[i] + ")";
      }
      this.expression = temp;
      this.operation =true;
    }
    else if (newEx >= "0" && newEx <= "9") {
      this.equal = false;
      if (this.expression == '0') this.expression = '';
      this.expression += newEx;
      this.operation =true;
    }
    else if (newEx == '.') {
      this.equal = false;
      if (this.expression[this.expression.length - 1] == '+'
        || this.expression[this.expression.length - 1] == '-'
        || this.expression[this.expression.length - 1] == '/'
        || this.expression[this.expression.length - 1] == 'x'
      || this.expression[this.expression.length - 1] == ")")
        this.expression += '0';
      this.expression += '.';
      this.operation = true;
    }
    else if (newEx == '+' || newEx == '-' || newEx == '/' || newEx == 'x') {
      this.equal = false;
      if (this.expression[this.expression.length - 1] == '+'
        || this.expression[this.expression.length - 1] == '-'
        || this.expression[this.expression.length - 1] == '/'
        || this.expression[this.expression.length - 1] == 'x'){
        if(newEx != '-'){
          this.result = "Error";
          return;
        }
      }
      if (this.expression == '0' && newEx == '-') this.expression = '';
      this.expression += newEx;
      this.operation =true;
    }
    else if (newEx == 'x^2') {
      this.equal = false;
      let temp = "", prev = "";
      let pos = 0;
      if(this.expression[this.expression.length - 1] == "+" ||
        this.expression[this.expression.length - 1] == "-" ||
        this.expression[this.expression.length - 1] == "x" ||
        this.expression[this.expression.length - 1] == "/" ||
        this.expression[this.expression.length - 1] == ")"){
        this.result = "Error";
        return;
      }
      for(let i = 0; i < this.expression.length; i++) {
        if ((this.expression[i] == '+' || this.expression[i] == '-' ||
          this.expression[i] == 'x' || this.expression[i] == '/') && i + 1 < this.expression.length) {
          pos = i + 1;
          if (pos < this.expression.length && this.expression[i + 1] == "-") {
            let opFound = false;
            for (let j = i + 2; j < this.expression.length; j++)
              if (this.expression[j] == "+" || this.expression[j] == "-"
                || this.expression[j] == "x" || this.expression[j] == "/" || this.expression[j] == "S")
                opFound = true;
            if (!opFound) break;
          }
          if (this.expression[i] == "S") {
            pos = i;
            if (this.expression[this.expression.length - 1] == ")") break;
          }
        }
      }
      for(let i = 0 ; i < pos; i++) prev += this.expression[i];
      for(let i = pos ; i < this.expression.length; i++)
        temp += this.expression[i];
      this.expression = prev + "square("+temp+")";
      this.operation =true;
    }
    else if (newEx == 'Sqrt(x)') {
      this.equal = false;
      let temp = "", prev = "";
      let pos = 0;
      if(this.expression[this.expression.length - 1] == "+" ||
        this.expression[this.expression.length - 1] == "-" ||
        this.expression[this.expression.length - 1] == "x" ||
        this.expression[this.expression.length - 1] == "/"||
        this.expression[this.expression.length - 1] == ")"){
        this.result = "Error";
        return;
      }
      for(let i = 0; i < this.expression.length; i++) {
        if ((this.expression[i] == '+' || this.expression[i] == '-' ||
            this.expression[i] == 'x' || this.expression[i] == '/' )
          && i + 1 < this.expression.length && this.expression[i+1] !='-') pos = i + 1;
        if(this.expression[i] == "S"){
          pos = i;
        }
      }
      /*if(this.expression[0] == '-' && pos == 0){
        this.result="Error";
        return;
      }*/
      for(let i = 0 ; i < pos; i++) prev += this.expression[i];
      for(let i = pos ; i < this.expression.length; i++)
        temp += this.expression[i];
      this.expression = prev +"Sqrt("+ temp + ")";
      this.operation =true;
    }
    else if (newEx == '%') {
      this.equal = false;
      if(this.expression[this.expression.length - 1] == "+" ||
        this.expression[this.expression.length - 1] == "-" ||
        this.expression[this.expression.length - 1] == "x" ||
        this.expression[this.expression.length - 1] == "/"||
        this.expression[this.expression.length - 1] == ")"){
        this.result = "Error";
        return;
      }
      this.expression = "Cent(" + this.expression + ")";
      this.operation =true;
    }
    else if(newEx == '+/-' && this.equal){
      console.log(newEx);
      if(this.expression != "" &&this.expression[0] != '0' && this.expression[0] != '-' )
        this.expression = '-' + this.expression;
      else if(this.expression[0] == '-') {
        let temp = '';
        for (let i = 1; i < this.expression.length; i++) temp += this.expression[i];
        this.expression = temp;
        this.operation = false;
      }
    }
    else if (newEx == '=' && !this.equal) {
      this.equal = true;
      //this.operation = true;
      if(this.result=="Infinity" || this.result=="NaN") {
        this.expression="E";
      }
      else{
        this.expression = this.result;
      }
      this.result="";
    }
    let temp = "";
    for(let i = 0; i < this.expression.length; i++){
      if(this.expression[i] == "+")temp += "P";
      else temp += this.expression[i];
    }
   this.expression = temp;
    console.log("expresssion before "+this.expression);
    if(this.operation)
      this.send(this.expression);
    temp = "";
    for(let i = 0; i < this.expression.length; i++){
      if(this.expression[i] == "P" &&
        (i+1 < this.expression.length && this.expression[i+1] != "e" || i == this.expression.length -1 ))
        temp += "+";
      else temp += this.expression[i];
    }
    this.expression = temp;
    console.log("expresssion now"+this.expression);
  }
}
