// handle parallax effect for hero image.
$(window).scroll(function(){
  $('.parallax').each(function(){
    // only put top value if the window scroll has gone beyond the top of the image
    if ($(this).offset().top < $(window).scrollTop()) {
      // Get the num of pixels where image is above the top of the window
      var diff = $(this).offset().top - $(window).scrollTop();
      // Top value of image is set to half the amount scrolled
      // this gives the illusion of the image scrolling slower than the rest of the page
      var half = (diff / 2) + 'px';

      $(this).find('img').css('top', half);
      // start at 100% then subtract
      $(this).find('img').css("opacity", 1 - $(window).scrollTop() / 700); 
    } else {
      $(this).find('img').css('top', '0');
      // set opacity back to 100% if image is at the top
      $(this).find('img').css("opacity", 1);
    }
  });
});