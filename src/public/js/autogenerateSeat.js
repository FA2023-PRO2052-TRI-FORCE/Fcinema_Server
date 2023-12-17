// Xác định số hàng và số cột
var rows = 4;
var columns = 5;

// Hàm tự động tạo ra ghế
function generateSeatCheckbox(row, col) {
    var seatId = String.fromCharCode(65 + row) + (col + 1);
    var checkboxHtml = `
    <div class="form-check" style="display: inline-block;">
        <input class="form-check-input seat-checkbox" type="checkbox" value="${seatId}" id="${seatId}Checkbox">
        <label class="form-check-label">
            ${seatId}
        </label>
    </div>`;
    document.write(checkboxHtml);
}

// Vòng lặp tự động tạo ghế layout
for (var i = 0; i < rows; i++) {
    document.write('<div class="d-flex justify-content-around">');
    for (var j = 0; j < columns; j++) {
        generateSeatCheckbox(i, j);
    }
    document.write('</div>');
}
// Check nếu như option "chonPhim" được chọn,(lúc đầu tải trang)
var categorySelect = document.getElementById('category');
var soLuongInputs = document.getElementsByName('soLuong');

if (categorySelect.value === 'chonPhim') {
    disableAllCheckboxes();
    document.getElementById('img-preview').setAttribute("src", "../../resources/img/default_img.png");
    let btnSubmit = document.getElementById('btnSubmitVe');
    if (btnSubmit) {
        btnSubmit.disabled = true;
    }
}

// Thêm nghe sự kiện cho sự thay đổi lựa chọn phim
categorySelect.addEventListener('change', function () {
    if (this.value === 'chonPhim') {
        disableAllCheckboxes();
        disableAllSoLuongInputs();
        let btnSubmit = document.getElementById('btnSubmitVe');
        if (btnSubmit) {
            btnSubmit.disabled = true;
        }
    } else {
        enableAllCheckboxes();
        enableAllSoLuongInputs();
        let btnSubmit = document.getElementById('btnSubmitVe');
        if (btnSubmit) {
            btnSubmit.disabled = false;
        }
    }
});

// Hàm vô hiệu hóa tất cả các input soLuong
function disableAllSoLuongInputs() {
    soLuongInputs.forEach(function (input) {
        input.disabled = true;
    });
}

// Hàm kích hoạt tất cả các input soLuong
function enableAllSoLuongInputs() {
    soLuongInputs.forEach(function (input) {
        input.disabled = false;
    });
}
// Hàm vô hiệu hoá tất cả các checkbox ghế
function disableAllCheckboxes() {
    var checkboxes = document.querySelectorAll('.seat-checkbox');
    checkboxes.forEach(function (checkbox) {
        checkbox.disabled = true;
    });
}

// Hàm kích hoạt tất cả các checkbox ghế
function enableAllCheckboxes() {
    var checkboxes = document.querySelectorAll('.seat-checkbox');
    checkboxes.forEach(function (checkbox) {
        checkbox.disabled = false;
    });
}
