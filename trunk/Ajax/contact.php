<?php
ini_set("SMTP","smtp.free.fr");
$FROM		= "tlissak@gmail.com" ;
$TO 		= "tlissak@gmail.com" ;
$subject	= "Luach tahara email" ;

$headers ='From: "tahara"<'.$FROM.'>'."\n"; 
$headers .='Reply-To: '.$FROM. "\n"; 
$headers .='Content-Type: text/plain; charset="iso-8859-1"'."\n"; 
$headers .='Content-Transfer-Encoding: 8bit'; 

while (list($key, $val) = each($HTTP_POST_VARS)) {
  $message .= "$key : $val\n";
}
mail($TO, $subject, $message, $headers);
?>OK