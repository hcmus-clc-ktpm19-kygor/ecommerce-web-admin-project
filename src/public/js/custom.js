let menuToggle = document.querySelector(".custom-toggle");
menuToggle.onclick = function () {
  menuToggle.classList.toggle("active");
};

// Avatar
let avatar = document.querySelector("#avatar");
avatar.onclick = function () {
  document.getElementById('image').click();
}

function handleChooseImgOnchange() {
  const img = document.getElementById("image").files[0];
  const avatar_url = URL.createObjectURL(img);
  const avatar = document.getElementById("avatar");
  avatar.setAttribute("src", avatar_url);
}

document.getElementById("image").onchange = handleChooseImgOnchange;