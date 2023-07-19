const Uname = document.getElementById("name");

const email = document.getElementById("email");

const number = document.getElementById("number");

const date = document.getElementById("date");

const time = document.getElementById("time");
const submit = document.getElementById("submit");
var ul = document.querySelector(".lists");
var data = JSON.parse(localStorage.getItem("lists"));

let url_str = window.location.href;

let url = new URL(url_str);
let search_params = url.searchParams;
var arrayList = [];
axios
  .get(
    "https://crudcrud.com/api/048bba71bdd84541858e89c5919a02ef/appointmentData"
  )
  .then(res => {
    if (res.data.length) {
      for (var i = 0; i < res.data.length; i++) {
        var li = document.createElement("li");
        li.className = "list-group-item";
        var button = document.createElement("button");
        button.className = "btn btn-danger btn-sm float-right delete";

        var editButton = document.createElement("button");
        editButton.className = "btn btn-primary btn-sm float-right edit";
        editButton.appendChild(document.createTextNode("Edit"));
        button.appendChild(document.createTextNode("Remove"));
        li.setAttribute("key", res.data[i]._id);
        li.textContent = `${res.data[i].name} - ${res.data[i].email} -${res
          .data[i].number} -${res.data[i].date} -${res.data[i].time} `;
        li.appendChild(editButton);
        li.appendChild(button);
        ul.appendChild(li);
      }
    }
  })
  .catch(err => console.log(err));
if (search_params.get("id") !== null) {
  axios
    .get(
      `https://crudcrud.com/api/048bba71bdd84541858e89c5919a02ef/appointmentData/${search_params.get(
        "id"
      )}`
    )
    .then(res => {
      Uname.value = res.data.name;
      email.value = res.data.email;
      number.value = res.data.number;
      date.value = res.data.date;
      time.value = res.data.time;
      submit.value = "Update a call";
    });
}
function UserForm(e) {
  e.preventDefault();
  if (
    Uname.value == "" ||
    email.value == "" ||
    number.value == "" ||
    date.value == "" ||
    time.value == ""
  ) {
    var msg = document.getElementById("errorMsg");
    msg.style.display = "block";
    setTimeout(() => (msg.style.display = "none"), 3000);
  } else {
    var obj = {
      name: Uname.value,
      email: email.value,
      number: number.value,
      date: date.value,
      time: time.value
    };
    if (search_params.get("id")!==null) {
      axios
        .put(
          `https://crudcrud.com/api/048bba71bdd84541858e89c5919a02ef/appointmentData/${search_params.get(
            "id"
          )}`,
          obj
        )
        .then(res => {
          alert("Update SuccessFully");
          window.open("index.html");
        })
        .catch(err => console.log(err));
    } else {
      axios
        .post(
          "https://crudcrud.com/api/048bba71bdd84541858e89c5919a02ef/appointmentData",
          obj
        )
        .then(res => {
          window.location.reload();
        })
        .catch(err => console.log(err));
    }
  }
}

ul.addEventListener("click", RemoveEditItem);

function RemoveEditItem(e) {
  if (e.target.classList.contains("delete")) {
    if (confirm("Are You Sure")) {
      var li = e.target.parentElement;
      var deleteKey = li.getAttribute("key");
      axios
        .delete(
          `https://crudcrud.com/api/048bba71bdd84541858e89c5919a02ef/appointmentData/${deleteKey}`
        )
        .then(res => {
          alert("Successfully deleted");
          window.open("index.html");
        })
        .catch(err => console.log(err));
    }
  }
  if (e.target.classList.contains("edit")) {
    var li = e.target.parentElement;
    var index = li.getAttribute("key");
    window.open("index.html?id=" + index);
  }
}
