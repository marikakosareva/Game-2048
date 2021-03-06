import { Component, OnInit } from '@angular/core';
import { HostListener } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('itemState',[
      state('00', style({
        transform: 'translate(0px, 0px) scale(1, 1)'
      })),
      state('01', style({
        transform: 'translate(110px, 0px) scale(1, 1)'
      })),
      state('02', style({
        transform: 'translate(220px, 0px) scale(1, 1)'
      })),
      state('03', style({
        transform: 'translate(330px, 0px) scale(1, 1)'
      })),
      state('10', style({
        transform: 'translate(0px, 110px) scale(1, 1)'
      })),
      state('11', style({
        transform: 'translate(110px, 110px) scale(1, 1)'
      })),
      state('12', style({
        transform: 'translate(220px, 110px) scale(1, 1)'
      })),
      state('13', style({
        transform: 'translate(330px, 110px) scale(1, 1)'
      })),
      state('20', style({
        transform: 'translate(0px, 220px) scale(1, 1)'
      })),
      state('21', style({
        transform: 'translate(110px, 220px) scale(1, 1)'
      })),
      state('22', style({
        transform: 'translate(220px, 220px) scale(1, 1)'
      })),
      state('23', style({
        transform: 'translate(330px, 220px) scale(1, 1)'
      })),
      state('30', style({
        transform: 'translate(0px, 330px) scale(1, 1)'
      })),
      state('31', style({
        transform: 'translate(110px, 330px) scale(1, 1)'
      })),
      state('32', style({
        transform: 'translate(220px, 330px) scale(1, 1)'
      })),
      state('33', style({
        transform: 'translate(330px, 330px) scale(1, 1)'
      })),
      transition('* => void', [
        animate('0ms 500ms', style({   
          transform: 'scale(0, 0)'
        }))
      ]),
      transition('void => *', [
        style({
          transform: 'scale(0, 0)'
        }), animate('500ms')
      ]),
      
      transition('* => *', animate('500ms ease'))
      ]
    )
  ]
})

export class AppComponent implements OnInit {

  title = 'Game2048';
  elements = [];
  size = 4;
  layout = new Array(16);
  score = 0;
  gameOver = false;

