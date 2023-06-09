let dropArea = document.querySelector('.drag-files');

dropArea.addEventListener('dragover', () =>{
    dropArea.classList.add('dragover');
})

dropArea.addEventListener('dragleave', () =>{
    dropArea.classList.remove('dragover');
})

let inputFile = document.querySelector(".drag-files input");
let uploadingProgress = document.querySelector(".uploading progress");

function Progress() {
    let section = document.querySelector(".files");
    let boxUploading = document.querySelectorAll(".box")[0];

    let novaTag = document.createElement("div");
    novaTag.classList.add("box", "uploading");
    novaTag.innerHTML = "<div class='icon'><i class='ph-fill ph-file'></i></div><div class='info'><div class='filename'>Scann_158.pdf</div><div class='filesize'><span></span></div><div class='bar'><progress value='0' max='100'></progress><span></span></div></div><div class='action'><i class='ph ph-x'></i></div>";
    section.insertBefore(novaTag, boxUploading);

    var fileInput = document.querySelector(".drag-files form input");
    var progressBar = document.querySelector(".bar progress");
    var status = document.querySelector(".bar span");
  
    var file = fileInput.files[0];
    var formData = new FormData();

    let boxUploadingSpan = novaTag.querySelectorAll(".filesize span")[0];
    let fileName = novaTag.querySelectorAll(".filename")[0];
    fileName.innerHTML = file.name

    formData.append("file", file);
  
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "upload.php", true);
  
    xhr.upload.onprogress = function(e) {
      if (e.lengthComputable) {
        var percentComplete = (e.loaded / e.total) * 100;
        boxUploadingSpan.innerHTML = (e.loaded / 1024 / 1024).toFixed(1) + "MB / " + (e.total / 1024 / 1024).toFixed(1) + "MB";
        progressBar.value = percentComplete;
        status.innerHTML = percentComplete.toFixed(2) + "%...";
      }
    };
  
    xhr.onload = function() {
      status.innerHTML = "Completo";
      progressBar.value = 100;
    };
  
    xhr.send(formData);

  }
  