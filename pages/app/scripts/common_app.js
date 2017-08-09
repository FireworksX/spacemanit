(function() {
  var active, drawPath, modalWindow, nodes, paper, pathString, profileActive, renderNodes, startOperations, status, user, vm;

  nodes = null;

  user = null;

  pathString = "";

  drawPath = function(i) {
    var parent, path, posParent;
    parent = nodes[i].parent;
    if (parent !== 0) {
      posParent = nodes[parent - 1].x + ", " + nodes[parent - 1].y;
    } else {
      posParent = nodes[i].x + ", " + nodes[i].y;
    }
    path = paper.path("").data('pathid', nodes[i].id).attr({
      stroke: "#717171",
      fill: "transparent",
      strokeWidth: 3,
      d: "M " + posParent + " L " + nodes[i].x + "," + nodes[i].y
    });
    return renderNodes(i);
  };

  renderNodes = function(i) {
    var group, icon, iconName, node, text;
    node = paper.circle(nodes[i].x, nodes[i].y, nodes[i].size).attr({
      fill: nodes[i].color,
      stroke: '#fff',
      strokeWidth: 2
    }).data('id', nodes[i].id - 1).mouseover(function() {
      if (nodes[i].status === 1) {
        return this.stop().animate({
          r: nodes[i].size + 10
        }, 1000, mina.elastic);
      }
    }).mouseout(function() {
      return this.stop().animate({
        r: nodes[i].size
      }, 300, mina.easeinout);
    }).click(function(event) {
      var id;
      id = nodes[this.data('id')].id;
      return window.open("../parts.html?lesson_id=" + id);
    }).touchstart(function() {
      return alert(nodes[this.data('id')].id);
    }).drag(function(dx, dy, x, y) {
      return console.log(x + "  " + y);
    });
    text = paper.text(nodes[i].x - 15, nodes[i].y + nodes[i].size + nodes[i].size / 2, nodes[i].name);
    iconName = nodes[i].icon;
    icon = paper.svg(nodes[i].x - 15, nodes[i].y - 16, 30, 32, 0, 0, 30, 32);
    Snap.load("images/icons/" + iconName + ".svg", function(iconName) {
      return icon = icon.append(iconName);
    });
    group = paper.g(node, text, icon);
    return $('.add').fadeOut();
  };

  startOperations = function() {
    var i, j, k, ref, ref1, results;
    nodes = nodes.slice(1);
    for (i = j = 0, ref = nodes.length - 1; 0 <= ref ? j <= ref : j >= ref; i = 0 <= ref ? ++j : --j) {
      nodes[i].dif = Number(nodes[i].dif);
      nodes[i].id = Number(nodes[i].id);
      nodes[i].parent = Number(nodes[i].parent);
      nodes[i].path = Number(nodes[i].path);
      nodes[i].size = Number(nodes[i].size);
      nodes[i].status = Number(nodes[i].status);
      nodes[i].x = Number(nodes[i].x);
      nodes[i].y = Number(nodes[i].y);
      drawPath(i);
    }
    results = [];
    for (i = k = 0, ref1 = nodes.length - 1; 0 <= ref1 ? k <= ref1 : k >= ref1; i = 0 <= ref1 ? ++k : --k) {
      results.push(renderNodes(i));
    }
    return results;
  };

  paper = Snap(1920, 1080);

  paper.dblclick(function(event) {
    $('.add').css({
      top: event.offsetY + 9,
      left: event.offsetX + 8
    }).fadeIn();
    $('.add-pos__x').text("X: " + (event.offsetX + 9));
    $('.add-pos__y').text("Y: " + (event.offsetY + 8));
    vm.$data.nodeData.x = event.offsetX + 9;
    return vm.$data.nodeData.y = event.offsetY + 8;
  });

  Vue.use(VueResource);

  vm = new Vue({
    el: "#app",
    data: {
      nodeData: {},
      nodes: [],
      user: {
        login: 'Default',
        avatar: 'avater.png'
      }
    },
    methods: {
      addNode: function() {
        return this.$http.post("includes/addNode.php?node=", this.nodeData).then(function(res) {
          return modalWindow(res.data);
        }, function(error) {
          return modalWindow('300');
        });
      },
      getNodes: function() {
        return this.$http.post("includes/getNodes.php").then(function(res) {
          this.nodes = res.data;
          modalWindow('203');
          nodes = this.nodes;
          return startOperations();
        }, function(error) {
          return modalWindow('300');
        });
      },
      getUser: function() {
        return this.$http.post("includes/getUser.php").then(function(res) {
          console.log(res.data);
          if (res.data === '309') {
            return modalWindow('309');
          } else {
            this.user.id = Number(res.data.id);
            this.user.login = res.data.login;
            this.user.email = res.data.email;
            this.user.join_date = res.data.join_date;
            user = res.date;
            return modalWindow('204');
          }
        }, function(error) {
          return modalWindow('308');
        });
      }
    }
  });

  vm.getUser();

  vm.getNodes();

  $('.left-slide').height($(window).height());

  active = 0;

  $('.left-slide').hide();

  $('.bar-circle').on('click', function() {
    if (active === 0) {
      $('.left-slide').animate({
        left: "0px"
      }, 600);
      $('.left-slide').show();
      return active = 1;
    } else {
      $('.left-slide').animate({
        left: "-300px"
      }, 600, function() {
        return $('.left-slide').hide();
      });
      return active = 0;
    }
  });

  profileActive = 0;

  $('.profile__avatar').on('click', function() {
    if (profileActive === 0) {
      return $('.profile-stats').animate({
        width: '300px'
      }, 500, function() {
        $('.profile-stats__money').fadeIn().css({
          display: 'inline-block'
        });
        $('.profile-stats__name').fadeIn().css({
          display: 'inline-block'
        });
        return profileActive = 1;
      });
    } else {
      $('.profile-stats__money').fadeOut().css({
        display: 'inline-block'
      });
      $('.profile-stats__name').fadeOut().css({
        display: 'inline-block'
      });
      return $('.profile-stats').animate({
        width: '60px'
      }, 500, function() {
        return profileActive = 0;
      });
    }
  });

  status = null;

  $('.add-active__left').on('click', function() {
    $(this).addClass('add-active__select');
    $('.add-active__right').removeClass('add-active__select');
    return status = true;
  });

  $('.add-active__right').on('click', function() {
    $(this).addClass('add-active__select');
    $('.add-active__left').removeClass('add-active__select');
    return status = false;
  });

  $('.add__button').on('click', function() {
    if ($('.add-name__input').val() === '') {
      alert('Введите имя');
      return;
    }
    if (status === null) {
      alert('Выберите активность');
      return;
    } else if (status === false) {
      vm.nodeData.status = false;
    } else {
      vm.nodeData.status = true;
    }
    if ($('.add-parent__input').val() === '') {
      alert('Вы не указали родителя');
      return;
    }
    if ($('.add-path__input').val() === '') {
      alert('Вы не указали какой урок будет загружаться.');
      return;
    }
    if ($('.add-color__input').val() === '') {
      alert('Вы не ввели цвет ноды. Будет установлен чёрный цвет (по умолчанию)');
      vm.nodeData.color = '#000';
    }
    if ($('.add-size__input').val() === '') {
      alert('Вы не ввели размер ноды. Будет установлен размер 20 (по умолчанию)');
      vm.nodeData.size = 20;
    }
    if ($('.add-dif__input').val() === '') {
      alert('Вы не указали сложность. Будет установлен 1 (по умолчанию)');
      vm.nodeData.dif = 1;
    }
    return vm.addNode();
  });

  $('.add__exit').on('click', function() {
    return $('.add').fadeOut();
  });

  modalWindow = function(value) {
    switch (value) {
      case '200':
        $('.modal-window').fadeIn();
        $('.modal-window__text').text("Пользователь: " + vm.$data.register.login + " успешно зарегистрирован!");
        $('.modal-window').css({
          background: 'rgba(187, 255, 179, 0.95)'
        });
        break;
      case '201':
        $('.modal-window').fadeIn();
        $('.modal-window__text').text("Пользователь: " + vm.$data.login.login + " успешно авторизирован!");
        $('.modal-window').css({
          background: 'rgba(187, 255, 179, 0.95)'
        });
        break;
      case '202':
        $('.modal-window').fadeIn();
        $('.modal-window__text').text("Нода с именем: " + vm.$data.nodeData.name + " успешно добавлена.");
        $('.modal-window').css({
          background: 'rgba(187, 255, 179, 0.95)'
        });
        break;
      case '203':
        nodes = vm.nodes;
        $('.modal-window').fadeIn();
        $('.modal-window__text').text("Все ноды успешно загружены.");
        $('.modal-window').css({
          background: 'rgba(187, 255, 179, 0.95)'
        });
        break;
      case '204':
        nodes = vm.nodes;
        $('.modal-window').fadeIn();
        $('.modal-window__text').text("Данные пользователя успешно получены.");
        $('.modal-window').css({
          background: 'rgba(187, 255, 179, 0.95)'
        });
        console.log(vm.user);
        break;
      case '300':
        $('.modal-window').fadeIn();
        $('.modal-window__text').text('Возникла ошибка при отправке запроса на регистрацию! Проверьте соединение с интернетом или повторите попытку позже.');
        $('.modal-window').css({
          background: 'rgba(255, 130, 130, 0.95)'
        });
        break;
      case '301':
        $('.modal-window').fadeIn();
        $('.modal-window__text').text('Возникла ошибка при регистрации пользователя! Пользователь с таким логином или почтой уже зарегистрирован!');
        $('.modal-window').css({
          background: 'rgba(255, 130, 130, 0.95)'
        });
        break;
      case '302':
        $('.modal-window').fadeIn();
        $('.modal-window__text').text('Возникла ошибка при отправке запроса на авторизацию пользователя! Проверьте соединение с интернетом или повторите попытку позже.');
        $('.modal-window').css({
          background: 'rgba(255, 130, 130, 0.95)'
        });
        break;
      case '303':
        $('.modal-window').fadeIn();
        $('.modal-window__text').text('Пользователь с таким логином не найден!');
        $('.modal-window').css({
          background: 'rgba(255, 130, 130, 0.95)'
        });
        break;
      case '304':
        $('.modal-window').fadeIn();
        $('.modal-window__text').text('Пароль введён не верно!');
        $('.modal-window').css({
          background: 'rgba(255, 130, 130, 0.95)'
        });
        break;
      case '305':
        $('.modal-window').fadeIn();
        $('.modal-window__text').text('Нода с таким именем уже существует.');
        $('.modal-window').css({
          background: 'rgba(255, 130, 130, 0.95)'
        });
        break;
      case '306':
        $('.modal-window').fadeIn();
        $('.modal-window__text').text('Урок указанный на ноду уже используется.');
        $('.modal-window').css({
          background: 'rgba(255, 130, 130, 0.95)'
        });
        break;
      case '307':
        $('.modal-window').fadeIn();
        $('.modal-window__text').text('Возникла ошибка при отправке запроса на добавление ноды! Проверьте соединение с интернетом или повторите попытку позже.');
        $('.modal-window').css({
          background: 'rgba(255, 130, 130, 0.95)'
        });
        break;
      case '308':
        $('.modal-window').fadeIn();
        $('.modal-window__text').text('Возникла ошибка при отправке запроса на получения данных пользователя! Проверьте соединение с интернетом или повторите попытку позже.');
        $('.modal-window').css({
          background: 'rgba(255, 130, 130, 0.95)'
        });
        break;
      case '309':
        $('.modal-window').fadeIn();
        $('.modal-window__text').text('Сессия не найдена. Авторизируйтесь повторно.');
        $('.modal-window').css({
          background: 'rgba(255, 130, 130, 0.95)'
        });
    }
    return setTimeout(function() {
      return $('.modal-window').fadeOut();
    }, 3000);
  };

}).call(this);
