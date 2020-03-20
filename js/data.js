var data = [];

function loadDataFromCSV(callback) {
    var dataObjects;
    Papa.parse("http://test.nhataostore.com/data.csv", {
        download: true,
        header: true,
        complete: function(results) {
            dataObjects = results;
			var items = [];
            var item;

            dataObjects.data.forEach(object => {
                if (object.Name != "") {
                    if (item) {
                        item.id = item.name.toLowerCase().split(" ").join("-");
                        items.push(item);
                        item = undefined;
                    }
                    item = { id:"", name: "", imageUrl: [], category: "", prices: [] };
                    item.name = object.Name;
                    item.category = object.Category;
                    item.imageUrl.push(object.ImageUrl_1);
                    item.imageUrl.push(object.ImageUrl_2);
                    item.imageUrl.push(object.ImageUrl_3);
                    item.imageUrl.push(object.ImageUrl_4);
                } else {
                    item.prices.push({ color: object.Color, storage: object.Storage, price: object.Price });
                }
            });
			
			data = items;

            callback();
        }
    });
}


function getData(){
    return data;
}