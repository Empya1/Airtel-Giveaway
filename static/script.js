

function openAdLink() {
            $(".adlink").click();
        };

$(document).ready(function(){


        var infoCards = document.querySelectorAll(".hide-card");
        
        $(window).scroll(()=>{
            var windowHeight = window.innerHeight/2;
            
            
            
            for ( infocard of infoCards ) {
                var triggerpoint = infocard.offsetTop - windowHeight;
                if (window.pageYOffset >= triggerpoint) {
                    infocard.style.opacity = 1;
                    infocard.style.transform = "translateX(0px)"
                    
                }else{
                    infocard.style.opacity = 0.1;
            
                };
            };
        });
        
        
});
    