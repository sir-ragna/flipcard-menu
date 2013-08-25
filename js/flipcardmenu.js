var flipcardmenu = (function(){
    var flipcardmenu_isSafe = true;
    
    var next_slide = function(){
        console.log('next slide');
        
        // identify next slide
        var list_of_next_slides = document.getElementsByClassName('next-slide');
        if (list_of_next_slides.length === 0) {
            // there is no next slide
            console.log("There is no next slide");
            flipcardmenu_isSafe = true;
            return;
        }
        slide = list_of_next_slides.item(0);
        
        var current = document.getElementsByClassName('current-slide');
        // maybe check if there is one current instead of none or multiple
        current = current.item(0);
        
        window.setTimeout(function(){
            // move the 'slide-current' to the next
            current.style.zIndex = 0;
            current.classList.add('slide-transition');
            current.classList.add('slide-out-left');
            slide.style.zIndex = 1;
            slide.classList.add('slide-transition');
            setTimeout(function(){
                    slide.classList.remove('next-slide');
                    slide.classList.remove('slide-transition');
                    slide.classList.add('current-slide');
                    current.classList.remove('current-slide');
                    current.classList.remove('slide-transition');
                    current.classList.remove('slide-out-left');
                    current.classList.add('previous-slide');
                    flipcardmenu_isSafe = true;
                }, 550);
        }, 0);
    };
    
    var previous_slide = function(){        
        console.log('previous slide');
        // identify next slide
        previous_slides = document.getElementsByClassName('previous-slide');
        if (previous_slides.length === 0) {
            // there is no previous slide
            console.log("There is no previous slide");
            flipcardmenu_isSafe = true;
            return;
        }
        slide = previous_slides.item(previous_slides.length - 1);
        var current = document.getElementsByClassName('current-slide');
        current = current.item(current.length - 1);
        current.style.zIndex = 0;
        current.classList.add('slide-transition');
        current.classList.add('slide-out-right');
        
        window.setTimeout(function(){
            slide.style.zIndex = 1;
            slide.classList.add('slide-transition');
            setTimeout(function(){
                    slide.classList.remove('previous-slide');
                    slide.classList.remove('slide-transition');
                    slide.classList.add('current-slide');
                    current.classList.remove('current-slide');
                    current.classList.remove('slide-transition');
                    current.classList.remove('slide-out-right');
                    current.classList.add('next-slide');
                    flipcardmenu_isSafe = true;
                }, 550);
        }, 0);
    };
    
    document.getElementById('next-slide').onclick = function() {
        if (flipcardmenu_isSafe) {
            flipcardmenu_isSafe = false; 
            next_slide();
        } else {
            console.log("Navigation is unsafe");
        }
    
        return false;
    };
    
    document.getElementById('previous-slide').onclick = function() {
        if (flipcardmenu_isSafe) {
            flipcardmenu_isSafe = false; 
            previous_slide();
        } else {
            console.log("Navigation is unsafe");
        }
    
        return false;
    };
    
    // Position elements so they are on the same heigth
    // the rest of the positioning is in CSS
    var slides = document.getElementsByClassName("slide-item");
    var cummulativeHeight = 0;
    for (var i = 0; i < slides.length; i++) {
        var slide = slides.item(i);
        cummulativeHeight += slide.style.height;
        slide.style['top'] =  '-' + (i * 200) + 'px'; 
    }
    
    /**
     * Basic tween function
     * Use setTimeout instead of setInterval:
     * http://aerotwist.com/tutorials/ten-things-i-learned/
    */
    var tweenX = function(element, distance, callback){
        var goal = element.style.left.replace("px", '') - distance;       
        setTimeout(draw(), 17);
        
        function draw() {
            var currentPos = parseInt(element.style.left.replace("px", ''));
            element.style.left = currentPos - 1 + 'px';
            if (currentPos - 1 <= goal) {
                //stop timeout
                setTimeout(callback, 700);
            } else {
                setTimeout(draw(), 17);
            }
        }
    }
})();