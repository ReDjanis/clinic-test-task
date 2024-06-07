<?php 
// Подключение библиотеки 
require 'phpmailer/PHPMailer.php'; 
require 'phpmailer/SMTP.php'; 
require 'phpmailer/Exception.php'; 
 
if (!error_get_last()) { 
 
  // Получение данных 
$json = file_get_contents('php://input'); // Получение json строки 
$data = json_decode($json, true); // Преобразование json 
 
// Данные 
$name = $data['nameUser']; 
$email = $data['email']; 
$text = $data['textMessage']; 
     
// Формирование самого письма 
$title = "Заявка на запись с сайта"; 
$body = " 
<h2>Новое письмо</h2> 
<b>Имя:</b> $name<br> 
<b>Почта:</b> $email<br><br> 
<b>Сообщение:</b><br>$text 
"; 
     
// Настройки PHPMailer 
$mail = new PHPMailer\PHPMailer\PHPMailer(); 
     
$mail->isSMTP();    
$mail->CharSet = "UTF-8"; 
$mail->SMTPAuth   = true; 
     
// Настройки вашей почты 
// Настройки почты отправителя
$mail->Host       = 'smtp.mail.ru'; // SMTP сервера вашей почты
$mail->Username   = 'tofu1991@inbox.ru'; // Логин на почте
$mail->Password   = 'fCcpcDSPnBNhCGDCWjAf'; // Пароль на почте
$mail->SMTPSecure = 'ssl';
$mail->Port       = 465;
$mail->setFrom('tofu1991@inbox.ru', 'Сайт клиники'); // Адрес самой почты и имя отправителя
     
// Получатель письма 
$mail->addAddress('rbru-metrika@yandex.ru');   
 
// Отправка сообщения 
$mail->isHTML(true); 
$mail->Subject = $title; 
$mail->Body = $body;     
     
// Проверяем отправленность сообщения 
if ($mail->send()) { 
    $data['result'] = "success"; 
     $data['info'] = "Сообщение успешно отправлено!"; 
} else { 
    $data['result'] = "error"; 
    $data['info'] = "Сообщение не было отправлено. Ошибка при отправке письма"; 
    $data['desc'] = "Причина ошибки: {$mail->ErrorInfo}"; 
} 
     
} else { 
    $data['result'] = "error"; 
    $data['info'] = "В коде присутствует ошибка"; 
    $data['desc'] = error_get_last(); 
} 
// Отправка результата 
header('Content-Type: application/json'); 
echo json_encode($data); 
?>