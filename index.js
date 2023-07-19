const Uname = document.getElementById("name");

const email = document.getElementById("email");

const number = document.getElementById("number");

const date = document.getElementById("date");

const time = document.getElementById("time");
const submit = document.getElementById("submit");
var ul = document.querySelector(".lists");
var data = JSON.parse(localStorage.getItem("lists"));
var arrayList = [];

if (data.length) {// if list stored in localstorage
  arrayList = data;
  for (var i = 0; i < data.length; i++) {
    var li = document.createElement("li");
    li.className = "list-group-item";
    var button = document.createElement("button");
    button.className = "btn btn-danger btn-sm float-right delete";

    var editButton = document.createElement("button");
    editButton.className = "btn btn-primary btn-sm float-right edit";
    editButton.appendChild(document.createTextNode("Edit"));
    button.appendChild(document.createTextNode("Remove"));
    li.setAttribute("key", i);
    li.textContent = `${data[i].name} - ${data[i].email} -${data[i]
      .number} -${data[i].date} -${data[i].time} `;
    li.appendChild(editButton);
    li.appendChild(button);
    ul.appendChild(li);
  }
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
    var getKey = submit.getAttribute("key");/// For Edit Details
    if (getKey) {
      data[getKey].name = Uname.value;
      data[getKey].email = email.value;
      data[getKey].number = number.value;
      data[getKey].date = date.value;
      data[getKey].time = time.value;
      localStorage.setItem("lists",JSON.stringify(data));
      window.location.reload();
    } else { //for add new details
      var text = document.createTextNode(
        `${Uname.value} : ${email.value} : ${number.value} : ${date.value} : ${time.value}`
      );
      var li = document.createElement("li");
      var button = document.createElement("button");
      button.className = "btn btn-danger btn-sm float-right delete";
      li.className = "list-group-item";
      button.appendChild(document.createTextNode("Remove"));

      var editButton = document.createElement("button");
      editButton.className = "btn btn-primary btn-sm float-right edit";
      editButton.appendChild(document.createTextNode("Edit"));
      li.appendChild(text);
      li.appendChild(editButton);
      li.appendChild(button);
      ul.appendChild(li);
      var obj = {
        name: Uname.value,
        email: email.value,
        number: number.value,
        date: date.value,
        time: time.value
      };
      arrayList.push(obj);
      localStorage.setItem("lists", JSON.stringify(arrayList));
    }
    Uname.value = "";
    email.value = "";
    number.value = "";
    date.value = "";
    time.value = "";
  }
}

ul.addEventListener("click", RemoveEditItem);

function RemoveEditItem(e) {
  if (e.target.classList.contains("delete")) {
    if (confirm("Are You Sure")) {
      var li = e.target.parentElement;
      var deleteKey = li.getAttribute('key');
      console.log(deleteKey)
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
