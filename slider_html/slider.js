function Fotorama(elem, preview, len) {
	if (!elem) return;
	this.elem = elem; //контейнер для большого изображения #big-img
	this.preview = preview; //контейнер маленьких изображений #small-img
	this.smallImgList = preview.querySelectorAll('img'); //все миниатюры изображения
	this.outer = document.querySelector('.outer'); 
	this.active = 'active'; //класс active
	this.viewport = 'viewport'; // класс viewport 
	this.btnNext = document.getElementById('btnNext'); //кнопка next #nextBtn
	this.width = parseInt(window.getComputedStyle(preview.firstElementChild).getPropertyValue('width')); //вычисление ширины одной миниатюры
	this.count = preview.children.length; //вычисление общего кол-ва миниатюр
	this.len = len; //сколько выводить миниатюр


	this.firstElementInit(this.preview, this.elem, this.active);
	this.cssGenerator(this.preview, 'width', (this.width + 10) * this.count);
	this.cssGenerator(this.outer, 'width', (this.width + 10) * this.len);
	this.preview.addEventListener('click', this.draw.bind(this));
	this.elem.insertAdjacentHTML('afterBegin', "<img src='" + this.preview.firstElementChild.getAttribute('src') + "' />");
	this.addListener(this.draw, this.handlerToClick);
};

// Функция загрузки первого большого изображение в зависимости от первого изображения миниатюры
Fotorama.prototype.firstElementInit = function () {
	var first = this.preview.firstElementChild,
		src = first.src ? first.src : '';

	this.elem.insertAdjacentHTML('afterBegin', '<img src="' + src + '">');
	first.classList.add(this.active);
}

// Функция создания свойства для элемента
Fotorama.prototype.cssGenerator = function (elem, props, value) {
	elem.style.cssText += props + ':' + value + 'px';
}

// Функция удаление класса active 
Fotorama.prototype.removeClass = function () {
	for (var i = 0; i < this.smallImgList.length; i++) {
		this.smallImgList[i].classList.remove(this.active);
		this.smallImgList[i].removeAttribute('class');
	};
}

// Функция добавление класса viewport миниатюре картинки
Fotorama.prototype.addViewport = function () {
	for (var i = 0; i < this.count; i++) {
		this.preview.children[i].classList.add(this.viewport);
	}
}

// Общая функция добавления событий по клику
Fotorama.prototype.addListener = function () {
	this.preview.addEventListener('click', this.draw.bind(this));
	this.btnNext.addEventListener('click', this.handlerToClick.bind(this));
}

// Функция выбора миниатюры изображения => Большое изображение
Fotorama.prototype.draw = function(e) {
	if (!e) e = window.event;
	var el = e.target;

	this.removeClass();

	if(el.tagName === 'IMG') {
		this.elem.firstElementChild.src = el.src;
		el.classList.add(this.active);
	} 
}

// Функция клика по кнопке NEXT
Fotorama.prototype.handlerToClick = function () {
	var active = document.querySelector(this.active),
		nextActiveSibling = active.nextElementSibling;
	if (nextActiveSibling && nextActiveSibling.classList.contains(this.viewport)) {
		this.draw(null, nextActiveSibling);
	} else {
		nextActiveSibling.classList.add(this.viewport);
		this.cssGenerator(this.preview, 'left', -(this.width + 10));
		this.preview.firstElementChild.classList.remove(this.viewport);
		this.preview.appendChild(this.preview.firstElementChild);
		this.draw(null, nextActiveSibling);
		this.cssGenerator(this.preview, 'left', 0);
	}
}

new Fotorama(document.querySelector('#big-img'), document.querySelector('#small-img'), 3);


