

var word_array; //declaring globally for making future uses

var quiz1; //starting four bytes
var quiz2; //last four bytes
var quiz3 = 0; //zeros to be appended
var quiz4; //for the 15th word out of 512 bit chunk
var quiz5; //for the 79th word

function SHA1(msg) {

 
    function rotate_left(n,s) {
        var t4 = ( n<<s ) | (n>>>(32-s));
        return t4;
    };
 
    function lsb_hex(val) {
        var str="";
        var i;
        var vh;
        var vl;
 
        for( i=0; i<=6; i+=2 ) {
            vh = (val>>>(i*4+4))&0x0f;
            vl = (val>>>(i*4))&0x0f;
            str += vh.toString(16) + vl.toString(16);
        }
        return str;
    };
 
    function cvt_hex(val) {
        var str="";
        var i;
        var v;
 
        for( i=7; i>=0; i-- ) {
            v = (val>>>(i*4))&0x0f;
            str += v.toString(16);
        }
        return str;
    };
 
 	
    function Utf8Encode(string) {
    	//function to covert string to UTF-8 as SHA1 only deals with byte streams
        string = string.replace(/\r\n/g,"\n");
        var utftext = "";
 
        for (var n = 0; n < string.length; n++) {
 
            var c = string.charCodeAt(n);
 
            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
 
        }
 
        return utftext;//text in UTF-8format
    };
 
    var blockstart;
    var i, j;
    var W = new Array(80);

    //initialise variables
    var H0 = 0x67452301;
    var H1 = 0xEFCDAB89;
    var H2 = 0x98BADCFE;
    var H3 = 0x10325476;
    var H4 = 0xC3D2E1F0;

    var A, B, C, D, E;
    var temp;
 
    msg = Utf8Encode(msg);//function call for the UTF-8 conversion
 
    var msg_len = msg.length;
 
    word_array = new Array();
    for( i=0; i<msg_len-3; i+=4 ) {
        j = msg.charCodeAt(i)<<24 | msg.charCodeAt(i+1)<<16 |
        msg.charCodeAt(i+2)<<8 | msg.charCodeAt(i+3);
        word_array.push( j );
    
}
    
    //getting value for quiz1
    for( i=0; i<3; i+=4 ) {
        quiz1 = msg.charCodeAt(i)<<24 | msg.charCodeAt(i+1)<<16 |
        msg.charCodeAt(i+2)<<8 | msg.charCodeAt(i+3);

    }


    //dealing in size of 32 bits 
    //taking care of the last 32 bits before we start appending zeros
    switch( msg_len % 4 ) {
        case 0:
            i = 0x080000000;
            quiz3 +=31;         
        break;
        case 1:
            i = msg.charCodeAt(msg_len-1)<<24 | 0x0800000;
            quiz3 += 23;
        break;
 
        case 2:
            i = msg.charCodeAt(msg_len-2)<<24 | msg.charCodeAt(msg_len-1)<<16 | 0x08000;
            quiz3 += 15;
        break;
 
        case 3:
            i = msg.charCodeAt(msg_len-3)<<24 | msg.charCodeAt(msg_len-2)<<16 | msg.charCodeAt(msg_len-1)<<8    | 0x80;
            quiz3 += 7;
        break;
    }

    quiz2 = i.toString(2);
    

    word_array.push( i );
 
    while( (word_array.length % 16) != 14 ) {

        word_array.push( 0 ); //adding zeros till the message is congruent to 448 bits mode 512
        quiz3+=32;

    }

 
    word_array.push( msg_len>>>29 );
    word_array.push( (msg_len<<3)&0x0ffffffff ); //adding the 64 bit message length to the end of current message
 
 	
 	//Process the message in successive 512-bit chunks
 	//each loop instance contains 64 bytes of data of the input string
 	//each blockstart consists of 32 bits
    for ( blockstart=0; blockstart<word_array.length; blockstart+=16 ) { //breaking the message into 512 blocks chunks
 
        for( i=0; i<16; i++ ) {
            W[i] = word_array[blockstart+i];
        	//break chunk into sixteen 32-bit big-endian words w[i], 0 ≤ i ≤ 15

        }

        quiz4 = W[15].toString(2);


        for( i=16; i<=79; i++ ) {
            
            W[i] = rotate_left(W[i-3] ^ W[i-8] ^ W[i-14] ^ W[i-16], 1);
 			//Extend the sixteen 32-bit words into eighty 32-bit words
            
        }

        quiz5 = W[79].toString(2); //will give us the 79th word from the first 512 bit chunk

 		//INITIALISING HASH VALUES FOR THIS CHUNK
        A = H0;
        B = H1;
        C = H2;
        D = H3;
        E = H4;
 
        //Main Loop
        for( i= 0; i<=19; i++ ) {
            temp = (rotate_left(A,5) + ((B&C) | (~B&D)) + E + W[i] + 0x5A827999) & 0x0ffffffff;
            E = D;
            D = C;
            C = rotate_left(B,30);
            B = A;
            A = temp;
        }
 
        for( i=20; i<=39; i++ ) {
            temp = (rotate_left(A,5) + (B ^ C ^ D) + E + W[i] + 0x6ED9EBA1) & 0x0ffffffff;
            E = D;
            D = C;
            C = rotate_left(B,30);
            B = A;
            A = temp;
        }
 
        for( i=40; i<=59; i++ ) {
            temp = (rotate_left(A,5) + ((B&C) | (B&D) | (C&D)) + E + W[i] + 0x8F1BBCDC) & 0x0ffffffff;
            E = D;
            D = C;
            C = rotate_left(B,30);
            B = A;
            A = temp;
        }
 
        for( i=60; i<=79; i++ ) {
            temp = (rotate_left(A,5) + (B ^ C ^ D) + E + W[i] + 0xCA62C1D6) & 0x0ffffffff;
            E = D;
            D = C;
            C = rotate_left(B,30);
            B = A;
            A = temp;
        }
 		
 		//add this chunks hash to the result so far
        H0 = (H0 + A) & 0x0ffffffff;
        H1 = (H1 + B) & 0x0ffffffff;
        H2 = (H2 + C) & 0x0ffffffff;
        H3 = (H3 + D) & 0x0ffffffff;
        H4 = (H4 + E) & 0x0ffffffff;
 
    }
 
    var temp = cvt_hex(H0) + cvt_hex(H1) + cvt_hex(H2) + cvt_hex(H3) + cvt_hex(H4);
    
    return temp.toLowerCase();
    
}

