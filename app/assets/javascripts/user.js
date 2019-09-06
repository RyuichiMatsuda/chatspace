$(function () {
  
  function appendUserToSearch(user) {
    var html =
      `<div class="chat-group-user clearfix">
          <p class="chat-group-user__name">${ user.name}</p>
          <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${ user.id}" data-user-name=${user.name}>追加</a>
      </div>`
    search_list.append(html);
    return html;
  }
  
  $(function () {
    // ここでテキスト打つと発火するようにしている
    $("#user-search-field").on("keyup", function () {
      var input = $("#user-search-field").val();


      $.ajax({
        type: 'GET',
        url: '/users',
        data: { keyword: input },
        dataType: 'json'
      })
        .done(function () {
          $("#user-search-field").empty();
          if (user.length !== 0) {
            user.forEach(function (user) {
              appendUserToSearch(user);
            });
          }
          else {
            appendNoUser("一致するユーザーはいません");
          }
        })
        .fail(function () {
        alert('ユーザー検索に失敗しました');
      })
    })
  });
});
