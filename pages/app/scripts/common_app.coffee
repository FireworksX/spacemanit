###########################
#	Nodes
##########################

nodes = null
user = null

###########################
#	Functions
##########################

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

pathString = ""

drawPath = (i) ->
		parent = nodes[i].parent

		if parent != 0
			posParent = "#{nodes[parent-1].x}, #{nodes[parent-1].y}"
		else
			posParent = "#{nodes[i].x}, #{nodes[i].y}"
		path = paper
			.path ""
			.data 'pathid', nodes[i].id
			.attr
				stroke: "#717171"
				fill: "transparent"
				strokeWidth: 3
				d: "M #{posParent} L #{nodes[i].x},#{nodes[i].y}"
		renderNodes(i)
			

renderNodes = (i) ->

	node = paper.circle nodes[i].x, nodes[i].y, nodes[i].size
		.attr 
			fill: nodes[i].color
		.data 'id', nodes[i].id - 1
		.mouseover ->
			if nodes[i].status is 1
				@stop().animate {r: nodes[i].size + 10}, 1000, mina.elastic
		.mouseout ->
			@stop().animate {r: nodes[i].size}, 300, mina.easeinout
		.click (event) ->
			id = nodes[@data 'id'].id
			window.open "../parts.html?lesson_id=#{id}"
		.touchstart ->
			alert nodes[@data 'id'].id
		.drag (dx, dy, x, y) ->
			console.log "#{x}  #{y}"
	
	text = paper.text nodes[i].x - 15, nodes[i].y + nodes[i].size + nodes[i].size / 2, nodes[i].name
	iconName = nodes[i].icon

	icon = paper.svg nodes[i].x - 15, nodes[i].y - 16, 30, 32, 0, 0, 30, 32
	
	Snap.load "images/icons/#{iconName}.svg", (iconName) ->
		icon = icon.append iconName
	
	group = paper.g node, text, icon
	$('.add').fadeOut()
	

startOperations = ->
	nodes = nodes.slice(1)
	for i in [0..nodes.length - 1]
		nodes[i].dif = Number(nodes[i].dif)
		nodes[i].id = Number(nodes[i].id)
		nodes[i].parent = Number(nodes[i].parent)
		nodes[i].path = Number(nodes[i].path)
		nodes[i].size = Number(nodes[i].size)
		nodes[i].status = Number(nodes[i].status)
		nodes[i].x = Number(nodes[i].x)
		nodes[i].y = Number(nodes[i].y)
		drawPath(i)
	for i in [0..nodes.length - 1]
		renderNodes(i)
		
starAnimations = (element, animation) ->
  ##################################################################
  ## Animations for stars
  ## 1 - Change x(+300), y (+200), color (#f0f). Duration - 20000ms
  ## 2 - Change x(+50), y (-100), color (#becfff). Duration - 22000ms
  ## 3 - Change x(-150), y (+130), color (#efffa8). Duration - 18000ms
  ## 4 - Change x(-350), y (-130), color (#7dff6d). Duration - 28000ms
  ##
  ##################################################################
  x = element.node.attributes.cx.value
  y = element.node.attributes.cy.value
  r = element.node.attributes.r.value
#  fill = element.node.attributes.fill.value
  switch animation
    when 1
      element.animate({cx: Number(x) + 300, cy: Number(y) + 200, fill: '#f0f'}, 20000, -> starAnimations(element, Math.floor(Math.random() * (4 - 1) + 1)))

    when 2
      element.animate({cx: Number(x) + 50, cy: Number(y) - 100, fill: '#becfff'}, 22000, -> starAnimations(element, Math.floor(Math.random() * (4 - 1) + 1)))

    when 3
      element.animate({cx: Number(x) - 150, cy: Number(y) + 130, fill: '#efffa8'}, 18000, -> starAnimations(element, Math.floor(Math.random() * (4 - 1) + 1)))

    when 4
      element.animate({cx: Number(x) - 350, cy: Number(y) + 130, fill: '#7dff6d'}, 28000, -> starAnimations(element, Math.floor(Math.random() * (4 - 1) + 1)))

	
###########################
#	Snap SVG
##########################

paper = Snap 1920, 1080

bg = paper.rect 0, 0, 1920, 1080
bg.attr
  fill: '#0f0f1e'

for i in [0..20]
  radiusBlur = Math.floor(Math.random() * (10 - 3) + 3)
  filter = paper.filter(Snap.filter.blur(radiusBlur, radiusBlur))
  star = paper.circle(Math.floor(Math.random() * $(window).width()), Math.floor(Math.random() * $(window).height()), Math.floor(Math.random() * (10 - 3) + 3))
  star.attr
    fill: '#FFF'
    filter: filter
    starAnimations(star, Math.floor(Math.random() * (4 - 1) + 1))


paper.dblclick (event) ->
	
	$('.add').css
		top: event.offsetY + 9
		left: event.offsetX + 8
	.fadeIn()
	
	$('.add-pos__x').text "X: #{event.offsetX + 9}"
	$('.add-pos__y').text "Y: #{event.offsetY + 8}"
	
	vm.$data.nodeData.x = event.offsetX + 9
	vm.$data.nodeData.y = event.offsetY + 8
	
#i = 0
#while i < nodes.length
#	renderNodes(i)
#	i++

#pathArray = []

#updatePath = ->
#	first = pathArray[0]
#	pathString = "M #{first.x},#{first.y}"
#	for node in pathArray.slice 1
#		pathString += "L #{node.x},#{node.y}"
#	path.attr d: pathString

