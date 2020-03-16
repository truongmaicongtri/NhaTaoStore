var vars = getUrlVars();

$(document).ready(function() {
    let items = getData();
    var itemId = vars['itemId'];
    var selectedItem;
    if (itemId) {
        selectedItem = items.find((item) => item.id == itemId);
    }
    showItem(selectedItem);
});


function showItem(item) {
    var listItem = document.getElementById('item');
    var string = `<div class="item col-md-2 col-sm-4 col-xs-6">
        <a href="./detail.html?itemId=${item.id}" class="overlay-wrapper">
            <img src="${item.imageUrl}" alt="${item.name} image" class="img-responsive underlay">
            <span class="overlay">
                <span class="overlay-content"> <span class="h4">Chi tiết</span> </span>
            </span>
        </a>
        <div class="item-details bg-noise">
            <h4 class="item-title">
                <a href="./detail.html?itemId=${item.id}">${item.name}</a>
            </h4>
        </div>
    </div>`;
    listItem.innerHTML = string;
}

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
        vars[key] = value;
    });
    return vars;
}