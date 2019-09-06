$(function () {
  
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
