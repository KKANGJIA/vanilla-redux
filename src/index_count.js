//store은 데이터인 state를 담는 곳을 말하고 state는 애플리케이션에서 바뀌는 데이터를 말한다
import {createStore} from 'redux'; 

const add = document.querySelector('#add');
const minus = document.querySelector('#minus');
const number = document.querySelector('span');

// 개선 사항 2. 상수로 변수를 만들어서 문자열의 오타로 인한 버그 발생을 방지하고 변수를 보호하자
// 문자열의 오타는 JS가 가르쳐주지 않지만 변수의 오타는 JS가 가르쳐주기 때문이기도 함
const ADD = 'ADD';
const MINUS = 'MINUS'; 

number.textContent = 0; //화면 state 초기화

// countModifier는 나의 데이터를 modify하는 함수여야 함
// action은 counterModifier와 의사소통하기 위한 것으로 깂을 어떻게 바꿀 수 있는 지에 대한 로직이 들어감 
const countModifier = (count = 0, action) => {
  
  // 개선사항 1. if~else문 대신 switch를 사용하면 깔끔하게 작성 가능하고 그대로 써도 괜찮긴 함 
  switch(action.type){
    case ADD:
      return count + 1;
    case MINUS:
      return count - 1;
    default:
      return count;
  }
  
  // if(action.type === 'ADD') { // ADD는 대문자일 수도 소문자일 수도 있음
  //   console.log(count,action);
  //   return count + 1; // count++은 값이 바뀌지 않음 주의
  // } else if ( action.type === 'MINUS') {
  //   return count - 1;
  // } else {
  //   return count;
  // }
} 


//store 생성, reducer인 countModifier를 필요로 함(어떻게 state를 수정할지 얘기해줘야 하니까) 
const countStore = createStore(countModifier); 

// store 변화 감지를 위한 html 업데이트 함수
const onChange = () => {
  number.textContent = countStore.getState();
}

// 이 함수는 store에 변화가 있을때마다 감지해서 불려질 것
countStore.subscribe(onChange); 

// 버튼에 연결하기
// anonymous function의 형태여야만 동작함 () => {}
const handleAdd = () => {
  countStore.dispatch({ type: ADD}) ;
}
const handleMinus = () => {
  countStore.dispatch({ type: MINUS}) ;
}
add.addEventListener("click", handleAdd ); 
minus.addEventListener("click", handleMinus );

// 위와 동일, 문법만 분리해놓은 것
// add.addEventListener("click", () => countStore.dispatch({ type: 'ADD'}) ); 
// minus.addEventListener("click", () => countStore.dispatch({ type: 'MINUS'}) );

// action을 보내서 message를 전달하기 위한 dispatch함수
// countStore.dispatch({ type: 'ADD'}); 
// countStore.dispatch({ type: 'ADD'}); 
// countStore.dispatch({ type: 'ADD'}); 
// countStore.dispatch({ type: 'ADD'}); 
// countStore.dispatch({ type: 'Minus'}); 











