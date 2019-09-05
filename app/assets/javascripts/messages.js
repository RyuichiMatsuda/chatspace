$(function () {
  function buildMessage(message) {
    image = (message.image) ? `<img class= "lower-message__image" src=${message.image} >` : "";
    var html = `<div class="message"></div>
        <p class="messages__username">
        ${message.user_name}
        </p>
        <p class="messages__post-date">
        ${message.date}
        </p>
        <p class="messages__post-text">
        ${message.content}
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
      })
      .fail(function () {
        alert('メッセージを入力してください')
      })
      .always(() => {
        $(".form__submit").removeAttr("disabled");
      });
  })
});