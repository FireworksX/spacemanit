<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Spaceman IT - запрграммируй свой мозг</title>
	<link rel="stylesheet" type="text/css" href="styles/css/libs.min.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css" integrity="sha384-/Y6pD6FV/Vv2HJnA6t+vslU6fwYXjCFtcEpHbNJ0lyAFsXTsjBbfaDjzALeQsN6M" crossorigin="anonymous">
    <link rel="stylesheet" type="text/css" href="styles/css/reset.css">
	<link rel="stylesheet" type="text/css" href="styles/css/main.css">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="icon" href="favicon.ico" type="image/x-icon" />
    <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
</head>
<body>
<div id="app">
    <div class="top-bar">
        <div class="container-fluid">
            <div class="row">
                <div class="col-2 top-bar__logo">Spaceman IT</div>
                <div class="col-2 ml-auto top-bar__right">
                    <div class="top-bar__notification"><i class="zmdi zmdi-notifications-none"></i></div>
                    <div class="top-bar__profile">
                        <div class="top-bar__avatar"><img class="top-bar__link" src="https://s-media-cache-ak0.pinimg.com/originals/0c/0a/17/0c0a172a8e86c103bfbdfd164488961c.jpg" alt="avatar"><i class="top-bar__arrow zmdi zmdi-chevron-down"></i></div>
                        <div class="top-bar__dropdown">
                            <i class="zmdi zmdi-caret-up"></i>
                            <div class="top-bar__money"><span></span>1.200</div>
                            <div class="top-bar__level">
                                <div class="top-bar__level_percent"></div>
                                <span class="top-bar__cent">50%</span>
                            </div>
                            <div class="top-bar__exit">Выйти</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="left-bar">
        <ul class="left-bar__list">
            <li class="left-bar__item"><i class="zmdi zmdi-home"></i></li>
            <li class="left-bar__item"><i class="zmdi zmdi-settings"></i></li>
        </ul>
    </div>
    <div class="content">
        <div class="container">
            <div class="row">
                <div class="content__wrapper">
                    <div class="col-12 content__img">1140 x 200</div>
                    <div class="content__avatar">
                        <img class="avatar__link" src="https://s-media-cache-ak0.pinimg.com/originals/0c/0a/17/0c0a172a8e86c103bfbdfd164488961c.jpg" alt="avatar">
                    </div>
                    <div class="content__firstline">
                        <div class="col-md-3 col-md-offset-3 content__name">
                            <div class="content__firstname">Артур</div>
                            <div class="content__lastname">Абелтиньш</div>
                        </div>
                        <div class="col-md-2 col-md-offset-4 content__start">Начать</div>
                    </div>
                    <div class="notifications col-md-7">
                        <div class="notifications__head">Уведомления</div>
                        <div class="notifications__body">
                            <ul class="notifications__list">
                                <li v-for="notification in notifications" :class="{ notification__warn: notification.warn, notification__good: notification.good, notification__bad: notification.bad }" class="notifications__item">{{ notification.text }} <span></span></li>
                            </ul>
                        </div>
                    </div>
                    <div class="friends col-md-4 col-md-offset-1">
                        <div class="friends__head"><span class="col-md-2">Друзья</span> <div class="friends__add col-md-9 col-md-offset-1"><input type="text" class="friends__input"><div class="friends__addbutton"><i class="zmdi zmdi-search"></i>find</div></div></div>
                        <div class="friends__body">
                            <ul class="friends__list">
                                <li class="friends__item" v-for="friend in friends">
                                    <img :src="friend.avatar" alt="avatar" class="col-md-3 friends__avatar">
                                    <div class="col-md-5 friends__name">{{ friend.name }}</div>
                                    <div class="friends__more"><i class="zmdi zmdi-more-vert"></i></div>
                                    <div class="col-md-5 friends__job">{{ friend.job }}</div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-md-6 skills">
                        <div class="skills__head">Мои навыки</div>
                        <div class="skills__body">
                            <ul class="skills__list">
                                <li class="skills__item" v-for="skill in skills" :class="{skills__proof: skill.isProof}">{{ skill.name }}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
	<script src="https://cdn.jsdelivr.net/npm/vue-resource@1.3.4"></script>
	<script src="scripts/libs.min.js"></script>
	<script src="scripts/common_main.js"></script>
</body>
</html>