const poolTitle = document.getElementById("poll__title");
const poolAnswers = document.getElementById("poll__answers");
let poolId = null;

function getVotingResult(answerNode) {
  const nodeIndex = Array.from(poolAnswers.childNodes).indexOf(answerNode);
  if (nodeIndex >= 0) {
    const xhr = new XMLHttpRequest;
    xhr.open("POST", "https://students.netoservices.ru/nestjs-backend/poll");
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhr.addEventListener("readystatechange", () => {
      if (xhr.readyState === xhr.DONE) {
        const responseData = JSON.parse(xhr.responseText);
        if (responseData) {
          poolAnswers.innerHTML = "";
          let statText = poolTitle.textContent + "<br>";
          responseData.stat.forEach(e => {
            statText += `${e.answer}: <b>${e.votes}%</b><br>`;
          });
          poolTitle.innerHTML = statText;
        }
      }
    });

    xhr.send(`vote=${poolId}&answer=${nodeIndex}`);
  }
}

function addAnswerButton(answerText) {
  const answer = document.createElement("button");
  answer.classList.add("poll__answer");
  answer.textContent = answerText;

  answer.addEventListener("click", event => {
    alert("Спасибо, ваш голос засчитан!");
    getVotingResult(event.currentTarget);
  });

  poolAnswers.appendChild(answer);
}

function getPool() {
  const xhr = new XMLHttpRequest;
  xhr.open("GET", "https://students.netoservices.ru/nestjs-backend/poll");
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.addEventListener("readystatechange", () => {
    if (xhr.readyState === xhr.DONE && xhr.status === 200) {
      const responseData = JSON.parse(xhr.responseText);
      if (responseData) {
        poolId = responseData.id;
        poolTitle.textContent = responseData.data.title;
        responseData.data.answers.forEach(e => {
          addAnswerButton(e);
        });
      }
    }
  });

  xhr.send();
}

getPool();