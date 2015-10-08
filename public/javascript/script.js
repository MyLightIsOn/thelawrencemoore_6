var myApp = {

    //Initializes script
    init: function(){
        myApp.navEventListener();
    },

    //Puts nav buttons into an array
    getNavElements: function(){
        var navArray = document.getElementsByClassName('nav-area');
        return navArray
    },

    //Adds event listeners to the nav array
    navEventListener: function(){
        var navArray = myApp.getNavElements(),
            i;

        for(i = 0; i < navArray.length; ++i){
            navArray[i].addEventListener('click', function(){
                myApp.openNav(this, navArray);
            });
        }
    },

    //Function for opening the nav
    openNav: function(navButton, navArray){
        var bottomNav = document.getElementById('bottom-nav');

        Velocity(bottomNav, {height: 100 + '%'});

        for(i = 0; i < navArray.length; ++i){
            if(navArray[i] == navButton){
                Velocity(navButton, {
                    width: 100 + '%',
                    height: 100 + '%'
                });
            } else {
                Velocity(navArray[i], { left: -900 })
            }
        }
    }
};


myApp.init();

//var myDiv = document.getElementsByClassName('main-container');
//
//myDiv[0].addEventListener('click', function(){
//    Velocity(myDiv[0], { left: 900 })
//});