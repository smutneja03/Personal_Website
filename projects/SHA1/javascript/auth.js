


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
 
    var word_array = new Array();
    for( i=0; i<msg_len-3; i+=4 ) {
        j = msg.charCodeAt(i)<<24 | msg.charCodeAt(i+1)<<16 |
        msg.charCodeAt(i+2)<<8 | msg.charCodeAt(i+3);
        word_array.push( j );
    }
 
    switch( msg_len % 4 ) {
        case 0:
            i = 0x080000000;
        break;
        case 1:
            i = msg.charCodeAt(msg_len-1)<<24 | 0x0800000;
        break;
 
        case 2:
            i = msg.charCodeAt(msg_len-2)<<24 | msg.charCodeAt(msg_len-1)<<16 | 0x08000;
        break;
 
        case 3:
            i = msg.charCodeAt(msg_len-3)<<24 | msg.charCodeAt(msg_len-2)<<16 | msg.charCodeAt(msg_len-1)<<8    | 0x80;
        break;
    }
 
    word_array.push( i );
 
    while( (word_array.length % 16) != 14 ) word_array.push( 0 );
 
    word_array.push( msg_len>>>29 );
    word_array.push( (msg_len<<3)&0x0ffffffff );
 
 	
 	//Process the message in successive 512-bit chunks
 	//each loop instance contains 64 bytes of data of the input string
 	//each blockstart consists of 32 bits
    for ( blockstart=0; blockstart<word_array.length; blockstart+=16 ) {
 
        for( i=0; i<16; i++ ) W[i] = word_array[blockstart+i];
        	//break chunk into sixteen 32-bit big-endian words w[i], 0 ≤ i ≤ 15

        for( i=16; i<=79; i++ ) W[i] = rotate_left(W[i-3] ^ W[i-8] ^ W[i-14] ^ W[i-16], 1);
 			//Extend the sixteen 32-bit words into eighty 32-bit words
        
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

//creating a global array for storing the Hash values of username and password

var hash = new Array();
var i = 0;//counter to keep record of the number of users signing up
var right = 0;//keeps a record of right attempts
var wrong = 0;//keeps a record of wrong attempts

//defining the way to remove div elements within the HTML document

function login_check(){

	if(right>0){
		var element = document.getElementById('success');
		element.parentNode.removeChild(success);
		right-=1;
	}

	if(wrong>0){
		var element = document.getElementById('failure');
		element.parentNode.removeChild(failure);
		wrong--;
	}

}


function login(){

	var username = document.getElementById("username").value;
	var password = document.getElementById("password").value;
	var value = (SHA1(username + "+" + password));

	
	//CLEARING THE PRESENT VALUE FROM THE TEXT BOXES
	document.getElementById("username").value = "";
	document.getElementById("password").value = "";


	login_check(); //will remove the existing ones and update them

	if(hash.indexOf( value) > -1){
		alert("Login succesfuul");

		//checking if the result already exists
		

		right+=1; //will keep a record of total right attemopts

		var success = document.createElement("div");
		success.style.width = "1100px";
		success.style.height = "80px";
		success.style.color = "white";
		success.innerHTML = "<p><h3>Hash value for ur ID and pwd is "+value+"</p></h3>"
		success.id = 'success';

		document.body.appendChild(success);


	}

	else{

		alert("Login Failed");

		wrong+=1; //will keep a record of total wrong attempts

		var failure = document.createElement("div");
		failure.style.width = "1100px";
		failure.style.height = "80px";
		failure.style.color = "white";
		failure.innerHTML = "<p><h3><i>Hash value for ur ID and pwd is "+ value+ " doesnt match our database</p></h3>"
		failure.id = 'failure';

		document.body.appendChild(failure);
			
	}

}


function signup(){

	var username = document.getElementById("username").value;
	var password = document.getElementById("password").value;
	var value = (SHA1(username + "+" + password));
	alert("Thank u for signing with a hash of " + value);

	document.getElementById("username").value = "";
	document.getElementById("password").value = "";

	hash[i++] = value;

}

/*
function clearup(){

	var e1 = document.getElementById('success');
	e1.parentNode.removeChild(success);

	var e2 = document.getElementById('failure');
	e2.parentNode.removeChild(failure);

}
*/