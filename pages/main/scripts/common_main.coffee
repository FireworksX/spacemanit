#####################
#	Functions
#####################

setBlur = (element, radius) ->
	radius = "blur(#{radius}px)"
	$(element).css
		'filter': radius,
		'webkitFilter': radius,
		'mozFilter': radius,
		'oFilter': radius,
		'msFilter': radius,
		'transition':'all 0.5s ease-out',
		'-webkit-transition':'all 0.5s ease-out',
		'-moz-transition':'all 0.5s ease-out',
		'-o-transition':'all 0.5s ease-out'

showModal = (type, text, context, callback) ->
  if arguments.length >= 1
    if arguments[0] is undefined then type = 'info'
    if text is '' then text = 'Modal window'
    if context is null or undefined or '' then context = null
    if typeof callback isnt 'function' then callback = ->
    $('.modal').addClass("modal_#{type}")
    $('.modal__body').text(text)
    $('.modal').fadeIn(200, -> setBlur('#app', 20))
    setTimeout( ->
      $('.modal').fadeOut(200, ->
        $('.modal').removeClass("modal_#{type}")
        setBlur('#app', 0)
        callback())
    ,3000
    )
  else
    console.error 'Недостаточно аргументов'

showActivate = (flag) ->
  if flag is 1
    setBlur('#app', 20)
    $('.activate').fadeIn()
  else
    setBlur('#app', 0)
    $('.activate').fadeOut()

validateData = (type, body) ->
	if type is 'phone' then return /^\+\d{2}\(\d{3}\)\d{3}-\d{2}-\d{2}$/.test(body)
	if type is 'email' then return /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(body)
	if type is 'login' then return /^[a-zA-Z0-9]+$/.test(body)
	if type is 'pass' then return /^[a-zA-Z0-9]+$/.test(body)
	if type is 'code' then return /^[A-Z0-9]+$/.test(body)

#####################
#	Snap
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


symbolForCode = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','1','2','3','4','5','6','7','8','9','0']
vm = new Vue
	el: "#app"
	data:
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




type = 'reg'

$('.register__have').on 'click', ->
	if type is 'reg'
		$('.body-mail').fadeOut()
		$(@).text('Я хочу зарегистрироваться')
		type = 'log'
	else 
		$('.body-mail').fadeIn()
		$(@).text('У меня уже есть аккаунт')
		type = 'reg'


$('.body-start').on 'click', ->
  if type is 'reg'
    if validateData('email', vm.dataAuth.email) is true and validateData('login', vm.dataAuth.login) is true and typeof vm.dataAuth.pass isnt 'undefined' and vm.dataAuth.pass isnt ''
      vm.registerF()
      type = 'reg'
    else
      alert 'Ошибка введёных данных.'
      return
  else
    if validateData('login', vm.dataAuth.login) is true and typeof vm.dataAuth.pass isnt 'undefined' and vm.dataAuth.pass isnt ''
      vm.loginF()
      type = 'log'
    else
      alert 'Ошибка введёных данных'
      return


$('.activate__button').on 'click', ->
  if validateData('code', $('.activate__input').val()) isnt true then return
  if $('.activate__input').val() is vm.activate.code
    vm.activate.action = 2
    vm.mailActivation()
  else
    $('.activate__head').text('Не верный код')

modalWindow = (value) ->
	switch value
		when '200'
			showModal('good',"Пользователь: #{vm.dataAuth.login} успешно зарегистрирован!", null, -> vm.mailActivation())

		when '201'
      showModal('good',"Пользователь: #{vm.dataAuth.login} успешно авторизирован!", null, -> window.location.reload())

		when '203'
      showModal('good',"Письмо успрешно отправленно пользователю: #{vm.dataAuth.login}", null, -> showActivate(1))

		when '204'
      showModal('good',"Почта успешно подтверждена! Удачи в обучении.", null, -> showActivate(2))

		when '300'
			showModal('error','Возникла ошибка при отправке запроса на регистрацию! Проверьте соединение с интернетом или повторите попытку позже.')

		when '301'
			showModal('error','Возникла ошибка при регистрации пользователя! Пользователь с таким логином или почтой уже зарегистрирован!')

		when '302'
      showModal('error','Возникла ошибка при отправке запроса на авторизацию пользователя! Проверьте соединение с интернетом или повторите попытку позже.')

		when '303'
			showModal('error','Пользователь с таким логином не найден!')

		when '304'
      showModal('error','Пароль введён не верно!')

		when '305'
      showModal('error','Произошла ошибка при отправке письма')

		when '306'
      showModal('warn','Необходимо активировать ваш аккаунт', null, -> vm.mailActivation())
				
	
$(document).scroll ->
	$('#comet1').css
		top: -500 + $(document).scrollTop() 
	$('#comet2').css
		top: -550 + $(document).scrollTop()
	$('#comet3').css
		top: -600 + $(document).scrollTop()
	$('#comet4').css
		top: -500 + $(document).scrollTop()
		
		
$(document).ready -> 
	$('.preloader').fadeOut(1000, ->
		$('body').css
			'overflow': 'auto')
	


	
		


	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	