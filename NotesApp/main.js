const addBtn = document.querySelector(".add-btn");
const notes = document.querySelector(".notes");

function fetchAllNotes() {
  const notes = JSON.parse(localStorage.getItem("notes"));
  if (notes) {
    notes.forEach((note) => {
      addNewNotes(note);
    });
  }
}

fetchAllNotes();

addBtn.addEventListener("click", () => {
  addNewNotes();
});

function addNewNotes(text = "") {
  const note = document.createElement("div");
  note.classList.add("note");

  note.innerHTML = `
    <div class="action">
        <button class="edit"><i class="fa-solid fa-pen-to-square"></i></button>
        <button class="delete"><i class="fa-solid fa-trash"></i></i></button>
    </div>
    <div class="main ${text.length > 0 ? "" : "hidden"}">${text}</div>
    <textarea class="input-text ${
      text.length > 0 ? "hidden" : ""
    }">${text}</textarea>
    `;

  const editBtn = note.querySelector(".edit");
  const deleteBtn = note.querySelector(".delete");
  deleteBtn.addEventListener('click', () => {
    note.remove();
    addNotesToLocalStorage()
  })

  const main = note.querySelector(".main");

  editBtn.addEventListener("click", () => {
    main.classList.toggle("hidden");
    noteText.classList.toggle("hidden");
  });

  const noteText = note.querySelector("textarea");

  noteText.addEventListener("input", (e) => {
    const value = e.target.value;
    main.innerHTML = marked.parse(value);
    noteText.textContent = value;

    addNotesToLocalStorage();
  });

  notes.appendChild(note);
}

function addNotesToLocalStorage() {
  const allNotes = document.querySelectorAll("textarea");

  let notes = [];
  allNotes.forEach((note) => {
    console.log(note);
    notes.push(note.value);
  });
  localStorage.setItem("notes", JSON.stringify(notes));
}

function getAllNotesFromLocalStorage() {
  const allNotes = JSON.parse(localStorage.getItem("notes"));
  return allNotes ? allNotes : [];
}
