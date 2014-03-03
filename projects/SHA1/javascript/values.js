

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

/* --------------------------------------------------------------------------------------- */


//start of the second function to get the value of all the variables for future testing
//word all the 80 words 
//ABCDE value at every round for a total of 4 rounds

function SHA1_variables(msg) {

 
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

 		//printing the 80 32 bit words formed after the breaking down of 512 bit chunks
 		
        
 		//INITIALISING HASH VALUES FOR THIS CHUNK
        A = H0;
        B = H1;
        C = H2;
        D = H3;
        E = H4;
 		
        AA = A & 0x0ffffffff;
        AA = cvt_hex(AA);
        AA = AA.toLowerCase()

        BB = B & 0x0ffffffff;
        BB = cvt_hex(BB);
        BB = BB.toLowerCase();

        CC = C & 0x0ffffffff;
        CC = cvt_hex(CC);
        CC = CC.toLowerCase();

		DD = D & 0x0ffffffff;
        DD = cvt_hex(DD);
        DD = DD.toLowerCase();

        EE = E & 0x0ffffffff;
        EE = cvt_hex(EE);
        EE = EE.toLowerCase()

        var x0 = document.createElement("div");
       	x0.style.width = "1100px";
		x0.style.height = "80px";
	//	x0.style.color = "#4040C0";
	    x0.style.color = "#C0C0C0";
    //	x1.style.border = "1px solid red";
        x0.innerHTML = "<p>The hash value initially</p>"+"A ----> "+AA+" ; "+"B ----> "+BB+" ; "+"C ----> "+CC+" ; "+"D ----> "+DD+" ; "+"E ----> "+EE+" ; "; 
    
        document.body.appendChild(x0);

        //Main Loop
        for( i= 0; i<=19; i++ ) {
            temp = (rotate_left(A,5) + ((B&C) | (~B&D)) + E + W[i] + 0x5A827999) & 0x0ffffffff;
            E = D;
            D = C;
            C = rotate_left(B,30);
            B = A;
            A = temp;
        }


        //Outputting the value after every round of the computation
        
        //ABCD value after first round 
        AA = A & 0x0ffffffff;
        AA = cvt_hex(AA);
        AA = AA.toLowerCase()

        BB = B & 0x0ffffffff;
        BB = cvt_hex(BB);
        BB = BB.toLowerCase();

        CC = C & 0x0ffffffff;
        CC = cvt_hex(CC);
        CC = CC.toLowerCase();

		DD = D & 0x0ffffffff;
        DD = cvt_hex(DD);
        DD = DD.toLowerCase();

        EE = E & 0x0ffffffff;
        EE = cvt_hex(EE);
        EE = EE.toLowerCase()

        var x1 = document.createElement("div");
       	x1.style.width = "1100px";
		x1.style.height = "80px";
	//	x1.style.color = "#4040C0";
        x1.style.color = "#C0C0C0";
	
    //	x1.style.border = "1px solid red";
        x1.innerHTML = "<p>The hash value after round 1</p>"+"A ----> "+AA+" ; "+"B ----> "+BB+" ; "+"C ----> "+CC+" ; "+"D ----> "+DD+" ; "+"E ----> "+EE+" ; "; 
    
        document.body.appendChild(x1);

        
        for( i=20; i<=39; i++ ) {
            temp = (rotate_left(A,5) + (B ^ C ^ D) + E + W[i] + 0x6ED9EBA1) & 0x0ffffffff;
            E = D;
            D = C;
            C = rotate_left(B,30);
            B = A;
            A = temp;
        }

		//ABCD value after second round 
        AA = A & 0x0ffffffff;
        AA = cvt_hex(AA);
        AA = AA.toLowerCase()

        BB = B & 0x0ffffffff;
        BB = cvt_hex(BB);
        BB = BB.toLowerCase();

        CC = C & 0x0ffffffff;
        CC = cvt_hex(CC);
        CC = CC.toLowerCase();

		DD = D & 0x0ffffffff;
        DD = cvt_hex(DD);
        DD = DD.toLowerCase();

        EE = E & 0x0ffffffff;
        EE = cvt_hex(EE);
        EE = EE.toLowerCase()

        var x2 = document.createElement("div");
       	x2.style.width = "1100px";
		x2.style.height = "80px";
	//	x2.style.color = "#4040C0";
	    x2.style.color = "#C0C0C0";

    //	x2.style.border = "1px solid red";
        x2.innerHTML = "<p>The hash value after round 2</p>"+"A ----> "+AA+" ; "+"B ----> "+BB+" ; "+"C ----> "+CC+" ; "+"D ----> "+DD+" ; "+"E ----> "+EE+" ; "; 
    
        document.body.appendChild(x2);
 
 
        for( i=40; i<=59; i++ ) {
            temp = (rotate_left(A,5) + ((B&C) | (B&D) | (C&D)) + E + W[i] + 0x8F1BBCDC) & 0x0ffffffff;
            E = D;
            D = C;
            C = rotate_left(B,30);
            B = A;
            A = temp;
        }

        //ABCD value after third round 
        AA = A & 0x0ffffffff;
        AA = cvt_hex(AA);
        AA = AA.toLowerCase()

        BB = B & 0x0ffffffff;
        BB = cvt_hex(BB);
        BB = BB.toLowerCase();

        CC = C & 0x0ffffffff;
        CC = cvt_hex(CC);
        CC = CC.toLowerCase();

		DD = D & 0x0ffffffff;
        DD = cvt_hex(DD);
        DD = DD.toLowerCase();

        EE = E & 0x0ffffffff;
        EE = cvt_hex(EE);
        EE = EE.toLowerCase()

        var x3 = document.createElement("div");
       	x3.style.width = "1100px";
		x3.style.height = "80px";
	//	x3.style.color = "#4040C0";
        x3.style.color = "#C0C0C0";
	
    //	x3.style.border = "1px solid red";
        x3.innerHTML = "<p>The hash value after round 3</p>"+"A ----> "+AA+" ; "+"B ----> "+BB+" ; "+"C ----> "+CC+" ; "+"D ----> "+DD+" ; "+"E ----> "+EE+" ; "; 
    
        document.body.appendChild(x3);
 

        for( i=60; i<=79; i++ ) {
            temp = (rotate_left(A,5) + (B ^ C ^ D) + E + W[i] + 0xCA62C1D6) & 0x0ffffffff;
            E = D;
            D = C;
            C = rotate_left(B,30);
            B = A;
            A = temp;
        }
 		
        //ABCD value after third round 
        AA = A & 0x0ffffffff;
        AA = cvt_hex(AA);
        AA = AA.toLowerCase()

        BB = B & 0x0ffffffff;
        BB = cvt_hex(BB);
        BB = BB.toLowerCase();

        CC = C & 0x0ffffffff;
        CC = cvt_hex(CC);
        CC = CC.toLowerCase();

		DD = D & 0x0ffffffff;
        DD = cvt_hex(DD);
        DD = DD.toLowerCase();

        EE = E & 0x0ffffffff;
        EE = cvt_hex(EE);
        EE = EE.toLowerCase()

        var x4 = document.createElement("div");
       	x4.style.width = "1100px";
		x4.style.height = "80px";
	//	x4.style.color = "#4040C0";
        x4.style.color = "#C0C0C0";
	
    //	x4.style.border = "1px solid red";
        x4.innerHTML = "<p>The hash value after round 4</p>"+"A ----> "+AA+" ; "+"B ----> "+BB+" ; "+"C ----> "+CC+" ; "+"D ----> "+DD+" ; "+"E ----> "+EE+" ; "; 
    
        document.body.appendChild(x4);
 
 
 

 		//add this chunks hash to the result so far
        H0 = (H0 + A) & 0x0ffffffff;
        H1 = (H1 + B) & 0x0ffffffff;
        H2 = (H2 + C) & 0x0ffffffff;
        H3 = (H3 + D) & 0x0ffffffff;
        H4 = (H4 + E) & 0x0ffffffff;
 
    }

        H00 = H0 & 0x0ffffffff;
        H00 = cvt_hex(H00);
        H00 = H00.toLowerCase()

        H11 = H1 & 0x0ffffffff;
        H11 = cvt_hex(H11);
        H11 = H11.toLowerCase()
        
        H22 = H2 & 0x0ffffffff;
        H22 = cvt_hex(H22);
        H22 = H22.toLowerCase()
        
        H33 = H3 & 0x0ffffffff;
        H33 = cvt_hex(H33);
        H33 = H33.toLowerCase()
        
        H44 = H4 & 0x0ffffffff;
        H44 = cvt_hex(H44);
        H44 = H44.toLowerCase()
        
        var x5 = document.createElement("div");
       	x5.style.width = "1100px";
		x5.style.height = "80px";
	//	x5.style.color = "#4040C0";
        x5.style.color = "#C0C0C0";
	
    //	x5.style.border = "1px solid red";
        x5.innerHTML = "<p>The final 5 32bit hash values after addition process</p>"+"H0 ----> "+H00+" ; "+"H1 ----> "+H11+" ; "+"H2 ----> "+H22+" ; "+"H3 ----> "+H33+" ; "+"H4 ----> "+H44+" ; "; 
    
        document.body.appendChild(x5);

        //End of showing the individual snippet words of 32 bit each    
    
}


