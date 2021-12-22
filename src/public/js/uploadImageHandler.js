const uploader = document.getElementById("product-image-input"),
  fileInput = document.querySelector(".file-input"),
  progressArea = document.querySelector(".progress-area"),
  uploadedArea = document.querySelector(".uploaded-area");

uploader.addEventListener("click", () => {
  fileInput.click();
});

fileInput.onchange = ({ target }) => {
  for (let i = 0; i < 10; i++) {
    const file = target.files[i];
    if (file) {
      let fileName = file.name;
      if (fileName.length >= 12) {
        let splitName = fileName.split(".");
        fileName = splitName[0].substring(0, 13) + "... ." + splitName[1];
      }

      uploadedArea.classList.add("onprogress");
      progressArea.innerHTML = "";
      let uploadedHTML = `<li class="row">
                            <div class="content upload">
                              <i class="fas fa-file-alt"></i>
                              <div class="details">
                                <span class="name">${fileName} • Uploaded</span>
                                <span class="size">${Math.floor(
                                  file.size / 1024
                                )}KB</span>
                              </div>
                            </div>
                            <i class="fas fa-check"></i>
                          </li>`;
      uploadedArea.classList.remove("onprogress");
      uploadedArea.insertAdjacentHTML("afterbegin", uploadedHTML);
    }
  }
};