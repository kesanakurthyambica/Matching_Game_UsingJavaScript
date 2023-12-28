var cardsArray=[
    { 'name':'CSS', 'img': './images/CSS.png' },
    { 'name':'HTML', 'img': './images/HTML.png'},
    { 'name':'JQUERY', 'img': 'images/JQUERY.jpg'},
    { 'name':'JS', 'img': 'images/JS.jpg'},
    { 'name':'Node', 'img': 'images/NODE.png'},
    { 'name':'Photo Shop', 'img': 'images/PS.jpg'},
    { 'name':'PHP', 'img': 'images/PHP.png'},
    { 'name':'PYTHON', 'img': 'images/PYTHON.png'},
    { 'name':'RUBY', 'img': './images/Rails.jpg'},
    { 'name':'SASS', 'img': 'images/SASS.png'},
    { 'name':'SUBLIME', 'img': 'images/SUBLIME.jpg'},
    { 'name':'WORDPRESS', 'img': 'images/WORDPRESS.png'},
];
//duplicate cardsArray to create a match for each card
var gameGrid=cardsArray.concat(cardsArray);

//randomize game grid on each load
gameGrid.sort(function()
{
    return 0.5-Math.random();
})

//grab the div with an id of game-board & assign to a variable game
var game=document.getElementById('game-board');
//create a section element & assign it to variable grid
var grid=document.createElement('section');
//give section element a class of grid
grid.setAttribute('class','grid');
//append the grid section to the game-board div
game.appendChild(grid);
//loop through each item in our cardsArray
for(i=0;i<gameGrid.length;i++)
{
    //create a div element & assign to varible card
    var card=document.createElement('div');
    //apply a card class to that div
    card.classList.add('card');
    //set the data-name attribute of the div to the cardsArray name
    card.dataset.name=gameGrid[i].name;
    
    //create front of card
    var front = document.createElement('div');
    front.classList.add('front');

    //create back of card
    var back=document.createElement('div');
    back.classList.add('back');
   
    //apply the background image of the iv to the cardsArray image
    back.style.backgroundImage= `url(${gameGrid[i].img})`;
    //append the div to te grid section
    grid.appendChild(card);
    card.appendChild(front);
    card.appendChild(back);
}

var firstGuess='';
var secondGuess='';

//set count to 0
var count=0;

var previousTarget = null;
var delay=1200;

//ass match CSS
var match = function() 
{
    var selected =document.querySelectorAll('.selected');
    //loop through the array ylike object containing 'selectd'class
    for(i=0;i<selected.length;i++)
    {
        selected[i].classList.add('match');
    }
};
//reset guesses after two attempts
var resetGuesses=function() 
{
    firstGuess = '';
    secondGuess = '';
    count=0;
    previousTarget=null;

    var selected = document.querySelectorAll('.selected');
    for(i=0;i<selected.length;i++)
    {
        selected[i].classList.remove('selected');
    }
};

//add event listener to grid
grid.addEventListener('click',function(event)
{
    //declare variable to target our clicked item
    var clicked = event.target;
    //do not allow the grid section itself to be selected
    //only select divs inside the grid
    if(clicked.nodeName === 'SECTION' || clicked === previousTarget || clicked.parentNode.classList.contains('match') || clicked.parentNode.classList.contains('selected'))
    {
        return;
    }

    //we only want to add 'selectd' class if the current count is less than 2
    if(count<2)
    {
        count++;

        if(count === 1)
        {
            //assign firstguess
            firstGuess = clicked.parentNode.dataset.name;
            clicked.parentNode.classList.add('selected');
        }
        else 
        {
            //assign second guess
            secondGuess = clicked.parentNode.dataset.name;
            //add selected class
            clicked.parentNode.classList.add('selected');
        }
        //if both guesses are not empty
        if(firstGuess !==  '' && secondGuess !== '')
        {
            //add the firstguess matches seconf guess
            if(firstGuess === secondGuess)
            {
                //run the match function
                setTimeout(match,delay);
                setTimeout(resetGuesses,delay);
            }
            else
            {
                setTimeout(resetGuesses,delay);
            }
        }
        previousTarget = clicked;
    }
});