var vars = getUrlVars();
var categoryNames = ["iphone", "ipad", "macbook", "apple-watch", "phu-kien", "may-99"];
var items;


$(document).ready(function() {
    items = getData();

    categoryNames.forEach(categoryName => {
        var hiddenDiv = document.getElementById(categoryName);
        renderItemsForHiddenDiv(hiddenDiv, categoryName);
    });

    $('#main-menu a').hover(function() {
        $(this).next().css("visibility", "visible");
    }, function() {
        $(this).next().css("visibility", "hidden");
    })

    $('#main-menu div').hover(function() {
        $(this).css("visibility", "visible");
    }, function() {
        $(this).css("visibility", "hidden");
    });
});


function renderItemsForHiddenDiv(hiddenDiv, categoryName) {
    var itemsWillBeShowInPopUp;
    if (categoryName) {
        itemsWillBeShowInPopUp = items.filter((item) => item.category == categoryName);
    }

    var string = '';
    itemsWillBeShowInPopUp.forEach(item => {
        string += `<button type="button" onclick=gotoDetail("${item.id}") class="btn btn-outline-primary item-button">${item.name}</button>`
    });

    hiddenDiv.innerHTML = string;
}

function gotoDetail(itemId) {
    window.location = "./detail.html?itemId=" + itemId;
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
    searchString = searchString.toLowerCase().split(" ").join("-");
    window.location = "./index.html?search=" + searchString;
}