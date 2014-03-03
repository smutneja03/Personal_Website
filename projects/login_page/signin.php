


<html xmlns="http://www.w3.org/1999/xhtml">    

	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />    
		<title>User Page</title>

		<link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.1.0/css/bootstrap.min.css">

		<link rel="shortcut icon" href="favicon.ico">


		<style type="text/css">
			body {
 				padding-top: 40px;
  				padding-bottom: 40px;
  				background-color: #eee;
			}

			#logout{

				float: right;
				margin-right: 5%;
				margin-top: 2%;
			}

			.form-signin {
				max-width: 330px;
				padding: 15px;
				margin: 0 auto;
			}
			
			#questions{

				margin-top: 5%;
				margin-bottom: 2%;
				margin-left: 10%;
				margin-right: 10%;
			}

			#start{
				text-align: center;
			}

		</style>  

	
	</head>    

	<body>

		<div id="logout">
			<a href="logout.php" >
				<input type = "button" value = "SignOut"/>
			</a>
		</div>


		<div class="container">

	      <form class="form-signin" role="form" action="log.php" method="POST">

	      	<?php  

				session_start();  

			?>
	
			<h2 class="form-signin-heading">Welcome <?php echo $_SESSION['user_name'] ?> </h2> 
		</div>
		
		<div id="questions">

			<h1 align="center">The following are the instructions and guidelines about the test</h1><br>
	    	<ul>
	    		<li>The quiz will have a total of 10 questions</li>
	    		<br />								
	    		<li>10 minutes will be given to the student</li>
	    		<br />
	    		<li>Questions will cover a variety of topics</li>
	    		<br />
	    		<li>General Awareness, Mathematical Reasoning are one of the few things</li>
	    		<br />								
	    		<li>Test is timed so will automatically submit after alloted time</li>
	    		<br />
	    		<li>Good luck to check ur status and have a loop on it as you proceed</li>
	    		<br />
	    	</ul>
	    
	    	<div id="start">
	    		<p></p>
	    		<a href="start_quiz.php" >
					<input type = "button" value = "Start Quiz"/>
				</a>
				<p></p>
			</div>

		</div>

	      </form>

    	</div> <!-- /container -->

		
	</body>
</html>

