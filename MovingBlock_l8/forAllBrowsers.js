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

// Перетаскивание блока

var movingBlock = function () {

	var block = document.getElementById('moving');

	EventUtil.addHandler(document.body, 'mousedown', dragHandler);

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
        };

        function upHandler(e) {
            window.removeEventListener("mouseup", upHandler);
            window.removeEventListener("mousemove", moveHandler);
       	};
    };

};

EventUtil.addHandler(document, 'DOMContentLoaded', movingBlock);

// Кнопка наверх
var upButton = function () {

	var btn = document.getElementById('up');

	// function showBtn () {
	// 	// определеяем высоту прокрутки
	// 	var height = document.body.scrollTop;
	// 	console.log(height);//IE9-

	// 	// if(height <= 400) {
	// 	// 	btn.style.cssText = "display: block";
	// 	// } else if (height >=400) {
	// 	// 	btn.style.cssText = "display: none";
	// 	// }
	// };

	function goToTop (e) {
		var e = EventUtil.getEvent(e),
			elemTarget = EventUtil.getTarget(e);
		if(elemTarget.getAttribute('data-id')) {
			window.scrollTo(0,0);
		};
	};

	EventUtil.addHandler(document.body, 'click', goToTop);
};

EventUtil.addHandler(document, 'DOMContentLoaded', upButton);

	
// EventUtil.addHandler(document, 'DOMContentLoaded', allFunctions);
