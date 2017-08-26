(function() {
  var modalWindow, recovery, register, setBlur, showModal, symbolForCode, validateData, vm;

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

  showModal = function(type, title, text, callback) {
    var icon;
    console.log(text);
    if (typeof type === void 0) {
      type = 'info';
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
    $('.modalwindow__list').append("<li class='modalwindow__item'><div class='modalwindow__icon'>" + icon + "</div><div class='modalwindow__text'><div class='modalwindow__title'>" + title + "</div><p class='modalwindow__body'>" + text + "</p></div></li>");
    return callback();
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
      return /^[A-Z0-9]+$/.test(body);
    }
  };

  showModal('success', 'Test', 'Full Test', null);

  Vue.use(VueResource);

  symbolForCode = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

  vm = new Vue({
    el: "#app",
    data: {
      dataAuth: {},
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
      registerF: function() {
        return this.$http.post("pages/main/includes/register.php?register=", this.dataAuth).then(function(res) {
          console.log(res);
          modalWindow(res.data);
          return function(error) {
            console.log(error);
            return modalWindow('300');
          };
        });
      },
      loginF: function() {
        return this.$http.post("pages/main/includes/login.php?login=", this.dataAuth).then(function(res) {
          modalWindow(res.data);
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

  $('.main__recovery').on('click', function() {
    if (recovery === 0) {
      return $('.signin').fadeOut(300, function() {
        $('.recovery').fadeIn();
        $('.main__register').hide();
        $('.main__recovery').text('Я знаю свои данные!');
        $('.main__start').text('Востановить');
        return recovery = 1;
      });
    } else {
      return $('.recovery').fadeOut(300, function() {
        $('.signin').fadeIn();
        $('.main__register').show();
        $('.main__recovery').text('Забыли пароль?');
        $('.main__start').text('Вход');
        return recovery = 0;
      });
    }
  });

  $('.main__register').on('click', function() {
    if (register === 0) {
      return $('.signin').fadeOut(300, function() {
        $('.register').fadeIn();
        $('.main__recovery').hide();
        $('.main__register').html('<div class="main__register">У меня есть акаунт. <span>Войти!</span></div>');
        return register = 1;
      });
    } else {
      return $('.register').fadeOut(300, function() {
        $('.signin').fadeIn();
        $('.main__recovery').show();
        $('.main__register').html('<div class="main__register">Вы ещё не снами? <span>Присоединиться!</span></div>');
        return register = 0;
      });
    }
  });

  $('.body-start').on('click', function() {
    var type;
    if (type === 'reg') {
      if (validateData('email', vm.dataAuth.email) === true && validateData('login', vm.dataAuth.login) === true && typeof vm.dataAuth.pass !== 'undefined' && vm.dataAuth.pass !== '') {
        vm.registerF();
        return type = 'reg';
      } else {
        alert('Ошибка введёных данных.');
      }
    } else {
      if (validateData('login', vm.dataAuth.login) === true && typeof vm.dataAuth.pass !== 'undefined' && vm.dataAuth.pass !== '') {
        vm.loginF();
        return type = 'log';
      } else {
        alert('Ошибка введёных данных');
      }
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
        return showModal('good', "Пользователь: " + vm.dataAuth.login + " успешно зарегистрирован!", null, function() {
          return vm.mailActivation();
        });
      case '201':
        return showModal('good', "Пользователь: " + vm.dataAuth.login + " успешно авторизирован!", null, function() {
          return window.location.reload();
        });
      case '203':
        return showModal('good', "Письмо успрешно отправленно пользователю: " + vm.dataAuth.login, null, function() {
          return showActivate(1);
        });
      case '204':
        return showModal('good', "Почта успешно подтверждена! Удачи в обучении.", null, function() {
          return showActivate(2);
        });
      case '300':
        return showModal('error', 'Возникла ошибка при отправке запроса на регистрацию! Проверьте соединение с интернетом или повторите попытку позже.');
      case '301':
        return showModal('error', 'Возникла ошибка при регистрации пользователя! Пользователь с таким логином или почтой уже зарегистрирован!');
      case '302':
        return showModal('error', 'Возникла ошибка при отправке запроса на авторизацию пользователя! Проверьте соединение с интернетом или повторите попытку позже.');
      case '303':
        return showModal('error', 'Пользователь с таким логином не найден!');
      case '304':
        return showModal('error', 'Пароль введён не верно!');
      case '305':
        return showModal('error', 'Произошла ошибка при отправке письма');
      case '306':
        return showModal('warn', 'Необходимо активировать ваш аккаунт', null, function() {
          return vm.mailActivation();
        });
    }
  };

}).call(this);
