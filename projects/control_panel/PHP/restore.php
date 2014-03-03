
<?php
	

	function isecurit_restore() {
		
		$output = shell_exec('sudo virsh destroy RedHat9.0');

		echo "<script type='text/javascript'>alert('RedHat is getting Restored');</script>";	

  	}

  	

  	function isecurit_projects_restore() {

  		$output = shell_exec('sudo virsh destroy Debian7.2');

		  echo "<script type='text/javascript'>alert('Debian is getting Restored');</script>";
			

  	}
  

  	if(isset($_GET['isecurit_restore'])) {
    	isecurit_restore();
  	}

  	if(isset($_GET['isecurit_projects_restore'])) {
    	isecurit_projects_restore();
  	}


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

    </style>
  </head>

  <body>
    <?php echo "<p>$output</p>"; ?>
  </body>
</html>
