var myDiv = document.getElementsByClassName('main-container');

myDiv[0].addEventListener('click', function(){
    Velocity(myDiv[0], { left: 900 })
});