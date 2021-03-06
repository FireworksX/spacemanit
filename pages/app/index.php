<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Spaceman IT - запрограммируй свой мозг</title>
	<link rel="stylesheet" href="pages/app/styles/css/libs.min.css">
	<link rel="stylesheet" href="pages/app/styles/css/reset.css">
	<link rel="stylesheet" href="pages/app/styles/css/main.css">
</head>
<body>
<div class="modal">
    <div class="modal__body">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium adipisci corporis cum cupiditate earum et explicabo itaque iusto labore magni maxime necessitatibus numquam optio, qui quo quos voluptatibus? Aspernatur, unde!</div>
</div>
<div id="app">
	<div class="bar">
		<div class="left-slide">
			<ul class="left-slide__list">
				<li class="left-slide__item">Главная</li>
				<li class="left-slide__item">Инструкция</li>
				<li class="left-slide__item">Вызвать Андрюху!</li>
			</ul>
		</div>
		<div class="bar-circle">
			<div class="bar-circle__sandwich-1"></div>
			<div class="bar-circle__sandwich-2"></div>
			<div class="bar-circle__sandwich-3"></div>
		</div>
		<div class="breadcrumbs">
			<div class="breadcrumbs__main">Главная</div>
			<div class="breadcrumbs__second">Front-End</div>
		</div>
	</div>
	<div class="profile">
		<div class="profile__avatar"></div>
		<div></div>
		<div class="profile-stats">
			<div class="profile-stats__name">{{ user.login }}</div>
			<div class="profile-stats__money">$100</div>
		</div>
	</div>
	<div class="add">
		<div class="add__plus"><i class="zmdi zmdi-plus zmdi-hc-3x"></i></div>
		<div class="add__exit"><i class="zmdi zmdi-close zmdi-hc-2x"></i></div>
		<div class="add-name">
			<div class="add-name__text">Имя</div>
			<input v-model="nodeData.name" type="text" class="add-name__input">
		</div>
		<div class="add__pos"></div>
		<div class="add-active">
			<div class="add-active__left">Активна</div>
			<div class="add-active__right">Не активна</div>
		</div>
		<div class="add-pos">
			<div class="add-pos__x">X: 0</div>
			<input v-model="nodeData.x" hidden="hidden" type="text" class="add-pos__xi">
			<div class="add-pos__y">Y: 0</div>
			<input hidden="hidden" type="text" class="add-pos__yi">
		</div>
		<div class="add-icon">
			<div class="add-icon__text">Иконка</div>
			<input v-model="nodeData.icon" type="text" class="add-icon__input">
		</div>
		<div class="add-data">
			<div class="add-color">
				<div class="add-color__text">Цвет</div>
				<input v-model="nodeData.color" type="text" class="add-color__input">
			</div>
			<div class="add-size">
				<div class="add-size__text">Размер</div>
				<input v-model="nodeData.size" type="text" class="add-size__input">
			</div>
			<div class="add-parent">
				<div class="add-parent__text">Родитель</div>
				<input v-model="nodeData.parent" type="text" class="add-parent__input">
			</div>
			<div class="add-dif">
				<div class="add-dif__text">Сложность</div>
				<input v-model="nodeData.dif" class="add-dif__input"></input>
			</div>
			<div class="add-path">
				<div class="add-path__text">ID Урока</div>
				<input v-model="nodeData.path" class="add-path__input"></input>
			</div>
		</div>
		<div class="add__button">Добавить</div>
	</div>
</div>
<div id="particles-js"></div>

	<script src="https://cdn.jsdelivr.net/npm/vue-resource@1.3.4"></script>
	<script src="pages/app/scripts/libs.min.js"></script>
	<script src="pages/app/scripts/common_app.js"></script>
</body>
</html>