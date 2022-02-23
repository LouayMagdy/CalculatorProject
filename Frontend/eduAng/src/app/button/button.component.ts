import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {AppComponent} from "../app.component";

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {
  @Input() buttonText: string;
  @Input() buttonColor: string;

  @Output() data = new EventEmitter<string>();

  constructor() {
    this.buttonText="";
    this.buttonColor="";
  }

  setButton(text: string, color: string) {
    this.buttonText = text;
    this.buttonColor = color;
  }
///getting 1st row
  get1stRow() {
    let row: Array<ButtonComponent> = [];
    let button1 = new ButtonComponent();
    let button2 = new ButtonComponent();
    let button3 = new ButtonComponent();
    let button4 = new ButtonComponent();
    button1.setButton("%", "lightgrey");
    button2.setButton("CE", "salmon");
    button3.setButton("C", "salmon");
    button4.setButton("Undo", "lightgrey");
    row.push(button1);
    row.push(button2);
    row.push(button3);
    row.push(button4);
    return row;
  }
///getting 2nd row
  get2ndRow() {
    let row: Array<ButtonComponent> = [];
    let button1 = new ButtonComponent();
    let button2 = new ButtonComponent();
    let button3 = new ButtonComponent();
    let button4 = new ButtonComponent();
    button1.setButton("1/x", "lightgrey");
    button2.setButton("x^2", "lightgrey");
    button3.setButton("Sqrt(x)", "lightgrey");
    button4.setButton("/", "lightgrey");
    row.push(button1);
    row.push(button2);
    row.push(button3);
    row.push(button4);
    return row;
  }
///getting 3rd row
  get3rdRow() {
    let row: Array<ButtonComponent> = [];
    let button1 = new ButtonComponent();
    let button2 = new ButtonComponent();
    let button3 = new ButtonComponent();
    let button4 = new ButtonComponent();
    button1.setButton("7", "darkgrey");
    button2.setButton("8", "darkgrey");
    button3.setButton("9", "darkgrey");
    button4.setButton("x", "lightgrey");
    row.push(button1);
    row.push(button2);
    row.push(button3);
    row.push(button4);
    return row;
  }
///getting 4th row
  get4thRow() {
    let row: Array<ButtonComponent> = [];
    let button1 = new ButtonComponent();
    let button2 = new ButtonComponent();
    let button3 = new ButtonComponent();
    let button4 = new ButtonComponent();
    button1.setButton("4", "darkgrey");
    button2.setButton("5", "darkgrey");
    button3.setButton("6", "darkgrey");
    button4.setButton("-", "lightgrey");
    row.push(button1);
    row.push(button2);
    row.push(button3);
    row.push(button4);
    return row;
  }
///getting 5th row
  get5thRow() {
    let row: Array<ButtonComponent> = [];
    let button1 = new ButtonComponent();
    let button2 = new ButtonComponent();
    let button3 = new ButtonComponent();
    let button4 = new ButtonComponent();
    button1.setButton("1", "darkgrey");
    button2.setButton("2", "darkgrey");
    button3.setButton("3", "darkgrey");
    button4.setButton("+", "lightgrey");
    row.push(button1);
    row.push(button2);
    row.push(button3);
    row.push(button4);
    return row;
  }
///getting 6th row
  get6thRow() {
    let row: Array<ButtonComponent> = [];
    let button1 = new ButtonComponent();
    let button2 = new ButtonComponent();
    let button3 = new ButtonComponent();
    let button4 = new ButtonComponent();
    button1.setButton("+/-", "lightgrey");
    button2.setButton("0", "darkgrey");
    button3.setButton(".", "lightgrey");
    button4.setButton("=", "lightgreen");
    row.push(button1);
    row.push(button2);
    row.push(button3);
    row.push(button4);
    return row;
  }

  ngOnInit(): void {
  }
  ///the event listener/emmitter to give the button text to the parent class
  onClick(value: string){
    this.data.emit(value);
  }
}

