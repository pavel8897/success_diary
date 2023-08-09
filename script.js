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
	// const labelElement = ul.querySelector(`label[for="item_${num}"]`)
	// labelElement.classList.toggle('text-through')
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

/*
    ToDo:
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