function run(){

	var msg = document.getElementById("string").value;

	var ans = SHA1(msg);

    var step1 = document.createElement("div");
    step1.innerHTML = "<p>Break the string into parts of 4 starting from first character and append the first four</p> <input type='text' size='30' id='binary' /> <br /> <input type='button' value='check' onclick='check1()' />";
    step1.id = step1;
   
    document.body.appendChild(step1); 
/*
	var hexadecimal = document.createElement("div");
    //x.textContent = "The string entered by you is " + str ;
    hexadecimal.innerHTML = "<p>The final hash value "+ ans + "</p>";
    
    document.body.appendChild(hexadecimal);
*/

}

function check1(){

    var bits = document.getElementById('binary').value;

    if(bits == quiz1.toString(2)){
     
        alert("congrats u r on the right track");

        var step2 = document.createElement("div");
        step2.innerHTML = "<p>Message length modulo 4; operate on the left bits if present;else add 1 and then 0 to make the number 32 bit</p> <input type='text' size='30' id='last_binary' /> <br /> <input type='button' value='check' onclick='check2()' />";
        step2.id = step2;
   
        document.body.appendChild(step2); 
    
    }
    
    else{
        alert(" :( try again");
    }

}

function check2(){

    var last_bits = document.getElementById('last_binary').value;

    if(last_bits == quiz2){ //checking 
     
        alert("congrats u r on the right track");

        var step3 = document.createElement("div");
        step3.innerHTML = "<p>Enter the number of zeros that will be added after 1 is added</p> <input type='text' size='30' id='zeros' /> <br /> <input type='button' value='check' onclick='check3()' />";
        step3.id = step3;
   
        document.body.appendChild(step3); 
    
    }
    
    else{
        alert(" :( try again");
    }

}


function check3(){

    var zeros = document.getElementById('zeros').value;

    if(zeros == quiz3){ //checking for the number of zeros
     
        alert("congrats u r on the right track");

        var step4 = document.createElement("div");
        step4.innerHTML = "<p>Enter the last 32 bits(15th Word) from the first 512 bit chunk</p> <input type='text' size='30' id='15thword' /> <br /> <input type='button' value='check' onclick='check4()' />";
        step4.id = step4;
   
        document.body.appendChild(step4); 
    
    }
    
    else{
        alert(" :( try again");
    }

}


function check4(){

    var word = document.getElementById('15thword').value;

    if(word == quiz4){ //checking for the 15th word
     
        alert("congrats u r on the right track");

        var step5 = document.createElement("div");
        step5.innerHTML = "<p>Enter the 32 bits of the 79th Word from the first 512 bit chunk</p> <p>Formula in the manual and values in the values sheet</p><input type='text' size='30' id='79thword' /> <br /> <input type='button' value='check' onclick='check5()' />";
        step5.id = step5;
   
        document.body.appendChild(step5); 
    
    }
    
    else{
        alert(" :( try again");
    }

}


function check5(){

    var word = document.getElementById('79thword').value;

    if(word == quiz5){ //checking for the 79th word
     
        alert("congrats u r on the right track");

        /*
        var step5 = document.createElement("div");
        step5.innerHTML = "<p>Enter the 32 bits of the 79th Word from the first 512 bit chunk</p> <input type='text' size='30' id='79thword' /> <br /> <input type='button' value='check' onclick='check5()' />";
        step5.id = step5;
   
        document.body.appendChild(step5); 
        */

    }
    
    else{
        alert(" :( try again");
    }

}




















