/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */



// Test / driver code (temporary). Eventually will get this from the server.
// Fake data taken from initial-tweets.json

$(function() {
  const data = [
    {
      user: { name: "Newton", avatars: "https://i.imgur.com/73hZDYK.png", handle: "@SirIsaac" },
      content: { text: "If I have seen further it is by standing on the shoulders of giants" },
      created_at: 1461116232227
    },
    {
      user: { name: "Descartes", avatars: "https://i.imgur.com/nlhLi3I.png", handle: "@rd" },
      content: { text: "Je pense , donc je suis" },
      created_at: 1461113959088
    }
  ];
  renderTweets(data);
});

function daysAgo(ts) {
  return timeago.format(ts)
}

function createTweetElement(tweet) {
  const $article = $(`
    <article>
      <header class="usertweet"> 
        <div class="user">
          <div class="nameandimage">
            <div><img src="${tweet.user.avatars}" alt="avatar"></div>
            <div class="name"></div>
          </div>
          <div class="username"></div>
        </div>
      </header>
      <div class="tweet"></div>
      <footer>
        <span class="days-ago" data-ts="${tweet.created_at}"></span>
        <div class="icons">
          <i class="fa-solid fa-retweet"></i>
          <i class="fa-solid fa-flag"></i>
          <i class="fa-solid fa-heart"></i>
        </div>
      </footer>
    </article>
  `);

  $article.find('.name').text(tweet.user.name);
  $article.find('.username').text(tweet.user.handle);
  $article.find('.tweet').text(tweet.content.text);

  const days = daysAgo(tweet.created_at);
  $article.find('.days-ago').text(`${days}`);

  return $article;
  
}



function renderTweets(tweets) {
  const $container = $('.tweets-container');
  $container.empty();

  tweets.forEach(t => {
    const $tweetEl = createTweetElement(t);
    $container.prepend($tweetEl);
  });
}



// Use AJAX to submit tweet




function loadTweets() {
  $.ajax({
    url: '/api/tweets',
    method: 'GET',
    dataType: 'json'
  }).then(function(tweets) {
    renderTweets(tweets);
  }).catch(function(err) {
    console.error('Failed to load tweets:', err);
  });
}



$(function() {
  
  $('form').on('submit', function(event) {
    event.preventDefault();  // this **must** be first

    const tweetText = $('#tweet-text').val().trim();
    if (!tweetText){
      alert("Please enter your tweeter message!")
      return;
    };

    if (tweetText.length > 140) {
      alert("Your message is too long please only use 140 characters!")
      return;
    }

    $.ajax({
      url: '/api/tweets',
      method: 'POST',
      data: { text: tweetText },
      dataType: 'json'
    })
    .then((newTweet) => {
      $('.tweets-container').prepend(createTweetElement(newTweet));
      $('#tweet-text').val('');
      $('.counter').text(140).removeClass('error');
    })
    .catch((err) => console.error('Error posting tweet:', err));

    return false;  // fallback to further prevent default
  });

  setCharacterCounter();
  loadTweets();  // fetch existing tweets

});