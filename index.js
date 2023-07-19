const Uname = document.getElementById("name");

const email = document.getElementById("email");

const number = document.getElementById("number");

const date = document.getElementById("date");

const time = document.getElementById("time");
const submit = document.getElementById("submit");
var ul = document.querySelector(".lists");
var data = JSON.parse(localStorage.getItem("lists"));
var arrayList = [];
axios
  .get(
    "https://crudcrud.com/api/550b8d51c9eb471290dcc3d64f5f6e3b/appointmentData"
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
        li.setAttribute("key", i);
        li.textContent = `${res.data[i].name} - ${res.data[i].email} -${res
          .data[i].number} -${res.data[i].date} -${res.data[i].time} `;
        li.appendChild(editButton);
        li.appendChild(button);
        ul.appendChild(li);
      }
    }
  })
  .catch(err => console.log(err));
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
    console.log(obj);
    arrayList.push(obj);
    localStorage.setItem("lists", JSON.stringify(arrayList));
    axios
      .post(
        "https://crudcrud.com/api/550b8d51c9eb471290dcc3d64f5f6e3b/appointmentData",
        obj
      )
      .then(res => {
        console.log(res);
        window.location.reload();
      })
      .catch(err => console.log(err));
  }
}

ul.addEventListener("click", RemoveEditItem);

function RemoveEditItem(e) {
  if (e.target.classList.contains("delete")) {
    if (confirm("Are You Sure")) {
      var li = e.target.parentElement;
      var deleteKey = li.getAttribute("key");
      console.log(deleteKey);
      ul.removeChild(li);
    }
  }
  if (e.target.classList.contains("edit")) {
    var li = e.target.parentElement;
    var index = li.getAttribute("key");
    var fetchdetails = JSON.parse(localStorage.getItem("lists"));
    Uname.value = fetchdetails[index].name;
    email.value = fetchdetails[index].email;
    number.value = fetchdetails[index].number;
    date.value = fetchdetails[index].date;
    time.value = fetchdetails[index].time;
    submit.value = "Update a call";
    submit.setAttribute("key", index);
  }
}
