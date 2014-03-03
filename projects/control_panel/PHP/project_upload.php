
<?php

	if($_FILES['zip_file']['name']==''){
    //No file selected
		$message = "No file uploaded. Try again :(";
		echo "<script type='text/javascript'>alert('$message');</script>";
		echo "<script>window.location = 'http://www.cpanel.com'</script>";
		die();
	
	}

	if($_FILES["zip_file"]["name"]) {

		//Initially only checking whether the i-Securit Project machine is up and running or not

		$status = shell_exec('sudo virsh list --all | grep Debian7.2');
		//manupulating the input to check whether any of the Virtual Machines are running or not

  		if(strpos($status, 'running') === false){ //no presence of ruuning string in the status of the machines 
  			
			echo "<script type='text/javascript'>alert('The iSecurit Project Machine is not up and running');</script>";
			echo "<script>window.location = 'http://www.cpanel.com'</script>";
			die();		
		
		}

		//continuing with our process of uploading a zip file of Web App

		$filename = $_FILES["zip_file"]["name"];
		$source = $_FILES["zip_file"]["tmp_name"];
		$type = $_FILES["zip_file"]["type"];
		
		$name = explode(".", $filename);
		$accepted_types = array('application/zip', 'application/x-zip-compressed', 'multipart/x-zip', 'application/x-compressed');
		foreach($accepted_types as $mime_type) {
			if($mime_type == $type) {
				$okay = true;
				break;
			} 
		}
		
		$continue = strtolower($name[1]) == 'zip' ? true : false;

		

		if(strpos($filename, '.zip') === false){ //no presence of ruuning string in the status of the machines 

			$message = "The file you are trying to upload is not a .zip file. Please try again.";
			echo "<script type='text/javascript'>alert('$message');</script>";
			echo "<script>window.location = 'http://www.cpanel.com'</script>";
			die();
		}
		
		/*
		if(!$continue) {
			$message = "The file you are trying to upload is not a .zip file. Please try again.";
			echo "<script type='text/javascript'>alert('$message');</script>";
			echo "<script>window.location = 'http://www.cpanel.com'</script>";
			die();
		}
		*/

		$target_path = "/var/www/projects/".$filename;  // change this to the correct site path
		
		if(move_uploaded_file($source, $target_path)) {
			
			$zip = new ZipArchive();
			$x = $zip->open($target_path);
			
			if ($x === true) {
				$zip->extractTo("/var/www/projects/"); // change this to the correct site path
				$zip->close();
		
				unlink($target_path);
			}
			
			$message = "Your .zip file was uploaded and unpacked.";
		} 
		else{	
			
			$message = "There was a problem with the upload. Please try again.";
		}
	}

	//till this point the file has been copied to the server which now needs to be transferred to the iSecurit Projects Machine



	$cmd_string = "sudo scp -r /var/www/projects/* root@192.168.2.120:/var/www/projects/";

	exec($cmd_string, $output);

//	echo "<script type='text/javascript'>alert('The file you have uploaded is now in the ISecurit Project Machine');</script>";
	
	$link_project = "www.ndsplatform.edu/projects/";
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<title>Untitled Document</title>
		<style type="text/css">
    		body{
      			background:black;
      			color:#80c0c0;
    		}
    		a{
    			color: white;
    		}


	  </style>
	</head>

	<body>
		<?php if($message) echo "<p>$message</p>"; ?>
		<p>Click the given link below to access your website you just uploaded</p>
		<a href="http://<?php if($message) echo $link_project.$name[0]; ?>" target="_blank" >Click Here</a>
	</body>
</html>



