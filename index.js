function UserForm(e) {
  e.preventDefault();

  const name = document.getElementById("name").value;

  const email = document.getElementById("email").value;

  const number = document.getElementById("number").value;

  const date = document.getElementById("date").value;

  const time = document.getElementById("time").value;

  if (name == "" || email == "" || number == "" || date == "" || time == "") {
    console.log("Please fill all inputs");
  } else {
    console.log(name, email, number, date, time);
  }
}
