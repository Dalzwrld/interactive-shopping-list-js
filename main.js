// Define the array
const shoppingItems = [];

// Fetch your elements from your HTML code
const productName = document.getElementById("itemName");    
const productPrice = document.getElementById("itemPrice");
const addBtn = document.getElementById("addButton");
const list = document.getElementById("displayList");


// Create a function to add your items
function addItem(name, price) {
    const name = document.getElementById("itemName").value;
    const price = document.getElementById("itemPrice").value;

    // Check for validity of your inputs
    if (name === "" || isNaN(Number(price))) {
        return;
    }

    // Create an object to store each product with its price
    const item = {
        productName: `${name}`,
        productPrice: `${Number(price)}`,
        isPurchased: false, 
    };

    // Add your object into your array
    shoppingItems.push(item);

    document.getElementById("itemName").value = "";
    document.getElementById("itemPrice").value = "";
}

// Create an event listener to add items to the list
addBtn.addEventListener("click", () => {
    addItem();
    displayItems();
});


// Create a new function to display your items in your display list
function displayItems() {
    // Clear out your old display
    list.innerHTML = "";

    // Create a card that'll display your items after addition
    shoppingItems.forEach(item => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <h4>${item.productName}</h4>
            <p>Ksh ${item.productPrice}</p>
            <label><input type="checkbox" class="purchase">${item.isPurchased}</label>
        `;

        card.style.width = "300px";
        card.style.height = "160px";
        card.style.border = "1px solid #000";
        card.style.display = "flex";
        card.style.flexDirection = "row";
        card.style.padding = "5px";
        card.style.gap = "10px";

        card.querySelector("h4").style.fontSize = "1.5em";
        card.querySelector("p").style.fontSize = "1em";

        if (item.isPurchased) {
            card.style.textDecoration = "line-through";
        }

        // Create an event listener for marking your item as complete
        card.querySelector(".purchase").addEventListener("click", () => {
            item.isPurchased = !item.isPurchased;
            displayItems();
        });

        list.appendChild(card);
    });
}


// Add a clear list button
const clearBtn = document.createElement("button");
document.querySelector(.list).appendChild(clearBtn);

clearBtn.textContent = "Clear list";

// Create an event listener to clear your list
clearBtn.addEventListener("click", () => {
    shoppingItems = [];
    displayItems();
});


// Add a total button
const totalBtn = document.createElement("button");
document.querySelector(.list).appendChild(totalBtn);

totalBtn.textContent = "Total";

// Create an event listener to calculate the total price of all the items in the list
totalBtn.addEventListener("click", () => {
    let total = shoppingItems.reduce((total, price) => total + price);
    alert(`Your total price is Ksh ${total}`);
});
