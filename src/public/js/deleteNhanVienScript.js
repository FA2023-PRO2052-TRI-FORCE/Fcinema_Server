document.addEventListener("DOMContentLoaded",function(){
    var idNhanVien;
    var btnDelNhanVien=document.getElementById("btn-del-nhanvien");        
    var deleteFormNhanVien= document.forms["del-nhanvien-form"];

    $('#delete-nhan-vien').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget) 
        idNhanVien = button.data('id-nhan-vien') 
    })
    btnDelNhanVien.onclick=function(){
        deleteFormNhanVien.action="/nhanvien/luutru/"+idNhanVien+"?_method=PUT"
        deleteFormNhanVien.submit();
    }
})