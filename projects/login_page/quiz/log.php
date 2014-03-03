

<?php
	
	include "base.php";	

	if(empty($_POST['user_name']) || empty($_POST['pass_word'])){

		echo "<script type='text/javascript'>alert('Credentials not properly entered ');</script>";	
	//	echo "<meta http-equiv='refresh' content='index.html' />";
		echo "<script>window.location = 'index.html'</script>";
	
		die();   
    }


    if(!empty($_POST['user_name']) && !empty($_POST['pass_word'])){

    	$username = mysql_real_escape_string($_POST['user_name']);  
    	$password = md5(mysql_real_escape_string($_POST['pass_word']));

    	$checklogin = mysql_query("SELECT * FROM users WHERE username = '".$username."' AND password = '".$password."' ");  

    	if(mysql_num_rows($checklogin) == 1){

        	$row = mysql_fetch_array($checklogin);  
        	$email = $row['email_address'];  
          
        	$_SESSION['user_name'] = $username;  
        	$_SESSION['email_address'] = $email;  
        	$_SESSION['LoggedIn'] = 1;  
          
        	//echo "<h1>Success</h1>";  
        	//echo "<p>We are now redirecting you to the member area.</p>";  
        	//echo "<meta http-equiv='refresh' content='=2;index.php' />"; 

         	//echo "<script type='text/javascript'>alert('Success. You are succesfully logged in ');</script>";	
			
			//User will be redirected to the inner settings of the page now	
			//Add quiz out here

			echo "<script>window.location = 'quiz.php'</script>";



    	}  
    
    	else{  
        
        	echo "<script type='text/javascript'>alert('Account not found. Please Register ');</script>";	
			echo "<script>window.location = 'index.html'</script>";
			die();  
    	}
      	
     }

     /*
     if(!empty($_SESSION['LoggedIn']) && !empty($_SESSION['user_name'])){  
   
   		echo "You are ". $_SESSION['user_name']. " and ur email address is ". $_SESSION['email_address']   
    }  
	*/

?>