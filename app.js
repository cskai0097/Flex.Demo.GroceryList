/*### Requirement
- When the "Add" button is clicked, a new item is added to the grocery list
  - **_Extra_**: Make sure input value is not empty before adding to the list
  - **_Extra_**: If the item already exists in the grocery list, add to and update the item
- When the "Clear Items" button is clicked, all items are cleared
- A function is written that correctly calculates the total price of all the items on the grocery list
- A function is written that correctly calculates the total qty of all the items on the grocery list
- The DOM is updated to reflect the total price and total quantity

Sample solution code on the `solution` branch.*/

// ******* STATE *******
const state = {
  groceries:[
    {name: "apple", price: 1.75 ,quantity: 2},
    {name: "banana", price: 0.25 , quantity: 4},
  ],
};

const items = [
  { name: "apple", price: 1.75 },
  { name: "banana", price: 0.25 },
  { name: "orange", price: 1.0 },
  { name: "broccoli", price: 3.0 },
  { name: "cucumber", price: 1.0 },
  { name: "carrot", price: 1.0 },
  { name: "milk", price: 5.75 },
  { name: "cheddar cheese", price: 4.0 },
  { name: "sourdough loaf", price: 5.5 },
  { name: "eggs", price: 4.0 },
  { name: "cereal", price: 3.5 },
  { name: "rice", price: 5 },
];

// ******* REFERENCES *******
const form = document.querySelector('.grocery-form') //selects first instance of class="grocery-form" and assigns it to const form.
const tablebody = document.getElementById('table-body')
const clearbutton = document.querySelector(".clear-btn")
const addInput = document.getElementById("grocery-input")
const totalQty = document.getElementById("total-qty")
const totalPrice = document.getElementById("total-price")

// ******* EVENT LISTENERS *******
form.addEventListener("submit", (event) => {
  
    event.preventDefault();
  //when we click button, add item to groceries array, first get input value.
  const inputValue = form.elements.grocery.value;
  //- Can be from items array OR a new item with a **random price** and **random quantity**
  const qty = Math.floor(Math.random() * 10);
  const price = Math.floor(Math.random() * 5) + 1;

  const itemFound = items.find(item => item.name === inputValue.toLowerCase())
// - If item found !
  if (itemFound) {
    state.groceries.push({
      name: itemFound.name,
      quantity: qty,
      price: itemFound.price })
  }
  else if (inputValue.trim().length < 0) {
      //pushing a new object of inputValue and qty and price into state.groceries array
    state.groceries.push({name: inputValue, quantity: qty, 
      price });
    }
  else{
    alert("Add a real item!")
  }

  addInput.value = ""
    render();
  
  
  });

 // clearbutton.addEventListener("click",function(){
   // state.groceries = [];
   // render();
  //})
//Initial render();
  render();

  //When "Clear Items" is clicked, all items are cleared.
  clearbutton.addEventListener("click",()=>{
    state.groceries = []
    render()
  })
// ******* RENDER *******
function render(){
  //we want to display all our groceries in the table
  const rowItems = state.groceries.map((item) => {
      const newRow = document.createElement('tr')
      //-------------------------------------------
      const name = document.createElement('td')
      name.textContent = item.name;

      const qty = document.createElement('td')
      qty.textContent = item.quantity;

      const price = document.createElement('td')
      price.textContent = item.price * item.quantity;

      newRow.replaceChildren(name, qty, price);

      return newRow;


    })
  // - DOM is updated to reflect the total price and total quantity
  totalQty.textContent = calculateTotalQty()
  totalPrice.textContent = calculateTotalPrice().toFixed(2);

  tablebody.replaceChildren(...rowItems)
}
// ******* FUNCTIONS *******
 // - A function is written that correctly calculates the total price
 // of all the items on the grocery list
 function calculateTotalPrice(){
  const total = state.groceries.reduce((total, item)=>{return total+ (item.price * item.quantity)},0)
  return total;
 }


 // - A function is written that correctly calculates the
 //total qty of all the items on the grocery list
 function calculateTotalQty() {
  const total = state.groceries.reduce((total, item)=>{return total + item.quantity},0)
  return total;
 }