;(function($) {

  $.fn.extend({
    modal: function(options) {
      var defaults = {
        overlayClass: 'overlay'
      }

      options = $.extend(defaults, options);

      var overlay = document.createElement('div');
          overlay.className = options.overlayClass;
          overlay.setAttribute('tabindex', '-1'),
          overlay.setAttribute('data-toggle', 'close');

      return this.each(function() {

        var o = options;

        $(this).click(function(e) {
          e.preventDefault();
          var modal_id = $(this).attr('href');
          $('body').append(overlay);

          // Open Modal
          show_modal(modal_id, overlay);

          // Close modal
          $('[data-toggle=close]').click(function() {
            close_modal(modal_id, overlay);
          });

        });
      });

      function show_modal(modal_id, overlay) {
        $(modal_id).removeClass('_is-closed')
        $(modal_id).attr('aria-hidden', 'false');
        $(overlay).fadeIn(200);
      }

      function close_modal(modal_id, overlay) {
        $(overlay).fadeOut(200, function() {
          $(this).remove();
        });
        $(modal_id).addClass('_is-closed');
        $(modal_id).attr('aria-hidden', 'true');
      }
    }
  });
})(jQuery);


var ready = function() {
  // Mobile Navigation Menu Toggle
  $('.nav-trigger').click(function(event) {
    event.preventDefault();
    var base = $(this),
       // Keep html elements within trigger
       cache = base.children(),
       // Swap text
       txt = base.hasClass('_is-open') ? 'Menu' : 'Close';

    base.toggleClass('_is-open').text(txt).append(cache);

    if (base.hasClass('_is-open')) {
      $('.nav-header').slideDown();
    } else {
      $('.nav-header').slideUp();
    }
  });

  // If nav triggered then expanded beyond mobile size,
  // must show nav
  window.addEventListener('resize', function() {
    if (window.innerWidth >= 900) {
      $('nav-header').show();
    }
  });

  // Collapsable feature
  $('[data-toggle=collapse]').each(function() {
    var collapse_id = $(this).attr('href');

    $(this).click(function(e) {
      e.preventDefault();

      var base = $(this);

      if ($(collapse_id).hasClass('_is-closed')) {
        base.toggleClass('_is-open');
        // $(collapse_id).removeClass('_is-closed');
        $(collapse_id).slideDown(250, function() {
          $(this).removeClass('_is-closed');
        });

      } else {
        base.toggleClass('_is-open');
        // $(collapse_id).addClass('_is-closed');
        $(collapse_id).slideUp(250, function() {
          $(this).addClass('_is-closed');
        });
      }
    });
  });

  $('.js-target-blank a').each(function() {
    var a = new RegExp('/' + window.location + '/');
    if(!a.test(this.href)) {
      $(this).attr('target', '_blank');
    }
  });

  // Modal fire
  $('[data-toggle=modal]').modal();
}

$(document).ready(ready);
