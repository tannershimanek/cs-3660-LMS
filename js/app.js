/* 
  --- --- --- ---
  Parallax logic 
  --- --- --- ---
*/
$(window).scroll(function(){
  $('.parallax').each(function(){
    if ($(this).offset().top < $(window).scrollTop()) {
      let diff = $(this).offset().top - $(window).scrollTop();
      let half = (diff / 2) + 'px';
      $(this).find('img').css('top', half);
      $(this).find('img').css("opacity", 1 - $(window).scrollTop() / 700); 
    } else {
      $(this).find('img').css('top', '0');
      $(this).find('img').css("opacity", 1);
    }
  });
});


/* 
  --- --- --- ---
  Popover logic 
  --- --- --- ---
*/
// function popover(item) {
//   const btn = document.querySelector(`#${item}-btn`);
//   const toolTip = document.querySelector(`#${item}-tool-tip`);
//   const popperInstance = Popper.createPopper(btn, toolTip, {
//       modifiers: [
//           {
//           name: 'offset',
//           options: {
//               offset: [0, -150],
//           },
//           },
//       ],
//     });
//   function show() {
//     toolTip.setAttribute('data-show', '');
//     popperInstance.update();
//   }

//   function hide() {
//       toolTip.removeAttribute('data-show');
//   }

//   const showEvents = ['mouseenter', 'focus'];
//   const hideEvents = ['mouseleave', 'blur'];

//   showEvents.forEach((event) => {
//       btn.addEventListener(event, show);
//   });

//   hideEvents.forEach((event) => {
//       btn.addEventListener(event, hide);
//   });
// }



/* 
  --- --- --- ---
  Build popovers 
  --- --- --- ---
*/
const countries = ['us', 'ca', 'mx', 'jp', 'sw', 'w']; // hacky way to build popovers
countries.forEach(el => popover(el));



/* 
  --- --- --- ---
  Toast logic 
  --- --- --- ---
*/
let team = '';
let id = '';

let exampleModal = document.getElementById('exampleModal')
exampleModal.addEventListener('show.bs.modal', function (event) {
    let button = event.relatedTarget;
    let recipient = button.getAttribute('data-bs-whatever');
    let modalBodyInput = exampleModal.querySelector('#team');
    modalBodyInput.innerText = recipient;
    team = recipient;
    id = button.getAttribute('data-bs-id');
});

const toast = $('#liveToast');
const deleteBtn = $('#delete-btn').click(() => {
    // delete element
    $(`#${id}-btn`).detach();
    $(`#${id}-tool-tip`).detach();

    // show toast
    toast.removeClass('hide');
    toast.addClass('show');

    // update val
    $('#team-name-msg').html(`<span>${team}</span>`);
    console.log($('#team-name-msg'));

    // auto close after delay
    setTimeout(() => {
        toast.removeClass('show');
        toast.addClass('hide');
    }, 3000);
});

const closeToast = $("#close-toast").click(() => {
    toast.removeClass('show');
    toast.addClass('hide');
    
});


/*
  --- --- --- ---
  Modal Logic
  --- --- --- ---
*/

