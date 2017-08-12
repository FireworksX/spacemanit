<?php
var_dump($_SERVER);
if( $_SERVER['REQUEST_URI'] == '/'){
    include 'page/main/index.php';
}