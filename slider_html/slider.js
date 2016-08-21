function Fotorama(containerImg, sliderList, len) {
	if (!sliderList) {return;}
	//контейнер для большого изображения .img-slide
	this.containerImg = containerImg; 
	//контейнер маленьких изображений .slide-list
	this.sliderList = sliderList; 
	//все миниатюры изображения
	this.smallImgList = sliderList.querySelectorAll('img');
	this.outer = document.querySelector('.outer'); 
	//класс active
	this.activeClass = 'active';
	// класс viewport  
	this.viewportClass = 'viewport'; 
	//кнопка next #nextBtn
	this.btnNext = document.querySelector('.next');
	//вычисление ширины одной миниатюры 
	this.width = parseInt(window.getComputedStyle(sliderList.firstElementChild).getPropertyValue('width')); 
	//вычисление общего кол-ва миниатюр
	this.count = sliderList.children.length; 
	//сколько выводить миниатюр
	this.len = len; 

	this.firstElementInit(this.sliderList, this.containerImg, this.activeClass);
	this.cssGenerator(this.sliderList, 'width', (this.width + 10) * this.count);
	this.cssGenerator(this.outer, 'width', (this.width + 10) * this.len);
	this.addViewport(this.sliderList, this.len, this.viewportClass);
	this.addListener(this.sliderList, this.btnNext);
};

// Функция создания свойства для элемента
Fotorama.prototype.cssGenerator = function (elem, props, value) {
	elem.style.cssText += props + ':' + (value) + 'px';
}


// Функция добавление класса viewport миниатюре картинки
Fotorama.prototype.addViewport = function () {
	for (var i = 0; i < this.count; i++) {
		if (i < this.len) {this.sliderList.children[i].classList.add(this.viewportClass);}
	}
}

// Общая функция добавления событий по клику
Fotorama.prototype.addListener = function () {
	this.sliderList.addEventListener('click', this.handler.bind(this));
	this.btnNext.addEventListener('click', this.handlerToClick.bind(this));
}

// Функция загрузки первого большого изображение в зависимости от первого изображения миниатюры
Fotorama.prototype.firstElementInit = function () {
	var first = this.sliderList.firstElementChild,
		src = first.src ? first.src : '';

	this.containerImg.insertAdjacentHTML('afterBegin', '<img src="' + src + '">');
	first.classList.add(this.activeClass);
}

// Функция клика по кнопке NEXT
Fotorama.prototype.handlerToClick = function () {
	var active = document.querySelector('.' + this.activeClass);
	if (active.nextElementSibling && active.nextElementSibling.classList.contains(this.viewportClass)) {
		this.handler(null, active.nextElementSibling);
	} else {
		active.nextElementSibling.classList.add(this.viewportClass);
		this.cssGenerator(this.sliderList, 'left', (-(this.width + 10)));
		this.sliderList.firstElementChild.classList.remove(this.viewportClass);
		this.sliderList.appendChild(this.sliderList.firstElementChild);
		this.handler(null, active.nextElementSibling);
		this.cssGenerator(this.sliderList, 'left', (0));
	}
}


// Функция выбора миниатюры изображения => Большое изображение
Fotorama.prototype.handler = function(event, elem) {
	var target = event && event.target ? event.target : elem,
          src = target.src ? target.src : "";

	this.removeClass();

	if(target.tagName === 'IMG') {
		this.containerImg.firstElementChild.src = src;
		target.classList.add(this.activeClass);
	} 
}

// Функция удаление класса active 
Fotorama.prototype.removeClass = function () {
	var active = document.querySelector('.' + this.activeClass);
	if (active.tagName === 'IMG') {
		active.classList.remove(this.activeClass);
	}
}

new Fotorama(document.querySelector('.img-slide'), document.querySelector('.slider-list'), 5);

