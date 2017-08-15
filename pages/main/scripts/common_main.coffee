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

validateData = (type, body) ->
	if type is 'phone' then return /^\+\d{2}\(\d{3}\)\d{3}-\d{2}-\d{2}$/.test(body)
	if type is 'email' then return /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(body)
	if type is 'login' then return /^[a-zA-Z0-9]+$/.test(body)

#####################
#	Snap
#####################
	

		

	

#####################
#	Vue
#####################


Vue.use VueResource
	
vm = new Vue
	el: "#app"
	data:
		dataAuth: {}
		register: {}
		login: {}
	methods:
		registerF: ->
			@$http.post("pages/main/includes/register.php?register=", @dataAuth).then((res) ->
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
	
modalWindow = (value) ->
	switch value
		when '200'
			showModal('good',"Пользователь: #{vm.dataAuth.login} успешно зарегистрирован!", null)

		when '201'
      showModal('good',"Пользователь: #{vm.dataAuth.login} успешно авторизирован!", null, -> window.location = 'pages/app')

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
	


	
		


	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	