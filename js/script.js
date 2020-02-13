// ↓ corpo principale dello script ↓
$(document).ready(function() {

  var source = $('#element').html();
  var template = Handlebars.compile(source);
  getToDoList(source, template);

  $(document).on('focus', '.textarea',
  function() {
    var thisElementContent = $(this).val();
    var thisElementId = $(this).parent().attr('data-id');
    $(this).on('blur',
    function(){
      var newElementContent = $(this).val();
      if (thisElementContent != newElementContent) {
        editElementInToDoList(thisElementId, newElementContent, source, template)
      }
    });
  });


  $(document).on('click', '.edit',
  function() {
    $(this).parent().siblings('.textarea').focus();
  });

  $(document).on('focus', '#element-content',
    function(event) {
      $(this).on('keyup', function(event) {
        if(event.keyCode == 13) {
          event.preventDefault();
          $('#create-element').click();
        }
      });
    }
  );

  $(document).on('click', '.delete',
    function() {
      var thisElement = $(this).parents('.element').attr('data-id');
      deleteElementInToDoList(thisElement, source, template);
    });

  $(document).on('click','#create-element',
    function() {
      var elementContent = $('#element-content').val();
      createElementInToDoList(elementContent, source, template);
    });

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
          response[elementNumber].index = elementNumber+2;
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
        $('#element-content').focus();
      },
      error: function(request, stats, errors) {
        alert('Mhè '+errors);
      },
    }
  );
}

function createElementInToDoList(elementContent, source, template) {
  $.ajax(
    {
      url: "http://157.230.17.132:3011/todos",
      method: "POST",
      data: {
        text: elementContent,
      },
      success:
      function(response) {
        getToDoList(source, template);
        $('#element-content').val('');
        $('#element-content').focus();
      },
      error: function(request, stats, errors) {
        alert('Mhè '+errors);
      },
    }
  );
}

function editElementInToDoList(elementId, elementContent, source, template) {
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
