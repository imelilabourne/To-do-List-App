import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutofocusModule } from 'angular-autofocus-fix';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AppComponent } from './app.component';
import { TodoList } from './Todo-List-App/containers/TodoList/Todo-list.component';
import { TodoService } from './Todo-List-App/services/todo.service';
import { HttpClientModule } from '@angular/common/http';
import { TodoEmptyComponent } from './Todo-List-App/components/todo-empty/todo-empty.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoList,
    TodoEmptyComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AutofocusModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [TodoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
