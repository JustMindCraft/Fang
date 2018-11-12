
document.addEventListener('DOMContentLoaded', function() {
  console.log("123");
  
  var elems = document.querySelectorAll('.sidenav');
  M.Sidenav.init(elems);
  var elems = document.querySelectorAll('.parallax');
  M.Parallax.init(elems);
  var elems = document.querySelectorAll('select');
   M.FormSelect.init(elems);
   $('#consult-content').val('');
   M.textareaAutoResize($('#consult-content'));
  
});



 
