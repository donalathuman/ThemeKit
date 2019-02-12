// Put your applicaiton javascript here
;
(function($) {


  /*New scripts from July 2017
  ------------------------------------------------------------------------------------------*/

  /* Set mega-menu inner list columns
  -------------------------------------*/
  function megaMenuInnerCols() {
    if (($(window).width() > 991)) {
      $('.mega-menu').each(function() {
        var thisMegaMenu = $(this);
        var innerlistCount = thisMegaMenu.find('.inner .listings .inner-list').length; // Get number of inner lists
        thisMegaMenu.find('.inner .listings').addClass('col' + innerlistCount); // Set number of columns
      });
    } // end if
  }
  megaMenuInnerCols();

  // Sets the right size for the multi-pane mega menu.
  function multiPaneMegaMenu(){
    if (($(window).width() > 991)) {
      $('.mega-menu-multi-pane').each(function(){
        let firstListHeight = $(this).find('.inner-list:first-of-type ul:first-of-type').height();
        let secondListHeight = $(this).find('.inner-list:nth-of-type(2) ul:first-of-type').height();
        // Extra padding from the taller column
        if (firstListHeight > secondListHeight){
          let extraPadding = parseInt($(this).find('.inner-list:first-of-type ul:first-of-type').css("padding-bottom"));
          $(this).find('.inner-list:nth-of-type(2) ul:first-of-type').css('height', firstListHeight + extraPadding + 1 + 'px');
        } else{
          let extraPadding = parseInt($(this).find('.inner-list:nth-of-type(2) ul:first-of-type').css("padding-bottom"));
          $(this).find('.inner-list:nth-of-type(1) ul:first-of-type').css('height', secondListHeight + extraPadding + 1 + 'px');
        }
      });
    } else {
      // Move the shop by shape and shop by style sections of the nav next to each other on mobile.
      $("h3.icon-list-title:first").appendTo('.mega-menu.mega-menu-multi-pane .inner .listings .inner-list:nth-of-type(2)');
      $("ul.icon-list:first").appendTo('.mega-menu.mega-menu-multi-pane .inner .listings .inner-list:nth-of-type(2)');
      $("ul.continued-list li").appendTo('ul.split-list');
    }
  };
  multiPaneMegaMenu();

  /*mega-menu
  -------------------------------------*/
  function megaMenuDesktop() {
    if (window.innerWidth > 991) {

      // Position mega menu on load/scroll
      function positionMegaMenu() {
        var headerHeight = $('header').height();
        var filterBarHeight = $('header #filter').height();
        var searchfilterBarHeight = $('header #search-filter').height();
        $('.mega-menu').css('top', headerHeight - filterBarHeight - searchfilterBarHeight);
      }
      positionMegaMenu();
      $(window).scroll(function() {
        positionMegaMenu();
      });

      // Hover mega menu
      $('header .header-bottom .inner nav > ul > li').hover(function() {
          positionMegaMenu();
          $(this).children('.mega-menu').addClass('active');
          $(this).children('.dropdown').addClass('active');
          $(this).children('a').addClass('active-link');
        },
        function() {
          $(this).children('.mega-menu').removeClass('active');
          $(this).children('.dropdown').removeClass('active');
          $(this).children('a').removeClass('active-link');
        }
      );
    } // end if
  }
  megaMenuDesktop();
  //$(window).scroll ( function() {	megaMenuDesktop(); });
  $(window).resize(function() {
    megaMenuDesktop();
  });






  /*header-scroll
  -------------------------------------*/
  function headerScrolled() {

    if (window.innerWidth > 991) {

      if ($(window).scrollTop() > 10) {
        $('header .header-top').slideUp(200);
      } else {
        $('header .header-top').slideDown(200);
      }

    } else {
      $('header .header-top').show(); // Always show on mobile
    }
  }
  headerScrolled();
  $(window).on('scroll resize', function() {
    headerScrolled();
  });



  /*mobile menu
  -------------------------------------*/
  function mobileMenu() {
    if (window.innerWidth <= 991) {

      // Set scrollable containers' heights
      var windowHeight = $(window).innerHeight();
      var mobileMenuTopHeight = $('header .header-bottom .mobile-menu-top').outerHeight();
      var mobileMenuSubheadingHeight = $('.mega-menu .container .row .inner h2').outerHeight();
      $('header .header-bottom > .inner').css('height', windowHeight - mobileMenuTopHeight);
      $('header .header-bottom .inner nav > ul > li .mega-menu').find('.listings').css('height', windowHeight - mobileMenuTopHeight - mobileMenuSubheadingHeight);

      // Open mobile menu
      $('.mobile-menu-button').off().click(function() { // Register one click only
        $(this).toggleClass('active');
        $('.mobile-menu-underlay').toggleClass('active');
        $('header .header-bottom').toggleClass('active');
      });

      // Close mobile menu
      $('.mobile-menu-underlay').off().click(function() { // Register one click only
        $(this).toggleClass('active');
        $('.mobile-menu-button').toggleClass('active');
        $('header .header-bottom').toggleClass('active');
      });

      // Go to 2nd tier
      $('header .header-bottom .inner nav > ul > li > a').click(function() {
        if ($(this).siblings('.mega-menu').size() > 0) { // if top item has mega-menu
          $(this).siblings('.mega-menu').addClass('active');
          $('header .header-bottom .inner').addClass('active');
        }
      });

      // Return to 1st tier
      $('.mega-menu .inner h2').click(function() {
        $('.mega-menu').removeClass('active');
        $('header .header-bottom .inner').removeClass('active');
      });

    } else { // Reset these sections to natural height for desktop
      $('header .header-bottom > .inner').css('height', 'auto');
      $('header .header-bottom .inner nav > ul > li .mega-menu').css('height', 'auto');
    } // end if/else
  }
  mobileMenu();
  $(window).resize(function() {
    mobileMenu();
  });







  function aboutSection() {

        //Open Overlay
        $('.overlay-trigger').click( function() {
          $(this).siblings('.team-member-popup-overlay').addClass('active');
        });
        // Close Overlay
        $('.team-member-overlay-close').click( function() {
          $(this).closest('.team-member-popup-overlay').removeClass('active');
        });

        // Keep inner div open if user clicks on it
        $('.team-member-popup-inner').click( function(e) {
          e.stopPropagation();
        });

        // Close if user clicks outside of inner div
        $('.team-member-popup-overlay').click( function(e) {
          $(this).removeClass('active');
        });

    }
    aboutSection();



















    /* Create dynamic cart panel accessible from cart button
    -------------------------------------*/

    // Global AJAX call function
  	function ajaxCall(method, url, callback) {
  		var xmlhttp = new XMLHttpRequest();
  		var response = '';
  		xmlhttp.onreadystatechange = function() {
  			if (xmlhttp.readyState == XMLHttpRequest.DONE) { // XMLHttpRequest.DONE == 4
  				if (xmlhttp.status == 200) {
  					response = this.responseText;
  					xmlhttp.onload = function() {
  						callback(response);
  					};
  				} else if (xmlhttp.status == 400) {
  					console.warn('There was an error 400 on the AJAX call');
  				} else {
  					console.warn('something else other than 200 was returned');
  				}
  			}
  		};

  		xmlhttp.open(method, url, true);
  		xmlhttp.send();
  	}



    var cartItemCount = 0;

    // AJAX Callback function
    function getCartData(data) {
      // Parse AJAX data
      const parsedResponse = JSON.parse(data);
      // Get cart data
      cartItemCount = parsedResponse.item_count;
      var cartItems = parsedResponse.items;
      var cartTotalPrice = parsedResponse.total_price.toString();
      //console.log(cartTotalPrice);
      var currencySymbol = '€';

      // Convert Int to Money
      function convertToMoney(priceInt) {
        priceInt = priceInt.toString(); // int to string
        priceInt = priceInt.substring(0,priceInt.length-2)+"."+priceInt.substring(priceInt.length-2); // seperate decimal figures
        var parts = priceInt.split("."); // split at decimal point
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ","); // commify main int
        return currencySymbol + parts.join("."); // rejoin decimal figures
      }

      //console.log('ajax call');

      // Clear current cart data
      $('#inline-cart .main ul').children('li').remove();
      $('#inline-cart .main .items').children('p.cart-empty').remove();
      $('#inline-cart .main .bottom').show();

      // If cart has items
      if (cartItemCount > 0) {

        // Get cart item data
        var i;
        for (i = 0; i < cartItems.length; i++) {

          var thisItemVariantId = cartItems[i].variant_id;
          var thisItemTitle = cartItems[i].title;
          var thisItemPrice = cartItems[i].price;
          var thisItemQuantity = cartItems[i].quantity;
          var thisItemUrl = cartItems[i].url;
          var thisItemImageUrl = cartItems[i].image;

          // Mark as current
          $('#inline-cart .main ul').append('<li class="current"></li>');
          // Add image aslink
          $('#inline-cart .main ul li.current').append('<a href="' + thisItemUrl + '"><img src="' + thisItemImageUrl + '" /></a>');
          // Add title
          $('#inline-cart .main ul li.current').append('<a href="' + thisItemUrl + '"><h4>' + thisItemTitle + '</h4></a>');
          // Add price
          $('#inline-cart .main ul li.current').append('<span class="item-price">' + convertToMoney(thisItemPrice) + '</span>');
          // Add quantity adjust
          $('#inline-cart .main ul li.current').append('<div class="quantity-adjust">' + '<button type="button" class="quantity-adjust-minus">–</button>' + '<input type="number" value="' + thisItemQuantity + '" data-variant-id="' + thisItemVariantId + '">' + '<button type="button" class="quantity-adjust-plus">+</button>' + '</div>');
          // Add remove option
          $('#inline-cart .main ul li.current').append('<a href="#" class="eliminate-cart-item">Remove</a>');
          // Unmark as current
          $('#inline-cart .main ul li.current').removeClass('current');

        } // end for loop

        // Update cart total
        cartTotalPrice = convertToMoney(cartTotalPrice);
        $('.cart-total-value').text(cartTotalPrice);

      } // end if cart has items

      // ELse if cart is empty
      else {
        console.log('cart empty');
        // Mark as current
        $('#inline-cart .main .items').append('<p class="cart-empty">Your bag is empty.</p>');
        // Hide cart bottom
        $('#inline-cart .main .bottom').hide();
      }

      // When fully loaded, display contents
      $('#inline-cart').addClass('ready');
    }


    // Open inline-cart
    $('header .inline-cart-btn').click( function(e) {
      e.preventDefault();
      // Open inline-cart
      $('#inline-cart').toggleClass('active');
      $('body').addClass('no-scroll');
      // Call for cart data
      ajaxCall('GET', '/cart.js', getCartData);
    });

    // Close inine-cart
    $('#inline-cart .underlay, .close').click( function() {
      $('#inline-cart').removeClass('active ready');
      $('body').removeClass('no-scroll');
    });

    // Change item quantity
    $('#inline-cart .main ul').on('click', 'li .quantity-adjust button', function() {

      var thisButton = $(this);
      var thisCounter = thisButton.siblings('input');
      var thisCounterVal = parseInt(thisCounter.val());
      var thisCounterItemVariantID = thisCounter.attr('data-variant-id');
      //console.log(thisCounterItemVariantID);
      if (thisButton.hasClass('quantity-adjust-minus') && thisCounterVal > 1) {
        thisCounterVal = thisCounterVal - 1;
        thisCounter.val(thisCounterVal);
      } else if (thisButton.hasClass('quantity-adjust-plus')) {
        thisCounterVal = thisCounterVal + 1;
        thisCounter.val(thisCounterVal);
      }

      // Temporarily disable interaction
      $('#inline-cart').addClass('disabled');

      var data = { id: thisCounterItemVariantID, quantity: thisCounterVal };
      var url = '/cart.js';

      // Update cart
      // jQuery.ajax({
      //   url: url,
      //   type: 'POST',
      //   data: data,
      //   dataType: 'JSON',
      //   // function(data, status) {
      //   //   console.log(`${data} and status is ${status}`);
      //   // },
      //   success: function() {
      //     console.log(cartItemCount);
      //     fetch(url).then( function() {
      //       console.log(cartItemCount);
      //       ajaxCall('GET', '/cart.js', getCartData); // Call updated data
      //       $('#inline-cart').removeClass('disabled'); // Re-enable interaction
      //
      //     })
      //   }
      // });

      jQuery.post(
        '/cart/change.js', { id: thisCounterItemVariantID, quantity: thisCounterVal },
        null,
        'json'
      ).then(function() {
        ajaxCall('GET', '/cart.js', getCartData); // Call updated data
        console.log(cartItemCount);
      }).then(function() {
        console.log(cartItemCount);
        $('#inline-cart').removeClass('disabled'); // Re-enable interaction
        window.setTimeout(function() {
          $('header .cart-count').text('Cart: ' + cartItemCount); // Update cart counter in header
        }, 1000); // Allow for data return
      });


    }); // end quantity-adjust click

    // Remove item
    $('#inline-cart .main ul').on('click', 'li .eliminate-cart-item', function(e) {

      e.preventDefault();
      var thisButton = $(this);
      var thisCounter = thisButton.siblings('.quantity-adjust').children('input');
      var thisCounterVal = parseInt(thisCounter.val());
      var thisCounterItemVariantID = thisCounter.attr('data-variant-id');

      // Temporarily disable interaction
      $('#inline-cart').addClass('disabled');

      // Update cart
      jQuery.post(
        '/cart/change.js', { id: thisCounterItemVariantID, quantity: 0 },
        null,
        'json'
      ).then(function() {
        ajaxCall('GET', '/cart.js', getCartData); // Call updated data
        console.log(cartItemCount);
      }).then(function() {
        console.log(cartItemCount);
        $('#inline-cart').removeClass('disabled'); // Re-enable interaction
        window.setTimeout(function() {
          $('header .cart-count').text('Cart: ' + cartItemCount); // Update cart counter in header
        }, 700); // Allow for data return
      });

    }); // end remove item click










    // Global add-to-cart button (product, collections)
    $('.btn-add-to-cart').on('click', function(e) {

      e.preventDefault();
      //var thisButton = $(this);
      var thisItemVariantID = $(this).attr('data-variant-id');

      // Update cart
      jQuery.post(
        '/cart/add.js', { id: thisItemVariantID, quantity: 1 },
        null,
        'json'
      ).then(function() {
        ajaxCall('GET', '/cart.js', getCartData); // Call updated data
      }).then(function() {
        //$('#inline-cart').removeClass('disabled'); // Re-enable interaction
        window.setTimeout(function() {
          $('header .cart-count').text('Cart: ' + cartItemCount); // Update cart counter in header
          // Open inline-cart
          $('#inline-cart').toggleClass('active');
          $('body').addClass('no-scroll');
        }, 700); // Allow for data return

        // var xhr = new XMLHttpRequest(),
        //     method = "GET",
        //     url = "/cart.js";
        //
        // xhr.open(method, url, true);
        // xhr.onreadystatechange = function () {
        //   if(xhr.readyState === 4 && xhr.status === 200) {
        //     console.log(xhr.responseText);
        //   }
        // };
        // xhr.send();


        // e.preventDefault();
        // // Open inline-cart
        // $('#inline-cart').toggleClass('active');
        // $('body').addClass('no-scroll');
        // // Call for cart data
        // ajaxCall('GET', '/cart.js', getCartData);

      });

    });














    // var name = "codemzy";
    // $.get('https://www.chupi.com/', function(response) {
    // console.log(response);
    // });

    // var name = "codemzy";
    // var url = "http://anyorigin.com/go?url=" + encodeURIComponent("https://www.chupi.com/");
    // $.get(url, function(response) {
    //   console.log('thing');
    //   console.log(response);
    // });


    // $.ajax({
    //      url: "https://www.chupi.com/",
    //      dataType: 'text',
    //      success: function(data) {
    //           var elements = $("<div>").html(data)[0].getElementsByTagName("ul")[0].getElementsByTagName("li");
    //           for(var i = 0; i < elements.length; i++) {
    //                var theText = elements[i].firstChild.nodeValue;
    //                // Do something here
    //           }
    //      }
    // });


   // var ExternalURL = "www.dummysite.com"; // This address must not contain any leading "http://"
   // var ContentLocationInDOM = "#someNode > .childNode"; // If you’re trying to get sub-content from the page, specify the "CSS style" jQuery syntax here, otherwise set this to "null"
   //
   // $(document).ready(loadContent);
   // function loadContent()
   // {
   //    var QueryURL = "http://anyorigin.com/get?url=" + ExternalURL + "&callback=?";
   //    $.getJSON(QueryURL, function(data){
   //       if (data && data != null && typeof data == "object" && data.contents && data.contents != null && typeof data.contents == "string")
   //       {
   //          data = data.contents.replace(/<script[^>]*>[sS]*?</script>/gi, ");
   //          if (data.length > 0)
   //          {
   //             if (ContentLocationInDOM && ContentLocationInDOM != null && ContentLocationInDOM != "null")
   //             {
   //                //$(‘#queryResultContainer’).html($(ContentLocationInDOM, data));
   //                console.log('if');
   //             }
   //             else
   //             {
   //                //$(‘#queryResultContainer’).html(data);
   //                console.log('else');
   //             }
   //          }
   //       }
   //    });
   // }


























  // Function to lazyload the images in the navigation on hover of the corresponding nav item.
//   function navLazyLoad() {
//     var navLinks = document.querySelectorAll('nav>ul>li>a');
//     for (i = 0; i < navLinks.length; i++) {
//       navLinks[i].addEventListener('mouseover', function() {
//         fetchLazySrc(this.nextElementSibling.querySelector('span.mega-menu-image'));
//       });
//     }
//   }
//   navLazyLoad();
//

})(jQuery);

