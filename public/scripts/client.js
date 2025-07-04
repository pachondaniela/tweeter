/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */



// Test / driver code (temporary). Eventually will get this from the server.
// Fake data taken from initial-tweets.json

function daysAgo(timestamp) {
  const old = new Date(timestamp);
  const now = new Date();
  const msPerDay = 1000 * 60 * 60 * 24;
  return Math.floor((now - old) / msPerDay);
}

$(function() {
  const renderTweets = function(tweets) {
    const $container = $('.tweets-container');
    $container.empty();
   

    tweets.forEach(tweet => {
      // Create article structure
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
            <div class="tweet"></div>
          </header>
          <footer>
            ${daysAgo(tweet.created_at) + " days ago"} <!-- Use timeago.js or custom -->
            <div class="icons">
              <i class="fa-solid fa-retweet"></i>
              <i class="fa-solid fa-flag"></i>
              <i class="fa-solid fa-heart"></i>
            </div>
          </footer>
        </article>
      `);

      // Fill in contents
      $article.find('.name').text(tweet.user.name);
      $article.find('.username').text(tweet.user.handle);
      $article.find('.tweet').text(tweet.content.text);

      // Append to container
      $container.append($article);
    });
  };

  // Fake data; replace with real AJAX call
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
