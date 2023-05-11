const editorElement = document.getElementById("editor");
const clearButton = document.querySelector(".btn_clear");

function loadData() {
  const textEditorData = localStorage.getItem("textEditorData");
  if (textEditorData) {
    editorElement.value = JSON.parse(textEditorData);
  }
}

function saveData() {
  if (editorElement.value !== "") {
    const textEditorData = JSON.stringify(editorElement.value);
    try {
      localStorage.setItem("textEditorData", textEditorData);
    } catch (e) {
      if (e == QUOTA_EXCEEDED_ERR) {
        console.log('Превышен лимит выделенного пространства для локального хранилища!');
      }
    }
  } else {
    localStorage.removeItem("textEditorData");
  }
}

clearButton.addEventListener("click", event => {
  editorElement.value = "";
});

window.addEventListener('beforeunload', (event) => {
  saveData();
  event.preventDefault();
  event.returnValue = '';
});

loadData();
