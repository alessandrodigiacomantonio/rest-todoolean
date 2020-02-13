// ↓ corpo principale dello script ↓
$(document).ready(function() {

  var source = $('#element').html();
  var template = Handlebars.compile(source);
  getToDoList(source, template);
  $(document).on('click', '.delete',
    function() {
      var thisElement = $(this).parent().attr('data-id');
      deleteElementInToDoList(thisElement, source, template);
    })
});

// ↑ corpo principale dello script ↑

function getToDoList(source, template) {
  $('.element').remove();
  $.ajax(
    {
      url: "http://157.230.17.132:3011/todos",
      method: "GET",
      success:
      function(response) {
        for (var elementNumber = 0; elementNumber < response.length; elementNumber++) {
          $('#element_list').append( template(response[elementNumber]) );
        }
      },
      error: function(request, stats, errors) {
        alert('Mhè '+errors);
      },
    }
  );
}

function deleteElementInToDoList(elementId, source, template) {
  $.ajax(
    {
      url: "http://157.230.17.132:3011/todos/"+elementId,
      method: "DELETE",
      success:
      function(response) {
        getToDoList(source, template);
      },
      error: function(request, stats, errors) {
        alert('Mhè '+errors);
      },
    }
  );
}

function createElementInToDoList(elementContent) {
  $.ajax(
    {
      url: "http://157.230.17.132:3011/todos",
      method: "POST",
      data: {
        text: elementContent,
      },
      success:
      function(response) {
        console.log(reponse.response);
      },
      error: function(request, stats, errors) {
        alert('Mhè '+errors);
      },
    }
  );
}

function editElementInToDoList(elementId, source, template) {
  $.ajax(
    {
      url: "http://157.230.17.132:3011/todos/"+elementId,
      method: "PUT",
      data: {
        text: elementContent,
      },
      success:
      function(response) {
        getToDoList(source, template);
      },
      error: function(request, stats, errors) {
        alert('Mhè '+errors);
      },
    }
  );
}
