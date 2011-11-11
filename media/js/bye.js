//  declare namespace variable
var Bye = {};

Bye.admin = {
	
	//  initialized admin functions 
	init: function ()
	{   
        $('#username').submit(Bye.admin.effects.slideChange);
	},
    effects: 
    {
        slideChange: function(){
            // animation when username gets submitted
            $(this).animate({left: '-=50'}, 90)
            .animate({left: '+=2000'}, 500)
            .hide(function(){
                $('#password').show().animate({left: '0'}, 90);
                $('#undo').live('click', Bye.admin.effects.undoSlide);
            });
            
            //gets the username from the first form value
            var user = $('#username input[type="text"]').val();
            
            // injects avatar picture and text. Might want to randomize an array of text for fun later.
            $('#password figure').prepend('<img src="http://api.twitter.com/1/users/profile_image/' + user + '"/>');
            
            return false;
        },
        undoSlide: function(){
            // animation if you need to go back to the username field
            $(this).parent().animate({left: '+=50'}, 90)
            .animate({left: '-=2000'}, 500)
            .hide(function(){
                $('#username').show().animate({left: '0'}, 90, function(){
                    $('#password figure').empty();
                });
            }); 
            
            return false;            
        }
    }
};

//  initialize on document ready 
$(document).ready(function() {
	Bye.admin.init();
});