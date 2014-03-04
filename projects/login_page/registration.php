<?php  
	
	include "base.php";

	if(!empty($_POST['username']) && !empty($_POST['password'])){

    	$username = mysql_real_escape_string($_POST['username']);  
    	$password = md5(mysql_real_escape_string($_POST['password']));  
    	$email = mysql_real_escape_string($_POST['email']);  


     	$checkusername = mysql_query("SELECT * FROM users WHERE username = '".$username."'");  
       
     	if(mysql_num_rows($checkusername) == 1){  
        		
        	echo "<script type='text/javascript'>alert('Username already taken. Try Again :( ');</script>";			
        	echo "<script>window.location = 'index.html'</script>";
        	die();		  
     	
        }  
     		
     	else{  
        	
        	$registerquery = mysql_query("INSERT INTO users (username, password, email_address) VALUES ('".$username."', '".$password."', '".$email."') ");  
        	
        	if($registerquery){

	            echo "<script type='text/javascript'>alert('Account Created. Login to access');</script>";
                //this step has successfully created an account	
	            echo "<script>window.location = 'index.html'</script>";

        	}  
        	
        	else{  
           		
           		echo "<script type='text/javascript'>alert('Registration failed. Try again :( ');</script>";	
				echo "<script>window.location = 'index.html'</script>";
				die();      

        	}         
     	}  
	}

	else{

	//	echo "<script type='text/javascript'>alert('Credentials not properly entered ');</script>";	
		echo "<script>window.location = 'index.html'</script>";
		die();    

	}  

?>