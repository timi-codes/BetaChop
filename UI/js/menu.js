const somethingElse = document.querySelector(".top");

const navButton = somethingElse.querySelector("button[aria-expanded]");

function toggleNav({ target }) {
  const expanded = target.getAttribute("aria-expanded") === "true" || false;
  navButton.setAttribute("aria-expanded", !expanded);
  console.log(expanded);
}
navButton.addEventListener("click", toggleNav);

var modal = document.getElementById("addNewModal");
var btn = document.querySelectorAll(".addBtn");
var closeDialog = document.querySelector(".closeDialog");

btn.forEach(item => {
  item.onclick = e => {
    modal.style.display = "block";
  };
});

closeDialog.onclick = function(e) {
  modal.style.display = "none";
};

window.onclick = function(e) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
