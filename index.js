var ul = document.querySelector('.lists')
var data = JSON.parse(localStorage.getItem('lists'));
var arrayList = [];


function UserForm(e) {
  e.preventDefault();

  const name = document.getElementById("name");

  const email = document.getElementById("email")

  const number = document.getElementById("number")

  const date = document.getElementById("date")

  const time = document.getElementById("time")

  if (name.value == "" || email.value == "" || number.value == "" || date.value == "" || time.value == "") {
    var msg = document.getElementById('errorMsg');
    msg.style.display ="block";
    setTimeout(()=>msg.style.display="none",3000);
  } else {
    var li = document.createElement('li');
    var text = document.createTextNode(`${name.value} : ${email.value} : ${number.value} : ${date.value} : ${time.value}`);
    li.appendChild(text);
    ul.appendChild(li)
    var obj={
      name : name.value,
      email : email.value,
      number : number.value,
      date : date.value,
      time : time.value
    }
   data?data.push(obj):arrayList.push(obj);
    localStorage.setItem('lists',JSON.stringify(data?data:arrayList));
    name.value ='';
    email.value='';
    number.value='';
    date.value='';
    time.value='';
  }
}
