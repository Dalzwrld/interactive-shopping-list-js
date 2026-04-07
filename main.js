// Define the array
const shoppingItems = [];

// Fetch your elements from your HTML code
const productName = document.getElementById("itemName");    
const productPrice = document.getElementById("itemPrice");
const addBtn = document.getElementById("addButton");
const list = document.getElementById("list");

const buttonDiv = document.getElementById("buttonDiv");

const clearBtn = document.getElementById("clearButton");
const totalBtn = document.getElementById("totalButton");

// Create a function to add your items
function addItem() {
    const name = document.getElementById("itemName").value;
    const price = document.getElementById("itemPrice").value;

    // Check for validity of your inputs
    if (name === "" || isNaN(Number(price))) {
        return;
    }

    // Create an object to store each product with its price
    const item = {
        productName: `${name}`,
        productPrice: Number(price),
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

    if (shoppingItems.length > 0) {
        clearBtn.style.visibility = "visible";
        totalBtn.style.visibility = "visible";
    }
});


// Prevent your buttons from reloading the page after form submission
document.getElementById("inputForm").addEventListener("submit", (e) => {
    e.preventDefault();
});

document.getElementById("buttonDiv").addEventListener("submit", (e) => {
    e.preventDefault();
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
            <label><input type="checkbox" class="purchase"${item.isPurchased ? "Checked": ""}>Mark as Purchased</label>
        `;

        card.style.width = "150px";
        card.style.height = "150px";
        card.style.border = "2px solid #2a2a2a";
        card.style.display = "grid";
        card.style.gridTemplateRows = "1fr 1fr 1fr";
        card.style.flexDirection = "column";
        card.style.padding = "5px";
        card.style.gap = "10px";
        card.style.marginTop = "10px";

        card.querySelector("h4").style.fontSize = "1.5em";
        card.querySelector("p").style.fontSize = "1em";

        if (item.isPurchased) {
            card.querySelector("h4").style.textDecoration = "line-through";
            card.querySelector("p").style.textDecoration = "line-through";
        }

        // Create an event listener for marking your item as complete
        const checkbox = card.querySelector(".purchase");
        checkbox.addEventListener("change", () => {
            item.isPurchased = checkbox.checked;
            displayItems();
        });

        list.appendChild(card);
    });
}


// Create an event listener to clear your list
clearBtn.addEventListener("click", () => {
    shoppingItems.length = 0;
    displayItems();

    clearBtn.style.visibility = "hidden";
    totalBtn.style.visibility = "hidden";
});


// Create an event listener to calculate the total price of all the items in the list
totalBtn.addEventListener("click", () => {
    let total = 0;
    shoppingItems.forEach(item => {
        total += item.productPrice;
    });
    alert(`Your total price is Ksh ${total}`);
});

