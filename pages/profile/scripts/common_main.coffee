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
		dataAuth: {}
		activate: {
      action: 1
      code: ''
      login: ''
    }
	methods: {
    mailActivation: ->
      @activate.code = ''
      for i in [1..5]
        index = Math.floor(Math.random() * (symbolForCode.length - 1) + 1)
        @activate.code += symbolForCode[index]
      @activate.login = @dataAuth.login
      @$http.post("pages/main/includes/mail.php?activate=", @activate).then((res) ->
        console.log res
        modalWindow(res.data)
        (error) ->
          console.log error
          modalWindow('300'))
    registerF: ->
      @$http.post("pages/main/includes/register.php?register=", @dataAuth).then((res) ->
        console.log res
        modalWindow(res.data)
        (error) ->
          console.log error
          modalWindow('300'))
    loginF: ->
      @$http.post("pages/main/includes/login.php?login=", @dataAuth).then((res) ->
        modalWindow(res.data);
        console.log @.dataAuth
        (error) ->
          console.log error
          modalWindow('302'))
  }


$(document).ready ->
  press = 0
  $('.top-bar__profile').on 'click', ->
    if press is 0
      $('.top-bar__dropdown').stop().fadeIn()
      press = 1
    else
      $('.top-bar__dropdown').stop().fadeOut()
      press = 0


	


	
		


	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	