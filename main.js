// Define the array & add it into local storage to save your added items
let shoppingList = JSON.parse(localStorage.getItem("list")) || [];

// Fetch your elements from your HTML code
const productName = document.getElementById("itemName");    
const productPrice = document.getElementById("itemPrice");
const addBtn = document.getElementById("addButton");
const list = document.getElementById("list");

const buttonDiv = document.getElementById("buttonDiv");

// Define button types to allow preventDefault() to work
const clearBtn = document.getElementById("clearButton");
clearBtn.type = "button";


// Create a function to add your items
function addItem() {
    const name = document.getElementById("itemName").value;
    const price = document.getElementById("itemPrice").value;

    // Check for validity of your inputs
    if (name === "" || isNaN(parseFloat(price))) {
        return;
    }

    // Create an object to store each product with its price
    const item = {
        productName: `${name}`,
        productPrice: parseFloat(price),
        isPurchased: false,
    };

    // Add your object into your array
    shoppingList.push(item);
    saveToLocalStorage();

    document.getElementById("itemName").value = "";
    document.getElementById("itemPrice").value = "";
}

// Create an event listener to add items to the list
addBtn.addEventListener("click", () => {
    addItem();
    saveToLocalStorage();
    displayItems();

    if (shoppingList.length > 0) {
        clearBtn.style.visibility = "visible";
    }
});


// Create an event listener to prevent your add button from reloading the page after form submission
document.getElementById("inputForm").addEventListener("submit", (e) => {
    e.preventDefault();
});


// Create a new function to display your items in your display list
function displayItems() {
    // Clear out your old display
    list.innerHTML = "";

    // Create a card that'll display your items after addition
    shoppingList.forEach(item => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <label><input type="checkbox" class="purchase"${item.isPurchased ? "Checked": ""}></label>

            <div class="info">
                <h4>${item.productName}</h4>
                <p>Ksh ${item.productPrice}</p>
            </div>

            <div class="actions">
                <button><img src="Images/pen-to-square-solid-full.svg" alt="Edit button"></button>
                <button><img src="Images/trash-solid-full.svg" alt="Delete button"></button>
            </div>
        `;

        card.style.width = "800px";
        card.style.height = "150px";
        card.style.border = "none";
        card.style.display = "flex";
        card.style.flexDirection = "column";
        card.style.padding = "10px";
        card.style.gap = "15px";
        card.style.marginTop = "10px";
        card.style.boxShadow = "10px 10px 5px #151414";
        card.style.backgroundColor = "#fff";
        card.style.borderRadius = "5px";

        card.querySelector("h4").style.fontSize = "1.5em";
        card.querySelector("p").style.fontSize = "1em";
        card.querySelector("p").style.color = "#07aa12";
        card.querySelector("p").style.fontWeight = "500";
        

        if (item.isPurchased) {
            card.querySelector("h4").style.textDecoration = "line-through";
            card.querySelector("p").style.textDecoration = "line-through";
        }

        // Create an event listener for marking your item as complete
        const checkbox = card.querySelector(".purchase");
        checkbox.addEventListener("change", () => {
            item.isPurchased = checkbox.checked;
            saveToLocalStorage();
            displayItems();
        });

        list.appendChild(card);
    });
}


// Create an event listener to clear your list
clearBtn.addEventListener("click", () => {
    shoppingList.length = 0;
    saveToLocalStorage();
    displayItems();

    clearBtn.style.visibility = "hidden";
});


// Create an event listener to prevent your buttons form reloading the page after form submission
document.getElementById("buttonDiv").addEventListener("submit", (e) => {
    e.preventDefault();
});

// Save to local storage
function saveToLocalStorage() {
    localStorage.setItem("list", JSON.stringify(shoppingList));
}

// Initial load
displayItems();