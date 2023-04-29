const links = document.querySelectorAll('.itemLinks');
const slideWrapper = document.getElementById('slideWrapper');
const nextArrow = document.getElementById('nextSlide');
const previousArrow = document.getElementById('previousSlide');

//get the width of one slide
const firstSlide = document.querySelector('.slide');
var slideWidth = document.querySelector('.slide').offsetWidth;

let currentSlideNumber = 0;

for( let i = 0; i < links.length; i++ ){
const link = links[i];
link.setAttribute( "data-number", i );

nextArrow.addEventListener( 'click', setNextSlide );
previousArrow.addEventListener( 'click', setPrevSlide );

//autoplay
// let interval = setInterval( setNextSlide, 5000 );

function setPrevSlide(){
	currentSlideNumber--;
//if we go lower than 0, go to the end
 	if( currentSlideNumber < 0 ){
 		currentSlideNumber = links.length - 1;
 	}
 	changePosition(currentSlideNumber);
//add active to the "bubble" that we went to 
	removeActiveLinks();
 	links[currentSlideNumber].classList.add('active');
 }

 function setNextSlide(){
//make the current slide number go up
 	currentSlideNumber++;
//if we go past the last slide start over on the first slide
 	if( currentSlideNumber >= links.length ){
 		currentSlideNumber = 0;		
 	}

 	changePosition(currentSlideNumber);
//add active to the "bubble" that we went to 
 	removeActiveLinks();
 	links[currentSlideNumber].classList.add('active');
 }

link.addEventListener('click', setClickedItem);
 }

 function setClickedItem(e){
 	let clickedLink = e.target;
 	currentSlideNumber = clickedLink.getAttribute("data-number");
 	changePosition(currentSlideNumber);
 	removeActiveLinks();
 	clickedLink.classList.add('active');
 }

 function changePosition( number ){
	let position = - ( number * slideWidth ) + 'px';

 	slideWrapper.style.left = position;
 }

//remove all active classes
 function removeActiveLinks(){
 	for( let i = 0; i < links.length; i++ ){
 		links[i].classList.remove('active');
 	}
 }