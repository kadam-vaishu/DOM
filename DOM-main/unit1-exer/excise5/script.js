let h1=document.getElementById("main-heading")
h1.innerHTML="Welcome <span>Student</span>";
let p2=document.getElementsByClassName("description")
p2[0].textContent="DOM is powerful";
p2[0].style.color="blue";
let button=document.querySelectorAll("button");
button[1].innerHTML="Clicked!";
let div=document.querySelector("divspan")
console.log(div.innerText);
console.log(div.textContent);