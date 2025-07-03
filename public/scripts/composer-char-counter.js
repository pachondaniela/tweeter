
  $('.tweet-text').on('input', function() {
    const maxLength = 140;
    const currentLength = $(this).val().length;
    const counter = $(this).closest('.new-tweet').find('.counter');
    const remaining = maxLength - currentLength;

    // Update the counter
    counter.text(remaining);

    // Change the color to red if negative
    if (remaining < 0) {
      counter.addClass('error');
    } else {
      counter.removeClass('error');
    }
  });
