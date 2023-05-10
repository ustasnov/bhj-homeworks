const signingForm = document.getElementById("signin__form");
const welcomeElement = document.getElementById("welcome");
const signinElement = document.getElementById("signin");
const userIdElement = document.getElementById("user_id");
const loginElement = document.getElementsByName("login");
const passwordElement = document.getElementsByName("password");

function showWelcome(id) {
  signinElement.classList.remove("signin_active");
  userIdElement.textContent = `${id}`;
  welcomeElement.classList.add("welcome_active");
}

signingForm.addEventListener("submit", event => {
  const formData = new FormData(signingForm);
  const request = new XMLHttpRequest();
  request.open("POST", "https://students.netoservices.ru/nestjs-backend/auth");

  request.addEventListener("readystatechange", function () {
    if (this.readyState === request.DONE && this.status === 201) {
      let data = JSON.parse(this.responseText);
      if (data.success) {
        showWelcome(data.user_id);
        localStorage.setItem("authUserId", `${data.user_id}`);
      } else {        
        alert("Неверный логин/пароль!");
      }
      loginElement[0].value = "";
      passwordElement[0].value = "";
    }

  });

  request.send(formData);
  event.preventDefault();
});

const id = localStorage.getItem("authUserId");
if (id) {
  showWelcome(id);
}
