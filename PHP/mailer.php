
<?php
	
	/* Set e-mail recipient */
	$myemail = "sahil.mutneja26@gmail.com";

	/* Check all form inputs using check_input function */
	$name = check_input($_POST['inputName'], "Your Name");
	$email = check_input($_POST['inputEmail'], "Your E-mail Address");
	$subject = check_input($_POST['inputSubject'], "Message Subject");
	$message = check_input($_POST['inputMessage'], "Your Message");

	/* If e-mail is not valid show error message */
	if (!preg_match("/([\w\-]+\@[\w\-]+\.[\w\-]+)/", $email)){
		show_error("Invalid e-mail address");
	}
	
	/* Let's prepare the message for the e-mail */

	$subject = "Personal Website Contact Form Message";

	$message = "

	Someone has sent you a message using your contact form:

	Name: $name
	Email: $email
	Subject: $subject

	Message:
	$message

	";


	/* Send the message using mail() function */
	mail($myemail, $subject, $message);

	/* Redirect visitor to the thank you page */
	header('Location: http://23.239.3.218/confirmation.html');
	exit();

	/* Functions we used */
	function check_input($data, $problem=''){
		$data = trim($data);
		$data = stripslashes($data);
		$data = htmlspecialchars($data);
		if ($problem && strlen($data) == 0){
			show_error($problem);
		}
		return $data;
	}

	function show_error($myError){
?>
<html>
	
	<head>

    	<style type="text/css">
			#message{
			    margin-right: 40%;
			    margin-left: 40%;
			    margin-top: 2%;
			    padding: center;
			}

    	</style>
	</head>
	
	<body style="background:#C0C0C0">

		<div id="message">
  
            <p>Please correct the following error:</p>
			<strong>
				<?php echo $myError; ?>
			</strong>
			<p>Hit the back button and try again</p>	
        		
		</div>

	</body>

</html>

<?php

	exit();
}

?>

