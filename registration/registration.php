<?php  
	
	include "base.php";


    $first_name = mysql_real_escape_string($_POST['first_name']);  
    $middle_name = mysql_real_escape_string($_POST['middle_name']);  
    $last_name = mysql_real_escape_string($_POST['last_name']);
    
    $locality = mysql_real_escape_string($_POST['locality']);
    $city = mysql_real_escape_string($_POST['city']);
    $country = mysql_real_escape_string($_POST['country']);
    $state = mysql_real_escape_string($_POST['state']);
    $district = mysql_real_escape_string($_POST['district']);
    $pin = mysql_real_escape_string($_POST['pin']);

    $p_locality = mysql_real_escape_string($_POST['p_locality']);
    $p_city = mysql_real_escape_string($_POST['p_city']);
    $p_country = mysql_real_escape_string($_POST['p_country']);
    $p_state = mysql_real_escape_string($_POST['p_state']);
    $p_district = mysql_real_escape_string($_POST['p_district']);
    $p_pin = mysql_real_escape_string($_POST['p_pin']);

    $dob = mysql_real_escape_string($_POST['dob']);
    $age = mysql_real_escape_string($_POST['age']);
    $mobile = mysql_real_escape_string($_POST['mobile']);
    $email = mysql_real_escape_string($_POST['email']);
    $password = md5(mysql_real_escape_string($_POST['pwd']));  
 
        	
    $registerquery = mysql_query("INSERT INTO users (first_name, middle_name, last_name, locality, city, country, state, district, pin, 
        p_locality, p_city, p_country, p_state, p_district, p_pin, dob, age, mobile, email, password) VALUES 
    ('".$first_name."', '".$middle_name."', '".$last_name."', '".$locality."', '".$city."', '".$country."', '".$state."'
        , '".$district."', '".$pin."', '".$p_locality."', '".$p_city."', '".$p_country."', '".$p_state."', '".$p_district."'
        , '".$p_pin."', '".$dob."', '".$age."', '".$mobile."', '".$email."', '".$password."') ");  
        	
    if($registerquery){

	    echo "<script type='text/javascript'>alert('Thank You for registering. Your Account has been created');</script>";

        $subject = "Registration at SuggestMe";

        $message = "Thank you for registering at SuggestMe. 
        We really appreciate your time.
        Good Luck";


        /* Send the message using mail() function */
        mail($email, $subject, $message);


        echo "<script>window.location = 'index.html'</script>";
        die();

    }  
        	
    else{  
           		
        echo "<script type='text/javascript'>alert('Registration failed. Try again :( ');</script>";	
		echo "<script>window.location = 'index.html'</script>";
		die();      
    }         
       

?>