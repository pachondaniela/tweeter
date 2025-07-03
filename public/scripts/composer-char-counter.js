$(function () {
  $('.tweet-text').on('input', function() {
    const maxLength = 140;
    const currentLength = $(this).val().length;
    const counter = $(this).closest('.new-tweet').find('.counter');
    const remaining = maxLength - currentLength;

    counter.text(remaining);
    counter.toggleClass('error', remaining < 0);
  });
});
