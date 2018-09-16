/*
	@author - Ed Stansfield
    @desc - a pic 'zoom' function - like ones seen on Amazon etc
    @desc - future plan is to turn this into a module to allow for custom images to be used
	//uses code from https://codepen.io/chrisboon27/pen/rEDIC
*/
$(document).ready(function(){
	
	//window.console&&console.log('Jquery has loaded successfully');
    
    //++Variables++
    var movementStrength = 250;
    
    var images= $('div[large_image]');
    
    window.console&&console.log(images);
    window.console&&console.log(images[0].attributes.large_image.nodeValue);
    window.console&&console.log(images[0].attributes.small_image.nodeValue);
    
    //go through each image and assign the background to the small image
    $.each(images,function(index,value){
        $(value).css("background-image","url("+value.attributes.small_image.nodeValue+")");
    });
    
    
    //++Functions++
    
    /**
    @desc - mouseover - replace the image with the large version - movement is handled by the mousemove function
    */
	$( "div").mouseover(function() {
		//$(this).css("background-image","url(DSCN0610.jpg)");
        
        //go through each of the images and if the divs are the same, replace the image with the large version
        
        $.each(images,function(index,value){
            //window.console&&console.log(value.id);
            //window.console&&console.log(this.id);
            if(value.id == this.id){                    //need to use this.id rather than $(this).id, since id exists on element but not the jQuery object
               $(this).css("background-image","url("+value.attributes.large_image.nodeValue+")");
                //break;          //break here no need to go through the rest of the array
            }
        });
        
        return this;
        
	});
    
    /**
    @desc - mouseleave - replace the image with the original small image
    */
	$( "div" ).mouseleave(function() {
		//$(this).css("background-image","url(DSCN0610_Small.jpg)");
        
        //go through each of the images and if the divs are the same, replace the image with the small version
        
        $.each(images,function(index,value){
            //window.console&&console.log(value.id);
            //window.console&&console.log(this.id);
            if(value.id == this.id){                    //need to use this.id rather than $(this).id, since id exists on element but not the jQuery object
               $(this).css("background-image","url("+value.attributes.small_image.nodeValue+")");
                //break;
            }
        });
        
        return this;
	});
    
    /**
    @desc - mousemove - adjust the background position based on cursor location to 'move' the image
    */
	$("div").mousemove(function(e){
        
        if(this.id == null || this.id == ""){
            return this;
        }
        
        
        var height = movementStrength / $(this).height();
        var width = movementStrength / $(this).width();
        var newX = e.pageX - ($(this).width() / 2);
        var newY = e.pageY - ($(this).height() / 2);
        
        $(this).css("background-position", resolvePercent(newX*width) + "% " + resolvePercent(newY*height) + "% ");
        
        //outputting data for testing
        $("#test_span").text("Cords: " + e.pageX + "," + e.pageY);
        $("#test_span2").text("Calc Cords (%): " + resolvePercent(newX*width) + "," + resolvePercent(newY*height));
        
        return this;
    });
    
    /**
        @function - if given negative number return 0, greater than 100 return 100 otherwise do nothing
        used to prevent returning to postive values using Math.abs() and excedding boundaries of image since we are using percentages
    */
    function resolvePercent(num,max){
        
        if(num < 0){
            return 0;
        }
        else if(num > 100){
            return 100;
        }
        
        return num;
    }
    
});