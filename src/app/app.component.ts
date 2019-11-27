import { Component } from '@angular/core';
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
      state('left', style({
        transform: 'translateX(-100px)'
      })),
      state('right', style({
        transform: 'translateX(+100px)'
      })),
      state('up', style({
        transform: 'translateY(-100px)'
      })),
      state('down', style({
        transform: 'translateY(+100px)'
      })),
      transition('* => *', animate('0ms ease')),
    ]

    )
  ]
})
export class AppComponent {
  title = 'game2048';
  position: string;

  data = [
    [0, 2, 0, 0],
    [2, 2, 0, 0],
    [0, 0, 2, 0],
    [4, 0, 0, 0]
  ];

  size = 4;

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  newNumber(){
    let emptySpots = 0;
    for (let i = 0; i < this.size; i++){
      for (let j = 0; j < this.size; j++){
        if (this.data[i][j] === 0) {
          emptySpots ++;
        }
      }
    }
     
    let index = this.getRandomInt(emptySpots);
    outer:  for (let i = 0; i < this.size; i++){
        for (let j = 0; j < this.size; j++){
          if (this.data[i][j] === 0) {
            if (index === 0) {
              this.data[i][j] = 2;
              break outer;
            } else {
              index --;
            }
          }
        }
      }
    }

  changePosition(newPosition: string){
    this.position = newPosition;
  }

  @HostListener('document:keyup', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) { 
    if (event.keyCode == 38) {
      //this.newNumber();
      //this.changePosition("up");
      //alert(event.keyCode);
      let buf = null;
        let buf2 = null;
        for (let j = 0; j < this.size; j++){
          buf = [];
          buf2 = [];
          for (let i = 0; i < this.size; i++){
            buf[i] = this.data[i][j];
          }
          buf = buf.filter(item => item > 0);
          for (let k = 0; k < buf.length; k++){
              if (buf[k] === buf[k+1]) {
                buf2.push(buf[k]*2);
                k++;
              }
              else {
                buf2.push(buf[k]);
              }
          }
          for (let k = 0; k < this.size; k++){
            if (k < buf2.length) this.data[k][j] = buf2[k];
            else this.data[k][j] = 0;
          }
        }
    }
    else if (event.keyCode == 40) {
        // down arrow
        //this.changePosition("down");
        //alert(event.keyCode);
        
    }
    else if (event.keyCode == 37) {
      // left arrow
      //this.changePosition("left");
      //alert(event.keyCode);
    }
    else if (event.keyCode == 39) {
      // right arrow
      //this.changePosition("right");
      //alert(event.keyCode);
    }
  }

  onKey(event: any) {
    //alert("lal");
  }
}
