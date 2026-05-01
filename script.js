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
        existingItem.amount++;
    } else {
        orderItems.push(menuToAdd);
    }
    renderOrder();
}
