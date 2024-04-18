import * as functions from "./../ts/functions";
import { createNewTodo} from "../ts/main";
import { IAddResponse } from "../ts/models/IAddResponse";
import { Todo } from "../ts/models/todo";

describe("Testing", () => {
  let mockedAddTodo: jest.SpyInstance<IAddResponse>;
  let mockedCreateHtml: jest.SpyInstance<void>;
  let mockedDisplayError: jest.SpyInstance<void>;

  beforeEach(() => {
    mockedAddTodo = jest.spyOn(functions, "addTodo");
    mockedDisplayError = jest.spyOn(functions,"displayError");
  });

  afterEach(() => {
    mockedAddTodo.mockReset();
    mockedCreateHtml.mockReset();
    mockedDisplayError.mockReset();
  });

  test("it should call createHtml", () => {
    const todos: Todo[] = [];
    const todoText = "Lorem";

    document.body.innerHTML = `
    <ul id="todos" class="todo"></ul>
    `;

    mockedAddTodo.mockImplementation(() => {
      return { success: true, error: "" };
    });

    createNewTodo(todoText, todos);

    expect(mockedCreateHtml).toHaveBeenCalled();
  });

  
});