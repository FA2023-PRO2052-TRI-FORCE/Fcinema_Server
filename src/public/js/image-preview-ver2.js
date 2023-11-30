function previewImage(input, previewId) {
    var preview = document.getElementById(previewId);
    var file = input.files[0];

    if (file) {
      var reader = new FileReader();

      reader.onload = function (e) {
        preview.src = e.target.result;
      };

      reader.readAsDataURL(file);
    }
  }
    
    