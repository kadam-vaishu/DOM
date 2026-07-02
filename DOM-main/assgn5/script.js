let table=document.createElement("table");
table.border="1";
for(let i=0;i<=5;i++){
let tr=document.createElement("tr");
let td1=document.createElement("td");
td1.textContent=i;
let td2=document.createElement("td");
td2.textContent=i*5;
tr.appendChild(td1);
tr.appendChild(td2);
table.appendChild(tr);
}
document.body.appendChild(table)