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
      skills: skillers
    },
    dataAuth: {},
    activate: {
      action: 1,
      code: '',
      login: ''
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

  $(document).ready(function() {
    var press;
    press = 0;
    return $('.top-bar__profile').on('click', function() {
      if (press === 0) {
        $('.top-bar__dropdown').stop().fadeIn();
        return press = 1;
      } else {
        $('.top-bar__dropdown').stop().fadeOut();
        return press = 0;
      }
    });
  });

}).call(this);
