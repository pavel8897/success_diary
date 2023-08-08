let todoArr = [];
let todos = '';
let inputEntry = document.querySelector('input[type=text]');
let btn = document.querySelector('input[type=submit]');
let ul = document.querySelector('ul');
let editValue = '';

function getLocal() {
	if(localStorage.getItem('arrTodos') != undefined) {
		todoArr = JSON.parse(localStorage.getItem('arrTodos'));
		outCase();
	}
}

getLocal();

btn.addEventListener('click', addCase);

function addCase() {
	let text = inputEntry.value;
	let newTodo = {todo: text, checked: false, edit: false};
	if(text != '') {
		todoArr.push(newTodo);
	}		
	todoArr = Array.from(new Set(todoArr.map(JSON.stringify))).map(JSON.parse)	;	
	outCase();
}

function outCase() {		
	todos = '';
	todoArr.forEach((item, i) => {
		
		todos += `
			<li>
				<div>
					<input onClick="checkCase(${i})" type="checkbox" id="item_${i}" ${item.checked ? 'checked' : ''}>
					${item.edit ? `<input onblur="fixCase(this.value, ${i})" value=${item.todo} type="text">` :
					`<label for="item_${i}">${item.todo}</label>`}
				</div>
				<div>
					<input onclick="editCase(${i})" type="submit" value="Редактировать">
					${item.checked ? `<input type="submit" value="Удалить" onClick="delCase(${i})">` : ''}
				</div>
			</li>`
	});
	ul.innerHTML = todos;
	inputEntry.value = '';
	localStorage.setItem('arrTodos', JSON.stringify(todoArr));
}

function delCase(num) {
	todoArr.splice(num, 1);
	outCase();
}

function checkCase(num) {
	todoArr[num].checked = !todoArr[num].checked;
	outCase();
	// const labelElement = ul.querySelector(`label[for="item_${num}"]`)
	// labelElement.classList.toggle('text-through')
}

function editCase(num) {
	todoArr[num].edit = !todoArr[num].edit;
	outCase();
}

function fixCase(value, num) {
    if(value != '') {
        todoArr[num].todo = value;
    }	
    todoArr[num].edit = !todoArr[num].edit;
    outCase();
}

/*
    ToDo:
	- onclick="onEdit(${i})" (поправить на делегирование)
	- style="${item.checked ? 'text-decoration: line-through' : ''}" (решить путём навешивания классов)


draw - отрисовка таблицы
createTable - создание таблицы (вёрсика)
normalize - добавление пустых ячеек в начало и конец массива

getFirstWeekDay - получение номера первого дня недели
getLastWeekDay - получение номера последнего дня недели
getLastDay - получение последнего дня

range - создание массива
chunk - разделение массива


1) получить количество дней в месяце
2) создать массив дней месяца
3) получить первый и последний день на неделе
4) сделать массив с пустыми ячейками
5) разбить массив по 7 дней в неделю
6) создать таблицу и вывести её в контейнер
*/