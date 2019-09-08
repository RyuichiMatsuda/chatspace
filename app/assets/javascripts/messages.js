$(function () {
  function buildMessage(message) {
    text = message.text ? `${message.text}` : "";
    image = (message.image) ? `<img class= "lower-message__image" src=${message.image} >` : "";
    var html = `<div class="message data-id="${message.id}"></div>
        <p class="messages__username">
        ${message.user_name}
        </p>
        <p class="messages__post-date">
        ${message.date}
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
      })
      .fail(function () {
        alert('メッセージを入力してください')
      })
      .always(() => {
        $(".form__submit").removeAttr("disabled");
      });
  })
});

var reloadMessages = function () {
  //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
  last_message_id = $('.message:last').data("id");
  $.ajax({
    //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
    url: `api/messages`,
    //ルーティングで設定した通りhttpメソッドをgetに指定
    type: 'get',
    dataType: 'json',
    //dataオプションでリクエストに値を含める
    data: { id: last_message_id }
  })
    .done(function (messages) {
      var insertHTML = '';
      //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
      messages.forEach(function (message) {
        insertHTML = buildHTML(message); 
        $('.message').append(insertHTML);
      //メッセージが入ったHTMLを取得
        
      //メッセージを追加
      })
    })
    .fail(function () {
      console.log('error');
    });
};