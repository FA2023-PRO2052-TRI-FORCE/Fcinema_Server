document.addEventListener("DOMContentLoaded", function() {
  var idBaner, anh;
  var btnDelBaner = document.getElementById("btn-del-baner");
  var deleteForm = document.forms["del-form-baner"];

  $("#delete-baner").on("show.bs.modal", function(event) {
    var button = $(event.relatedTarget);
    idBaner = button.data("id-baner");
    anh = button.data("anh-url");
  });

  btnDelBaner.onclick = function() {
    var anhInput = document.createElement("input");
    anhInput.type = "hidden";
    anhInput.name = "urlAnh";
    anhInput.value = anh;
    deleteForm.appendChild(anhInput);
    console.log("Anh", anh);
    console.log("ID", idBaner);
    deleteForm.action = "/baner/delete/" + idBaner + "?_method=PUT";
    deleteForm.submit();
  };
});