#paper.click (event) ->
#	if event.target.tagName is 'svg' or event.target.tagName is 'path'
#		circle = paper.circle event.offsetX, event.offsetY, 30
#			.attr style
#			.data 'i', pathArray.length
#			.mouseover ->
#				@stop().animate {r:40}, 1000, mina.elastic
#			.mouseout ->
#				@stop().animate {r:30}, 300, mina.easeiinout
#			.drag ((dx, dy, x, y) ->
#				@attr
#					cx: x
#					cy: y
#				currentNode = pathArray[@data 'i']
#				currentNode.x = x
#				currentNode.y = y
#				do updatePath),
#				-> path.stop().animate {opacity: .3}, 200, mina.easeinout,
#				-> path.stop().animate {opacity: 1}, 300, mina.easeinout,
#			
#		pathArray.push
#			x: event.offsetX
#			y: event.offsetY
#			
#		updatePath()	

###########################
#	Vue
##########################

Vue.use VueResource
	
vm = new Vue
	el: "#app"
	data:
		nodeData: {}
		nodes: []
		user: 
			login: 'Default'
			avatar: 'avater.png'
	methods:
		addNode: ->
			@$http.post("pages/app/includes/addNode.php?node=", @nodeData).then((res) ->
				modalWindow(res.data);
			(error) ->
				modalWindow('300'))
		getNodes: ->
			@$http.post("pages/app/includes/getNodes.php").then((res) ->
				@nodes = res.data
				modalWindow('203')
				nodes = @nodes
				startOperations()
			(error) ->
				modalWindow('300'))
		getUser: ->
			@$http.post("pages/app/includes/getUser.php").then((res) ->
				if res.data is '309'
					modalWindow('309')
				else
					@user.id = Number(res.data.id)
					@user.login = res.data.login
					@user.email = res.data.email
					@user.join_date = res.data.join_date
					console.log vm.user
					modalWindow('204')
			(error) ->
				modalWindow('308'))
vm.getUser()
vm.getNodes()



###########################
#	Static elements
##########################

$('.left-slide').height($(window).height())

active = 0
$('.left-slide').hide()
$('.bar-circle').on 'click', ->
	if active == 0
		$('.left-slide').animate {left: "0px"}, 600
		$('.left-slide').show()
		active = 1
	else
		$('.left-slide').animate {left: "-300px"}, 600, ->
			$('.left-slide').hide()
		active = 0

profileActive = 0

$('.profile__avatar').on 'click', ->
	if profileActive is 0
		$('.profile-stats').animate
			width: '300px',
			500,
			->
				$('.profile-stats__money').fadeIn().css
					display: 'inline-block'
				$('.profile-stats__name').fadeIn().css
					display: 'inline-block'
				profileActive = 1
	else
		$('.profile-stats__money').fadeOut().css
			display: 'inline-block'
		$('.profile-stats__name').fadeOut().css
			display: 'inline-block'
		$('.profile-stats').animate
			width: '60px',
			500,
			->
				profileActive = 0

status = null

$('.add-active__left').on 'click', ->
	$(this).addClass 'add-active__select'
	$('.add-active__right').removeClass 'add-active__select'
	status = true

$('.add-active__right').on 'click', ->
	$(this).addClass 'add-active__select'
	$('.add-active__left').removeClass 'add-active__select'
	status = false

$('.add__button').on 'click', ->

	if $('.add-name__input').val() is ''
		alert 'Введите имя'
		return

	if status is null
		alert 'Выберите активность'
		return
	else if status is false
			vm.nodeData.status = false
		else
			vm.nodeData.status = true

	if $('.add-parent__input').val() is ''
		alert 'Вы не указали родителя'
		return

	if $('.add-path__input').val() is ''
		alert 'Вы не указали какой урок будет загружаться.'
		return

	if $('.add-color__input').val() is ''
		alert 'Вы не ввели цвет ноды. Будет установлен чёрный цвет (по умолчанию)'
		vm.nodeData.color = '#000'

	if $('.add-size__input').val() is ''
		alert 'Вы не ввели размер ноды. Будет установлен размер 20 (по умолчанию)'
		vm.nodeData.size = 20

	if $('.add-dif__input').val() is ''
		alert 'Вы не указали сложность. Будет установлен 1 (по умолчанию)'
		vm.nodeData.dif = 1

	vm.addNode()

$('.add__exit').on 'click', ->
	$('.add').fadeOut()



modalWindow = (value) ->
	switch value
				
		when '200'
			showModal('good', "Пользователь: #{vm.$data.register.login} успешно зарегистрирован!")
				
		when '201'
      showModal('good', "Пользователь: #{vm.$data.login.login} успешно авторизирован!")
			
		when '202'
      showModal('good', "Нода с именем: #{vm.$data.nodeData.name} успешно добавлена.")

		when '203'
      showModal('good', "Все ноды успешно загружены.")
			
		when '204'
      showModal('good', "Данные пользователя успешно получены.")
				
		when '300'
			showModal('error', "Возникла ошибка при отправке запроса на регистрацию! Проверьте соединение с интернетом или повторите попытку позже.")
			
		when '305'
      showModal('warn', "Нода с таким именем уже существует.")
				
		when '306'
      showModal('warn', 'Урок указанный на ноду уже используется.')
				
		when '307'
      showModal('warn', 'Возникла ошибка при отправке запроса на добавление ноды! Проверьте соединение с интернетом или повторите попытку позже.')
				
		when '308'
			showModal('error', 'Возникла ошибка при отправке запроса на получения данных пользователя! Проверьте соединение с интернетом или повторите попытку позже.')
				
		when '309'
      showModal('info', 'Сессия не найдена. Авторизируйтесь повторно.')



