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
	todoArr = Array.from(new Set(todoArr.map(JSON.stringify))).map(JSON.parse);	
	outCase();
}

function outCase() {		
	todos = '';
	
	todoArr.forEach((item, i) => {		
		todos +=
			`<li>
				<div>
					<input class="check" atr=${i} type="checkbox" id="item_${i}" ${item.checked ? 'checked' : ''}>					
					${item.edit ?
						`<input onblur="fixCase(this.value, ${i})" value=${item.todo} type="text">`
					:
						`<label class="${item.checked ? 'text-through' : ''}" for="item_${i}">${item.todo}</label>`
					}
				</div>
				<div>
					<input class="edit" atr=${i} type="submit" value="Редактировать">
					${item.checked ?
						`<input class="del" atr=${i} type="submit" value="Удалить">`
					:
						''
					}
				</div>
			</li>`
	});
	
	ul.innerHTML = todos;
	inputEntry.value = '';
	localStorage.setItem('arrTodos', JSON.stringify(todoArr));
}

ul.addEventListener('click', function(e) {
	let target = e.target;
	let num = e.target.getAttribute('atr');
	if(target.classList.contains('check')) {
		checkCase(num);
	}else if (target.classList.contains('edit')) {
		editCase(num);
	}else if (target.classList.contains('del')) {
		delCase(num);
	}
})

function checkCase(num) {
	todoArr[num].checked = !todoArr[num].checked;
	outCase();
}

function editCase(num) {
	todoArr[num].edit = !todoArr[num].edit;
	outCase();
}

function delCase(num) {
	todoArr.splice(num, 1);
	outCase();
}

function fixCase(value, num) {
    if(value != '') {
        todoArr[num].todo = value;
    }	
    todoArr[num].edit = !todoArr[num].edit;
    outCase();
}

/*Calendar*/

let calendar = document.querySelector('#calendar');
let body = document.querySelector('.body');
let info = document.querySelector('.info');

let prev = document.querySelector('.prev');
let next = document.querySelector('.next');

let date = new Date();
let year = date.getFullYear();
let month = date.getMonth();

draw(body, year, month);

function getMonthName(month) {
	const monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
	return monthNames[month];
}

info.textContent = year + ' ' + getMonthName(month);

prev.addEventListener('click', function() {
	if(month===0) {
		month = 11;
		year--;
	}else{
		month--;
	}

	info.textContent = year + ' ' + getMonthName(month);
	draw(body, year, month)
})

next.addEventListener('click', function() {		
	if(month===11) {
		month = 0;
		year++;
	}else{
		month++;
	}
	
	info.textContent = year + ' ' + getMonthName(month);
	draw(body, year, month)
})

function draw(body, year, month) {
	let arr = range(getLastDay(year, month));
	let firstWeekDay = getFirstWeekDay(year, month);
	let lastWeekDay = getLastWeekDay(year, month);
	let nums = chunk(normalize(arr, firstWeekDay, 6 - lastWeekDay), 7);
	
	createTable(body, nums);

	let td = document.querySelectorAll('tr td');

	td.forEach((item, i) => {
		item.onclick = function() {
			let date = this.innerHTML
			if(this.classList.contains('active')) {
				this.classList.remove('active');
			}else{
				td.forEach(item => item.classList.remove('active'));
				this.classList.add('active');
			}
		}
	})
}

function createTable(parent, arr) {
	parent.textContent = '';
	let cells = [];
	console.log(arr);
	for(let sub of arr) {
		let tr = document.createElement('tr');

		for(let num of sub) {
			let td = document.createElement('td');
			td.textContent = num;
			tr.appendChild(td);

			cells.push(tr);
		}
		parent.appendChild(tr);
	}
	
	return cells;
}

function normalize(arr, left, right) {
	for (let i = 0; i < left; i++) {
		arr.unshift('');
	}
	for (var i = 0; i < right; i++) {
		arr.push('');
	}
	
	return arr;	
}

function getFirstWeekDay(year, month) {
	let date = new Date(year, month, 1);
	let num = date.getDay();

	if(num == 0) {
		return 6;
	}else{
		return num - 1;
	}
}

function getLastWeekDay(year, month) {
	let date = new Date(year, month+1, 0);
	let num = date.getDay();

	if(num == 0) {
		return 6;
	}else{
		return num - 1;
	}
}

function getLastDay(year, month) {
	let date = new Date(year, month + 1, 0);
	return date.getDate();
}

function range(count) {
	let arr = [];
	for(i=1;i<=count;i++) {
		arr.push(i);
	}
	return arr;
}

function chunk(arr, n) {
	let result = [];
	let count = Math.ceil(arr.length / n);
	
	for (let i = 0; i < count; i++) {
		let elems = arr.splice(0, n);
		result.push(elems);
	}
	
	return result;
}

/*

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