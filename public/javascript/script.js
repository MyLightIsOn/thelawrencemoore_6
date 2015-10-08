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

    getOpenNavElements: function(){
        var navAfterClick = document.getElementsByClassName('nav-open');
        return navAfterClick;
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
    navCloseEventListener: function(activeNav){
        var closeButton = document.getElementsByClassName('close-area');

        closeButton[0].addEventListener('click', function(){
            myApp.closeNav(activeNav)
        });
    },

    //Function for opening the nav
    openNav: function(navButton, navArray, bottomNav){

        Velocity(bottomNav, {height: 100 + '%'});

        for(var i = 0; i < navArray.length; ++i){
            navArray[i].className = navArray[i].className + ' nav-open';

            if(navArray[i] == navButton){
                Velocity(navButton, {
                    width: 100 + '%',
                    height: 100 + '%',
                    left: 0
                });
            } else {
                Velocity(navArray[i], { left: -900 })
            }
        }

        myApp.navCloseEventListener(myApp.getOpenNavElements());
    },

    closeNav: function(activeNav){
        var bottomNav = document.getElementById('bottom-nav'),
            designNav = document.getElementsByClassName('design'),
            contactNav = document.getElementsByClassName('contact'),
            aboutNav = document.getElementsByClassName('about'),
            codeNav = document.getElementsByClassName('code');

        Velocity(bottomNav, {height: 60 + '%'});
        Velocity(designNav, {left: 50 + '%', width: 50 + '%', height: 50 + '%',});
        Velocity(contactNav, {left: 50 + '%', width: 50 + '%', height: 50 + '%',});
        Velocity(aboutNav, {left: 0, width: 50 + '%', height: 50 + '%',});
        Velocity(codeNav, {left: 0, width: 50 + '%', height: 50 + '%',});

        for(var i = 0; i < activeNav.length; ++i) {
            /*activeNav[i].className = activeNav[i].className + ' nav-open';*/


        }


    }
};


myApp.init();
