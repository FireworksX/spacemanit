<?php
	require "db.php";
	
	$json = file_get_contents('php://input'); 
	$data = json_decode($json, JSON_BIGINT_AS_STRING);
	if( R::count('nodes', "name = ?", array($data['name'])) > 0 ){
		echo 305;
	}elseif( R::count('nodes', "path = ?", array($data['path'])) > 0 ){
		echo 306;
	}else{
		$node = R::dispense('nodes');
		$node->name = $data['name'];
		$node->dif = $data['dif'];
		$node->x = $data['x'];
		$node->y = $data['y'];
		$node->color = $data['color'];
		$node->parent = $data['parent'];
		$node->path = $data['path'];
		$node->size = $data['size'];
		$node->status = $data['status'];
		$node->icon = $data['icon'];
		R::store($node);
		echo 202;
	}