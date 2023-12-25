let tenRegax = /^[a-zA-Z\s,: ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý]+$/;
let tenRegax2 = /^[a-zA-Z0-9\s ' .ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý]*$/;
let namRegax = /^[0-9]+$/;
// Nhân viên, tài khoản
var btnSubmit = document.getElementById('btn-submit');

function validateID() {
    var idInput = document.getElementById('idNhanVien').value;
    var idNVError = document.getElementById('idNVError');
    var idNVRegex = /^[a-zA-Z0-9\s]+$/;
    if (!idNVRegex.test(idInput)) {
        idNVError.textContent = 'Mã nhân viên không hợp lệ';
        btnSubmit.disabled = true;
    } else {
        idNVError.textContent = '';
        btnSubmit.disabled = false;
    }
}
function validateHoTen() {
    var hoTenInput = document.getElementById('hoTenInput').value;
    var hoTenError = document.getElementById('hoTenError');
    var hoTenRegex = /^[a-zA-Z\s ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý]+$/;

    if (!hoTenRegex.test(hoTenInput)) {
        hoTenError.textContent = 'Họ tên không hợp lệ';
        btnSubmit.disabled = true;
    } else {
        hoTenError.textContent = '';
        btnSubmit.disabled = false;
    }
}
function validateEmail() {
    var emailInput = document.getElementById('email').value;
    var emailError = document.getElementById('emailError');
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(emailInput)) {
        emailError.textContent = 'Email không hợp lệ';
        btnSubmit.disabled = true;
    } else {
        emailError.textContent = '';
        btnSubmit.disabled = false;
    }
}

function validateDienThoai() {
    var dienThoaiInput = document.getElementById('dienThoai').value;
    var dienThoaiError = document.getElementById('dienThoaiError');
    var dienThoaiRegex = /^(0[2-9]|1[0-9])[0-9]{8}$/;

    if (!dienThoaiRegex.test(dienThoaiInput)) {
        dienThoaiError.textContent = 'Số điện thoại không hợp lệ';
        btnSubmit.disabled = true;
    } else {
        dienThoaiError.textContent = '';
        btnSubmit.disabled = false;
    }
}
function validateDiaChi() {
    var diaChiInput = document.getElementById('diaChi').value;
    var diaChiError = document.getElementById('diaChiError'); 
    var diaChiRegex = /^[a-zA-Z0-9\s,.-ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý]*$/;
    if (!diaChiRegex.test(diaChiInput)) {
        diaChiError.textContent = 'Địa chỉ không hợp lệ';
        btnSubmit.disabled = true;
    } else {
        diaChiError.textContent = '';
        btnSubmit.disabled = false;
    }
}

let matKhauInputValue;
function validateMatKhau() {
    var matKhauInput = document.getElementById('matKhauInput');
    var matKhauError = document.getElementById('matKhauError');
    var btnUpdate = document.getElementById('btn-change-pass');

    matKhauInputValue = matKhauInput.value;

    if (matKhauInputValue.length < 6) {
        matKhauError.textContent = 'Mật khẩu phải có ít nhất 6 ký tự';
        btnUpdate.disabled = true;
    } else if (matKhauInputValue.length > 12) {
        matKhauError.textContent = 'Mật khẩu phải có tối đa 12 ký tự';
        btnUpdate.disabled = true;
    } else {
        matKhauError.textContent = '';
        btnUpdate.disabled = false;
    }
}

function validateComfirmMatKhau() {
    var comfirmMK = document.getElementById('comfirmMK');
    var comfrimError = document.getElementById('comfrimError');
    var btnUpdate = document.getElementById('btn-change-pass');

    if (comfirmMK.value === matKhauInputValue) {
        comfrimError.textContent = '';
        btnUpdate.disabled = false;
    } else {
        comfrimError.textContent = 'Mật khẩu không khớp';
        btnUpdate.disabled = true;
    }
}
// Loại phim + phim
function validateTenLoai() {
    var tenLoai = document.getElementById('tenLoai').value;
    var tenLoaiError = document.getElementById('tenLoaiError');

    if (!tenRegax.test(tenLoai)) {
        tenLoaiError.textContent = 'Tên loại phim không hợp lệ';
        btnSubmit.disabled = true;
    } else {
        tenLoaiError.textContent = '';
        btnSubmit.disabled = false;
    }
}

function validateTenLoaiUDT(idTheLoai) {
    var tenLoaiUDTInput = document.getElementById('tenLoaiUDT-' + idTheLoai).value;
    var tenLoaiErrorUDT = document.getElementById('tenLoaiErrorUDT-' + idTheLoai);
    var btnUpdate = document.getElementById('btn-update-theloai-' + idTheLoai);

    if (!tenRegax.test(tenLoaiUDTInput)) {
        tenLoaiErrorUDT.textContent = 'Tên loại phim không hợp lệ';
        btnUpdate.disabled = true;
    } else {
        tenLoaiErrorUDT.textContent = '';
        btnUpdate.disabled = false;
    }
}

