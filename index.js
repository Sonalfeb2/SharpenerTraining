var ul = document.querySelector(".lists");
var data = JSON.parse(localStorage.getItem("lists"));
var arrayList = [];

if (data.length) {
  arrayList = data;
  for (var i = 0; i < data.length; i++) {
    var li = document.createElement("li");
    var button = document.createElement("button");
    button.className = "btn btn-danger btn-sm float-right delete";
    li.className = "list-group-item";
    button.appendChild(document.createTextNode("Remove"));

    li.textContent = data[i].name;
    li.appendChild(button);
    ul.appendChild(li);
  }
  console.log(ul);
}

function UserForm(e) {
  e.preventDefault();

  const name = document.getElementById("name");

  const email = document.getElementById("email");

  const number = document.getElementById("number");

  const date = document.getElementById("date");

  const time = document.getElementById("time");

  if (
    name.value == "" ||
    email.value == "" ||
    number.value == "" ||
    date.value == "" ||
    time.value == ""
  ) {
    var msg = document.getElementById("errorMsg");
    msg.style.display = "block";
    setTimeout(() => (msg.style.display = "none"), 3000);
  } else {
    var text = document.createTextNode(
      `${name.value} : ${email.value} : ${number.value} : ${date.value} : ${time.value}`
    );
    var li = document.createElement("li");
    var button = document.createElement("button");
    button.className = "btn btn-danger btn-sm float-right delete";
    li.className = "list-group-item";
    button.appendChild(document.createTextNode("Remove"));
    li.appendChild(text);
    li.appendChild(button);
    ul.appendChild(li);
    var obj = {
      name: name.value,
      email: email.value,
      number: number.value,
      date: date.value,
      time: time.value
    };
    arrayList.push(obj);
    localStorage.setItem("lists", JSON.stringify(arrayList));
    name.value = "";
    email.value = "";
    number.value = "";
    date.value = "";
    time.value = "";
  }
}

ul.addEventListener('click' ,RemoveItem);

function RemoveItem(e){
  if(e.target.classList.contains('delete')){
      if(confirm('Are You Sure')){
          var li = e.target.parentElement;
          ul.removeChild(li);
      }}}