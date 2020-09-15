import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { Tasks } from 'src/app/Todo-List-App/models/todo-interface';
import { TodoService } from '../../services/todo.service';


@Component({
    selector: '<todo-list></todo-list>',
    templateUrl: 'todo-list.component.html',
    styleUrls: ['todo-list.component.css'],
    animations: [
        trigger('fade', [
            transition(':enter', [
                style({opacity: 0, transform: 'translateX(-40px)'}),
                animate(500, style({opacity:1, transform: 'translateY(0px)'}))
            ]),
            transition(':leave', [
                style({opacity: 0, transform: 'translateX(0px)'}),
                animate(1000, style({opacity:1, transform: 'translateX(-50px)'}))
            ])
        ])
    ]
})

export class TodoList{
    taskId: number;
    taskTitle: string;
    editing: boolean = false;
    tasks:Tasks[];
    beforeEditing: string;
    today: number = Date.now();

    
    constructor(private todoService: TodoService){
    }
    ngOnInit(){
        this.beforeEditing = '';
        this.taskId;
        this.taskTitle = '';
        
    
        this.todoService
            .getTodo()
            .subscribe(data => this.tasks = data);
    }

    addTask(){
        //restricting empty string
        if(this.taskTitle.trim().length === 0){
            return;
        }
        
        this.todoService.addTask({id:this.taskId,
            title: this.taskTitle,
            completed: false,
            editing: false})
            .subscribe((data: Tasks) => {
                console.log(data);
            })
        
        //display 
        this.tasks.push({
            id:this.taskId,
            title: this.taskTitle,
            completed: false,
            editing: false
        })
        this.taskTitle ='';
        
        // this.taskId++;
    }

    toggleEdit(event: Tasks){
        event.editing = !event.editing;
    }

    editTask(event: Tasks){
        this.beforeEditing = event.title;
        event.editing = !event.editing;
        this.todoService.editTodo(event)
            .subscribe(data => this.tasks = this.tasks.map((task: Tasks )=>{
                    
                    if (task.title === event.title){
                      task = Object.assign({}, task, event);
                    }
                    return task;
                  }));
    }

    console(){
        console.log("try function");
    }

    doneEditing(task: Tasks):void{
        if(task.title.trim().length === 0){
            task.title = this.beforeEditing;
        }
        task.editing = false;
    }

    cancelEditing(task: Tasks){
        task.title = this.beforeEditing;
        task.editing = false;
    }

    remaining(): number{
        return this.tasks.filter(task => !task.completed).length;
    }

    atleastOneCompleted(): boolean{
        return this.tasks.filter(task => task.completed).length > 0;
    }
    //delete function
    deleteTask(tasks: Tasks){
        this.tasks = this.tasks.filter(task => task.id !== tasks.id);

        this.todoService.deleteTask(tasks)
            .subscribe(data => this.tasks.filter(task => {
                return task.id !== data;
            }))
    }

    clearCompleted(tasks: Tasks){
        this.tasks = this.tasks.filter(task => !task.completed);

        // this.todoService.deleteTask(tasks)
        //     .subscribe(data => this.tasks.filter(task => {
        //         return task == data;
        //     }))
    }

    selectAll():void{
        this.tasks.forEach(task => task.completed = 
            (<HTMLInputElement>event.target).checked);
    }
}