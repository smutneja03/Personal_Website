


<html xmlns="http://www.w3.org/1999/xhtml">    

	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />    
		<title>User Page</title>
		<style type="text/css">
			body{
				background:black;
				color:#80c0c0;
				width: 100%
			}

			#logout{

				float: right;
				margin-right: 5%;
				margin-top: 2%;
			}

			#concepts{
				margin-top: 5%;
		        margin-left: 10%;
		        margin-right: 10%;
		        border: 1px solid red;

			}

			#concepts ul{

				font-size: 19px;
		
			}

			#questions{

				margin-left: 10%;
				margin-right: 10%;
				margin-top: 7%;
				color: white;
				border: 1px solid red;
				margin-bottom: 2%;
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

		<div id="introduction">  
			<?php  

				session_start();  

			?>
	
			<h1>Welcome <?php echo $_SESSION['user_name'] ?> </h1>

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
	    </div>
	    
	    <div id="start">
	    		<p></p>
	    		<a href="start_quiz.php" >
					<input type = "button" value = "Start Quiz"/>
				</a>
				<p></p>
		</div>

		

		
	</body>
</html>

