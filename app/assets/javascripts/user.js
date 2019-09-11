$(function () {

  function appendUserToSearch(user) {
    var html =
      `<div class="chat-group-user clearfix">
          <p class="chat-group-user__name">${ user.name}</p>
          <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${ user.id}" data-user-name=${user.name}>追加</a>
      </div>`
    $("#user-search-result").append(html);
    return html;
  }

  function appendUser(name, user_id) {
    var html =
      
      `
      <div class='chat-group-user'>
      <input name='group[user_ids][]' type='hidden' value='${user_id}'>
      <p class='chat-group-user__name'>${name}</p>
      <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</>
      </div>
      `
    $(".js-add-user").append(html);
  }

  function appendNoUser(user) {
    var html =
      `<div class="chat-group-user clearfix">
        <p class="chat-group-user__name">${ user}</p>
      </div>`
    $("#user-search-result").append(html);
  }

  $(function () {
    $("#user-search-field").on("keyup", function () {
      var input = $("#user-search-field").val();

      $.ajax({
        type: 'GET',
        url: '/users',
        data: { keyword: input },
        dataType: 'json'
      })

        .done(function (user) {
          $("#user-search-result").empty();
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
    });

    $(function () {
      $(document).on('click', '.user-search-add', function () {
        var name = $(this).data("user-name");
        var user_id = $(this).data("user-id");
        $(this).parent().remove();
        appendUser(name, user_id);
      });
      
      $(document).on("click", '.js-remove-btn', function () {
        $(this).parent().remove();
      });
    });
  });
});