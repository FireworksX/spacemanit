<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Spaceman IT - запрграммируй свой мозг</title>
	<link rel="stylesheet" type="text/css" href="styles/css/libs.min.css">
	<link rel="stylesheet" type="text/css" href="styles/css/reset.css">
	<link rel="stylesheet" type="text/css" href="styles/css/main.css">
	<meta name="viewport" content="width=1170">
    <link rel="icon" href="favicon.ico" type="image/x-icon" />
    <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
</head>
<body>

<div id="app">
    <div class="modalwindow">
        <ul class="modalwindow__list"></ul>
    </div>
    <div class="main">
        <div class="main__img"></div>
        <div class="main__panel">
            <div class="main__head"></div>
            <div class="main__authvk"><i class="zmdi zmdi-vk"></i> Войти с помощью VK</div>
            <div class="signin">
                <input type="text" placeholder="Логин" class="signin__login">
                <input type="text" placeholder="Пароль" type="password" class="signin__password">
            </div>
            <div class="register">
                <input type="text" placeholder="Имя" class="register__firstname">
                <input type="text" placeholder="Фамилия" class="register__lastname">
                <input type="text" placeholder="Логин" class="register__login">
                <input type="email" placeholder="Почта" class="register__mail">
                <input type="password" placeholder="Пароль" class="register__password">
                <input type="password" placeholder="Ещё раз пароль" class="register__confpassword">
            </div>
            <div class="confirm">
                <input type="text" placeholder="Код из письма" maxlength="5" class="confirm__code">
            </div>
            <div class="recovery">
                <input type="email" placeholder="Почта" class="recovery__email">
            </div>
            <div class="main__start">Войти</div>
            <div class="main__recovery">Забыли пароль?</div>
            <div class="main__register">Вы ещё не снами? <span>Присоединиться!</span></div>
        </div>
    </div>
</div>

	<script src="https://cdn.jsdelivr.net/npm/vue-resource@1.3.4"></script>
	<script src="scripts/libs.min.js"></script>
	<script src="scripts/common_main.js"></script>
</body>
</html>