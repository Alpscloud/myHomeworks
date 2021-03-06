// Кроссбраузерный объект добавления\удаления события
var EventUtil = {
	// добавляем событие
	addHandler: function(element, type, handler){
		if (element.addEventListener) {
			element.addEventListener(type, handler, false);
		} else if (element.attachEvent) {
			element.attachEvent('on' + type, handler); // так как тип для ИЕ onclick и тд, то добавляем on к типу события
		} else {
			element['on' + type] = handler;
		}
	},
	// удаление события
	removeHandler: function(element, type, handler) {
		if (element.removeEventListener) {
			element.removeEventListener(type, handler, false);
		} else if (element.detachEvent) {
			element.detachEvent('on' + type, handler);
		} else {
			element['on' + type] = null;
		}
	},
	// остановка события
	stopPropagation: function (e) {
		if (e.stopPropagation) {
			e.stopPropagation();
		} else {
			e.cancelBubble = true;
		}
	},
	// проверка на объект event 
	getEvent: function(e) {
		return e ? e : window.e;
	},
	// получение target.event
	getTarget: function(e) {
		return e.target || e.srcElement;
	},
	// сброс дефолтного поведения элементов
	preventDefault: function(e) {
		if (e.preventDefault) {
			e.preventDefault();
		} else {
			e.returnValue = false;
		}
	}
};

// Перетаскивание блока

var movingBlock = function () {
	// Находим блок
	var block = document.getElementById('moving');

	function dragHandler(e) {
		var e = EventUtil.getEvent(e), // проверка на событие
		// определяем координаты курсора относительно окна
		 	startX = e.clientX, 
			startY = e.clientY,
			// определяем позицию блока
			offsetX = block.offsetLeft,
			offsetY = block.offsetTop,
			// разница в координатах
			deltaX = startX - offsetX,
      		deltaY = startY - offsetY;

      	window.addEventListener("mousemove", moveHandler);
        window.addEventListener("mouseup", upHandler);

        function moveHandler (e) {
        	block.style.left = (e.clientX - deltaX) + "px";
            block.style.top = (e.clientY - deltaY) + "px";
        }

        function upHandler(e) {
            window.removeEventListener("mouseup", upHandler);
            window.removeEventListener("mousemove", moveHandler);
       	}
    }

    EventUtil.addHandler(document.body, 'mousedown', dragHandler);

};

EventUtil.addHandler(document, 'DOMContentLoaded', movingBlock);

// Кнопка наверх
var upButton = function () {

	var btn = document.getElementById('up');

	function showBtn () {
		// определеяем высоту прокрутки
		var height = document.body.scrollTop;

		if (height >= 350) {
			btn.style.cssText = 'display: block';
		} else if (height <= 351) {
			btn.style.cssText = 'display: none';
		}
	}

	// функция при клике на кнопку скролит вверх
	function goToTop (e) {
		var e = EventUtil.getEvent(e),
			elemTarget = EventUtil.getTarget(e);
		if(elemTarget.getAttribute('data-id')) {
			window.scrollTo(0,0);
		}
	}

	EventUtil.addHandler(document.body, 'click', goToTop);
	EventUtil.addHandler(document, 'scroll', showBtn);
};

EventUtil.addHandler(document, 'DOMContentLoaded', upButton);


// Валидация формы

// регистрация обработчиков событий элементов формы.
var validation = function () {

	// находим элементы формы
	var form = document.querySelector('form'),
		allInputs = form.querySelectorAll('input');
		console.log(allInputs);
	// проверяем значение name и вешаем на них обработчики события
	for (var i = 0; i < allInputs.length; i++) {

		if (allInputs[i].getAttribute('name') === 'userName') {
			allInputs[i].addEventListener('change', nameOnChange);

		} else if (allInputs[i].getAttribute('name') === 'email') {
			allInputs[i].addEventListener('change', emailOnChange);

		} else if (allInputs[i].getAttribute('name') === 'zip') {
			allInputs[i].addEventListener('change', zipcodeOnChange);

		} else if (allInputs[i].getAttribute('type') === 'submit') {
			allInputs[i].addEventListener('submit', onsubmitHandler);
		}
	};
    
	// метод проверки значения в элементе по регулярному выражению.
	function validate(elem, pattern) {
	    var res = pattern.test(elem.value);
	    if (res === false) {
	        elem.className = "invalid";
	    } // установка CSS класса 
	    else {
	        elem.className = "valid";
	    }
	}

	// обработчики событий изменения текста в окне.
	function nameOnChange() {
	    var pattern = /\S/;
	    validate(this, pattern);
	}

	function emailOnChange() {
	    var pattern = /\b[a-z0-9._]+@[a-z0-9.-]+\.[a-z]{2,4}\b/i;
	    validate(this, pattern);
	}

	function zipcodeOnChange() {
	    var pattern = /\d{5}/;
	    validate(this, pattern);
	}

	// событие при отправке формы на сервер.
	function onsubmitHandler(e) {

	    for (var i = 0; i < allInputs.length; ++i) {
	        if (allInputs[i].type === "text")
	            allInputs[i].className = "valid";
	    }

	    var invalid = false;

	    for (var i = 0; i < allInputs.length; ++i) {
	        var e = allInputs[i];
	        // проверка типа элемента и наличия обработчика события onchange.
	        if (e.type == "text" && e.onchange) {
	            e.onchange(); // запуск события onchanhe
	            if (e.className == "invalid") invalid = true;
	        }
	    }

	    if (invalid) {
	        alert("Допущены ошибки при заполнении формы.");
	        e.preventDefault();
	        return false; // отмена отправки формы.
	    }
	}
};

EventUtil.addHandler(document, 'DOMContentLoaded', validation);

	
