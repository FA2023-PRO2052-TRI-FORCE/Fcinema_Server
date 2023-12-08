document.addEventListener("DOMContentLoaded", function () {
    var idPhim;
    var btnDelPhim = document.getElementById("btn-del-phim");
    var deleteFormPhim = document.forms["del-phim-form"];

    $('#delete-phim').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget)
        idPhim = button.data('id-phim')
    })
    btnDelPhim.onclick = function () {
        deleteFormPhim.action = "/quanlyphim/phim/xoa/" + idPhim + "?_method=PUT"
        deleteFormPhim.submit();
    }
}) 