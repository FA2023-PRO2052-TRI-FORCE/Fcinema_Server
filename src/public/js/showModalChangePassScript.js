document.addEventListener('DOMContentLoaded', function () {
    var changePasswordLink = document.querySelector('#changePasswordLink');

    var changePasswordModal = new bootstrap.Modal(document.getElementById('changePasswordModal'));

    changePasswordLink.addEventListener('click', function (event) {
        event.preventDefault();
        var idNhanVien = changePasswordLink.getAttribute('data-id-NhanVien');
        
        document.getElementById('changePasswordForm').setAttribute('data-id-NhanVien', idNhanVien);
        document.getElementById('changePasswordForm').action = "/changePass/" + idNhanVien + "?_method=PUT";
        changePasswordModal.show();
    });
});