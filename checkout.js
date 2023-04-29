let myCart=document.querySelector('button'); //select the first button (shopping cart)
let checkoutPanel=document.getElementById('checkout');//sliding checkout panel
let closeBtn=document.getElementsByClassName('closing'); //select all buttons with a class of closing
let number=document.getElementById('number'); //select the little red circle over shopping cart
let subtotal=document.getElementById('subtotal');//subtotal <p>
let taxes=document.getElementById('taxes');//taxes <p>
let total=document.getElementById('total');//total <p>
let calories=document.getElementById('calories');//total <p>
let itemsGroup=document.getElementById('items'); // selects the section including the articles
let btnList = document.getElementsByClassName('add');//select all buttons with class of add. It creates a nodelist
let addArray=Array.from(btnList);//create a real array from the nodeList
let listContainer = document.getElementById('itemsAdded'); //select section in the checkout panel
//initializing variables
let itemsNum=0;
let totalSubtotal=0;
let totalPrice=0;
let totalTaxes=0;
let totalCalories=0;
let cc=document.getElementById('ccnum');//selects the input field for credit card
let showList = document.getElementsByClassName('launchModal');//selects all buttons that have a class of launch Modal. It creates a nodelist
let showArray=Array.from(showList);//create a real array from the nodeList
let modal=document.getElementById('modal'); //select the modal element
let modalImg=document.getElementById('lazy');//selects the umage with ID of lazy
let closeModal=document.querySelector('#modal input');//selects the closeModal button

//+++++ event listeners +++++++
closeBtn[0].addEventListener('click', closePanel);
//add class Open when the shopping cart is clicked
myCart.addEventListener('click', function(){
	checkoutPanel.classList.add('open');
});

// hide credit card number
cc.addEventListener('change', function(evt){
		cc.type = 'password';
});

//for each element in the addArray element, attach an event listener for a click and run the function addToCart
addArray.forEach(function(element){
		element.addEventListener('click', addToCart);
});

//for each element in the showArray element, attach an event listener for a click and run the function openModal
showArray.forEach(function(element){
		element.addEventListener('click', openModal);
});

//when clicking on the closeModal, add the class hidden to it
closeModal.addEventListener('click', function(){
	modal.classList.add('hidden');
})

//+++++++++ main functions +++++++++++++++
function openModal(evt){
	var clicked=evt.target; //find out which button was clicked
	modal.classList.remove('hidden'); //remove the class hidden from modal
	modalImg.src=evt.target.getAttribute('data-src'); //replace spacer.gif with the value of the attribute data-src of the specific button
};


function closePanel(){
	checkoutPanel.classList.remove('open');//remove the class open:closes the check out panel
}
function addToCart(){
	number.style.display="block"; // show the red circle and update the number of items
	itemsNum++;//increase of 1 the value of the varianle itemsNum
	number.innerHTML=itemsNum; //show the number in the red circle
	moving(); //run the function moving
}

function moving(){
		var daddy=event.target.parentElement;//find the parent element (article.myPic)
		//clone the parent element in the shopping list. True means include all the descendent
		var myAddition=listContainer.appendChild(daddy.cloneNode(true));
		var myRemove=myAddition.getElementsByTagName('button'); //select all buttons inside the cloned element
		var extraP=myAddition.querySelector('p');//select the first <p> in the cloned element
		
		myAddition.removeChild(myRemove[0]);//remove the first child of the cloned element
		myAddition.removeChild(myRemove[0]);//remove the first child of the cloned element again (it was the second before)
		myAddition.removeChild(extraP);//remove the first <p> of the cloned element
		
		var itemPrice=myAddition.children[2].textContent; //get the content of .price 
		var priceNum=parseFloat(itemPrice); //convert it into a number
		var itemTax=Math.round(priceNum * 6/100); //calculate the tax, based on 7.75% California tax rate
		var totalTax=itemTax + priceNum;// calculate item total price, including taxes

		totalSubtotal+=priceNum;//update totalSubtotal by adding the new priceNum
		totalTaxes+=itemTax;//update totalTaxes by adding the new priceNum
		totalPrice+=totalTax;//update totalPrice by adding the new priceNum

		//display the calculated prices in the correct fields
		subtotal.innerHTML="$"+totalSubtotal;
		taxes.innerHTML="$"+totalTaxes;
		total.innerHTML="$"+totalPrice;
		calories.innterHTML=""+totalCalories
	}