function validateTenPhim(loai){
    var phimInput = document.getElementById('phimInput-' + loai).value;
    var phimError = document.getElementById('phimError-' + loai);

    if (!tenRegax.test(phimInput) || phimInput.length > 255) {
        phimError.textContent = loai+' không hợp lệ';
        btnSubmit.disabled = true;
    } else {
        phimError.textContent = '';
        btnSubmit.disabled = false;
    }
}

function validateMoTa(loai){
    var phimInput = document.getElementById('phimInput-' + loai).value;
    var phimError = document.getElementById('phimError-' + loai);
    var motaRegax = /^[a-zA-Z0-9\s,.;-ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý]*$/;

    if (!motaRegax.test(phimInput) || phimInput.length > 1000) {
        phimError.textContent = loai+' không hợp lệ';
        btnSubmit.disabled = true;
    } else {
        phimError.textContent = '';
        btnSubmit.disabled = false;
    }
}
function validateTenDienVien(loai){
    var phimInput = document.getElementById('phimInput-' + loai).value;
    var phimError = document.getElementById('phimError-' + loai);
    var motaRegax = /^[a-zA-Z0-9\s,.'-ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý]*$/;

    if (!motaRegax.test(phimInput) || phimInput.length > 500) {
        phimError.textContent = loai+' không hợp lệ';
        btnSubmit.disabled = true;
    } else {
        phimError.textContent = '';
        btnSubmit.disabled = false;
    }
}
function validatePhim(loai){
    var phimInput = document.getElementById('phimInput-' + loai).value;
    var phimError = document.getElementById('phimError-' + loai);

    if (!tenRegax2.test(phimInput) || phimInput.length > 255) {
        phimError.textContent = loai+ ' không hợp lệ';
        btnSubmit.disabled = true;
    } else {
        phimError.textContent = '';
        btnSubmit.disabled = false;
    }
}
function validateNamSX(loai) {
    var namInput = document.getElementById('phimInput-' + loai).value;
    var namError = document.getElementById('phimError-' + loai);
    var namRegex = /^[0-9]+$/;

    if (!namRegex.test(namInput) || namInput.length !== 4) {
        namError.textContent = loai + ' không hợp lệ';
        btnSubmit.disabled = true;
    } else {
        namError.textContent = '';
        btnSubmit.disabled = false;
    }
}
// sản phẩm
function validateTenSP(){
    var tenInput = document.getElementById('tenInput').value;
    var tenError = document.getElementById('tenError');

    if (!tenRegax.test(tenInput) || tenInput.length > 255) {
        tenError.textContent = 'Tên sản phẩm không hợp lệ';
        btnSubmit.disabled = true;
    } else {
        tenError.textContent = '';
        btnSubmit.disabled = false;
    }
}

function validateSoLuong() {
    var soLuongInput = document.getElementById('soLuongInput');
    var soLuongError = document.getElementById('soLuongError');
    var soLuongRegex = /^[0-9]+$/;

    if (!soLuongRegex.test(soLuongInput.value)) {
        soLuongError.textContent = 'Số lượng không hợp lệ';
        btnSubmit.disabled = true;
        return;
    }
    var soLuongValue = parseInt(soLuongInput.value);
    if (soLuongValue < 0 || soLuongValue > 10000) {
        soLuongError.textContent = 'Số lượng không được vượt quá 10.000';
        btnSubmit.disabled = true;
    } else {
        soLuongError.textContent = '';
        btnSubmit.disabled = false;
    }
}
function validateGiaSP(input) {
    var giaError = document.getElementById('giaError');
    var giaPhimValue = parseInt(input.value);
    input.value = Math.min(Math.max(giaPhimValue, 0));

    if (input.value.trim() === '') {
        giaError.textContent = 'Giá  không được để trống.';
        btnSubmit.disabled = true; 
    } else if(parseInt(input.value) < 10000){
         giaError.textContent = 'Giá  không được thấp hơn 10.000đ';
        btnSubmit.disabled = true;
    }else if (parseInt(input.value) > 200000) {
        giaError.textContent = 'Giá  không được vượt quá 200.000đ.';
        btnSubmit.disabled = true;
    } else {
        giaError.textContent = '';
        btnSubmit.disabled = false; 
    }
}

// lịch chiếu
function validateGiaPhim(input) {
    var giaPhimError = document.getElementById('error-message');
    var btnUpdate = document.getElementById('btn-showtime');

    var giaPhimValue = parseInt(input.value);
    input.value = Math.min(Math.max(giaPhimValue, 0));

    if (input.value.trim() === '') {
        giaPhimError.textContent = 'Giá phim không được để trống.';
        btnUpdate.disabled = true; 
    } else if(parseInt(input.value) < 50000){
         giaPhimError.textContent = 'Giá phim không được thấp hơn 50.000đ';
        btnUpdate.disabled = true;
    }else if (parseInt(input.value) > 500000) {
        giaPhimError.textContent = 'Giá phim không được vượt quá 500.000đ.';
        btnUpdate.disabled = true;
    } else {
        giaPhimError.textContent = '';
        btnUpdate.disabled = false; 
    }
}
