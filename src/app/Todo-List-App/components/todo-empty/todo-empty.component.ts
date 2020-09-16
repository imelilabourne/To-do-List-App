import { Component, OnInit } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'todo-empty',
  templateUrl: './todo-empty.component.html',
  styleUrls: ['./todo-empty.component.css'],
  animations: [
    trigger('fade', [
        transition(':enter', [
            style({opacity: 0, transform: 'translateX(-10px)'}),
            animate(1000, style({opacity:0, transform: 'translateY(0px)'}))
        ]),
        transition(':leave', [
            style({opacity: 0, transform: 'translateX(0px)'}),
            animate(1000, style({opacity:1, transform: 'translateX(-50px)'}))
        ])
    ])
]
})
export class TodoEmptyComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
