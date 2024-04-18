import "./../styles/main.scss";
import { addTodo, changeTodo, displayError, removeAllTodos } from "./functions";
import { Todo } from "./models/todo";

let todos: Todo[] = JSON.parse(localStorage.getItem("todos") || "[]");

document.getElementById("clearTodos")?.addEventListener("click", () => {
  clearTodos(todos);
});

(document.getElementById("newTodoForm") as HTMLFormElement)?.addEventListener(
  "submit",
  (e: SubmitEvent) => {
    e.preventDefault();

    let todoText: string = (
      document.getElementById("newTodoText") as HTMLInputElement
    ).value;

    createNewTodo(todoText, todos);
  }
);

export function createNewTodo(todoText: string, todos: Todo[]) {
  let result = addTodo(todoText, todos);

  if (result.success) {
    createHtml(todos);
  } else {
    displayError(result.error, true);
  }
}

export function createHtml(todos: Todo[]) {
  localStorage.setItem("todos", JSON.stringify(todos));

  let todosContainer: HTMLUListElement = document.getElementById(
    "todos"
  ) as HTMLUListElement;

  todosContainer.innerHTML = "";

  for (let i = 0; i < todos.length; i++) {
    let li: HTMLLIElement = document.createElement("li");

    if (todos[i].done) {
      li.classList.add("todo__text--done");
    }

    li.classList.add("todo__text");
    li.innerHTML = todos[i].text;
    li.addEventListener("click", () => {
      toggleTodo(todos[i]);
    });

    todosContainer.appendChild(li);
  }
}

function toggleTodo(todo: Todo) {
  changeTodo(todo);
  createHtml(todos);
}

// export function displayError(error: string, show: boolean) {
//   let errorContainer: HTMLDivElement = document.getElementById(
//     "error"
//   ) as HTMLDivElement;

//   errorContainer.innerHTML = error;

//   if (show) {
//     errorContainer.classList.add("show");
//   } else {
//     errorContainer.classList.remove("show");
//   }
// }

function clearTodos(todos: Todo[]) {
  removeAllTodos(todos);
  createHtml(todos);
}

createHtml(todos);

export const add =( x:number, y:number)=>{
  return x+y;
  };
  
