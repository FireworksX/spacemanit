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
          console.log(res);
          return modalWindow(res.data);
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
    var self;
    self = $('.register__modal');
    console.log(value);
    setTimeout(function() {
      return self.fadeOut();
    }, 3000);
    switch (value) {
      case '200':
        self.text("Пользователь: " + vm.dataAuth.login + " успешно зарегистрирован!");
        self.addClass('register__modal_good');
        return self.fadeIn();
      case '201':
        self.text("Пользователь: " + vm.dataAuth.login + " успешно авторизирован!");
        self.addClass('register__modal_good');
        window.location = '/pages/app';
        return self.fadeIn();
      case '300':
        self.text('Возникла ошибка при отправке запроса на регистрацию! Проверьте соединение с интернетом или повторите попытку позже.');
        self.addClass('register__modal_bad');
        return self.fadeIn();
      case '301':
        self.text('Возникла ошибка при регистрации пользователя! Пользователь с таким логином или почтой уже зарегистрирован!');
        self.addClass('register__modal_bad');
        return self.fadeIn();
      case '302':
        self.text('Возникла ошибка при отправке запроса на авторизацию пользователя! Проверьте соединение с интернетом или повторите попытку позже.');
        self.addClass('register__modal_bad');
        return self.fadeIn();
      case '303':
        self.text('Пользователь с таким логином не найден!');
        self.addClass('register__modal_bad');
        return self.fadeIn();
      case '304':
        self.text('Пароль введён не верно!');
        self.addClass('register__modal_bad');
        return self.fadeIn();
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
