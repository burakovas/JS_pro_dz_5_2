function renderCommentsList() {
  $('#commentsList').empty();
  $.get('http://localhost:3000/comments', {}, function(comments) {
    var $ul = $('<ul />');
    comments.forEach(function(item) {
      $ul.append(
        $('<div />', {
          text: "Comment ID : " + item.id
        })
        .append(
          $('<div />', {
            text: "Comment text : " + item.text
          })
        )
        .append(
          $('<button />', { 
            text: 'Approve', //одобрить
            'data-id': item.id,
            id: 'approveButton'
          })
        )
        .append(
          $('<button />', { 
            text: 'Delete', //удалить
            'data-id': item.id,
            id: 'deleteButton'
          })
        )
    );
    });
    $('#commentsList').append($ul);
  }, 'json');
  $('#newComment').empty();

  var $inputdiv = $('<div />');
  $('#newComment').append( "<textarea id = 'inpTextField'> </textarea>");
  $inputdiv.append(
    $('<button />', { 
      text: 'Add', //добавить
      id: 'addButton'
    })
  );
  $('#newComment').append($inputdiv);

}

$(document).ready(function()  {
  renderCommentsList();

  $('#commentsList').on('click', '#deleteButton', function(event) {  // нажатие на кнопку удалить
    $.ajax({
      type: 'DELETE',
      url: 'http://localhost:3000/comments/' + $(this).attr('data-id'),
      success: function() {
        renderCommentsList();
      }
    });
  });
//-----------------------------
  $('#newComment').on('click', '#addButton', function(event) { // нажатие на кнопку добавить
    var newComment = {
      text: $('#inpTextField').val(),
      approved: false
    };
    $.ajax({
      type: 'POST',
      url: 'http://localhost:3000/comments/',
      data: newComment,
      success: function() {
        renderCommentsList();
      }
    });
  });
//-----------------------------
$('#commentsList').on('click', '#approveButton', function(event) { // нажатие на кнопку одобрить

  $.ajax({
    type: 'PATCH',
    url: 'http://localhost:3000/comments/' + $(this).attr('data-id'),
    data: { approved: true },
    success: function() {
      renderCommentsList();
    }
  });
});
//-----------------------------
});

