<?php

require "db.php";
require "libs/PHPMailer/PHPMailerAutoload.php";
session_start();
$json = file_get_contents('php://input');
$data = json_decode($json, JSON_BIGINT_AS_STRING);

$bodyMail = '<div class="bg" style="padding-top: 100px; background: url(https://pp.userapi.com/c638918/v638918779/6e0e1/D2gIzLRo-ps.jpg) repeat; width: 100%;height: 800px; text-align: center;">
    <div class="content" style="width: 500px; margin: auto;text-align: center;border: 1px solid #9bda89;-webkit-border-radius: 3px;-moz-border-radius: 3px;border-radius: 3px;background: #fff; padding: 0 0 20px 0; color: #0f0f0f; font-family: "Arial", sans-serif; font-size: 20px;">
        <div class="content__head" style="background: #fff; padding: 10px; font-weight: 600; border-bottom: 1px solid #b0b0b0; text-align: left;">Тема:</div>
        <div class="content__body" style="padding: 20px;"><b>'. $data['body'] .' '. $data['code'] .'</b></div>
    </div>
</div>';

$mail = new PHPMailer;

$mail->IsSMTP();                                      // set mailer to use SMTP
$mail->Host = "mail.spacemanit.pro";  // specify main and backup server
$mail->SMTPAuth = true;     // turn on SMTP authentication
$mail->Username = "admin@spacemanit.pro";  // SMTP username
$mail->Password = "9811472874Artyr"; // SMTP password

$mail->From = "from@example.com";
$mail->FromName = "Spacemanit.pro";
$mail->AddAddress($data['link'], "Josh Adams");

$mail->WordWrap = 50;                                 // set word wrap to 50 characters
$mail->IsHTML(true);            // set email format to HTML
$mail->CharSet = "utf-8";

$mail->Subject = "Here is the subject";
$mail->Body    = $bodyMail;
$mail->AltBody = "This is the body in plain text for non-HTML mail clients";

if(!$mail->Send())
{
    echo '';
    exit;
}

echo "Message has been sent";

