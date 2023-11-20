// Auto generate maVe
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

// update ghe selection
function updateGheSelection(selectedOption) {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const tenGhe = selectedOption.getAttribute("data-ten-ghe");

    checkboxes.forEach(function (checkbox) {
        checkbox.checked = false;
        checkbox.disabled = false;
        checkbox.style.backgroundColor="#fff";

        if (tenGhe.includes(checkbox.value)) {
            checkbox.disabled = true;
            checkbox.style.backgroundColor="#CC5500";
            checkbox.style.opacity="1";

        }
    });
}

// update tong tien ve when check a checkbox ghe
function updateTongTienCheckbox(checkbox, giaPhimInput, tongTienVeInput, gheSelected) {
    checkbox.addEventListener('change', function () {
        const tenGhe = this.value;
        checkbox.style.backgroundColor="#fff";
        const giaPhim = Number(giaPhimInput.value);
        const tongTien = Number(tongTienVeInput.value);

        if (this.checked) {
            const giaGhe = giaPhim;
            const newTongTien = Number(tongTien + giaGhe);
            tongTienVeInput.value = newTongTien;
            checkbox.style.backgroundColor="#28a745";

            if (gheSelected.value === '') {
                gheSelected.value = tenGhe;
        
            } else {
                gheSelected.value += ', ' + tenGhe;
            }
        } else {
            checkbox.style.backgroundColor="#fff";
            const giaGhe = giaPhim;
            const newTongTien = tongTien - giaGhe;
            tongTienVeInput.value = newTongTien;
            gheSelected.value = gheSelected.value.replace(new RegExp(',?\\s?' + tenGhe), '');
        }
        updateTongTienInput();
    });
}
// Format currency
function parseCurrency(currencyString) {
    var numericString = currencyString.replace(/[^\d]/g, '');
    var numericValue = parseInt(numericString, 10);

    return numericValue;
}
// Limit value input soLuong
function limitValue(input) {
    const newValue = parseInt(input.value);
  
    const maxValue = parseInt(input.getAttribute("max"));
  
    if (isNaN(newValue) || newValue < 0 || newValue > maxValue) {
        input.value = Math.min(Math.max(newValue, 0), maxValue);
      }
  }
  

// Sum total price of do an
function handleKeyUp(i) {
    var soLuong = Number(i.value);
    var giaDoAn = parseCurrency(i.parentNode.parentNode.children[4].innerText);
    var tong = soLuong * giaDoAn;

    i.parentNode.parentNode.children[6].innerText = tong;
    tongTienDoAn = tong;

    updateTongTien();
}

// Update tongTienDoAn
function updateTongTien() {
    var tong = 0;
    var tongCong = document.getElementsByName("totalPrice");
    for (var i = 0; i < tongCong.length; i++) {
        var flag = tongCong[i].innerText;
        var tongTatCaDoAn = Number(flag);
        tong += tongTatCaDoAn;
    }
    tongTienDoAn = tong;

    console.log('T', tongTienDoAn);
    updateTongTienInput();
}

// Update tongTieninput
function updateTongTienInput() {
    var tongTienVe = Number(document.getElementById('tongTienVe').value);
    var tongTienInputValue = tongTienVe + tongTienDoAn;
    tongTienInput.value = tongTienInputValue;
}

// Select option lich chieu
document.getElementById("category").addEventListener("change", function () {
    var selectedIndex = this.selectedIndex;
    var selectedOption = this.options[selectedIndex];
    var tenGhe = selectedOption.getAttribute("data-ten-ghe");
    var anh= selectedOption.getAttribute("data-anh");

    document.getElementById("ngayChieu").value = selectedOption.getAttribute("data-ngaychieu");
    document.getElementById("caChieu").value = selectedOption.getAttribute("data-cachieu");
    document.getElementById("phongChieu").value = selectedOption.getAttribute("data-phongchieu");
    document.getElementById("giaPhim").value = selectedOption.getAttribute("data-giaphim");
    document.getElementById('idPhongChieu').value = selectedOption.getAttribute("data-idPhongChieu");
    document.getElementById('img-preview').setAttribute("src","data:image/png;base64,"+anh);


    updateGheSelection(selectedOption);
    document.getElementById('tongTienVe').value = '';
    document.getElementById('tenGhe').value = '';
});

// Set currentdate for maVe
const currentDateTimeString = getCurrentDateTimeString();
document.getElementById('idVe').value = 'VE' + currentDateTimeString;

const checkboxes = document.querySelectorAll('input[type="checkbox"]');
const giaPhimInput = document.getElementById('giaPhim');
const tongTienVeInput = document.getElementById('tongTienVe');
const tongTienInput = document.getElementById('tongTien');
const gheSelected = document.getElementById('tenGhe');
let tongTienDoAn = 0;

// Update tongTien, ghe when checkbox change
checkboxes.forEach(checkbox => {
    updateTongTienCheckbox(checkbox, giaPhimInput, tongTienVeInput, gheSelected);
});

// Call updateTongTienInput from tongTienVeInput change event
tongTienVeInput.addEventListener('input', function () {
    updateTongTienInput();
});
//Update tongTienDoAn after change values soLuong
const tongTienDoAnInputs = document.getElementsByName('totalPrice');
for (let i = 0; i < tongTienDoAnInputs.length; i++) {
    tongTienDoAnInputs[i].addEventListener('keyup', function () {
        handleKeyUp(this);
        updateTongTien();
    });
}
