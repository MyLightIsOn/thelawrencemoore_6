var myApp = {

    //Initializes script
    init: function(){
        myApp.introAnimation();
        myApp.navOpenEventListener();
        myApp.createSlideShow();
        myApp.slideShowOpenEventListner();
        myApp.slideShowCloseEventListner();
        myApp.videoLoader();
    },

    videoLoader: function(){
        var videoDiv = document.getElementsByClassName('bg-video');


        if(window.innerWidth > 1000){
            videoDiv[0].currentTime = 5;
            videoDiv[0].playbackRate = 0.75;
            setInterval(function(){
                Velocity(videoDiv, {
                    opacity: 0
                }, 5000).then(
                    function(){
                        videoDiv[0].currentTime = 5;
                        Velocity(videoDiv, {
                            opacity: 1
                        }, 5000)
                    }
                )
            }, 50000);
        }
    },

    //Makes the animation when the page loads
    introAnimation: function(){
         var bottomNav = document.getElementById('bottom-nav'),
             navItems = bottomNav.children,
             titleElements = document.getElementById('main-title').children,
             easing =  [ 0.17, 0.67, 0.40, 0.67 ];

        //Animates each nav button
        Velocity(titleElements, {
            opacity: 1
        }, 1000);

        setTimeout(function(){
            setTimeout(function(){
                Velocity(navItems[0], {
                    top: 0,
                    bottom: null,
                    opacity: 1
                }, easing)
            },250);

            setTimeout(function(){
                Velocity(navItems[1], {
                    top: 0,
                    bottom: null,
                    opacity: 1
                }, easing)
            },650);

            setTimeout(function(){
                Velocity(navItems[2], {
                    bottom: 0,
                    opacity: 1
                }, easing)
            },1050);

            setTimeout(function(){
                Velocity(navItems[3], {
                    bottom: 0,
                    opacity: 1
                }, easing)
            },1450);
        }, 3000)
    },

    //Puts nav buttons into an array
    getNavElements: function(){
        var navArray = document.getElementsByClassName('nav-area');
        return navArray
    },

    //Adds opening event listeners to the nav array
    navOpenEventListener: function(){
        var navArray = myApp.getNavElements(),
            bottomNav = document.getElementById('bottom-nav');

        for(var i = 0; i < navArray.length; ++i){
            navArray[i].addEventListener('click', function(){
                myApp.openNav(this, navArray, bottomNav);
            });
        }
    },

    //Adds closing event listeners to the nav array
    navCloseEventListener: function(){
        var closeButton = document.getElementsByClassName('close-area');

        closeButton[0].addEventListener('click', function(){
            myApp.closeNav();
        });
    },

    //Function for opening the nav
    openNav: function(navButton, navArray, bottomNav){
         var opaqueBackground = navButton.children,
             header = document.getElementsByClassName('header');

        //Adds class to make close button visible
        header[0].className += ' close-active';

        //Fades in close button
        Velocity(bottomNav, {height: 100 + '%'}).then(function(){
            Velocity(header, {opacity: 1})
        });

        //Finds the nav button that was pressed and expands it
        //while closing the rest
        for(var i = 0; i < navArray.length; ++i){
            navArray[i].className += ' nav-open';

            if(navArray[i] == navButton){
                Velocity(navButton, {
                    width: 100 + '%',
                    height: 100 + '%',
                    left: 0
                }, 600);

                Velocity(opaqueBackground, {
                    width: 100 + '%',
                    height: 100 + '%',
                    borderRadius: 0,
                    borderWidth: 0
                },  600)
            } else {
                Velocity(navArray[i], { left: -900 })
            }
        }

        myApp.navCloseEventListener();
        myApp.sectionOpen(navButton);
    },

    //Closes all the navigation and returns the user to the 'Home' screen
    closeNav: function(){
        var bottomNav = document.getElementById('bottom-nav'),
            navItems = bottomNav.children,
            header = document.getElementsByClassName('header');

        //Closes section
        myApp.sectionClose();

        //Fades out close
        Velocity(header, {opacity: 0});

        //Shrinks nav area and returns nav buttons
        Velocity(bottomNav, {height: 60 + '%'});
        Velocity(navItems[1], {left: 50 + '%', width: 50 + '%', height: 50 + '%'}); // Design
        Velocity(navItems[3], {left: 50 + '%', width: 50 + '%', height: 50 + '%'}); // Contact
        Velocity(navItems[0], {left: 0, width: 50 + '%', height: 50 + '%'});        // About
        Velocity(navItems[2], {left: 0, width: 50 + '%', height: 50 + '%'});        // Code

        for(var i = 0; i < navItems.length; ++i) {
            Velocity(navItems[i].children, {
                width: 60 + '%',
                height: 60 + '%',
                borderRadius: 200 + 'px',
                borderWidth: 4
            });

            //Removes the nav-open class
            navItems[i].className = navItems[i].className.replace(/\bnav-open\b/,'')
        }

        //Removes the close area class
        header[0].className = 'header';
    },

    //Function that displays selected section content
    sectionOpen: function(navButton){
        var buttonClassArray = navButton.className.split(' '),
            activeSectionClassName = buttonClassArray[1] + '-section',
            activeSection = document.getElementById(activeSectionClassName),
            mainContainer = document.getElementsByClassName('main-container'),
            videoOverlay = document.getElementsByClassName('video-overlay'),
            mainBackground = document.getElementById('main-background');

            //Adds active-section class to selected section
            activeSection.className += ' active-section';

            //Delays content fade in
            setTimeout(function(){
                Velocity(activeSection, {opacity: 1});
                mainContainer[0].className += ' main-container-open';
                videoOverlay[0].style.display = "none";
                mainBackground.style.display = "none";
            }, 700)
    },

    //Function that will close the selected content
    sectionClose: function(){
        var activeSection = document.getElementsByClassName('inner-content'),
            mainContainer = document.getElementsByClassName('main-container'),
            videoOverlay = document.getElementsByClassName('video-overlay'),
            mainBackground = document.getElementById('main-background');


        videoOverlay[0].style.display = "block";
        mainBackground.style.display = "block";

        //Fades out content
        Velocity(activeSection, {opacity: 0});

        //Removes active-section class, thus lowering it's z-index. The delay prevents an undefined error
        for(var i = 0; i < activeSection.length; ++i){
            activeSection[i].className = 'inner-content';
        }

        mainContainer[0].className = ' main-container';
    },

    //Creates the slide shows for the Design page
    createSlideShow: function(){
        var slideShowArray = document.getElementsByClassName('swiper-container');
            for(var i = 0; i < slideShowArray.length; ++i){
                var slideClass = slideShowArray[i].className.split(' ')[1];

                var swiper = new Swiper('.swiper-container.' + slideClass, {
                    pagination: '.' + slideClass + ' .swiper-pagination',
                    paginationClickable: true,
                    nextButton: '.' + slideClass + ' .swiper-button-next',
                    prevButton: '.' + slideClass + ' .swiper-button-prev'
                })
            }
    },

    //Puts view process buttons into an array
    getProcessButtons: function(){
        var viewProcessArray = document.getElementsByClassName('view-process');
        return viewProcessArray
    },

    //Puts nav buttons into an array
    getCloseButtons: function(){
        var closeSlideArray = document.getElementsByClassName('close-slide');
        return closeSlideArray
    },

    //Adds opening event listeners to the view button array
    slideShowOpenEventListner: function(){
        var viewProcessArray = myApp.getProcessButtons();

        for(var i = 0; i < viewProcessArray.length; ++i){
            viewProcessArray[i].addEventListener('click', function(){
                myApp.openSlideShow(this)
            });
        }
    },

    //Adds closing event listeners to the close slideshow array
    slideShowCloseEventListner: function(){
        var closeSlideArray = myApp.getCloseButtons();

        for(var i = 0; i < closeSlideArray.length; ++i){
            closeSlideArray[i].addEventListener('click', function(){
                myApp.closeSlideShow()
            });
        }
    },

    openSlideShow: function(buttonClicked){
        var slideShow = buttonClicked.nextElementSibling,
            closeButton = document.getElementsByClassName('close-area'),
            closeSlides = document.getElementsByClassName('close-slide');

        Velocity(slideShow, {
            left: 0
        });

        Velocity(closeSlides, {
            right: 11
        });

        if(window.innerWidth > 1000){
            Velocity(closeButton, {
                right: 100 + '%'
            })
        } else {
            Velocity(closeButton, {
                left: -100 + '%'
            })
        }
    },

    closeSlideShow: function(){
        var slideShow = document.getElementsByClassName('slide-show'),
            closeButton = document.getElementsByClassName('close-area'),
            closeSlides = document.getElementsByClassName('close-slide');

        Velocity(closeSlides, {
            right: 100 + '%'
        });

        Velocity(slideShow, {
            left: -100 + '%'
        });

        if(window.innerWidth > 1000){
            Velocity(closeButton, {
                right: 50
            })
        } else {
            Velocity(closeButton, {
                left: 20
            })
        }
    }
};



window.addEventListener('load',
    myApp.init()
);
