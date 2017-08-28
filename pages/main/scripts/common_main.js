(function() {
  var modalWindow, recovery, register, setBlur, showModal, symbolForCode, type, validateData, vm;

  setBlur = function(element, radius) {
    radius = "blur(" + radius + "px)";
    return $(element).css({
      'filter': radius,
      'webkitFilter': radius,
      'mozFilter': radius,
      'oFilter': radius,
      'msFilter': radius,
      'transition': 'all 0.5s ease-out',
      '-webkit-transition': 'all 0.5s ease-out',
      '-moz-transition': 'all 0.5s ease-out',
      '-o-transition': 'all 0.5s ease-out'
    });
  };

  showModal = function(type, title, text, timeOut, callback) {
    var icon, object;
    console.log(arguments);
    if (typeof type === void 0) {
      type = 'info';
    }
    if (typeof callback !== "function") {
      callback = function() {};
    }
    switch (type) {
      case 'info':
        icon = "<i style='color: #108EE9;' class='zmdi zmdi-info-outline'></i>";
        break;
      case 'error':
        icon = "<i style='color: #ff6f6f;' class='zmdi zmdi-close'></i>";
        break;
      case 'warn':
        icon = "<i style='color: #ffa500;' class='zmdi zmdi-alert-circle'></i>";
        break;
      case 'success':
        icon = "<i style='color: #4bff59;' class='zmdi zmdi-check'></i>";
    }
    object = $("<li class='modalwindow__item  animated slideInRight'><div class='modalwindow__icon'>" + icon + "</div><div class='modalwindow__text'><div class='modalwindow__title'>" + title + "</div><p class='modalwindow__body'>" + text + "</p></div></li>");
    $('.modalwindow__list').append(object);
    setTimeout(function() {
      return object.removeClass('slideInRight').addClass('zoomOutUp');
    }, timeOut);
    return setTimeout(function() {
      object.remove();
      return callback();
    }, timeOut + 1000);
  };

  validateData = function(type, body) {
    if (type === 'phone') {
      return /^\+\d{2}\(\d{3}\)\d{3}-\d{2}-\d{2}$/.test(body);
    }
    if (type === 'email') {
      return /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(body);
    }
    if (type === 'login') {
      return /^[a-zA-Z0-9]+$/.test(body);
    }
    if (type === 'pass') {
      return /^[a-zA-Z0-9]+$/.test(body);
    }
    if (type === 'code') {
      return /^[0-9]+$/.test(body);
    }
  };

  Vue.use(VueResource);

  symbolForCode = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

  vm = new Vue({
    el: "#app",
    data: {
      dataAuth: {},
      confirmCode: 1,
      activate: {
        action: 1,
        code: '',
        login: ''
      }
    },
    methods: {
      mailActivation: function() {
        var i, index, j;
        this.activate.code = '';
        for (i = j = 1; j <= 5; i = ++j) {
          index = Math.floor(Math.random() * (symbolForCode.length - 1) + 1);
          this.activate.code += symbolForCode[index];
        }
        this.activate.login = this.dataAuth.login;
        return this.$http.post("pages/main/includes/mail.php?activate=", this.activate).then(function(res) {
          console.log(res);
          modalWindow(res.data);
          return function(error) {
            console.log(error);
            return modalWindow('300');
          };
        });
      },
      register: function() {
        return this.$http.post("pages/main/includes/register.php?register=", this.dataAuth).then(function(res) {
          console.log(res);
          modalWindow(res.data);
          return function(error) {
            console.log(error);
            return modalWindow('300');
          };
        });
      },
      signin: function() {
        return this.$http.post("pages/main/includes/login.php?login=", this.dataAuth).then(function(res) {
          modalWindow(res.data);
          console.log(res);
          console.log(this.dataAuth);
          return function(error) {
            console.log(error);
            return modalWindow('302');
          };
        });
      }
    }
  });

  recovery = 0;

  register = 0;

  type = 'signin';

  $('.main__recovery').on('click', function() {
    if (recovery === 0) {
      return $('.signin').fadeOut(300, function() {
        $('.recovery').fadeIn();
        $('.main__register').hide();
        $('.main__recovery').text('Я знаю свои данные!');
        $('.main__start').text('Востановить');
        recovery = 1;
        return type = 'recovery';
      });
    } else {
      return $('.recovery').fadeOut(300, function() {
        $('.signin').fadeIn();
        $('.main__register').show();
        $('.main__recovery').text('Забыли пароль?');
        $('.main__start').text('Вход');
        recovery = 0;
        return type = 'signin';
      });
    }
  });

  $('.main__register').on('click', function() {
    if (register === 0) {
      return $('.signin').fadeOut(300, function() {
        $('.register').fadeIn();
        $('.main__recovery').hide();
        $('.main__register').html('<div class="main__register">У меня есть акаунт. <span>Войти!</span></div>');
        $('.main__start').text('Зарегистрироваться');
        register = 1;
        return type = 'register';
      });
    } else {
      return $('.register').fadeOut(300, function() {
        $('.signin').fadeIn();
        $('.main__recovery').show();
        $('.main__register').html('<div class="main__register">Вы ещё не снами? <span>Присоединиться!</span></div>');
        $('.main__start').text('Вход');
        register = 0;
        return type = 'signin';
      });
    }
  });

  $('.main__start').on('click', function() {
    $('.register__firstname, .register__lastname, .register__login, .register__mail, .register__password, .register__confpassword, .signin__login, .signin__password').removeClass('input_bad');
    if (type === 'register') {
      if (typeof vm.dataAuth.firstname === 'undefined' || vm.dataAuth.firstname === '') {
        $('.register__firstname').addClass('input_bad');
        return;
      }
      if (typeof vm.dataAuth.lastname === 'undefined' || vm.dataAuth.lastname === '') {
        $('.register__lastname').addClass('input_bad');
        return;
      }
      if (typeof vm.dataAuth.login === 'undefined' || vm.dataAuth.login === '') {
        $('.register__login').addClass('input_bad');
        return;
      }
      if (validateData('email', vm.dataAuth.email) !== true) {
        $('.register__mail').addClass('input_bad');
        return;
      }
      if (typeof vm.dataAuth.password === 'undefined' || vm.dataAuth.password === '' || vm.dataAuth.password !== vm.dataAuth.confpassword) {
        $('.register__password').addClass('input_bad');
        $('.register__confpassword').addClass('input_bad');
        return;
      }
      vm.dataAuth.password = btoa(vm.dataAuth.password);
      vm.register();
    }
    if (type === 'confirm') {
      if (vm.activate.code === vm.confirmCode) {
        vm.activate.action = 2;
        vm.mailActivation();
      } else {
        $('.confirm__code').addClass('input_bad');
      }
    }
    if (type === 'signin') {
      if (typeof vm.dataAuth.login === 'undefined' || vm.dataAuth.login === '') {
        $('.signin__login').addClass('input_bad');
        return;
      }
      if (typeof vm.dataAuth.password === 'undefined' || vm.dataAuth.password === '') {
        $('.signin__password').addClass('input_bad');
        return;
      }
      vm.dataAuth.password = btoa(vm.dataAuth.password);
      return vm.signin();
    }
  });

  $('.activate__button').on('click', function() {
    if (validateData('code', $('.activate__input').val()) !== true) {
      return;
    }
    if ($('.activate__input').val() === vm.activate.code) {
      vm.activate.action = 2;
      return vm.mailActivation();
    } else {
      return $('.activate__head').text('Не верный код');
    }
  });

  modalWindow = function(value) {
    switch (value) {
      case '200':
        return showModal('info', "Регистрация", "Пользователь: " + vm.dataAuth.login + " успешно зарегистрирован!", 3000, function() {
          return vm.mailActivation();
        });
      case '201':
        return showModal('success', 'Авторизация', "Пользователь: " + vm.dataAuth.login + " успешно авторизирован!", 3000, function() {
          return window.location.reload();
        });
      case '203':
        return showModal('success', 'Подтверждение', "Письмо успрешно отправленно пользователю: " + vm.dataAuth.login, 3000, function() {
          type = 'confirm';
          $('.main__start').text('Подтвердить');
          $('.register').hide();
          return $('.confirm').show();
        });
      case '204':
        return showModal('success', 'Подтверждение', "Почта успешно подтверждена. Удачи в обучении!", 3000, function() {
          return window.location.reload();
        });
      case '300':
        return showModal('error', 'Ошибка', 'Возникла ошибка при отправке запроса на регистрацию! Проверьте соединение с интернетом или повторите попытку позже.', 3000);
      case '301':
        return showModal('error', "Регистрация", "Возникла ошибка при регистрации пользователя! Пользователь с таким логином или почтой уже зарегистрирован!", 3000);
      case '302':
        return showModal('error', 'Возникла ошибка при отправке запроса на авторизацию пользователя! Проверьте соединение с интернетом или повторите попытку позже.');
      case '303':
        return showModal('error', 'Пользователь с таким логином не найден!');
      case '304':
        return showModal('error', 'Пароль введён не верно!');
      case '305':
        return showModal('error', 'Подтверждение', "Произошла ошибка при отправке письма", 3000);
      case '306':
        return showModal('warn', 'Необходимо активировать ваш аккаунт', null, function() {
          return vm.mailActivation();
        });
    }
  };

}).call(this);
