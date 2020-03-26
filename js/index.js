var vars = getUrlVars();
var items;
var isSearchBarActive = false;
var isNavBarActive = true;
var isShowNavBar = false;


$(document).ready(function() {
    loadCatogories();
    $(".icon-1").click(function() {
        if (isShowNavBar) {
            $(".navbar-toggle").click();
        }
        if ($(window).width() < 434) {
            if (isSearchBarActive == false) {
                $(".main-navbar").css("width", "24%");
                $("#navbar-title").hide();
                $(".main-searchbar").css("width", "50%");
            } else {
                $(".main-navbar").css("width", "50%");
                $("#navbar-title").show();
                $(".main-searchbar").css("width", "25%");
            }
            isSearchBarActive = !isSearchBarActive;
            isNavBarActive = !isNavBarActive;
        }
        $(".input").toggleClass("active");
        $(".search-box-container").toggleClass("active");
    })

    $(".navbar-toggle").click(function() {
        if (isNavBarActive == false) {
            $("#navbar-title").hide();
            $(".icon-1").click();
        } else {
            $("#navbar-title").show();
        }
        isShowNavBar = !isShowNavBar;
    })
});


function loadCatogories() {
    var searchString = vars['search'];
    if (searchString) {
        loadDataFromCSV(loadItem);
    } else {

    }
}


function loadItem() {
    items = getData();
    var showingItem;
    var searchString = vars['search'];
    if (items) {
        showingItem = items.filter((item) => item.name.toLowerCase().split(" ").join("-").includes(searchString));
        document.getElementById("list-category").style.display = "none";
        showItem(showingItem);
    }
}


function showItem(items) {
    var listItem = document.getElementById('list-item');
    var string = '';
    items.forEach(item => {
        string += `<div class="item col-md-2 col-sm-4 col-xs-4">
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
            <h5 class="item-title">${item.prices[0].price}</h5>
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