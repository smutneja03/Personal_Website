

<?php  
	
	include "base.php";

	if(!empty($_POST['username']) && !empty($_POST['password'])){

    	$username = mysql_real_escape_string($_POST['username']);  
    	$password = md5(mysql_real_escape_string($_POST['password']));  
    	$email = mysql_real_escape_string($_POST['email']);  


     	$checkusername = mysql_query("SELECT * FROM users WHERE username = '".$username."'");  
       
    	echo $checkusername;

     	if(mysql_num_rows($checkusername) == 1){  
        		
        	echo "<script type='text/javascript'>alert('Username already taken. Try Again :( ' );</script>";	
			echo "<script>window.location = 'index.html'</script>";
			die();		  
     	}  
     		
     	else{  
        	
        	$registerquery = mysql_query("INSERT INTO users (username, password, email_address) VALUES ('".$username."', '".$password."', '".$email."') ");  
        	
        	if($registerquery){

            	//echo "<h1>Success</h1>";  
            	//echo "<p>Your account was successfully created. Please <a href='index.html'>click here to login</a>.</p>";
	            echo "<script type='text/javascript'>alert('Account Created. Login to access ');</script>";	
	            //account created now user will be redirected to its session 
	            //add quiz out here

	            echo "<script>window.location = 'quiz.php'</script>";


        	}  
        	
        	else{  
           		
           		echo "<script type='text/javascript'>alert('Registration failed. Try again :() ');</script>";	
				echo "<script>window.location = 'index.html'</script>";
				die();      
        	}         
     	}  
	}

	else{

		echo "<script type='text/javascript'>alert('Credentials not properly entered ');</script>";	
		echo "<script>window.location = 'index.html'</script>";
		die();    

	}  

	?>