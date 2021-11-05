const body = document.querySelector('body');

const addItemSpans = document.querySelectorAll('.add-item');
const saveItemSpans = document.querySelectorAll('.save-item');
const textItemTextareas = document.querySelectorAll('.text-item');
const addItemsDiv = document.querySelector('.add-items');

const container = document.querySelector('.container');
const dropDivs = document.querySelectorAll('.container > .div');
let ids = 1;

let dropDivActiveZone = null;

let dropZonesDivs = [[],[],[],[]];

if (sessionStorage.getItem('active') === 'true') {
  var storedItems = JSON.parse(sessionStorage.getItem("dropZones"));
  dropZonesDivs[0].push(...storedItems[0]);
  dropZonesDivs[1].push(...storedItems[1]);
  dropZonesDivs[2].push(...storedItems[2]);
  dropZonesDivs[3].push(...storedItems[3]);
} else {
  sessionStorage.setItem('active', 'true');
  dropZonesDivs[0].push('Some example', 'Some example');
  sessionStorage.setItem('dropZones', JSON.stringify(dropZonesDivs));
};
populateDropZones();


function populateDropZones() {
  for (let i = 0; i < dropDivs.length; i++) {
    for (let j = 0; j < dropZonesDivs[i].length; j++) {
      const htmlEl = document.createElement('span');
      htmlEl.setAttribute('class', 'list-item'); 
      htmlEl.setAttribute('id', `${ids++}`); 
      htmlEl.setAttribute('draggable', 'true'); 
      htmlEl.textContent = dropZonesDivs[i][j];
      htmlEl.addEventListener('dragstart', dragstart_handler);
      htmlEl.addEventListener("dragend", dragend_handler);

      dropDivs[i].insertBefore(htmlEl, dropDivs[i].children[dropDivs[i].children.length-1]);
    };
  };
};

function addItem(textEl) {
  const parentDiv = textEl.parentElement.parentElement;
  
  const htmlEl = document.createElement('span');
  htmlEl.setAttribute('class', 'list-item'); 
  htmlEl.setAttribute('id', `${ids++}`); 
  htmlEl.setAttribute('draggable', 'true'); 
  htmlEl.textContent = textEl.value;
  htmlEl.addEventListener('dragstart', dragstart_handler);
  htmlEl.addEventListener("dragend", dragend_handler);

  dropZonesDivs[Number(parentDiv.dataset.divid)].push(textEl.value);
  sessionStorage.setItem('dropZones', JSON.stringify(dropZonesDivs));
  parentDiv.insertBefore(htmlEl, textEl.parentElement);
};

function toggleAddItem() {
  let thisTextArea = this.parentElement.querySelector('.text-item');
  if (this.parentElement.classList.contains('add-item--active') && thisTextArea.value.length > 0) {
    addItem(thisTextArea);
    thisTextArea.value = '';
  }
  this.parentElement.classList.toggle('add-item--active');
};


function dragstart_handler(ev) {
  // Add the target element's id to the data transfer object
  //  ev.dataTransfer.setData("text/plain", ev.target.innerText);
  ev.target.classList.add('list-item--active');
  ev.target.parentElement.classList.add('drop-div--active');
  ev.target.parentElement.classList.add('drop-div-started-from');
  ev.dataTransfer.setData("text/plain", ev.target.id);
  ev.dataTransfer.effectAllowed = "move";
};

function dragenter_handler(ev) {
  ev.preventDefault();
  ev.dataTransfer.dropEffect = "move";
  if (ev.target == 'body' || ev.target.classList.contains('container')) {
    if (dropDivActiveZone) {
      dropDivActiveZone.classList.remove('drop-div--active');
    };
  } else {
    let dropDiv;
    if (ev.target.classList.contains('div')) dropDiv = ev.target
    else if (ev.target.parentElement.classList.contains('div')) dropDiv = ev.target.parentElement;
    else if (ev.target.parentElement.parentElement.classList.contains('div')) dropDiv = ev.target.parentElement.parentElement;
    if (!dropDiv.classList.contains('drop-div-started-from')) {
      dropDivActiveZone = dropDiv;
      dropDiv.classList.add('drop-div--active');
    };

  };
};

function dragover_handler(ev) {
  ev.preventDefault();
  ev.dataTransfer.dropEffect = "move"
};

function drop_handler(ev) {
  ev.preventDefault();
  // Get the id of the target and add the moved element to the target's DOM
  const data = ev.dataTransfer.getData("text/plain");
  let dropDiv;
  if (ev.target.classList.contains('div')) dropDiv = ev.target
  else if (ev.target.parentElement.classList.contains('div')) dropDiv = ev.target.parentElement;
  else if (ev.target.parentElement.parentElement.classList.contains('div')) dropDiv = ev.target.parentElement.parentElement;
  dropDiv.insertBefore(document.getElementById(data), dropDiv.querySelector('.add-items'));
};

function dragend_handler(ev) {
  ev.target.classList.remove('list-item--active');
  for (let div of dropDivs) {
    div.classList.remove('drop-div--active');
    div.classList.remove('drop-div-started-from');
    dropDivActiveZone = null;
  };

  dropZonesDivs = [[],[],[],[]];
  for (let i = 0; i < dropDivs.length; i++) {
    const items = dropDivs[i].querySelectorAll('.list-item');
    for (let j = 0; j < items.length; j++) {
      dropZonesDivs[i].push(items[j].textContent);
    };
  };
  sessionStorage.setItem('dropZones', JSON.stringify(dropZonesDivs));
}

for (let item of addItemSpans) {
  item.addEventListener('click', toggleAddItem);
};
for (let item of saveItemSpans) {
  item.addEventListener('click', toggleAddItem);
};

for (let div of dropDivs) {
  div.addEventListener('drop', drop_handler);
  div.addEventListener('dragover', dragover_handler);
  div.addEventListener('dragenter', dragenter_handler);
  //div.addEventListener('dragleave', dragleave_handler);
};

container.addEventListener('dragenter', dragenter_handler);
body.addEventListener('dragenter', dragenter_handler);

window.addEventListener('DOMContentLoaded', () => {
  // Get the element by id
  // const element = document.getElementById("p1");
  // Add the ondragstart event listener
  const listItems = document.querySelectorAll('.list-item');
  for (let item of listItems) {
    item.addEventListener("dragstart", dragstart_handler);
    item.addEventListener("dragend", dragend_handler);
  };
});