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
				console.log res
				modalWindow(res.data)
				(error) ->
					console.log error
					modalWindow('300'))
		loginF: ->
			@$http.post("pages/main/includes/login.php?login=", @dataAuth).then((res) ->
#				@id = res.data.split '|'
#				console.log @id
				console.log res
				modalWindow(res.data);										  
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
		vm.registerF() 
		type = 'reg'
	else 
		vm.loginF()
		type = 'log'
	
modalWindow = (value) ->
	self = $('.register__modal')
	console.log value
	setTimeout( ->
		self.fadeOut()
	, 3000 )
	switch value
		when '200'
			self.text("Пользователь: #{vm.dataAuth.login} успешно зарегистрирован!")
			self.addClass('register__modal_good')
			self.fadeIn()

		when '201'
			self.text("Пользователь: #{vm.dataAuth.login} успешно авторизирован!")
			self.addClass('register__modal_good')
			window.location = '/pages/app'
			self.fadeIn()

		when '300'
			self.text('Возникла ошибка при отправке запроса на регистрацию! Проверьте соединение с интернетом или повторите попытку позже.')
			self.addClass('register__modal_bad')
			self.fadeIn()

		when '301'
			self.text('Возникла ошибка при регистрации пользователя! Пользователь с таким логином или почтой уже зарегистрирован!')
			self.addClass('register__modal_bad')
			self.fadeIn()

		when '302'
			self.text('Возникла ошибка при отправке запроса на авторизацию пользователя! Проверьте соединение с интернетом или повторите попытку позже.')
			self.addClass('register__modal_bad')
			self.fadeIn()

		when '303'
			self.text('Пользователь с таким логином не найден!')
			self.addClass('register__modal_bad')
			self.fadeIn()

		when '304'
			self.text('Пароль введён не верно!')
			self.addClass('register__modal_bad')
			self.fadeIn()
				
	
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
	
	

	
		


	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	