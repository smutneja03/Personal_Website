

<?php
	
	function isecurit_status(){

		$status = shell_exec('sudo virsh list --all | grep RedHat9.0');

		if(strpos($status, 'running') !== false){ //presence of running string in the status of the machines 
  			
			echo "<script type='text/javascript'>alert('The iSecurit Machine is up and running');</script>";	
			echo "<script>window.location = 'http://www.cpanel.com'</script>";	
	
		} 

		else{

			echo "<script type='text/javascript'>alert('The iSecurit Machine is in ShutOff State');</script>";	
			echo "<script>window.location = 'http://www.cpanel.com'</script>";

		}		

  	}

  	function isecurit_projects_status(){

		$status = shell_exec('sudo virsh list --all | grep Debian7.2');

		if(strpos($status, 'running') !== false){ //presence of running string in the status of the machines 
  			
			echo "<script type='text/javascript'>alert('The iSecurit Projects Machine is up and running');</script>";	
			echo "<script>window.location = 'http://www.cpanel.com'</script>";	
	
		} 

		else{

			echo "<script type='text/javascript'>alert('The iSecurit Projects Machine is in ShutOff State');</script>";	
			echo "<script>window.location = 'http://www.cpanel.com'</script>";

		}	 		

  	}

  	if(isset($_GET['isecurit_status'])) {
    	isecurit_status();
  	}

  	if(isset($_GET['isecurit_projects_status'])) {
    	isecurit_projects_status();
  	}

?>