//used for showing values to the user
/*




*/
function SHA1_testvalues(msg) {

 
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

     
    /*var value1 = document.createElement("div");
    //x.textContent = "The string entered by you is " + str ;
    value1.innerHTML = "The first 32 bits i.e. analysing first four characters only "+ quiz1.toString(2);
    value1.style.width = "1100px";
	value1.style.height = "80px";
	value1.style.color = "#4040C0";
    
    document.body.appendChild(value1);
*/

    //dealing in size of 32 bits 
    //taking care of the last 32 bits before we start appending zeros
    switch( msg_len % 4 ) {
        case 0:
            i = 0x080000000;
            quiz3 = 31;
            
        break;
        case 1:
            i = msg.charCodeAt(msg_len-1)<<24 | 0x0800000;
            quiz3 = 23;
        break;
 
        case 2:
            i = msg.charCodeAt(msg_len-2)<<24 | msg.charCodeAt(msg_len-1)<<16 | 0x08000;
            quiz3 = 15;
        break;
 
        case 3:
            i = msg.charCodeAt(msg_len-3)<<24 | msg.charCodeAt(msg_len-2)<<16 | msg.charCodeAt(msg_len-1)<<8    | 0x80;
            quiz3 = 7;
        break;
    }
    
    quiz2 = i.toString(2);
    //getting the values for quiz2
    /*
    var value2 = document.createElement("div");
    value2.innerHTML = "The last 32 bits after considering all the characters(add zeros after the number) "+ i.toString(2) ;
    value2.style.width = "1100px";
	value2.style.height = "80px";
	value2.style.color = "#4040C0";
    document.body.appendChild(value2);
    */

    word_array.push( i );
 
    while( (word_array.length % 16) != 14 ) {

        word_array.push( 0 ); //adding zeros till the message is congruent to 448 bits mode 512
        quiz3+=32; //each is of 32 bits

    }

    /*
    var value3 = document.createElement("div");
    value3.innerHTML = "The total number of zeros added after adding 1 to form 448 bits  "+ quiz3 ;
    value3.style.width = "1100px";
	value3.style.height = "80px";
	value3.style.color = "#4040C0";
    document.body.appendChild(value3);
 	*/

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

        var value4 = document.createElement("div");
        value4.innerHTML = "<br />The first 32 bits i.e. analysing first four characters only "+ quiz1.toString(2) + "<br />The last 32 bits after considering all the characters(add zeros after the number) "+ quiz2.toString(2) + "<br />The total number of zeros added after adding 1 to form 448 bits  "+ quiz3 + "<br />The 15th Word formed from the last 32 bits of 512 bit chunk is "+ W[15].toString(2) ;
        
        value4.style.color = "white";
        
        document.body.appendChild(value4);

        for( i=16; i<=79; i++ ) {
            
            W[i] = rotate_left(W[i-3] ^ W[i-8] ^ W[i-14] ^ W[i-16], 1);
 			//Extend the sixteen 32-bit words into eighty 32-bit words
            
        }

        quiz5 = W[79].toString(2); //will give us the 79th word from the first 512 bit chunk
        var value5 = document.createElement("div");
        value5.innerHTML = "The 79th Word formed is "+ " " +  W[79].toString(2) +" <br />" + "Values req of W[76], W[71], W[65], W[63] are "+ W[76] +" " +W[71] +" " +W[65] +" " +W[63] +" " + " resp.";
        value5.style.color = "white";
        
        document.body.appendChild(value5);


 		//INITIALISING HASH VALUES FOR THIS CHUNK
        A = H0; B = H1; C = H2; D = H3; E = H4;
 
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
    
    
}


