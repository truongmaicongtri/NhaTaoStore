var vars = getUrlVars();
var items;


$(document).ready(function() {
    loadDataFromCSV(loadMenu);
});


function loadMenu(){
    items = getData();

    if (items) {
        var showingItem;

        var category = vars['category'];
        var searchString = vars['search'];
        if (category) {
            showingItem = items.filter((item) => item.category == category);
            showItem(showingItem);
        } else if (searchString) {
            showingItem = items.filter((item) => item.name.toLowerCase().split(" ").join("-").includes(searchString));
            showItem(showingItem);
        } else {
            showItem(items);
        }
    }
}


function showItem(items) {
    var listItem = document.getElementById('list-item');
    var string = '';
    items.forEach(item => {
        string += `<div class="item col-md-2 col-sm-4 col-xs-4" style="min-height:250px">
        <a href="./detail.html?itemId=${item.id}" class="overlay-wrapper">
            <img src="${item.imageUrl[0]}" alt="${item.name} image" class="img-responsive underlay">
            <span class="overlay">
                <span class="overlay-content"> <span class="h4">Chi tiết</span> </span>
            </span>
        </a>
        <div class="item-details bg-noise">
            <h4 class="item-title">
                <a href="./detail.html?itemId=${item.id}">${item.name}</a>
            </h4>
            <h4 class="item-title">
                <h5 class="item-title">${item.prices[0].price}</h5>
            </h4>
        </div>
    </div>`
    });
    listItem.innerHTML = string;
}

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
        vars[key] = value;
    });
    return vars;
}

function searchItem() {
    var searchString = document.getElementById("search-input").value;
    if (searchString) {
        showingItem = items.filter((item) => item.name.includes("searchString"));
        showItem(showingItem);
    }
}