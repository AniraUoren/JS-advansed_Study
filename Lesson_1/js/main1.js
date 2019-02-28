const products = [
    {id: 1, title: 'Notebook', price: 2000},
    {id: 2, title: 'Mouse', price: 20},
    {id: 3, title: 'Keyboard', price: 200},
    {id: 4, title: 'Gamepad', price: 50},
];

const renderProduct = (title = "Не доступно", price = "Не доступно") => {
    const blockOfCatalogItem = document.createElement("div");
    blockOfCatalogItem.classList.add("product-item");

    const catalogItemImg = document.createElement("img");
    catalogItemImg.setAttribute("src", "#");
    catalogItemImg.setAttribute("alt", "Item");
    
    const catalogItemH3 = document.createElement("h3");
    catalogItemH3.innerText = title;
    
    const catalogItemP = document.createElement("p");
    catalogItemP.innerText = price;
    
    const catalogItemButton = document.createElement("button");
    catalogItemButton.classList.add("buy-btn");
    catalogItemButton.innerText = "Купить";
    if (price === "Не доступно"){
        catalogItemButton.setAttribute("disabled", "disabled");
        catalogItemButton.innerText = "Не доступно";
    }
    
    blockOfCatalogItem.appendChild(catalogItemImg);
    blockOfCatalogItem.appendChild(catalogItemH3);
    blockOfCatalogItem.appendChild(catalogItemP);
    blockOfCatalogItem.appendChild(catalogItemButton);

    return blockOfCatalogItem;
};

const renderPage = list => {
    const productsList = document.querySelector(".products");
    if (list === undefined || list.length === 0){
        productsList.appendChild(renderProduct());
    }
    for (value of list){
        productsList.appendChild(renderProduct(value.title, value.price));
    }
};

renderPage(products);