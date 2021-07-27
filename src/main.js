const selectedName = document.querySelector("#itemSelect");
const nameInput = document.querySelector(".name");
const priceInput = document.querySelector(".price");
const addBtn = document.querySelector(".addBtn");
const itemList = document.querySelector(".itemList");
const totalPrice = document.querySelector(".totalPrice");
const resetBtn = document.querySelector(".reset");
let total = 0;

addBtn.addEventListener("click",()=>{
  if(nameInput.value == '' || priceInput.value == null){
    alert('Empty data are not allowed');
    return;
  }

  const item = {
    name : nameInput.value,
    price : priceInput.value
  };

  addItemToList(item);
  updateTotal(item.price);
})

addItemToList = (item)=>{
  const newItem = document.createElement('li');
  newItem.setAttribute('class','item');
  newItem.innerHTML = `
    <span class="itemName">${item.name}</span>
    <span class="itemPrice">${item.price}</span>
    <span class="itemDelete">X</span>
  `
  itemList.appendChild(newItem);
  newItem.scrollIntoView({behavior:"smooth"});
}

updateTotal = (price)=>{
  total += Number(price);
  totalPrice.innerText = `${total}`;
}

itemList.addEventListener("click",(event)=>{
  if(event.target.className !== "itemDelete"){
    return;
  }

  itemList.removeChild(event.target.parentNode);
})

resetBtn.addEventListener("click",()=>{
  itemList.innerHTML="";
})

const loadItems=()=>{
  return fetch("data/data.json")
  .then((response)=>response.json())
  .catch((error)=>console.log("error",error));
}

const getPriceByValue = (value)=>{
  const keys = value.split(" ");
  loadItems()
  .then((res)=>priceInput.value=res[keys[0]][keys[1]]);
}

selectedName.addEventListener("change",(event)=>{
  const target = event.target;
  const value = target.value;
  
  if(value==="Custom"){
    nameInput.value = '';
    priceInput.value = '';
    return;
  }
  
  const splitedValue = value.split(' ');
  
  nameInput.value = splitedValue[1]==='default'?splitedValue[0]:selectedName.value;

  getPriceByValue(value);
})