function msgdigest(){

	var msg = document.getElementById("string").value;//stores the input string
	var ans = SHA1(msg);
	var digest = document.createElement("div");
	digest.style.width = "1100px";
	digest.style.height = "80px";
//	digest.style.color = "#FFFF99";
    digest.style.color = "white";
//	digest.style.border = "1px solid red";
	digest.innerHTML = "<p><h2><i><b>Message Digest</b> " + ans + "</i></p> </h2>"

	document.body.appendChild(digest);


}

function variables(){

	var msg = document.getElementById("string").value;//stores the input string
	var ans = SHA1(msg);
	SHA1_variables(msg);


}


function testing(){

	var msg = document.getElementById("string").value;//stores the input string
	var ans = SHA1(msg);
	SHA1_testvalues(msg);


}


function constants(){

	var kconstant = document.createElement("div");
	kconstant.style.width = "1100px";
	kconstant.style.height = "75px";
//	kconstant.style.color = "#408080";
    kconstant.style.color = "#C0C0C0";
    
//	kconstant.style.border = "1px solid red";
	kconstant.innerHTML = "<br>Constants<br />k1 ---> 0x5A827999 ; k2 ---> 0x6ED9EBA1 ; k3 ---> 0x8F1BBCDC ; k4 ---> 0xCA62C1D6";

	document.body.appendChild(kconstant);
	
	var hconstant = document.createElement("div");
	hconstant.style.width = "1100px";
	hconstant.style.height = "50px";
//	hconstant.style.color = "#408080";
    hconstant.style.color = "#C0C0C0";

//	hconstant.style.border = "1px solid red";
	hconstant.innerHTML = "H0 ---> 0x67452301 ; H1 ---> 0xEFCDAB89 ; H2 ---> 0x98BADCFE ; H3 --->0x10325476 ; H4 ---> 0xC3D2E1F0";
	
	document.body.appendChild(hconstant);		


	//kconstant.style.position = "relative";
	//kconstant.style.left = "400px";
	//kconstant.style.top = "200px";			
}


















