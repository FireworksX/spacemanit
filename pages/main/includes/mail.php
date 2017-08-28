<?php

require "db.php";
require "../../libs/PHPMailer/PHPMailerAutoload.php";
session_start();
$json = file_get_contents('php://input');
$data = json_decode($json, JSON_BIGINT_AS_STRING);

$user = R::findOne('users', 'login = ?', array($data['login']));
$email = $user->email;

if( $data['action'] == 1){
    $title = 'Подтвердите свою почту';
    $text = 'Вы оставили заявку на регистрацию на сайте <b>spacemanit.pro</b>. Для подтверждения вашего адреса используйте код';
    $code = $data['code'];
}elseif ( $data['action'] == 2 ) {
    $title = 'Ваша почта подтверждена!';
    $text = 'Ваша почта успешно подтверждена на сайте <b>spacemanit.pro</b>. Желаем успехов в программировании, а мы постараемся вам помочь';
    $code = '';
}


$bodyMail = '<div class="bg" style="padding-top: 100px; background: url(https://pp.userapi.com/c638918/v638918779/6e0e1/D2gIzLRo-ps.jpg) repeat; width: 100%;height: 800px; text-align: center;">
    <div class="content" style="width: 500px; margin: auto;text-align: center;border: 1px solid #9bda89;-webkit-border-radius: 3px;-moz-border-radius: 3px;border-radius: 3px;background: #fff; padding: 0 0 20px 0; color: #0f0f0f; font-family: "Arial", sans-serif; font-size: 20px;">
        <div class="content__head" style="background: #fff; padding: 10px; font-weight: 600; border-bottom: 1px solid #b0b0b0; text-align: left;">Тема: '. $title .'</div>
        <div class="content__body" style="padding: 20px;">'. $text .' <b>'. $code .'</b></div>
    </div>
</div>';

$mail = new PHPMailer;

$mail->IsSMTP();
$mail->Host = "mail.spacemanit.pro";
$mail->SMTPAuth = true;
$mail->Username = "admin@spacemanit.pro";
$mail->Password = "9811472874Artyr";

$mail->From = "admin@spacemanit.pro";
$mail->FromName = "Spacemanit.pro";
$mail->AddAddress($email, "Account");

$mail->WordWrap = 50;
$mail->IsHTML(true);
$mail->CharSet = "utf-8";

$mail->Subject = $title;
$mail->Body    = $bodyMail;
$mail->AltBody = "Писмо с сайта spacemanit.pro";

if(!$mail->Send())
{
    echo '305';
}else{
    if( $data['action'] == 2 ){
        if($user){
            $user->active = 1;
            R::store($user);
            $_SESSION['id'] = $user->id;
            echo '204';
        }
    }else {
        echo "203";
    }
}


