var vars = getUrlVars();
var categoryNames = ["iphone", "ipad", "macbook", "apple-watch", "phu-kien", "may-99"];
var items;
var priceObjects;
var allColors = [];
var allStorages = [];
var selectedItem;
var selectedColor;
var selectedStorage;

$(document).ready(function() {
    items = getData();
    var itemId = vars['itemId'];
    if (itemId) {
        selectedItem = items.find((item) => item.id == itemId);
    }

    priceObjects = selectedItem.prices;

    priceObjects.forEach(object => {
        if (!allColors.includes(object.color)) {
            allColors.push(object.color);
        }
        if (!allStorages.includes(object.storage)) {
            allStorages.push(object.storage);
        }
    });

    showItem(selectedItem);
    showColor();
    showStorage();
    loadItemColorText();
});

function showItem(item) {
    var itemImage = document.getElementById('item-image');
    itemImage.setAttribute("src", item.imageUrl[0]);

    var itemMiniImages = document.getElementsByClassName('mini-img');
    for (let index = 0; index < itemMiniImages.length; index++) {
        itemMiniImages[index].setAttribute("src", item.imageUrl[index]);
    }

    var itemNameElement = document.getElementById('item-name');
    itemNameElement.innerText = item.name;
}

function loadItemColorText() {
    if (selectedColor && selectedStorage) {
        var itemColor = document.getElementById('item-color');
        itemColor.innerText = `(Màu ${selectedColor.innerText} phiên bản ${selectedStorage.innerText})`
    }
}

function showColor() {
    var div_colors = document.getElementById("colors");
    var string = '';
    allColors.forEach(color => {
        string += `<div class="col-md-2 col-sm-3 col-xs-3">
        <button type="button" class="btn btn-outline-primary btn-color" onclick=selectColor(this) style="margin-top: 5px;">${color}</button>
        </div>`
    });
    div_colors.innerHTML = string;
    var buttons = document.getElementsByClassName("btn-color");
    if (buttons) {
        buttons[0].click();
    }
}

function showStorage() {
    var div_storages = document.getElementById("storages");
    var string = '<div class="col-md-1"></div>';
    allStorages.forEach(storage => {
        string += `<div class="col-md-2 col-sm-3 col-xs-3">
        <button type="button" class="btn btn-outline-primary btn-storage" onclick=selectStorage(this) style="margin-top: 5px;">${storage}</button>
        </div>`
    });
    div_storages.innerHTML = string;

    var buttons = document.getElementsByClassName("btn-storage");
    if (buttons) {
        buttons[0].click();
    }
}

//reload if item with selected storage doesn't have some color
function reloadColor() {
    var selectedStorageName = selectedStorage.innerText;
    var missingColors = allColors;

    priceObjects.forEach(object => {
        if (object.storage == selectedStorageName) {
            missingColors = missingColors.filter(color => color != object.color);
        }
    });

    var buttons = document.getElementsByClassName("btn-color");
    Array.prototype.forEach.call(buttons, function(button) {
        button.disabled = false;
        if (missingColors.includes(button.innerText)) {
            button.disabled = true;
        }
    });
}

//reload if item with selected color doesn't have some storage
function reloadStorage() {
    var selectedColorName = selectedColor.innerText;
    var missingStorages = allStorages;

    priceObjects.forEach(object => {
        if (object.color == selectedColorName) {
            missingStorages = missingStorages.filter(storage => storage != object.storage);
        }
    });

    var buttons = document.getElementsByClassName("btn-storage");
    Array.prototype.forEach.call(buttons, function(button) {
        button.disabled = false;
        if (missingStorages.includes(button.innerText)) {
            button.disabled = true;
        }
    });
}

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
        vars[key] = value;
    });
    return vars;
}

function changeItemImage(imgSrc) {
    document.getElementById("item-image").setAttribute("src", imgSrc);
}


function selectColor(element) {
    if (selectedColor) {
        selectedColor.style.borderColor = "gray";
    }
    element.style.borderColor = "blue";
    selectedColor = element;

    reloadStorage();
    changePrice();
}

function selectStorage(element) {
    if (selectedStorage) {
        selectedStorage.style.borderColor = "gray";
    }
    element.style.borderColor = "blue";
    selectedStorage = element;

    reloadColor();
    changePrice();
}

function changePrice() {
    if (selectedStorage && selectedColor) {
        var itemPrice = document.getElementById("item-price");
        selectedItem.prices.forEach(object => {
            if (object.color === selectedColor.innerText && object.storage === selectedStorage.innerText) {
                itemPrice.innerText = object.price;
                return;
            }
        });
        loadItemColorText();
    }
}