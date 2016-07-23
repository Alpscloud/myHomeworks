// Первый вариант

var userAnswer = prompt('Кто пришел?'),
	trueAnswer;

if (userAnswer == '') {
	alert('Извините, Вы не представились!');
} else if (userAnswer == 'php') {
	alert('Вы ошиблись курсом!');
} else if (userAnswer == 'JavaScript') {
	trueAnswer = prompt('Верно \nВведите пароль:');
	if (trueAnswer == '') {
		alert('Вход отменен');
	} else if (trueAnswer == 'ECMA') {
		alert('Поздравляю, это правильный ответ!');
	} else {
		alert('Пароль не верный');
	}
} else {
	alert('Вы попали явно не туда.')
// Второй вариант

var userAnswer = prompt('Кто пришел?');
	trueAnswer,
	result;

result = (userAnswer == '') ? alert('Извините, Вы не представились!') :
		 (userAnswer == 'php') ? alert('Вы ошиблись курсом!') :
		 (userAnswer == 'JavaScript') ?  trueAnswer = prompt('Верно \nВведите пароль:') : 
		 	(trueAnswer == '') ? alert('Вход отменен') :
		 	(trueAnswer == 'ECMA') ? alert('Поздравляю!\nЭто правильный пароль!') : alert('Вы ввели не правильный пароль.');
alert(result);

// Initial the input data 'Password and question'
var pass, 
lang = prompt('Кто пришел?');
var message = (lang === 'PHP' // Input PHP
				? 'Нет не стоит' // User shouldn't enter 
				: (lang === '' // Blank input
				? 'Вход отменен' // User can't enter
				: (lang === 'JavaScript' // Input JavaScript
				? ((pass = prompt('Введите пароль')) === '' // User should enter the password if blank password
				? 'Вход отменен' // Enter is canceled
				: (pass === 'ECMA' // Password is ECMA 
				? 'Добро пожаловать' // User can enter
				: 'Пароль не верен')) // In other cases password is wrong
				: 'Некоректные пользователь'))); // For case when user enter some invalid user data

alert (message);


// var lang = prompt('Какой язык вы изучает?', '');
// var message = (lang == 'JavaScript') ? 'Да вы учите ' + lang : (lang == 'PHP') ? 'Да вы гоните' : 'Вы учите непонятно что';