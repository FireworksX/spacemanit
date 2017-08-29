<?php
    session_start();
    $dest = session_destroy();
    print_r($_SESSION);