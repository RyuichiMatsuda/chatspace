$(function () {
  function buildMessage(message) {
    var html = `<p class="messages__post-text">
                ${message.content}
                </p>`
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
  })
});