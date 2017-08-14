<?php
session_start();
var_dump($_SESSION);
if( $_SERVER['REQUEST_URI'] == '/'){
    include 'page/main/index.php';
}