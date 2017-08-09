<?php
	require "db.php";
	
	$json = file_get_contents('php://input'); 
	$data = json_decode($json, JSON_BIGINT_AS_STRING);
	if( R::count('users', "login = ? OR email = ?", array($data['login'], $data['email'])) > 0 ){
		echo 301;
	}else{
		$users = R::dispense('users');
		$users->login = $data['login'];
		$users->password = md5($data['password']);
		$users->email = $data['email'];
		$users->nodes = '';
		$users->join_date = date("Y-m-d H:i:s");
		$users->money = base64_encode(0);
		R::store($users);
		echo 200;
	}
	