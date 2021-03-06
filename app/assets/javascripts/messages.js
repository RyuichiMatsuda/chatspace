$(function () {
  function buildMessage(message) {
    var text = message.content ? `${message.content}` : "";
    var image = (message.image_url) ? `<img class= "lower-message__image" src=${message.image_url} >` : "";

    var html = `<div class="message" data-id="${message.id}">
        <p class="messages__username">
        ${message.user_name}
        </p>
        <p class="messages__post-date">
        ${message.created_at}
        </p>
        <p class="messages__post-text">
        ${text}
        </p>
        ${image}
    </div>`
    return html
  }

  $("#new_message").on('submit', function (e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
      .done(function (message) {
        var html = buildMessage(message);
        $('.messages').append(html)
        $('.form__box__textbox').val('');
        $('#message_image').val('');
        $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight }, 'fast');
      })
      .fail(function () {
        alert('メッセージを入力してください')
      })
      .always(() => {
        $(".form__submit").removeAttr("disabled");
      });
  })


  var reloadMessages = function () {
    var url = location.href;
    if (url.match(/\/groups\/\d+\/messages/)) {
      var last_message_id = $('.message:last').data("id");

      $.ajax({
        url: "api/messages",
        type: 'get',
        dataType: 'json',
        data: { id: last_message_id }
      })
        .done(function (messages) {
          var insertHTML = '';

          messages.forEach(function (message) {
            
            insertHTML = buildMessage(message);
            $('.messages').append(insertHTML);
            $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight }, 'fast');
          });
          
        })
        .fail(function () {
          alert('自動更新に失敗しました');
        });
    }
    
  };
  setInterval(reloadMessages, 5000);
});