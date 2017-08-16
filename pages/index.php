<?php
session_start();
if( $_SERVER['REQUEST_URI'] == '/'){
    if($_SESSION['id'] != ''){
        require 'pages/app/index.php';
    }else{
        require 'pages/main/index.php';
    }
}