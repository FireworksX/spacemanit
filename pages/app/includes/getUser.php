<?php
//	require "db.php";
//	session_start();
//	$json = file_get_contents('php://input');
//	$data = json_decode($json, JSON_BIGINT_AS_STRING);
//	header('Content-type: application');
//	if($_SESSION['id'] == 'BAD'){
//		echo '309';
//	}else{
//		$user = R::findOne( 'users', 'id = ?', array($_SESSION['id']));
//		$response['id'] = $user->id;
//		$response['login'] = $user->login;
//		$response['email'] = $user->email;
//		$response['join_date'] = $user->join_date;
//		$response['nodes'] = $user->nodes;
//		print_r (json_encode($response));
//	}
	