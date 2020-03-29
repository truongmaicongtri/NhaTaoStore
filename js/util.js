var vars = getUrlVars();
var categoryNames = ["iphone", "ipad", "macbook", "apple-watch", "phu-kien", "may-99"];
var items;
var isDrawerEnable = false;


$(document).ready(function() {
    loadDataFromCSV(loadNavigation);

});

function loadNavigation() {
    items = getData();

    if (items) {
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
    }
}


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
    var searchString = document.getElementById("input-search").value;

    if (searchString == "") {
        searchString = document.getElementById("input-search-actived").value;
    }

    if (searchString != "") {
        searchString = searchString.toLowerCase().split(" ").join("-");
        window.location = "./index.html?search=" + searchString;
    }
}

/* Set the width of the side navigation to 250px */
function openNav() {
    if (isDrawerEnable) {
        closeNav();
        isDrawerEnable = false;
        return;
    }
    document.getElementById("mySidenav").style.width = "250px";
    isDrawerEnable = true;
}

/* Set the width of the side navigation to 0 */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    isDrawerEnable = false;
}