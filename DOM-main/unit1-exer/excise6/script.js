let table=document.createElement("table");
table.border="1"
let count=1;
for(let i=0;i<5;i++){
   let tr=document.createElement("tr")
  for(let j=0;j<5;j++){
     let td=document.createElement("td")
     td.textContent=count;
     count++
     tr.appendChild(td)
  }
  table.appendChild(tr)
}
document.body.appendChild(table)