// Avatar
let avatar = document.querySelector("#avatar");
avatar.onclick = function () {
    document.getElementById('image').click();
}

function handleChooseImgOnchange() {
    const imgAttribute = document.getElementById("image");
    const img = imgAttribute.files[0];
    const avatar_url = URL.createObjectURL(img);
    const avatar = document.getElementById("avatar");
    avatar.src = avatar_url;
    imgAttribute.onload = () => URL.revokeObjectURL(avatar.src);

    document.getElementById("save-avatar-button").removeAttribute("hidden");
}
document.getElementById("image").onchange = handleChooseImgOnchange;