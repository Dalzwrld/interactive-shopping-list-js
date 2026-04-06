// Define the array
const shoppingItems = [];

// Fetch your elements from your HTML code
const productName = document.getElementById("itemName");    
const productPrice = document.getElementById("itemPrice");
const addBtn = document.getElementById("addButton");
const list = document.getElementById("list");


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

// Link your add button and prevent it from reloading the page after form submission
document.getElementById("inputForm").addEventListener("submit", (e) => {
    e.preventDefault();
});

// Create a new function to display your items in your display list
function displayItems() {
    // Clear out your old display
    list.innerHTML = "";

    // Create a card that'll display your items after addition
    shoppingItems.forEach(item => {
        const card = document.createElement("li");
        card.classList.add("card");

        card.innerHTML = `
            <h4>${item.productName}</h4>
            <p>Ksh ${item.productPrice}</p>
            <label><input type="checkbox" class="purchase">${item.isPurchased}</label>
        `;

        card.style.width = "150px";
        card.style.height = "150px";
        card.style.border = "2px solid #2a2a2a";
        card.style.display = "grid";
        card.style.gridTemplateRows = "1fr 1fr 1fr";
        card.style.flexDirection = "row";
        card.style.padding = "5px";
        card.style.gap = "10px";
        card.style.marginTop = "10px";

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


// Create a section to put your buttons in within list
const buttonDiv = document.getElementById("buttonDiv");

buttonDiv.appendChild(clearBtn);
buttonDiv.appendChild(totalBtn);

buttonDiv.style.height = "150px";
buttonDiv.style.width = "100%";
buttonDiv.style.display = "flex";
buttonDiv.style.justifyContent = "center";
buttonDiv.style.alignItems = "center";
buttonDiv.style.gap = "10px";



// Add a clear list button
const clearBtn = document.createElement("button");
document.querySelector("#list").appendChild(clearBtn);

clearBtn.textContent = "Clear list";

// Create an event listener to clear your list
clearBtn.addEventListener("click", () => {
    shoppingItems.length = 0;
    displayItems();

    clearBtn.style.visibility = "hidden";
    totalBtn.style.visibility = "hidden";
});


// Add a total button
const totalBtn = document.createElement("button");
document.querySelector("#list").appendChild(totalBtn);

totalBtn.textContent = "Total";

// Create an event listener to calculate the total price of all the items in the list
totalBtn.addEventListener("click", () => {
    let total = shoppingItems.reduce((total, item) => total + Number(item.productPrice));
    alert(`Your total price is Ksh ${total}`);
});


document.querySelectorAll("#buttonDiv button").style.padding = "15px";
document.querySelectorAll("#buttonDiv button").style.borderRadius = "30px";
document.querySelectorAll("#buttonDiv button").style.backgroundColor = "#04fb00";
document.querySelectorAll("#buttonDiv button").style.width = "250px";
document.querySelectorAll("#buttonDiv button").style.fontWeight = "bold";
document.querySelectorAll("#buttonDiv button").style.fontSize = "1em";
document.querySelectorAll("#buttonDiv button").style.marginTop = "10px";
document.querySelectorAll("#buttonDiv button").style.visibility = "hidden";

