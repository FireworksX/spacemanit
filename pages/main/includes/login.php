<?php
	require "db.php";
	session_start();
	$json = file_get_contents('php://input'); 
	$data = json_decode($json, JSON_BIGINT_AS_STRING);
	$user = R::findOne('users', 'login = ?', array($data['login']));
	if($user){
		$hash = md5($data['pass']);
		if($hash == $user->password){
			$_SESSION['id'] = $user->id;
			echo '201';
		}else{
			echo 304;
		}
	}else{
		echo 303;
	}
	