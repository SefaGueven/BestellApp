let orderItems = [];

function renderMenu() {
    for (let i = 0; i < menues.length; i++) {
        const currentCategory = menues[i].category;
        const dishesList = menues[i].dishes;

        for (let dishIndex = 0; dishIndex < dishesList.length; dishIndex++) {
            const dish = dishesList[dishIndex];   
            switch (currentCategory) {
                case 'burger':
                document.getElementById("menuBurger").innerHTML += templateMenuItem(dish, 'burger', dishIndex);
                break;

            case 'pizza':
                document.getElementById("menuPizza").innerHTML += templateMenuItem(dish, 'pizza', dishIndex);
                break;

            case 'salad':
                document.getElementById("menuSalad").innerHTML += templateMenuItem(dish, 'salad', dishIndex);
                break;
            }
        }
    }
}

function addToOrder(category, index) {
    let item = menues.find(cat => cat.category === category).dishes[index];
    let menuToAdd = {
        name: item.name,
        price: item.price,
        amount: 1
    };
        let existingItem = orderItems.find(orderItem => orderItem.name === menuToAdd.name);

    if (existingItem) {
        existingItem.amount++;       // Gericht schon drin → Menge +1
    } else {
        orderItems.push(menuToAdd);  // Neu → zur Bestellung hinzufügen
    }
    renderOrder();
}

function calculateOrderTotals() {
    let total = 0;
    let count = 0;
    for (let i = 0; i < orderItems.length; i++) {
        total += orderItems[i].price * orderItems[i].amount;
        count += orderItems[i].amount;
    }
    return { total, count };
}

function renderOrderList() {
    const container = document.getElementById("orderItems");
    container.innerHTML = "";

    if (orderItems.length === 0) {
        container.innerHTML = templateWarningMessage();
        return;
    }

    for (let i = 0; i < orderItems.length; i++) {
        container.innerHTML += templateOrderItem(orderItems[i]);
    }
}

function renderOrder() {
    renderOrderList();

    const totals = calculateOrderTotals();

    document.getElementById("orderTotal").innerText = totals.total.toFixed(2) + " €";
    updateCartBadge(totals.count);
    
    let buyNowButton = document.querySelector(".buy-now");
    if (buyNowButton) {
        buyNowButton.disabled = (orderItems.length === 0);
    }
}


function changeItemQuantity(itemName, change) {
    let index = orderItems.findIndex(orderItem => orderItem.name === itemName);

    if (index !== -1) {
        orderItems[index].amount += change;
    } 
    if (orderItems[index].amount < 1) {
        orderItems.splice(index, 1);
    }

    renderOrder();

}

function getDecreaseBtnContent(amount) {
    return (amount === 1) ? getTrashIcon() : '-';
}

function updateCartBadge(count) {
    let badge = document.getElementById("cartBadge");
    if (badge) {
        if (count > 0) {
            badge.innerText = count;
            badge.classList.remove("d-none");
        } else {
            badge.classList.add("d-none");
        }
    }
}

function showOrderConfirmation() {
    let orderConfirmation = document.getElementById("orderConfirmation");
    orderConfirmation.showModal();
    orderItems = [];
    renderOrder();
    document.getElementById("orderSection").classList.remove("show-cart");
}

function closeOrderConfirmation() {
    let orderConfirmation = document.getElementById("orderConfirmation");
    orderConfirmation.close();
}

function toggleMobileCart(event) {
    let cart = document.getElementById("orderSection");
    cart.classList.toggle("show-cart");
}

function closeOnBackdrop(event){
    if (event.target === event.currentTarget) {
        closeOrderConfirmation();
    }
}