  data = [
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null]
  ];

  ngOnInit() {
    this.newNumber();
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  newNumber(){
    let emptySpots = 0;
    for (let i = 0; i < this.size; i++){
      for (let j = 0; j < this.size; j++){
        if (this.data[i][j] === null) {
          emptySpots ++;
        }
      }
    }
     
    let index = this.getRandomInt(emptySpots);
    outer:  for (let i = 0; i < this.size; i++){
              for (let j = 0; j < this.size; j++){
                if (this.data[i][j] === null) {
                  if (index === 0) {
                    this.data[i][j] = {position:`${i}${j}`, number: 2};
                    this.elements.push(this.data[i][j]);
                    break outer;
                  } else {
                    index --;
                  }
                }
              }
            }

    if (this.elements.length === this.size ** 2) {
      let flagGameOver = true;
      gameOver: for (let i = 0; i < this.size; i++){
                  for (let j = 0; j < this.size - 1; j++){
                    if ((this.data[i][j].number === this.data[i][j+1].number) ||
                    (this.data[j][i].number === this.data[j+1][i].number)) {
                      flagGameOver = false;
                      break gameOver;
                    }
                  }
                }
      if (flagGameOver) {
        this.gameOver = true;
      }
    }
  }



  @HostListener('document:keyup', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) { 

    let previousState = [[], [], [], []];
    for (let i = 0; i < this.size; i++){
      for (let j = 0; j < this.size; j++){
        previousState[i][j] = this.data[i][j];
      }
    }

    if (event.keyCode == 38) {
      let buf = null;
      let buf2 = null;
      for (let j = 0; j < this.size; j++){
        buf = [];
        buf2 = [];
        for (let i = 0; i < this.size; i++){
          buf[i] = this.data[i][j];
        }
        buf = buf.filter(item => item !== null);
        for (let k = 0; k < buf.length; k++){
          if (k === buf.length - 1){
            buf2.push(buf[k]);
          } else if (buf[k].number === buf[k+1].number) {
            buf[k+1].number *= 2;
            this.score += buf[k+1].number;
            buf2.push(buf[k+1]);
            this.elements.splice(this.elements.indexOf(buf[k]), 1);
            k++;
          }
          else {
            buf2.push(buf[k]);
          }
        }
        for (let k = 0; k < this.size; k++){
          if (k < buf2.length) {
            this.data[k][j] = buf2[k];
            this.data[k][j].position = `${k}${j}`;
          }
          else {
            this.data[k][j] = null;
          }
        }
      }
    }
    else if (event.keyCode == 40) {
      let buf = null;
      let buf2 = null;
      for (let j = 0; j < this.size; j++){
        buf = [];
        buf2 = [];
        for (let i = 0; i < this.size; i++){
          buf[i] = this.data[this.size - i - 1][j];
        }
        buf = buf.filter(item => item !== null);
        for (let k = 0; k < buf.length; k++){
          if (k === buf.length - 1){
            buf2.push(buf[k]);
          } else if (buf[k].number === buf[k+1].number) {
            buf[k+1].number *= 2;
            this.score += buf[k+1].number;
            buf2.push(buf[k+1]);
            this.elements.splice(this.elements.indexOf(buf[k]), 1);
            k++;
          }
          else {
            buf2.push(buf[k]);
          }
        }
        for (let k = 0; k < this.size; k++){
          if (k < buf2.length) {
            this.data[this.size - k - 1][j] = buf2[k];
            this.data[this.size - k - 1][j].position = `${this.size - k - 1}${j}`;
          }
          else {
            this.data[this.size - k - 1][j] = null;
          }
        }
      }   
    }
    else if (event.keyCode == 37) {
      let buf = null;
      let buf2 = null;
      for (let j = 0; j < this.size; j++){
        buf = [];
        buf2 = [];
        for (let i = 0; i < this.size; i++){
          buf[i] = this.data[j][i];
        }
        buf = buf.filter(item => item !== null);
        for (let k = 0; k < buf.length; k++){
          if (k === buf.length - 1){
            buf2.push(buf[k]);
          } else if (buf[k].number === buf[k+1].number) {
            buf[k+1].number *= 2;
            this.score += buf[k+1].number;
            buf2.push(buf[k+1]);
            this.elements.splice(this.elements.indexOf(buf[k]), 1);
            k++;
          } else {
            buf2.push(buf[k]);
          }
        }
        for (let k = 0; k < this.size; k++){
          if (k < buf2.length) {
            this.data[j][k] = buf2[k];
            this.data[j][k].position = `${j}${k}`;
          }
          else {
            this.data[j][k] = null;
          }
        }
      }
    }
    else if (event.keyCode == 39) {
      let buf = null;
      let buf2 = null;
      for (let j = 0; j < this.size; j++){
        buf = [];
        buf2 = [];
        for (let i = 0; i < this.size; i++){
          buf[i] = this.data[j][this.size - i - 1];
        }
        buf = buf.filter(item => item !== null);
        for (let k = 0; k < buf.length; k++){
          if (k === buf.length - 1){
            buf2.push(buf[k]);
          } else if (buf[k].number === buf[k+1].number) {
            buf[k+1].number *= 2;
            this.score += buf[k+1].number;
            buf2.push(buf[k+1]);
            this.elements.splice(this.elements.indexOf(buf[k]), 1);              
            k++;
          }
          else {
            buf2.push(buf[k]);
          }
        }
        for (let k = 0; k < this.size; k++){
          if (k < buf2.length) {
            this.data[j][this.size - k - 1] = buf2[k];
            this.data[j][this.size - k - 1].position = `${j}${this.size - k - 1}`;
          }
          else {
            this.data[j][this.size - k - 1] = null;
          }
        }
      }
    }
    let isStateChanged = false;
    stateOuter: for (let i = 0; i < this.size; i++){
      for (let j = 0; j < this.size; j++){
        if (previousState[i][j] !== this.data[i][j]){
          isStateChanged = true;
          break stateOuter;
        } else if (previousState[i][j] !== null){
          if (previousState[i][j].number !== this.data[i][j].number 
            || previousState[i][j].position !== this.data[i][j].position) {
              isStateChanged = true;
              break stateOuter;
          }
        }
      }
    }

    if (isStateChanged) this.newNumber();
  }

  restart() {
    this.elements = [];
    this.score = 0;
    this.data = [
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null]
    ];
    this.newNumber();
    this.gameOver = false;
  }
}
