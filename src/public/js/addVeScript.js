// Tự động tạo mã vé theo định dạng VE yyyyMMddHHmmsSS
function getCurrentDateTimeString() {
    const now = new Date();

    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    return `${year}${month}${day}${hours}${minutes}${seconds}`;
}

// Cập nhật lựa chọn ghế khi thay đổi option
function updateGheSelection(selectedOption) {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const tenGhe = selectedOption.getAttribute("data-ten-ghe");

    checkboxes.forEach(function (checkbox) {
        checkbox.checked = false;
        checkbox.disabled = false;
        checkbox.style.backgroundColor = "#fff";

        if (tenGhe.includes(checkbox.value)) {
            checkbox.disabled = true;
            checkbox.style.backgroundColor = "#CC5500";
            checkbox.style.opacity = "1";

        }
    });
}

// Cập nhật tổng tiền vé khi chọn checkbox ghế
function updateTongTienCheckbox(checkbox, giaPhimInput, tongTienVeInput, gheSelected) {
    checkbox.addEventListener('change', function () {
        const tenGhe = this.value;
        checkbox.style.backgroundColor = "#fff";
        const giaPhim = parseCurrency(giaPhimInput.value);
        const tongTien = parseCurrency(tongTienVeInput.value);

        if (this.checked) {
            const giaGhe = giaPhim;
            const newTongTien = Number(tongTien + giaGhe);
            tongTienVeInput.value = formatCurrencyVND(newTongTien);
            checkbox.style.backgroundColor = "#28a745";

            if (gheSelected.value === '') {
                gheSelected.value = tenGhe;

            } else {
                gheSelected.value += ', ' + tenGhe;
            }
        } else {
            checkbox.style.backgroundColor = "#fff";
            const giaGhe = giaPhim;
            const newTongTien = tongTien - giaGhe;
            tongTienVeInput.value = formatCurrencyVND(newTongTien);
            gheSelected.value = gheSelected.value.replace(new RegExp(',?\\s?' + tenGhe), '');
        }
        updateTongTienInput();
    });
}
// Parse đinh dạng tiền tệ
function parseCurrency(currencyString) {
    var numericString = currencyString.replace(/[^\d]/g, '');
    var numericValue = parseInt(numericString, 10);

    return isNaN(numericValue) ? 0 : numericValue;
}

// Hàm định dạng tiền 
function formatCurrencyVND(value) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
}
// Giới hạn giá trị nhập cho input soLuong
function limitValue(input) {
    const newValue = parseInt(input.value);

    const maxValue = parseInt(input.getAttribute("max"));

    if (isNaN(newValue) || newValue < 0 || newValue > maxValue) {
        input.value = Math.min(Math.max(newValue, 0), maxValue);
    }
}


// Tính tổng tiền của đồ ăn
function handleKeyUp(i) {
    var soLuong = Number(i.value);
    var giaDoAn = parseCurrency(i.parentNode.parentNode.children[4].innerText);
    var tong = soLuong * giaDoAn;

    i.parentNode.parentNode.children[6].innerText = formatCurrencyVND(tong);
    tongTienDoAn = tong;

    updateTongTienDoAn();
}

// Cập nhật tổng tiền đồ ăn
function updateTongTienDoAn() {
    var tong = 0;
    var tongCong = document.getElementsByName("totalPrice");
    for (var i = 0; i < tongCong.length; i++) {
        var flag = tongCong[i].innerText;
        console.log(flag)
        var tongTatCaDoAn = parseCurrency(flag);
        console.log('TT', tongTatCaDoAn);

        tong += Number( tongTatCaDoAn);
    }
    tongTienDoAn =tong;

    console.log('T', tongTienDoAn);
    updateTongTienInput();
}

// Cập nhật giá trị tổng tiền nhập
function updateTongTienInput() {
    var tongTienVe = parseCurrency(document.getElementById('tongTienVe').value);
    var tongTienInputValue = tongTienVe + tongTienDoAn;
    tongTienInput.value = formatCurrencyVND(tongTienInputValue);


}

// Chọn option lịch chiếu
document.getElementById("category").addEventListener("change", function () {
    var selectedIndex = this.selectedIndex;
    var selectedOption = this.options[selectedIndex];
    var tenGhe = selectedOption.getAttribute("data-ten-ghe");
    var anh = selectedOption.getAttribute("data-anh");

    if (this.value === "chonPhim") {
        checkboxes.forEach(function (checkbox) {
            checkbox.disabled = true;
        });
        resetAll() 

    } else {
        console.log('Index', selectedIndex)

        document.getElementById("ngayChieu").value = selectedOption.getAttribute("data-ngaychieu");
        document.getElementById("caChieu").value = selectedOption.getAttribute("data-cachieu");
        document.getElementById("phongChieu").value = selectedOption.getAttribute("data-phongchieu");
        document.getElementById("giaPhim").value = formatCurrencyVND(selectedOption.getAttribute("data-giaphim"));
        document.getElementById('idPhongChieu').value = selectedOption.getAttribute("data-idPhongChieu");
        document.getElementById('img-preview').setAttribute("src", anh);


        updateGheSelection(selectedOption);
        document.getElementById('tongTienVe').value = '';
        document.getElementById('tenGhe').value = '';
    }
});


// Thiết lập ngày hiện tại cho mã vé
const currentDateTimeString = getCurrentDateTimeString();
document.getElementById('idVe').value = 'VE' + currentDateTimeString;

const checkboxes = document.querySelectorAll('input[type="checkbox"]');
const giaPhimInput = document.getElementById('giaPhim');
const tongTienVeInput = document.getElementById('tongTienVe');
const tongTienInput = document.getElementById('tongTien');
const gheSelected = document.getElementById('tenGhe');

document.getElementById("category").options[0].selected = true;
let tongTienDoAn = 0;
// Cập nhật tổng tiền và ghế khi thay đổi checkbox
checkboxes.forEach(checkbox => {
    updateTongTienCheckbox(checkbox, giaPhimInput, tongTienVeInput, gheSelected);
});

// Gọi hàm updateTongTienInput từ sự kiện thay đổi của tongTienVeInput
tongTienVeInput.addEventListener('input', function () {
    updateTongTienInput();

});
// Cập nhật tổng tiền đồ ăn sau khi thay đổi số lượng
const tongTienDoAnInputs = document.getElementsByName('totalPrice');
for (let i = 0; i < tongTienDoAnInputs.length; i++) {
    tongTienDoAnInputs[i].addEventListener('keyup', function () {
        handleKeyUp(this);
        updateTongTienDoAn();
    });
}

// Reset lại toàn bộ giá trị ban đầu khi chọn option "chọn phim"
function resetAll() {
    document.getElementById('img-preview').setAttribute("src", "../../resources/img/default_img.png");

    checkboxes.forEach(function (checkbox) {
        checkbox.checked = false;
        checkbox.disabled = true;
        checkbox.style.backgroundColor = "#fff";
    });

    soLuongInputs.forEach(function (input) {
        input.value = "";
        input.disabled = true;
    });

    document.getElementById('ngayChieu').value = "";
    document.getElementById('caChieu').value = "";
    document.getElementById('phongChieu').value = "";
    document.getElementById('giaPhim').value = "";
    document.getElementById('idPhongChieu').value = "";
    document.getElementById('tongTienVe').value = "";
    document.getElementById('tenGhe').value = "";
    document.getElementById('tongTien').value="";
    const totalPriceElements = document.getElementsByName('totalPrice');
    totalPriceElements.forEach(function (element) {
        element.innerText = "";
    });
    
}
