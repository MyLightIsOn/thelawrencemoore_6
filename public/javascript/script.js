var myApp = {

    //Initializes script
    init: function(){
        myApp.introAnimation();
        myApp.navOpenEventListener();
    },

    //Makes the animation when the page loads
    introAnimation: function(){
         var bottomNav = document.getElementById('bottom-nav'),
             navItems = bottomNav.children,
             titleElements = document.getElementById('main-title').children,
             easing =  [ 0.17, 0.67, 0.40, 0.67 ];

        //Animates each nave button
        Velocity(titleElements, {opacity: 1}, {duration: 1000}).then(function(){
            setTimeout(function(){
                Velocity(navItems[0], {top: 0, bottom: null}, easing)
            },250);

            setTimeout(function(){
                Velocity(navItems[1], {top: 0, bottom: null}, easing)
            },450);

            setTimeout(function(){
                Velocity(navItems[2], {bottom: 0}, easing)
            },650);

            setTimeout(function(){
                Velocity(navItems[3], {bottom: 0}, easing)
            },850);
        });

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
             closeButton = document.getElementsByClassName('close-area');

        //Adds class to make close button visible
        closeButton[0].className += ' close-active';

        //Fades in close button
        Velocity(bottomNav, {height: 100 + '%'}).then(function(){
            Velocity(closeButton, {opacity: 1})
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
            closeButton = document.getElementsByClassName('close-area');

        //Closes section
        myApp.sectionClose();

        //Fades out close
        Velocity(closeButton, {opacity: 0});

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
                borderWidth: 6
            });

            //Removes the nav-open class
            navItems[i].className = navItems[i].className.replace(/\bnav-open\b/,'')
        }

        //Removes the close area class
        closeButton[0].className = 'close-area';
    },

    //Function that displays selected section content
    sectionOpen: function(navButton){
        var buttonClassArray = navButton.className.split(' '),
            activeSectionClassName = buttonClassArray[1] + '-section',
            activeSection = document.getElementById(activeSectionClassName),
            mainContainer = document.getElementsByClassName('main-container');

            //Adds active-section class to selected section
            activeSection.className += ' active-section';

            //Delays content fade in
            setTimeout(function(){
                Velocity(activeSection, {opacity: 1});
                mainContainer[0].className += ' main-container-open';
            }, 700)
    },

    //Function that will close the selected content
    sectionClose: function(){
        var activeSection = document.getElementsByClassName('active-section'),
            mainContainer = document.getElementsByClassName('main-container');

        //Fades out content
        Velocity(activeSection, {opacity: 0});

        //Removes active-section class, thus lowering it's z-index
        activeSection[0].className = 'inner-content';
        mainContainer[0].className = ' main-container';
    }
};


myApp.init();
