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



showModal = (type, title, text, timeOut, callback) ->
  console.log arguments
  if typeof type is undefined then type = 'info'
  if typeof callback isnt "function" then callback = ->
  switch type
    when 'info'
      icon = "<i style='color: #108EE9;' class='zmdi zmdi-info-outline'></i>"
    when 'error'
      icon = "<i style='color: #ff6f6f;' class='zmdi zmdi-close'></i>"
    when 'warn'
      icon = "<i style='color: #ffa500;' class='zmdi zmdi-alert-circle'></i>"
    when 'success'
      icon = "<i style='color: #4bff59;' class='zmdi zmdi-check'></i>"
  object = $("<li class='modalwindow__item  animated slideInRight'><div class='modalwindow__icon'>#{icon}</div><div class='modalwindow__text'><div class='modalwindow__title'>#{title}</div><p class='modalwindow__body'>#{text}</p></div></li>")
  $('.modalwindow__list').append(object)
  setTimeout(->
    object.removeClass('slideInRight').addClass('zoomOutUp')
  , timeOut)

  setTimeout(->
    object.remove()
    do callback
  , timeOut + 1000)





validateData = (type, body) ->
	if type is 'phone' then return /^\+\d{2}\(\d{3}\)\d{3}-\d{2}-\d{2}$/.test(body)
	if type is 'email' then return /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(body)
	if type is 'login' then return /^[a-zA-Z0-9]+$/.test(body)
	if type is 'pass' then return /^[a-zA-Z0-9]+$/.test(body)
	if type is 'code' then return /^[0-9]+$/.test(body)

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
## 3 - Recovery mode
##
#############################################


symbolForCode = ['1','2','3','4','5','6','7','8','9','0']
vm = new Vue
	el: "#app"
	data:
		dataAuth: {}
		confirmCode: 1
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
    register: ->
      @$http.post("pages/main/includes/register.php?register=", @dataAuth).then((res) ->
        console.log res
        modalWindow(res.data)
        (error) ->
          console.log error
          modalWindow('300'))
    signin: ->
      @$http.post("pages/main/includes/login.php?login=", @dataAuth).then((res) ->
        modalWindow(res.data);
        console.log res
        console.log @.dataAuth
        (error) ->
          console.log error
          modalWindow('302'))
  }


recovery = 0
register = 0
type = 'signin'
$('.main__recovery').on 'click', ->
  if recovery is 0
    $('.signin').fadeOut(300, ->
      $('.recovery').fadeIn()
      $('.main__register').hide()
      $('.main__recovery').text('Я знаю свои данные!')
      $('.main__start').text('Востановить')
      recovery = 1
      type = 'recovery'
    )
  else
    $('.recovery').fadeOut(300, ->
      $('.signin').fadeIn()
      $('.main__register').show()
      $('.main__recovery').text('Забыли пароль?')
      $('.main__start').text('Вход')
      recovery = 0
      type = 'signin'
    )

$('.main__register').on 'click', ->
  if register is 0
    $('.signin').fadeOut(300, ->
      $('.register').fadeIn()
      $('.main__recovery').hide()
      $('.main__register').html('<div class="main__register">У меня есть акаунт. <span>Войти!</span></div>')
      $('.main__start').text('Зарегистрироваться')
      register = 1
      type = 'register'
    )
  else
    $('.register').fadeOut(300, ->
      $('.signin').fadeIn()
      $('.main__recovery').show()
      $('.main__register').html('<div class="main__register">Вы ещё не снами? <span>Присоединиться!</span></div>')
      $('.main__start').text('Вход')
      register = 0
      type = 'signin'
    )

$('.main__start').on 'click', ->
  $('.register__firstname, .register__lastname, .register__login, .register__mail, .register__password, .register__confpassword, .signin__login, .signin__password').removeClass('input_bad')
  if type is 'register'
    if typeof vm.dataAuth.firstname is 'undefined' or vm.dataAuth.firstname is ''
      $('.register__firstname').addClass('input_bad')
      return

    if typeof vm.dataAuth.lastname is 'undefined' or vm.dataAuth.lastname is ''
      $('.register__lastname').addClass('input_bad')
      return

    if typeof vm.dataAuth.login is 'undefined' or vm.dataAuth.login is ''
      $('.register__login').addClass('input_bad')
      return

    if validateData('email', vm.dataAuth.email) isnt true
      $('.register__mail').addClass('input_bad')
      return

    if typeof vm.dataAuth.password is 'undefined' or vm.dataAuth.password is '' or vm.dataAuth.password isnt vm.dataAuth.confpassword
      $('.register__password').addClass('input_bad')
      $('.register__confpassword').addClass('input_bad')
      return

    vm.dataAuth.password = btoa(vm.dataAuth.password)
    vm.register()

  if type is 'confirm'
    if vm.activate.code is vm.confirmCode
      vm.activate.action = 2
      vm.mailActivation()
    else
      $('.confirm__code').addClass('input_bad')

  if type is 'signin'
    if typeof vm.dataAuth.login is 'undefined' or vm.dataAuth.login is ''
      $('.signin__login').addClass('input_bad')
      return
    if typeof vm.dataAuth.password is 'undefined' or vm.dataAuth.password is ''
      $('.signin__password').addClass('input_bad')
      return
    vm.dataAuth.password = btoa(vm.dataAuth.password)
    vm.signin()


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
			showModal('info', "Регистрация", "Пользователь: #{vm.dataAuth.login} успешно зарегистрирован!", 3000, -> vm.mailActivation())

		when '201'
      showModal('success', 'Авторизация', "Пользователь: #{vm.dataAuth.login} успешно авторизирован!", 3000, -> window.location.reload())

		when '203'
      showModal('success', 'Подтверждение',"Письмо успрешно отправленно пользователю: #{vm.dataAuth.login}", 3000, ->
        type = 'confirm'
        $('.main__start').text('Подтвердить')
        $('.register').hide()
        $('.confirm').show())

		when '204'
      showModal('success', 'Подтверждение',"Почта успешно подтверждена. Удачи в обучении!", 3000, -> window.location.reload())

		when '300'
			showModal('error', 'Ошибка','Возникла ошибка при отправке запроса на регистрацию! Проверьте соединение с интернетом или повторите попытку позже.', 3000)

		when '301'
      showModal('error', "Регистрация", "Возникла ошибка при регистрации пользователя! Пользователь с таким логином или почтой уже зарегистрирован!", 3000)

		when '302'
      showModal('error','Возникла ошибка при отправке запроса на авторизацию пользователя! Проверьте соединение с интернетом или повторите попытку позже.')

		when '303'
			showModal('error','Пользователь с таким логином не найден!')

		when '304'
      showModal('error','Пароль введён не верно!')

		when '305'
      showModal('error', 'Подтверждение',"Произошла ошибка при отправке письма", 3000)

		when '306'
      showModal('warn','Необходимо активировать ваш аккаунт', null, -> vm.mailActivation())

	


	
		


	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	