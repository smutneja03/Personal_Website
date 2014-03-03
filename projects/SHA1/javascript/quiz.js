

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

	//answer 3 check

	if(document.getElementById('ans3a').checked && document.getElementById('ans3b').checked && document.getElementById('ans3c').checked){

		right+=1;
	}

	else{

		string += " 3 ";
	}

	
	var check4 = document.getElementById('msgdigest').value;
	if(check4=="da39a3ee5e6b4b0d3255bfef95601890afd80709"){
		right+=1
	}

	else{

		string+=" 4 ";
	}


	var check5 = document.getElementById("ddown").value;
	if(check5=="2"){
		right+=1;
	}

	else{
		string+=" 5 ";
	}


	var check6 = document.getElementById('iterations').value;
	if(check6=="4"){
		right+=1
	}

	else{

		string+=" 6 ";
	}

	//evaluating the performance of 6 questions
	if(right==6){

		alert("Congrats!!All the 6 r right");
	}
	else{

		alert(" :( TRY AGAIN Questions  " + string);
	}

	document.getElementById('answer1').checked = false; //setting rhe default value for the radio button
	document.getElementById('answer2').checked = false;

	var values = document.getElementById("boxes"); //setting the default value for the check boxes
	for (var i =0; i < values.length; i++){
 		
 		values.elements[i].checked=false;
 	}


	document.getElementById('ddown').value = 1;//setting the default for the dropdown menu

	document.getElementById('msgdigest').value = ""; //setting the default values for the text boxes
	document.getElementById('iterations').value = "";

	

}