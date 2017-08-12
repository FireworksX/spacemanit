(function() {
  var modalWindow, type, vm;

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
        return this.$http.post("includes/register.php?register=", this.dataAuth).then(function(res) {
          console.log(res.data);
          modalWindow(res.data);
          return function(error) {
            return modalWindow('300');
          };
        });
      },
      loginF: function() {
        return this.$http.post("includes/login.php?login=", this.dataAuth).then(function(res) {
          return modalWindow(res.data);
        }, function(error) {
          return modalRegister('302');
        });
      }
    }
  });

  type = 'reg';

  $('.register__have').on('click', function() {
    if (type === 'reg') {
      $('.body-login').fadeOut();
      $(this).text('Я хочу зарегистрироваться');
      return type = 'log';
    } else {
      $('.body-login').fadeIn();
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
        return console.info("Пользователь: " + vm.$data.dataAuth.login + " успешно зарегистрирован!");
      case '201':
        console.info("Пользователь: " + vm.$data.dataAuth.login + " успешно авторизирован!");
        return window.location = '/pages/app';
      case '300':
        return console.error('Возникла ошибка при отправке запроса на регистрацию! Проверьте соединение с интернетом или повторите попытку позже.');
      case '301':
        return console.error('Возникла ошибка при регистрации пользователя! Пользователь с таким логином или почтой уже зарегистрирован!');
      case '302':
        return console.error('Возникла ошибка при отправке запроса на авторизацию пользователя! Проверьте соединение с интернетом или повторите попытку позже.');
      case '303':
        return console.error('Пользователь с таким логином не найден!');
      case '304':
        return console.error('Пароль введён не верно!');
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
