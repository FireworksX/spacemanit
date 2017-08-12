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
			@$http.post("includes/register.php?register=", @dataAuth).then((res) ->
				console.log res.data
				modalWindow(res.data)
				(error) ->
					modalWindow('300'))
		loginF: ->
			@$http.post("includes/login.php?login=", @dataAuth).then((res) ->
#				@id = res.data.split '|'
#				console.log @id
				modalWindow(res.data);										  
			(error) -> 
				modalRegister('302'))

type = 'reg'

$('.register__have').on 'click', ->
	if type is 'reg'
		$('.body-login').fadeOut()
		$(@).text('Я хочу зарегистрироваться')
		type = 'log'
	else 
		$('.body-login').fadeIn()
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
	switch value
		when '200'
			console.info "Пользователь: #{vm.$data.dataAuth.login} успешно зарегистрирован!"
				
		when '201'
			console.info "Пользователь: #{vm.$data.dataAuth.login} успешно авторизирован!"
			window.location = '/pages/app'
		
		when '300'
			console.error 'Возникла ошибка при отправке запроса на регистрацию! Проверьте соединение с интернетом или повторите попытку позже.'
				
		when '301'
			console.error 'Возникла ошибка при регистрации пользователя! Пользователь с таким логином или почтой уже зарегистрирован!'
				
		when '302'
			console.error 'Возникла ошибка при отправке запроса на авторизацию пользователя! Проверьте соединение с интернетом или повторите попытку позже.'
				
		when '303'
			console.error 'Пользователь с таким логином не найден!'
				
		when '304'
			console.error 'Пароль введён не верно!'
				
	
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
	
	

	
		


	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	