//
// /* --- LAZY LOAD FUNCTIONS --- */
// /* --- defined after jQuery close so they can be used globally --- */
//
// // This function determines if the element targeted is in the viewport.
// // There's an additional allowance ("gate") that essentially extends the screen vertically.
// // i.e. if an element is 200px below the fold, but the gate is 300, it will be considered "on screen".
// function isOnScreen(el, gate) {
//   // This object contains the top, bottom, left and right values of
//   // an element RELATIVE TO THE VIEWPORT.
//   var elRect = el.getBoundingClientRect();
//   // If the element bottom is less than the bottom of the screen (plus gate) and the top is below (a greater value)
//   // than the window top (minus gate, e.g. -200)
//   if (elRect.bottom < window.innerHeight + gate && elRect.top > 0 - gate) {
//     return true;
//   } else {
//     return false;
//   }
// }
//
// // This function takes a data attribute called "data-lazy-src" which is the true source of the image/background image
// function fetchLazySrc(el) {
//   var lazySrc = el.getAttribute('data-lazy-src');
//   var lazyMobileSrc = el.getAttribute('data-lazy-mobile-src')
//   // Only run if the lazySrc tag is there.
//   if (lazySrc.length > 0) {
//     // If el is an img tag and the source isn't already set
//     if (el.tagName === 'IMG' && !el.src.includes(lazySrc)) {
//       // Use the mobile lazy source if it's mobile screen.
//       if (window.innerWidth < 450){
//         if (lazyMobileSrc.length > 0){
//           el.src = lazyMobileSrc;
//         } else {
//           el.src = lazySrc;
//         }
//       } else {
//         el.src = lazySrc;
//       }
//       // If el is a div tag and doesn't have source set, set background image src.
//     } else if (el.tagName !== 'IMG' && !el.style.backgroundImage.includes(lazySrc)) {
//       if (window.innerWidth < 450){
//         el.style.backgroundImage = 'url(' + lazyMobileSrc + ')';
//       } else {
//         el.style.backgroundImage = 'url(' + lazySrc + ')';
//       }
//
//     }
//   }
// }
//
// // This function uses isOnScreen() and fetchLazySrc() and takes a jQuery-esque target.
// // e.g. lazyLoad('img') will run the lazyLoad on all img tags.
// function lazyLoad(tagname) {
//   var allItems = document.querySelectorAll(tagname);
//   var smallItemSize = (window.innerWidth / 4);
//   var gate = (window.innerHeight * 0.4);
//
//   for (i = 0; i < allItems.length; i++) {
//     if (isOnScreen(allItems[i], gate)) {
//       fetchLazySrc(allItems[i]);
//     } else if (allItems[i].offsetWidth > smallItemSize && window.innerWidth > 991) {
//       fetchLazySrc(allItems[i]);
//     }
//   }
// }
//
// // Function to set cookie
// function setCookie(name, value, exdays) {
//     var d = new Date();
//     d.setTime(d.getTime() + (exdays*24*60*60*1000));
//     var expires = "expires="+ d.toUTCString();
//     document.cookie = name + "=" + value + ";" + expires + ";path=/";
// }

// Function to return the value of a named cookie
function getCookie(name) {
    var name = name + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

// General Ajax Call Function, ref: https://medium.com/front-end-hacking/ajax-async-callback-promise-e98f8074ebd7
function ajaxCall(method, url, callback) {
  var xmlhttp = new XMLHttpRequest();
  var response = '';
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == XMLHttpRequest.DONE) { // XMLHttpRequest.DONE == 4
      if (xmlhttp.status == 200) {
        response = this.responseText;
        xmlhttp.onload = function() {
          callback(response);
        };
      } else if (xmlhttp.status == 400) {
        console.warn('There was an error 400 on the AJAX call');
      } else {
        console.warn('something else other than 200 was returned');
      }
    }
  };

  xmlhttp.open(method, url, true);
  xmlhttp.send();
}
