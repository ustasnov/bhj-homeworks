const form = document.getElementById("form");
const progress = document.getElementById('progress');

form.addEventListener("submit", event => {
  event.preventDefault();
  progress.value = 0.0;
  const formData = new FormData(form);
  const request = new XMLHttpRequest();
  request.open("POST", "https://students.netoservices.ru/nestjs-backend/upload");

  request.upload.onprogress = (e) => {
    progress.value = e.loaded / e.total;
  }

  request.onloadend = () => {
    if (request.status === 201) {
      alert("Файл успешно отправлен.");
    } else {
      alert(`Ошибка при отправке файла: ${request.status}`);
    }
  }

  request.send(formData);
});
