// Объявляем глобальные переменные 
var parentId = document.getElementById('menu'), // Родитель по Id
	allItems = parentId.querySelectorAll('li'); // Все детишки

// Удаление класса у выделенного элемента (если он был выделен)
function removeClass () {
	// if (allItems.classList.contains('active')) {
	// 	allItems.classList.remove('active');
	// };

	for (var i = 0; i < allItems.length; i++) {
		allItems[i].classList.remove('active');
	};
};

// Добавляем первому элементу списка класс active
function addActiveToFirstItem (){
	removeClass();
	parentId.firstElementChild.classList.add('active');
};

// Добавляем последнему элементу списка класс active, при этом убрав его у первого
function addActiveToLastItem () {
	removeClass();
	// Находим последний элемент и добавляем active
	parentId.lastElementChild.classList.add('active');	
};

// Добавить элемент в конец списка
function addItemInTheEnd (){
	// Создаем шаблон вставляемого элемента
	var template = "<li>Добавленный элемент в конец</li>";
	// Вставляем в родителя внутрь в конец
	parentId.insertAdjacentHTML('beforeEnd', template);
};

// Удалить элемент из списка
function removeItem (){
	// Находим последний элемент 
	var lastItem = parentId.lastElementChild;
	// Удаляем элемент
	parentId.removeChild(lastItem);
};

// Добавить элемент в начало
function addItemAtStart() {
	// Создаем шаблон вставляемого элемента
	var template = "<li>Добавленный элемент в начало</li>";
	// Вставляем в родителя внутрь в конец
	parentId.insertAdjacentHTML('afterBegin', template);
};

// Выбрать след. элемент
function choiceNextItem() {


	for (var i = 0; i < allItems.length; i++) {
		// Проверяем есть ли у элемента аттрибут class
		if (allItems[i].classList.contains('active')) {
			// если есть, то мы убираем этот аттрибут у текущего элемента и добавляем его следющему
			allItems[i].classList.remove('active');
			allItems[i].nextElementSibling.classList.add('active');
		};
	};
};

