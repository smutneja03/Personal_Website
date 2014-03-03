

<html xmlns="http://www.w3.org/1999/xhtml">    

	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />    
		<title>A Quick Quiz</title>
		<style type="text/css">
			
			body{
  				background-color: #eee;
				width: 100%;
				height:100%;
			}

			#logout{			

				position: fixed;
				float: right;
				margin-right: 5%;
				margin-top: 2%;
			}

			#introduction{

				position: fixed;
				right: 3%;
			}

			#questions{

				margin-top:2%;
				margin-left : 3%;
				width:700px;
				height:800px;

			}

			#check_results{

				position: fixed;
				bottom: 0px;
				right: 3%;
			}

			

	</style>  

	<script language="javascript" type="text/javascript" src="quiz.js"> </script>

	<link rel="shortcut icon" href="favicon.ico">



	</head>    

	<body>
<!--
		<div id="logout">
			<a href="logout.php" >
				<input type = "button" value = "SignOut"/>
			</a>
		</div>
-->
		<div id="introduction">  
			<?php  
				session_start();  
			?>
	
			<h2>Good Luck <?php echo $_SESSION['user_name'] ?> . May the force be with you.</h2>
			<a href="logout.php" >
				<input type = "button" value = "SignOut"/>
			</a>

		</div>

		<div id="questions">

			<p class="question">1. Which is the major type of soil in India?</p>
			<input type="radio" name="q1" value="a" id="answer1"><label for="q1a">Alluvial Soil</label><br/>
			<input type="radio" name="q1" value="b" id="q1b"><label for="q1b">Red Soil</label><br/>
			<input type="radio" name="q1" value="c" id="q1c"><label for="q1c">White Soil</label><br/>
			<input type="radio" name="q1" value="d" id="q1d"><label for="q1d">Dirty Soil</label><br/>

			<p class="question">2.Leading producer of Tea in the world is</p>
			<input type="radio" name="q2" value="a" id="q2a"><label for="q2a">India</label><br/>
			<input type="radio" name="q2" value="b" id="q2b"><label for="q2b">United States</label><br/>
			<input type="radio" name="q2" value="c" id="answer2"><label for="q2c">China</label><br/>
			<input type="radio" name="q2" value="d" id="q2d"><label for="q2d">Beizing</label><br/>

			<p class="question">3. Black Revolution associated with the production of</p>
			<input type="radio" name="q3" value="a" id="q3a"><label for="q3a">Coil</label><br/>
			<input type="radio" name="q3" value="b" id="answer3"><label for="q3b">Petroleum</label><br/>
			<input type="radio" name="q3" value="c" id="q3c"><label for="q3c">Milk</label><br/>
			<input type="radio" name="q3" value="d" id="q3d"><label for="q3d">Oil</label><br/>

			<p class="question">4. The game chess had its origin in?</p>
			<input type="radio" name="q4" value="a" id="q4a"><label for="q4a">Chinal</label><br/>
			<input type="radio" name="q4" value="b" id="answer4"><label for="q4b">India</label><br/>
			<input type="radio" name="q4" value="c" id="q4c"><label for="q4c">South Korea</label><br/>
			<input type="radio" name="q4" value="d" id="q4d"><label for="q4d">Japan</label><br/>

			<p class="question">5. The largest planet is?</p>
			<input type="radio" name="q5" value="a" id="answer5"><label for="q5a">Jupiter</label><br/>
			<input type="radio" name="q5" value="b" id="q5b"><label for="q5b">Saturn</label><br/>
			<input type="radio" name="q5" value="c" id="q5c"><label for="q5c">Neptune</label><br/>
			<input type="radio" name="q5" value="d" id="q5d"><label for="q5d">Earth</label><br/>

			<p class="question">6. In 1974 India surprised the world by exploding a "nuclear device" in an underground test in ........ state.</p>
			<input type="radio" name="q6" value="a" id="q6a"><label for="q6a">Goa</label><br/>
			<input type="radio" name="q6" value="b" id="q6b"><label for="q6b">West Bengal</label><br/>
			<input type="radio" name="q6" value="c" id="q6c"><label for="q6c">Assam</label><br/>
			<input type="radio" name="q6" value="d" id="answer6"><label for="q6d">Rajasthan</label><br/>

			<p class="question">7. How many High Courts are there in India?</p>
			<input type="radio" name="q7" value="a" id="q7a"><label for="q7a">16</label><br/>
			<input type="radio" name="q7" value="b" id="q7b"><label for="q7b">19</label><br/>
			<input type="radio" name="q7" value="c" id="q7c"><label for="q7c">18</label><br/>
			<input type="radio" name="q7" value="d" id="answer7"><label for="q7d">24</label><br/>

			<p class="question">8. Which continent has the highest number of countries ?</p>
			<input type="radio" name="q8" value="a" id="q8a"><label for="q8a">Asia</label><br/>
			<input type="radio" name="q8" value="b" id="q8b"><label for="q8b">Europe</label><br/>
			<input type="radio" name="q8" value="c" id="answer8"><label for="q8c">Africa</label><br/>
			<input type="radio" name="q8" value="d" id="q8d"><label for="q8d">Australia</label><br/>

			<p class="question">9. Which place is known as the land of canals and hat ?</p>
			<input type="radio" name="q9" value="a" id="answer9"><label for="q9a">Panama</label><br/>
			<input type="radio" name="q9" value="b" id="q9b"><label for="q9b">Berne</label><br/>
			<input type="radio" name="q9" value="c" id="q9c"><label for="q9c">Guake</label><br/>
			<input type="radio" name="q9" value="d" id="q9d"><label for="q9d">Izrael</label><br/>

			<p class="question">10. Who is known as missile woman of India ?</p>
			<input type="radio" name="q10" value="a" id="q10a"><label for="q10a">Indira Gandhi</label><br/>
			<input type="radio" name="q10" value="b" id="answer10"><label for="q10b">Tessy Thomas</label><br/>
			<input type="radio" name="q10" value="c" id="q10c"><label for="q10c">Vinicas Dixai</label><br/>
			<input type="radio" name="q10" value="d" id="q10d"><label for="q10d">None of these</label><br/>

			<p></p>
			<br>
		</div>

		<div id="check_results">
			<p>
				<input type="button" value="Check Results" onclick="quiz()" />
			</p>
			<p></p>
			<br>
		</div>


		
	</body>
</html>

