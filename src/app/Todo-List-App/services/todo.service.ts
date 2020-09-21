import { HttpClient, HttpHeaders} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Tasks } from "../models/todo-interface";
import { map } from "rxjs/operators"; 
const URL = '/tasks';
@Injectable()
export class TodoService{  
    constructor(private http: HttpClient){}

    getTodo():Observable<Tasks[]>{
        return this.http.get<Tasks[]>(URL)
    }

    addTask(task: Tasks):Observable<Tasks>{
        return this.http.post<Tasks>(URL, task, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        })
    }

    editTodo(task: Tasks):Observable<Tasks[]>{
        return this.http
            .put(URL + '/' + task.id, task)
            .pipe(map((response: any) => response.json()));
    }

    deleteTask(id:number){
        return this.http.delete(URL + '/' + id);
    }

    deleteAllTask(id: number[]){
        return this.http.delete<Tasks[]>(URL + '/' + id);
                    
        
                    // .pipe(map((res:any) => {
                    //     res.json();  
                    // }))
    }



}