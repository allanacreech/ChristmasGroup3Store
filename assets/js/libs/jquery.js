var searchTerm;
var searched; 
var indexCounter = 0;

// On enter button press
$(document).keypress(function(e) {
	if(e.which == 13) {
		// Trims the search term
		searchTerm = $('.search').val().trim()
		// Sends term to local storage
		localStorage.setItem("searchTerm", searchTerm)
		// Redirects
		if (window.location.href = "index.html") {
			
			window.location.replace("search.html");
		}


// Heres the bug
else if (window.location.href = "search.html") {
	window.location.replace("search.html");
	
}
 // working 

}
});
// Pulls from storage
var searched = localStorage.getItem("searchTerm")
// Fills in the search bar
$("#top").attr("value",searched)
// Assigns ajax variables, pulls from local storage
var gift = searched
var apiKey = '93x6nkekfs4k9xvfnh6wpan4'
var queryURL = 'http://api.walmartlabs.com/v1/search?apiKey=' + apiKey + '&numItems=15&query=' + gift




$.ajax({url: queryURL, method: 'GET', dataType:"jsonp"})
.done(function(response){
	var results = response




// Loops through the 10 search results and pulls the images 
for(var i=0; i < results.items.length; i++) {



	$('#pics').append('<div class="row results"><div class="col-md-4"> <a class="example-image-link" href="'+ results.items[i].largeImage + '" data-lightbox="example-set" data-title="'+ results.items[i].name + '"><img class="search-img" src="' + results.items[i].mediumImage + ' + " alt="" height="150px"/></a></div> <div class="<col-md-7></col-md-6> search-info text-center container-fluid "><div class="right-results"> <p class="search-title">  '+ results.items[i].name +'</p><button class="btn my-cart-btn"  data-id="' + results.items[i].itemId +'" data-name="'+ results.items[i].name  + '" data-summary="'+ results.items[i].shortDescription +'" data-price="10" data-quantity="1" data-image="'+ results.items[i].thumbnailImage  +'">Add to List</button></div></div></div>')



}

$('.my-cart-btn').myCart({
      classCartIcon: 'my-cart-icon',
      classCartBadge: 'my-cart-badge',
      classProductQuantity: 'my-product-quantity',
      classProductRemove: 'my-product-remove',
      classCheckoutCart: 'my-cart-checkout',
      affixCartIcon: true,
      showCheckoutModal: true,
      clickOnAddToCart: function($addTocart){
        goToCartIcon($addTocart);
      },
      clickOnCartIcon: function($cartIcon, products, totalPrice, totalQuantity) {
        console.log("cart icon clicked", $cartIcon, products, totalPrice, totalQuantity);
      },
      checkoutCart: function(products, totalPrice, totalQuantity) {
        console.log("checking out", products, totalPrice, totalQuantity);
      },
      getDiscountPrice: function(products, totalPrice, totalQuantity) {
        console.log("calculating discount", products, totalPrice, totalQuantity);
        return totalPrice * 0.5;
      }
    });


});


 

var goToCartIcon = function($addTocartBtn){
      var $cartIcon = $(".my-cart-icon");
      var $image = $('<img width="30px" height="30px" src="' + $addTocartBtn.data("image") + '"/>').css({"position": "fixed", "z-index": "999"});
      $addTocartBtn.prepend($image);
      var position = $cartIcon.position();
      $image.animate({
        top: position.top,
        left: position.left
      }, 500 , "linear", function() {
        $image.remove();
      });
    }





