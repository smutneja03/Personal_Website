

function quiz(){


	var right = 0;
	var string = " ";


	if(document.getElementById('answer1').checked){

		right+=1;
	}
	else{

		string += " 1 ";
	}

	if(document.getElementById('answer2').checked){

		right+=1;
	}

	else{

		string += " 2 ";
	}

	if(document.getElementById('answer3').checked){

		right+=1;
	}
	else{

		string += " 3 ";
	}

	if(document.getElementById('answer4').checked){

		right+=1;
	}
	else{

		string += " 4 ";
	}

	if(document.getElementById('answer5').checked){

		right+=1;
	}
	else{

		string += " 5 ";
	}

	if(document.getElementById('answer6').checked){

		right+=1;
	}
	else{

		string += " 6 ";
	}

	if(document.getElementById('answer7').checked){

		right+=1;
	}
	else{

		string += " 7 ";
	}

	if(document.getElementById('answer8').checked){

		right+=1;
	}
	else{

		string += " 8 ";
	}

	if(document.getElementById('answer9').checked){

		right+=1;
	}
	else{

		string += " 9 ";
	}


	if(document.getElementById('answer10').checked){

		right+=1;
	}
	else{

		string += " 10 ";
	}



	
	//evaluating the performance of 6 questions
	if(right==10){

		alert("Congrats!!All the 10 r right");
	}
	else{

		alert(" :( TRY AGAIN Questions  " + string);
	}

	//setting rhe default value for the radio buttons 

	document.getElementById('answer1').checked = false; 
	document.getElementById('answer2').checked = false;

	document.getElementById('answer3').checked = false; 
	document.getElementById('answer4').checked = false;

	document.getElementById('answer5').checked = false; 
	document.getElementById('answer6').checked = false;

	document.getElementById('answer7').checked = false; 
	document.getElementById('answer8').checked = false;

	document.getElementById('answer9').checked = false; 
	document.getElementById('answer10').checked = false;

	

}