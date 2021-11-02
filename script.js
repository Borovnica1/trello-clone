const divs = document.getElementsByClassName('div');
const body = document.querySelector('body');
let div = document.createElement('div');

const addItemSpans = document.querySelectorAll('.add-item');
const saveItemSpans = document.querySelectorAll('.save-item');
const textItemTextareas = document.querySelectorAll('.text-item');
const addItemsDiv = document.querySelector('.add-items');

function addItem(textEl) {
  const parentDiv = textEl.parentElement;
  const html = `<span class="list-item">${textEl.value}</span>`;
  parentDiv.insertAdjacentHTML('beforebegin', html)
};

function toggleAddItem() {
  let thisTextArea = this.parentElement.querySelector('.text-item');
  if (this.parentElement.classList.contains('add-item--active') && thisTextArea.value.length > 0) {
    addItem(thisTextArea);
    thisTextArea.value = '';
  }
  this.parentElement.classList.toggle('add-item--active');
};

for (let item of addItemSpans) {
  item.addEventListener('click', toggleAddItem);
};
for (let item of saveItemSpans) {
  item.addEventListener('click', toggleAddItem);
};


div.className = 'div';
console.log('X', div);
body.insertAdjacentElement('beforeend', div);
console.log('DIVSSS', divs);