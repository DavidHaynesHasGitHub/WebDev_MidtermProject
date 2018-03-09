$('.loginreg').hide();
$('.shopping-cart').hide();
$('#menu').hide();
$(function() {
// Makes sure that the cart and login arent displayed at the same time
  $("#loginregbtn").click(function() {
    if($('.shopping-cart').is(':visible')){
      $('.shopping-cart').hide();
    }
    $(".loginreg").fadeToggle();
  });

  $("#cart").on("click", function() {
    if($('.loginreg').is(':visible')){
      $('.loginreg').hide();
    }
    $(".shopping-cart").fadeToggle();
  });

  //shows or hides the menu/restaurant list as needed
  $(".showRestaurantMenu").on("click", function() {
    $('#restList.container').hide();
    $("#menu").show();
  });

  $("#menu").on("click", '[data-return-toRest]', function() {
    // $("#stupidTemp").replaceWith('{{#menu}} {{> menuTemp}} {{/menu}}');
    console.log('cleared the dom?');
    $('#restList.container').show();
    $("#menu").hide();
  });


  //renders the menu data with handlebars
  function makeTemplateFnFromId(id){
    var source = $(id).html();
    var templateFn = Handlebars.compile(source);
    return templateFn;
  }
  function makePartialWithId(name){
    const source = $('#' + name).html();
    Handlebars.registerPartial(name, source);
  }

  makePartialWithId('menuTemp');
  const menuTemplate = makeTemplateFnFromId('#menuTemplate');

  const renderMenu = function(menuData) {
    var templateHtml = menuTemplate(menuData);
    console.log('this is templatehtml for menu', templateHtml);
    $("#menu").html(templateHtml);
  };

  //renders menu based on the restaurant click
  $("#restlist").on("click", '[data-restaurant-id]', function(event) {
    const restaurantId = $(this).data('restaurantId');
    $('#restList.container').hide();
    $("#menu").show();
    console.log(`/restaurant/${restaurantId}`);
    $.get(`/restaurant/${restaurantId}`, renderMenu);
  });

  //renders the restaurant data with handlebars
  const renderRestaurants = function(restaurants) {
    var source = $("#restaurantTemplate").html();
    var template = Handlebars.compile(source);
    var templateHtml = template(restaurants);
    $("#restlist").html(templateHtml);
  };

  //loads the restaurant data
  const loadRestaurants = function() {
    $.get("/restaurant", renderRestaurants);
  };

  //calls the load restaurant lists
  loadRestaurants();
});
