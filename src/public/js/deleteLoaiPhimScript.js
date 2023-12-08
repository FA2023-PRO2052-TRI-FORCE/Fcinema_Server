document.addEventListener("DOMContentLoaded",function(){
    var idTheLoai;
    var btnDelLoaiPhim=document.getElementById("btn-del-theloai");        
    var deleteFormLoaiPhim= document.forms["del-theloai-form"];

    $('#delete-the-loai').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget) 
        idTheLoai = button.data('id-the-loai') 
    })
    btnDelLoaiPhim.onclick=function(){
        deleteFormLoaiPhim.action="/quanlyphim/loaiphim/xoa/"+idTheLoai+"?_method=PUT"
        deleteFormLoaiPhim.submit();
    }
})