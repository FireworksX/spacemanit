(function() {
  var friendsAll, notifs, skillers, symbolForCode, vm;

  Vue.use(VueResource);

  notifs = [
    {
      warn: 0,
      good: 1,
      bad: 0,
      text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam error esse id magni maxime, minus natus, nihil placeat quidem reprehenderit sapiente sunt vitae, voluptas? Accusamus corporis dignissimos dolor laudantium voluptates?'
    }, {
      warn: 1,
      good: 0,
      bad: 0,
      text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam error esse id magni maxime, minus natus, nihil placeat quidem reprehenderit sapiente sunt vitae, voluptas? Accusamus corporis dignissimos dolor laudantium voluptates?'
    }, {
      warn: 0,
      good: 0,
      bad: 1,
      text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam error esse id magni maxime, minus natus, nihil placeat quidem reprehenderit sapiente sunt vitae, voluptas? Accusamus corporis dignissimos dolor laudantium voluptates?'
    }, {
      warn: 0,
      good: 0,
      bad: 0,
      text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam error esse id magni maxime, minus natus, nihil placeat quidem reprehenderit sapiente sunt vitae, voluptas? Accusamus corporis dignissimos dolor laudantium voluptates?'
    }
  ];

  friendsAll = [
    {
      name: 'Elsa Roses',
      blocked: false,
      job: 'UX - Designer',
      avatar: 'https://instagram.fhen2-1.fna.fbcdn.net/t51.2885-19/s150x150/20901925_1373775829405726_8934209334972252160_a.jpg'
    }, {
      name: 'Elsa Roses',
      blocked: false,
      job: 'UX - Designer',
      avatar: 'https://instagram.fhen2-1.fna.fbcdn.net/t51.2885-19/s150x150/20901925_1373775829405726_8934209334972252160_a.jpg'
    }
  ];

  skillers = [
    {
      name: 'HTML',
      isProof: true
    }, {
      name: 'CSS',
      isProof: false
    }, {
      name: '+ add',
      isProof: false
    }
  ];

  symbolForCode = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

  vm = new Vue({
    el: "#app",
    data: {
      friends: friendsAll,
      notifications: notifs,
      skills: skillers,
      user: {}
    },
    methods: {
      getUser: function() {
        return this.$http.post("pages/app/includes/getUser.php").then(function(res) {
          if (res.data === '309') {
            return console.error('User will not be loaded');
          } else {
            this.user.id = Number(res.data.id);
            this.user.login = res.data.login;
            this.user.email = res.data.email;
            this.user.join_date = res.data.join_date;
            console.log(vm.user);
            return console.info('User will be loaded');
          }
        }, function(error) {
          return console.log(error);
        });
      },
      exitUser: function() {
        return this.$http.get("pages/app/includes/exitUser.php").then(function(res) {
          console.info('Session`s user will be destroy');
          return function(error) {
            return console.log(error);
          };
        });
      }
    }
  });

  $(document).ready(function() {
    var press;
    vm.getUser();
    press = 0;
    $('.top-bar__profile').on('click', function() {
      if (press === 0) {
        $('.top-bar__dropdown').stop().fadeIn();
        return press = 1;
      } else {
        $('.top-bar__dropdown').stop().fadeOut();
        return press = 0;
      }
    });
    return $('.top-bar__exit').on('click', function() {
      return vm.exitUser();
    });
  });

}).call(this);
