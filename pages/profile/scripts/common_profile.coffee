#####################
#	Functions
#####################


#####################
#	Snap SVG
#####################



#####################
#	Vue
#####################


Vue.use VueResource

#############################################
## Actions with mail
## 1 - Send mail with activate code (example: "N7QI1")
## code live in Vue scope in var code
##
## 2 - Send mail with text that account activate
## and set in DataBase "activate = true"
##
#############################################
notifs = [{
  warn: 0
  good: 1
  bad: 0
  text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam error esse id magni maxime, minus natus, nihil placeat quidem reprehenderit sapiente sunt vitae, voluptas? Accusamus corporis dignissimos dolor laudantium voluptates?'
  },
  {
    warn: 1
    good: 0
    bad: 0
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam error esse id magni maxime, minus natus, nihil placeat quidem reprehenderit sapiente sunt vitae, voluptas? Accusamus corporis dignissimos dolor laudantium voluptates?'
  },
  {
    warn: 0
    good: 0
    bad: 1
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam error esse id magni maxime, minus natus, nihil placeat quidem reprehenderit sapiente sunt vitae, voluptas? Accusamus corporis dignissimos dolor laudantium voluptates?'
  },
  {
    warn: 0
    good: 0
    bad: 0
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam error esse id magni maxime, minus natus, nihil placeat quidem reprehenderit sapiente sunt vitae, voluptas? Accusamus corporis dignissimos dolor laudantium voluptates?'
  }
]

friendsAll = [{
    name: 'Elsa Roses'
    blocked: false
    job: 'UX - Designer'
    avatar: 'https://instagram.fhen2-1.fna.fbcdn.net/t51.2885-19/s150x150/20901925_1373775829405726_8934209334972252160_a.jpg'
  }
  {
    name: 'Elsa Roses'
    blocked: false
    job: 'UX - Designer'
    avatar: 'https://instagram.fhen2-1.fna.fbcdn.net/t51.2885-19/s150x150/20901925_1373775829405726_8934209334972252160_a.jpg'
  }
]

skillers = [{
    name: 'HTML'
    isProof: true
  }
  {
    name: 'CSS'
    isProof: false
  }
  {
    name: '+ add'
    isProof: false
  }
]

symbolForCode = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','1','2','3','4','5','6','7','8','9','0']
vm = new Vue
	el: "#app"
	data:
    friends: friendsAll
    notifications: notifs
    skills: skillers
    user: {}
	methods: {
    getUser: ->
      @$http.post("pages/app/includes/getUser.php").then((res) ->
        if res.data is '309'
          console.error 'User will not be loaded'
        else
          @user.id = Number(res.data.id)
          @user.login = res.data.login
          @user.email = res.data.email
          @user.join_date = res.data.join_date
          console.log vm.user
          console.info 'User will be loaded'
      (error) ->
        console.log error)
    exitUser: ->
      @$http.get("pages/app/includes/exitUser.php").then((res) ->
        console.info 'Session`s user will be destroy'
        (error) ->
          console.log error)
  }


$(document).ready ->
  vm.getUser()
  press = 0
  $('.top-bar__profile').on 'click', ->
    if press is 0
      $('.top-bar__dropdown').stop().fadeIn()
      press = 1
    else
      $('.top-bar__dropdown').stop().fadeOut()
      press = 0

  $('.top-bar__exit').on 'click', ->
    vm.exitUser()

	


	
		


	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	