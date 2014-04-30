
$(document).ready(function(){
    // Popover 
    $('#registerHere input').hover(function(){
    $(this).popover('show')
    });

    jQuery.validator.addMethod(
        'StrongPassword',
        function (value) { 
            return /^(?=.*[_$@.])(?=.*[A-Z])(?=.*[^_$@.])[\w$@.]{8,15}$/.test(value); 
        },  
        'Your password must contain at least one special character, one number, one lower case and one upper case character.'
    );  

    
    // Validation
    $("#registerHere").validate({
    	rules:{
	      	
	      	first_name:"required",
	      	last_name:"required",
	      	dob:"required",
	      	
	      	locality:"required", city:"required", country:"required", state:"required", district:"required",
	      	pin:{required:true, number:true, minlength:6, maxlength:6},

	      	p_locality:"required", p_city:"required", p_country:"required", p_state:"required", p_district:"required",
	      	p_pin:{required:true, number:true, minlength:6, maxlength:6},

	      	age:{required:true, number:true},
	      	mobile:{required:true, number: true, minlength:10, maxlength:10},
	      	email:{required:true,email: true},
	      	pwd:{required:true, minlength: 8, StrongPassword: true},
	      	cpwd:{required:true, equalTo: "#pwd"},

    	},

      	messages:{
      		
      		first_name:"Enter your first name",
      		last_name:"Enter your last name",
      		mobile:{
      			required:"Enter your mobile number",
      			number: "Enter a valid number",
      		},
      		age:{
      			number:"Age should be numeric",
      		},
      		email:{
      			required:"Enter your email address",
      			email:"Enter valid email address"
      		},
      		pwd:{
      			required:"Enter your password",
      			minlength:"Password must be minimum 8 characters",
      			StrongPassword: "Your password must contain at least one special character, one number, one lower case and one upper case character"
      		},
      		cpwd:{
      			required:"Enter confirm password",
      			equalTo:"Password and Confirm Password must match"
      		},
      		
      	},

    errorClass: "help-inline",
    errorElement: "span",
      
    highlight:function(element, errorClass, validClass){      	
    	$(element).parents('.control-group').addClass('error');
    },
      
    unhighlight: function(element, errorClass, validClass){
    	$(element).parents('.control-group').removeClass('error');
      	$(element).parents('.control-group').addClass('success');
      }
    });
});