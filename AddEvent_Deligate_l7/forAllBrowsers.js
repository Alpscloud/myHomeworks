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
	},
};


// удаление блоков
var hideAllBlocks = function () {
	var parentElement = document.getElementById('container'),
		stopButton = document.getElementById('stopEventButton');

	// удаляем блоки
	function hideBlock (e) {
		// var elTarget = e && e.target || event.srcElement;
		var elTarget = EventUtil.getTarget(e);
		this.removeChild(elTarget.parentNode);
	};

	// отменяем удаление блоков (событие)
	function stopHideBlock (e) {
		EventUtil.removeHandler(parentElement, 'click', hideBlock);
	};

	// вешаем события
	// parentElement.addEventListener('click', hideBlock, true);
	EventUtil.addHandler(parentElement, 'click', hideBlock);
	EventUtil.addHandler(stopButton, 'click', stopHideBlock);
};

document.addEventListener('DOMContentLoaded', hideAllBlocks);


// скрытие текста
var hideTheText = function () {
	var parentElement = document.getElementById('wrapper'),
		stopButton = document.getElementById('stopEventButton2');

	// скрываем и показываем див
	function showText (e) {
		EventUtil.preventDefault(e);
		var elTarget = EventUtil.getTarget(e),
			divText = elTarget.previousElementSibling;
		// if (divText.tagName === 'div') {
		// 	divText.classList.toggle('hidden');
		// }
		divText.classList.toggle('hidden');
	};

	// отменяем событие
	function stopCloseText (e) {
		EventUtil.removeHandler(parentElement, 'click', showText);
	}

	// вешаем события
	EventUtil.addHandler(parentElement, 'click', showText);
	EventUtil.addHandler(stopButton, 'click', stopCloseText);

};

document.addEventListener('DOMContentLoaded', hideTheText);
