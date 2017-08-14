(function() {
  var modalWindow, setBlur, showModal, type, vm;

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

  showModal = function(type, text, context, callback) {
    if (arguments.length >= 1) {
      if (arguments[0] === void 0) {
        type = 'info';
      }
      if (text === '') {
        text = 'Modal window';
      }
      if (context === null || void 0 || '') {
        context = null;
      }
      if (typeof callback !== 'function') {
        callback = function() {};
      }
      $('.modal').addClass("modal_" + type);
      $('.modal__body').text(text);
      $('.modal').fadeIn(200, function() {
        return setBlur('#app', 20);
      });
      return setTimeout(function() {
        return $('.modal').fadeOut(200, function() {
          $('.modal').removeClass("modal_" + type);
          setBlur('#app', 0);
          return callback();
        });
      }, 3000);
    } else {
      return console.error('Недостаточно аргументов');
    }
  };

  Vue.use(VueResource);

  vm = new Vue({
    el: "#app",
    data: {
      dataAuth: {},
      register: {},
      login: {}
    },
    methods: {
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
          return console.log(this.dataAuth);
        }, function(error) {
          console.log(error);
          return modalWindow('302');
        });
      }
    }
  });

  type = 'reg';

  $('.register__have').on('click', function() {
    if (type === 'reg') {
      $('.body-mail').fadeOut();
      $(this).text('Я хочу зарегистрироваться');
      return type = 'log';
    } else {
      $('.body-mail').fadeIn();
      $(this).text('У меня уже есть аккаунт');
      return type = 'reg';
    }
  });

  $('.body-start').on('click', function() {
    if (type === 'reg') {
      vm.registerF();
      return type = 'reg';
    } else {
      vm.loginF();
      return type = 'log';
    }
  });

  modalWindow = function(value) {
    switch (value) {
      case '200':
        return showModal('good', "Пользователь: " + vm.dataAuth.login + " успешно зарегистрирован!", null);
      case '201':
        return showModal('good', "Пользователь: " + vm.dataAuth.login + " успешно авторизирован!", null, function() {
          return window.location = 'pages/app';
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
    }
  };

  $(document).scroll(function() {
    $('#comet1').css({
      top: -500 + $(document).scrollTop()
    });
    $('#comet2').css({
      top: -550 + $(document).scrollTop()
    });
    $('#comet3').css({
      top: -600 + $(document).scrollTop()
    });
    return $('#comet4').css({
      top: -500 + $(document).scrollTop()
    });
  });

  $(document).ready(function() {
    return $('.preloader').fadeOut(1000, function() {
      return $('body').css({
        'overflow': 'auto'
      });
    });
  });

}).call(this);
