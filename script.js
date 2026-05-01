let orderItems = [];

function renderMenu() {
    for (let i = 0; i < menues.length; i++) {
        const currentCategory = menues[i].category;
        const dishesList = menues[i].dishes;

        for (let dishIndex = 0; dishIndex < dishesList.length; dishIndex++) {
            const dish = dishesList[dishIndex];   
            if (currentCategory === 'burger') {
                document.getElementById("menuBurger").innerHTML += templateMenuItem(dish, 'burger', dishIndex);
            } else if (currentCategory === 'pizza') {
                document.getElementById("menuPizza").innerHTML += templateMenuItem(dish, 'pizza', dishIndex);
            } else if (currentCategory === 'salad') {
                document.getElementById("menuSalad").innerHTML += templateMenuItem(dish, 'salad', dishIndex);
            }
        }
    }
}
