

<?php 
	
	include "base.php";

	$_SESSION = array();

	session_destroy();

	echo "<script>window.location = 'index.html'</script>";

?> 

