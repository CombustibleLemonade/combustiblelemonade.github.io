/*jslint browser:true */
/*global $:false */

//$("header").animate({backgroundColor: 'black',});
$(document).ready(function(){
    $(window).scroll(function(){
        if ($(this).scrollTop()!==0)
        {
            $("header").animate({
                backgroundColor: 'rgba(25, 80, 55, 1)'});
        }
        else
        {
            $("header").animate(
                {backgroundColor:'rgba(25,80,55,0.8)'});
        }
    });
});