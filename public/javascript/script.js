var myDiv = document.getElementsByClassName('myDiv');

myDiv[0].addEventListener('click', function(){
    Velocity(myDiv[0], { left: 500 })
});