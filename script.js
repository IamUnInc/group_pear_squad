$(document).ready(function () {

  fruit.forEach(appendDom);
  priceFlux();
  $('button').on('click', calculateTotalPrice, calculateAveragePrice);
  userTotal();
});

function appendDom(fruit) {
	$(".container").append('<div class="cornucopia ' + fruit.name + '"></div>');
	var $el = $(".container").children().last();
	$el.append('<p>' + fruit.name + '</p>');
  $el.append('<img src="' + fruit.image + '" />');
  $el.append('<button>Buy</button>');
  $el.append('<p>Average Price: $<span class="avgPrice">'+ fruit.average + '</span></p>');
	$el.append('<p class="priceTOT">' + fruit.price + '</p>');
  $el.data('price', 2);
  $el.data('average', 0);
  $el.data('clicks', 0);
  $el.data('totalFruitBought', 0);
}

function FruitCreator(name, image, price, average) {
	this.name = name;
  this.image = image;
	this.price = price;
  this.average = average;
}

var apples = new FruitCreator("apples", 'apple.jpg', 2.00, 0);
var oranges = new FruitCreator("oranges", 'orange.jpg', 2.00, 0);
var bananas = new FruitCreator("bananas", 'banana.jpg', 2.00, 0);
var pears = new FruitCreator("pears", 'pear.jpg', 2.00, 0);

var fruit = [];

fruit.push(apples, oranges, bananas, pears);

function priceFlux(){
  var increase; // declared this outside of the if statement
	for(var i = 0; i < fruit.length; i++) {
      if((fruit[i].price >= .5) && (fruit[i].price <= 9.99)){
			  increase = adjustPrice();
				if(increase === 0){
					increase = adjustPrice();
				}
			} else if(fruit[i].price < .5) {
        // need to do something so it doesn't get below 50 cents and doesn't get about 9.99
        fruit[i].price = .5;
        $('.' + fruit[i].name).data('price', fruit[i].price );

      } else if(fruit[i].price > 9.99) {
        fruit[i].price = 9.99;
        $('.' + fruit[i].name).data('price', fruit[i].price );

      }

      var fruit1 = (fruit[i].price + increase);
      fruit1 = +(fruit1.toFixed(2));
      fruit[i].price = fruit1;

      //console.log($('.' + fruit[i].name));
      $('.' + fruit[i].name).data('price', fruit[i].price );
      $('.' + fruit[i].name).children().last().text(fruit1);
      // $('.' + fruit[i]).data('price', fruit1);

	}//for loop

}//priceFlux

function adjustPrice() {
	var increase = randomNumber(-50, 50);
	increase = (increase * 0.01);
	return +(increase.toFixed(2));
}

function randomNumber(min, max) {
	var num = +((Math.random() * (1 + max - min) + min).toFixed(2));
	return num;
}

var userCash = 100;

function userTotal() {
  $('.totalCash').append('<div><h1>Total Cash: </h1> $<span class="totalUserCash">' + userCash + '</span></div>');
}

function calculateTotalPrice() {
  var price = $(this).parent().data('price');
  // console.log('price: ', price);
  userCash -= price;
  userCash = +(userCash.toFixed(2));
  $('.totalUserCash').text(userCash);
}


function calculateAveragePrice() {
  var average = $(this).parent().data('average');
  console.log('average: ', average);

  var clicks = $(this).parent().data('clicks');
  clicks++;
  $(this).parent().data('clicks', clicks);
  console.log('clicks', clicks);

  var price = $(this).parent().data('price');
  console.log('price: ', price);

  // var totalClicks = $(this).parent().data('clicks', clicks);
  // console.log('totalClicks: ', totalClicks);

  var totalFruitPurchased = $(this).parent().data('totalFruitBought');
  console.log('totalFruitPurchased 0: ', totalFruitPurchased);

  $(this).parent().data('totalFruitBought', totalFruitPurchased);

  var test = $(this).parent().data('totalFruitBought', totalFruitPurchased);

  console.log('totalFruitPurchased 1: ', totalFruitPurchased);
  console.log('test', $(this).parent().data('totalFruitBought', totalFruitPurchased));
  console.log('testy', test);

  totalFruitPurchased += price;
  console.log('totalFruitPurchased 2: ', totalFruitPurchased);

  var total = totalFruitPurchased / clicks;
  console.log('total: ', total);
}


// setInterval(priceFlux, 3000);
