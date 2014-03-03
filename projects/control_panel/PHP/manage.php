
<?php
	

	function redhat_start() {


		$status = shell_exec('sudo virsh list --all | grep RedHat9.0');

		if(strpos($status, 'running') !== false){ //presence of running string in the status of the machines 
  			
			echo "<script type='text/javascript'>alert('The iSecurit Machine is already up and running');</script>";	
			echo "<script>window.location = 'http://www.cpanel.com'</script>";
			die();		
		
		}
		
	//	echo "<script type='text/javascript'>alert('Wait a few minutes till the machine fully boots up');</script>";

						
		$output = shell_exec('sudo virsh start RedHat9.0');

		$host = '192.168.2.121';
		
	
		//here manage the loading of the screen till it reaches a proper up state

		$host_status = shell_exec("ping -c 2 -i 0.2 192.168.2.121");
		//load the page to some intermediate value


		while(strpos($host_status, '100% packet loss') !== false){
			//means the machine is in up state
			$host_status = shell_exec('ping -c 2 -i 0.2 192.168.2.121');
			//loading the machine status should be shown out here


		}

		echo "<script type='text/javascript'>alert('iSecurit succesfully booted up');</script>";
		
		echo "<script>window.location = 'http://www.cpanel.com'</script>";

  	}

  	function redhat_stop() {



  		$status = shell_exec('sudo virsh list --all | grep RedHat9.0');

		if(strpos($status, 'running') === false){ //no presence of running string in the status of the machines 
  			
			echo "<script type='text/javascript'>alert('The iSecurit Machine is already in off state');</script>";	
			echo "<script>window.location = 'http://www.cpanel.com'</script>";
			break;		
		
		}

	//	 echo "<script type='text/javascript'>alert('Wait a few minutes till the machine undergoes shutdown');</script>";

	
		$server = "192.168.2.121";
    	//ip address will work too i.e. 192.168.254.254 just make sure this is your public ip address not private as is the example

	    //specify your username
	    $username = "root";

	    //select port to use for SSH
	    $port = "22";

	    //command that will be run on server B
	    $command = "shutdown -h 0";

	    //form full command with ssh and command, you will need to use links above for auto authentication help
	    $cmd_string = "sudo ssh -p ".$port." ".$username."@".$server." ".$command;

	    //this will run the above command on server A (localhost of the php file)
	 	

	    exec($cmd_string, $output);

	    //return the output to the browser
	    //This will output the uptime for server B on page on server A

	    //here manage the loading of the screen till it reaches a proper up state


		$host_status = shell_exec("ping -c 2 -i 0.2 192.168.2.121");
		//load the page to some intermediate value


		while(strpos($host_status, '100% packet loss') === false){
			//means the machine is in up state
			$host_status = shell_exec('ping -c 2 -i 0.2 192.168.2.121');
			//loading the machine status should be shown out here

		}


		echo "<script type='text/javascript'>alert('iSecurit succesfully went shutdown');</script>";	
		echo "<script>window.location = 'http://www.cpanel.com'</script>";


  	}

  	function redhat_restart() {


  		$status = shell_exec('sudo virsh list --all | grep RedHat9.0');

		if(strpos($status, 'running') === false){ //no presence of running string in the status of the machines 
  			
			echo "<script type='text/javascript'>alert('The iSecurit Machine is not in Active State');</script>";	
			echo "<script>window.location = 'http://www.cpanel.com'</script>";
			die();		
		
		}
				
		$server = "192.168.2.121";
    	//ip address will work too i.e. 192.168.254.254 just make sure this is your public ip address not private as is the example

	    //specify your username
	    $username = "root";

	    //select port to use for SSH
	    $port = "22";

	    //command that will be run on server B
	    $command = "reboot";

	    //form full command with ssh and command, you will need to use links above for auto authentication help
	    $cmd_string = "sudo ssh -p ".$port." ".$username."@".$server." ".$command;

	    //this will run the above command on server A (localhost of the php file)
	    exec($cmd_string, $output);

	    //return the output to the browser
	    //This will output the uptime for server B on page on server A

		echo "<script type='text/javascript'>alert('iSecurit is going restart');</script>";	

		echo "<script>window.location = 'http://www.cpanel.com'</script>";

  	}

  	function debian_start() {


  		$status = shell_exec('sudo virsh list --all | grep Debian7.2');

		if(strpos($status, 'running') !== false){ //presence of running string in the status of the machines 
  			
			echo "<script type='text/javascript'>alert('The iSecurit Projects Machine is already up and running');</script>";	
			echo "<script>window.location = 'http://www.cpanel.com'</script>";
			die();		
		
		}
		
	//	echo "<script type='text/javascript'>alert('Wait a few minutes till the machine fully boots up');</script>";		

  		$output = shell_exec('sudo virsh start Debian7.2');

  		$host_status = shell_exec("ping -c 2 -i 0.2 192.168.2.120");
		//load the page to some intermediate value


		while(strpos($host_status, '100% packet loss') !== false){
			//means the machine is in up state
			$host_status = shell_exec('ping -c 2 -i 0.2 192.168.2.120');
			//loading the machine status should be shown out here

		}

		echo "<script type='text/javascript'>alert('iSecurit Projects successfully booted');</script>";
	
		echo "<script>window.location = 'http://www.cpanel.com'</script>";

  	}

  	function debian_stop() {


  		$status = shell_exec('sudo virsh list --all | grep Debian7.2');

		if(strpos($status, 'running') === false){ //no presence of running string in the status of the machines 
  			
			echo "<script type='text/javascript'>alert('The iSecurit Projects Machine is already in off state');</script>";	
			echo "<script>window.location = 'http://www.cpanel.com'</script>";
			die();		
		
		}

	//	 echo "<script type='text/javascript'>alert('Wait a few minutes till the machine undergoes shutdown');</script>";

				
		$server = "192.168.2.120";
    	//ip address will work too i.e. 192.168.254.254 just make sure this is your public ip address not private as is the example

	    //specify your username
	    $username = "root";

	    //select port to use for SSH
	    $port = "22";

	    //command that will be run on server B
	    $command = "shutdown -h 0";

	    //form full command with ssh and command, you will need to use links above for auto authentication help
	    $cmd_string = "sudo ssh -p ".$port." ".$username."@".$server." ".$command;

	    //this will run the above command on server A (localhost of the php file)
	    exec($cmd_string, $output);

	    //return the output to the browser
	    //This will output the uptime for server B on page on server A

	    $host_status = shell_exec("ping -c 2 -i 0.2 192.168.2.120");
		//load the page to some intermediate value


		while(strpos($host_status, '100% packet loss') === false){
			//means the machine is in up state
			$host_status = shell_exec('ping -c 2 -i 0.2 192.168.2.120');
			//loading the machine status should be shown out here

		}



		echo "<script type='text/javascript'>alert('iSecurit Projects succesfully went shutdown');</script>";
	
		echo "<script>window.location = 'http://www.cpanel.com'</script>";

  	}

  	function debian_restart() {
		

  		$status = shell_exec('sudo virsh list --all | grep Debian7.2');

		if(strpos($status, 'running') === false){ //no presence of running string in the status of the machines 
  			
			echo "<script type='text/javascript'>alert('The iSecurit Projects Machine is Not Active');</script>";	
			echo "<script>window.location = 'http://www.cpanel.com'</script>";
			die();		
		
		}

		$server = "192.168.2.120";
    	//ip address will work too i.e. 192.168.254.254 just make sure this is your public ip address not private as is the example

	    //specify your username
	    $username = "root";

	    //select port to use for SSH
	    $port = "22";

	    //command that will be run on server B
	    $command = "reboot";

	    //form full command with ssh and command, you will need to use links above for auto authentication help
	    $cmd_string = "sudo ssh -p ".$port." ".$username."@".$server." ".$command;

	    //this will run the above command on server A (localhost of the php file)
	    exec($cmd_string, $output);

	    //return the output to the browser
	    //This will output the uptime for server B on page on server A

		echo "<script type='text/javascript'>alert('iSecurit Projects is going restart');</script>";
	
		echo "<script>window.location = 'http://www.cpanel.com'</script>";

  	}

  	function redhat_experiments(){

  		$status = shell_exec('sudo virsh list --all | grep RedHat9.0');

		if(strpos($status, 'running') === false){ //no presence of running string in the status of the machines 
  			
			echo "<script type='text/javascript'>alert('The iSecurit Machine is Not Active.');</script>";	
			echo "<script>window.location = 'http://www.cpanel.com'</script>";
			die();		
		
		}

		else{

			echo "<script>window.location = 'http://www.isecurit.edu'</script>";

		}

  	}


  	function SHA1_experiments(){

  		$status = shell_exec('sudo virsh list --all | grep Debian7.2');

		if(strpos($status, 'running') === false){ //no presence of running string in the status of the machines 
  			
			echo "<script type='text/javascript'>alert('The iSecurit Projects Machine is Not Active.');</script>";	
			echo "<script>window.location = 'http://www.cpanel.com'</script>";
			die();		
		
		}

		else{

			echo "<script>window.location = 'http://www.ndsplatform.edu/SHA1'</script>";


		}

  	}

  	function project_experiments(){

  		$status = shell_exec('sudo virsh list --all | grep Debian7.2');

		if(strpos($status, 'running') === false){ //no presence of running string in the status of the machines 
  			
			echo "<script type='text/javascript'>alert('The iSecurit Projects Machine is Not Active.');</script>";	
			echo "<script>window.location = 'http://www.cpanel.com'</script>";
			die();		
		
		}

		else{

			echo "<script>window.location = 'http://www.ndsplatform.edu/projects'</script>";


		}

  	}


  	if(isset($_GET['isecurit_start'])) {
    	redhat_start();
  	}

  	if(isset($_GET['isecurit_stop'])) {
    	redhat_stop();
  	}

  	if(isset($_GET['isecurit_restart'])) {
    	redhat_restart();
  	}

  	if(isset($_GET['isecurit_projects_start'])) {
    	debian_start();
  	}

  	if(isset($_GET['isecurit_projects_stop'])) {
    	debian_stop();
  	}

  	if(isset($_GET['isecurit_projects_restart'])) {
    	debian_restart();
  	}

  	//setting for experimnets

  	if(isset($_GET['isecurit_experiments'])) {
    	redhat_experiments();
  	}

  	//when experimnets is clicked under iSecurit Projects

  	if(isset($_GET['SHA1_experiment'])) {
    	SHA1_experiments();
  	}

  	if(isset($_GET['project_experiments'])) {
    	project_experiments();
  	}

?>



<html>
	<head>
		<title>Status of VMs</title>
		<style type="text/css">
		    
		    body{
		      background:black;
		      color:#80c0c0;
		    }

  		</style>
	</head>

	<body>

	</body>

</html>
