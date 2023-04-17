const chatWidget = document.querySelector(".chat-widget");
const messages = document.querySelector(".chat-widget__messages");
const messagesContainer = document.querySelector(".chat-widget__messages-container");
const input = document.getElementById("chat-widget__input");
const robotMessages = [
  "Вы не купили ни одного товара, чтобы с нами так разговаривать!",
  "Кто тут?",
  "Прошу больше не беспокоить!",
  "Не могу сейчас ответить, я слишком занят",
  "Где ваша совесть?",
  "К сожалению все операторы сейчас заняты. Не пишите нам больше",
  "Добрый день! До свидания!",
  "Мы ничего не будем вам продавать!"
];
let timerId = null;

function getCurrentTime() {
  return new Date().toLocaleString("ru", { hour: '2-digit', minute: '2-digit' });
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function addMessage(message, client = true) {
  messages.innerHTML += `<div class="message${client ? ' message_client' : ''}">
        <div class="message__time">
          ${getCurrentTime()}
        </div>
        <div class="message__text">
          ${message}
        </div>
      </div>`;
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function addRobotMessage(message) {
  if (!message) {
    message = robotMessages[getRandomIntInclusive(0, robotMessages.length - 1)];
  }
  if (document.querySelector(".chat-widget_active")) {
    addMessage(message, false);
  }
}

function addClientMessage(e) {
  if (document.querySelector(".chat-widget_active")) {
    const message = input.value.trim();
    if (e.code === "Enter" && message) {
      addMessage(message);
      input.value = "";
      if (timerId) {
        clearTimeout(timerId);
      }
      timerId = setTimeout(() => { addRobotMessage("Чего молчим?") }, 30000);
      setTimeout(() => { addRobotMessage(null) }, 1000);
    }
  }
}

document.addEventListener("keyup", addClientMessage);

chatWidget.addEventListener("click", () => {
  if (!chatWidget.classList.contains("chat-widget_active")) {
    chatWidget.classList.add("chat-widget_active");
    input.focus();
    timerId = setTimeout(() => { addRobotMessage("Чего молчим?") }, 5000);
  }
});

