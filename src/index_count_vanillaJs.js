//redux를 적용하기 전의 vanilla JS

const add = document.querySelector('#add');
const minus = document.querySelector('#minus');
const number = document.querySelector('span');

let count = 0; //data가 바뀌는 지점으로 state

number.textContent = count;

// html에게 화면을 업데이트하라고 알려주는 것
const updateNumber = () => {
  number.textContent = count;
}

const handleAdd = () => {
  count = count + 1;
  updateNumber();
}

const handleMinus = () => {
  count = count - 1;
  updateNumber();
}

add.addEventListener('click', handleAdd);
minus.addEventListener('click', handleMinus);