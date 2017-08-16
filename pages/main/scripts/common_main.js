(function() {
  var modalWindow, setBlur, showModal, symbolForCode, type, validateData, vm;

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
  };

  Vue.use(VueResource);

  symbolForCode = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

  vm = new Vue({
    el: "#app",
    data: {
      dataAuth: {},
      activate: {
        action: 1,
        title: 'Подтвердите свою почту',
        body: "Вы оставили заявку на регистрацию на сайте <b>spacemanit.pro</b>. Для подтверждения вашего адреса используйте код: ",
        code: '',
        link: ''
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
        this.activate.link = this.dataAuth.email;
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
      if (validateData('email', vm.dataAuth.email) === true && validateData('login', vm.dataAuth.login) === true && typeof vm.dataAuth.pass !== 'undefined' && vm.dataAuth.pass !== '') {
        console.log(vm);
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

  modalWindow = function(value) {
    switch (value) {
      case '200':
        return showModal('good', "Пользователь: " + vm.dataAuth.login + " успешно зарегистрирован!", null, function() {
          return vm.mailActivation();
        });
      case '201':
        return showModal('good', "Пользователь: " + vm.dataAuth.login + " успешно авторизирован!", null, function() {
          return window.location = 'pages/app';
        });
      case '203':
        return showModal('good', "Письмо успрешно отправленно по адресу: " + vm.dataAuth.email);
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
