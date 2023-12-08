document.addEventListener("DOMContentLoaded",function(){
    var idLichChieu;
    var btnDelLC=document.getElementById("btn-del-lichchieu");        
    var deleteFormLichChieu= document.forms["del-lichchieu-form"];

    $('#delete-lich-chieu').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget) 
        idLichChieu = button.data('id-lich-chieu') 
    })
    btnDelLC.onclick=function(){
        deleteFormLichChieu.action="/lichchieu/luutru/"+idLichChieu+"?_method=PUT"
        deleteFormLichChieu.submit();
    }
})