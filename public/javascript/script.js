var myApp = {

    //Initializes script
    init: function(){
        myApp.navOpenEventListener();
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
         var opaqueBackground = navButton.children;

        Velocity(bottomNav, {height: 100 + '%'});

        for(var i = 0; i < navArray.length; ++i){
            navArray[i].className = navArray[i].className + ' nav-open';

            if(navArray[i] == navButton){
                Velocity(navButton, {
                    width: 100 + '%',
                    height: 100 + '%',
                    left: 0
                });

                Velocity(opaqueBackground, {
                    opacity: 1
                })
            } else {
                Velocity(navArray[i], { left: -900 })
            }
        }

        myApp.navCloseEventListener();
    },

    //Closes all the navigation and returns the user to the 'Home' screen
    closeNav: function(){
        var bottomNav = document.getElementById('bottom-nav'),
            navItems = bottomNav.children;

        Velocity(bottomNav, {height: 60 + '%'});
        Velocity(navItems[1], {left: 50 + '%', width: 50 + '%', height: 50 + '%'});
        Velocity(navItems[3], {left: 50 + '%', width: 50 + '%', height: 50 + '%'});
        Velocity(navItems[0], {left: 0, width: 50 + '%', height: 50 + '%'});
        Velocity(navItems[2], {left: 0, width: 50 + '%', height: 50 + '%'});

        for(var i = 0; i < navItems.length; ++i) {
            Velocity(navItems[i].children, {
                opacity: 0.2
            });

            navItems[i].className = navItems[i].className.replace(/\bnav-open\b/,'')
        }
    }
};


myApp.init();
