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
    tasks:Tasks[] = [];
    beforeEditing: string;
    today: number = Date.now();
    completed: Tasks[] = [];

    
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
    deleteTask(taskId){
        this.tasks = this.tasks.filter(task => task.id !== taskId);

        this.todoService.deleteTask(taskId)
            .subscribe(data => this.tasks.filter(task => {
                return task !== data;
            }))

            
    }

    deleteAllTask(){
        const selectedProducts = this.tasks.filter(product => product.completed).map(p => p.id);
            console.log (selectedProducts);
            
            selectedProducts.forEach(value => {
                this.todoService.deleteTask(value)
                    .subscribe(res => {
                        this.tasks = this.tasks.filter(task => !task.completed);
                        });
            });

            // if(selectedProducts && selectedProducts.length === 1) {
                
            // }
            // else{
                // this.todoService.deleteAllTask(selectedProducts)
                // .subscribe(data => console.log("more than 1 elements"));
            // }
    }


    selectAll(event):void{
            this.tasks.forEach(x => x.completed = event.target.checked)
    }
}