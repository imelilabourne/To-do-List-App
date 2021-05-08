import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AutofocusModule } from 'angular-autofocus-fix';
import { AppComponent } from './app.component';
import { TodoEmptyComponent } from './Todo-List-App/components/todo-empty/todo-empty.component';
import { TodoList } from './Todo-List-App/containers/TodoList/todo-list.component';

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
  exports: [AppComponent,
    TodoList,
    TodoEmptyComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
