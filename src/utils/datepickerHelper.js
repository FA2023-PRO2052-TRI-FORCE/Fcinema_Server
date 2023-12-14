document.addEventListener('DOMContentLoaded', function() {
    var dateInput = document.getElementById('datepicker');

    var picker = new Pikaday({
      field: dateInput,
      format: 'DD-MM-YYYY', 
      i18n: {
        previousMonth: 'Tháng trước',
        nextMonth: 'Tháng sau',
        months: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
        weekdays: ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'],
        weekdaysShort: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7']
      },
      minDate: new Date() 
    });
  });