$(function () {
  function buildMessage(message) {
    var html = `<div class="message">
        <p class="messages__username">
        ${message.user_name}
        </p>
        <p class="messages__post-date">
        ${message.date}
        </p>
        <p class="messages__post-text">
        ${message.content}
        </p>

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
      
      })
      .always(() => {
        $(".form__submit").removeAttr("disabled");
      });
  })
});