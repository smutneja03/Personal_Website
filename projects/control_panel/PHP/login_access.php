

<?php
ob_start();
$host="localhost"; // Host name 
$username="root"; // Mysql username 
$password="root"; // Mysql password 
$db_name="control_panel"; // Database name 
$tbl_name="members"; // Table name

// Connect to server and select databse.
mysql_connect("$host", "$username", "$password") or die(mysql_error());
//echo "Connected to MySQL<br />";
mysql_select_db("$db_name") or die(mysql_error());
//echo "Connected to Database<br />";

$username = $_POST['username']; 
$password = $_POST['password'];

// To protect MySQL injection (more detail about MySQL injection)
$username = stripslashes($username);
$password = stripslashes($password);
$username = mysql_real_escape_string($username);
$password = mysql_real_escape_string($password);


$sql="SELECT * FROM $tbl_name WHERE username='$username'";
$result=mysql_query($sql);

// Mysql_num_row is counting table row
$count=mysql_num_rows($result);
// If result matched $username and $password, table row must be 1 row

if($count==1){
    $row = mysql_fetch_assoc($result);
    if ($password == $row['password']){
		echo "<script type='text/javascript'>window.location = '../HTML/restore.html';</script>";
        return true;
    }
    else {
		echo "<script type='text/javascript'>alert('Wrong USERNAME or PASSWORD');</script>";
		echo "<script type='text/javascript'>window.location = '../HTML/login.html';</script>";
        return false;
    }
}
else{
	echo "<script type='text/javascript'>alert('Wrong USERNAME or PASSWORD');</script>";
	echo "<script type='text/javascript'>window.location = '../HTML/login.html';</script>";

    return false;
}

ob_end_flush();

?>




