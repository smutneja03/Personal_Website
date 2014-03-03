<?php

	
	function host_off() {

		$status = shell_exec('sudo virsh list --all');
		//manupulating the input to check whether any of the Virtual Machines are running or not

  		if(strpos($status, 'running') === false){ //no presence of ruuning string in the status of the machines 
  			
  			$output = shell_exec('sudo shutdown -h 0');
			echo "<script type='text/javascript'>alert('Host Machine is going shutdown');</script>";	

		}
  		
  		else{

			echo "<script type='text/javascript'>alert('Sorry :( Switch of the running Machines');</script>";
			echo "<script>window.location = 'http://www.cpanel.com'</script>";

  		}
  	}

  	function host_restart() {

  		$status = shell_exec('sudo virsh list --all');
		//manupulating the input to check whether any of the Virtual Machines are running or not

  		if(strpos($status, 'running') === false){ //no presence of ruuning string in the status of the machines 
  			
  			$output = shell_exec('sudo reboot');
			echo "<script type='text/javascript'>alert('Host Machine is getting restarted');</script>";	
			echo "<script>window.location = 'http://www.cpanel.com'</script>";


		}
  		
  		else{

			echo "<script type='text/javascript'>alert('Sorry :( Switch of the running Machines');</script>";
			echo "<script>window.location = 'http://www.cpanel.com'</script>";

  		}
  		
  	}

	if(isset($_GET['host_off'])){
	    host_off();
	}

	if(isset($_GET['host_restart'])){
	    host_restart();
	}



?>