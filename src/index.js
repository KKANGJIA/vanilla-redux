import { createStore } from "redux";

const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";

//순전히 object를 리턴만 해주는 함수
const addToDo = text => {
  return {
    type: ADD_TODO,
    text
  };
};

const deleteToDo = id => {
  return {
    type: DELETE_TODO,
    id
  };
};

const reducer = (state = [], action) => {
  // console.log(action);
  switch (action.type) {
    case ADD_TODO:
      //삭제 구현을 위한 고유한 id 추가
      return [{ text: action.text, id: Date.now() }, ...state];
    case DELETE_TODO:
      //state에서 object를 삭제하고 있는 것이 아니라 새로운 배열을 리턴하고있음(filter는 기존 배열 수정 x)
      return state.filter(todo => todo.id !== action.id);
    default:
      return state;
  }
};

const store = createStore(reducer);

store.subscribe(() => console.log(store.getState()));

const dispatchAddToDo = text => {
  store.dispatch(addToDo(text));
};

const dispatchDeleteToDo = e => {
  const id = parseInt(e.target.parentNode.id);
  store.dispatch(deleteToDo(id));
};

//새로 그려주는 함수
const paintToDos = () => {
  const toDos = store.getState();
  ul.innerHTML = ""; //기존 리스트 코드를 계속 복사해오는 거 방지
  toDos.forEach(toDo => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.innerText = "DEL";
    btn.addEventListener("click", dispatchDeleteToDo);
    li.id = toDo.id;
    li.innerText = toDo.text;
    li.appendChild(btn);
    ul.appendChild(li);
  });
};

// store가 변경될때마다 새로 그려주는 함수 전달하기
store.subscribe(paintToDos);

const onSubmit = e => {
  e.preventDefault();
  const toDo = input.value;
  input.value = "";
  dispatchAddToDo(toDo);
};

form.addEventListener("submit", onSubmit);





