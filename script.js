var productName = document.getElementById("productName");

var productPrice = document.getElementById("productPrice");

var productCategory = document.getElementById("productCategory");

var productDesc = document.getElementById("productDesc");

var addBtn = document.getElementById("addBtn");

var newIndex = 0;
// var products=localStorage.getItem("myProducts");



if (localStorage.getItem("myProducts") == null) {
    products = [];
}
else {
    products = JSON.parse(localStorage.getItem("myProducts"));
    display();
}

addBtn.onclick = function () {
    if (productName.value == "" || productPrice.value == "" || productCategory.value == "" || productDesc.value == "") {
        alert("Please insert all data in fields")
    }
    else {
        if (addBtn.innerHTML == "add") {
            addProduct();
        }
        else {
            saveUpdate();
        }
    }
};

function addProduct() {
    var product = {
        name: productName.value,
        price: productPrice.value,
        category: productCategory.value,
        Desc: productDesc.value,
    };
    products.push(product);
    localStorage.setItem("myProducts", JSON.stringify(products));
    display();
    clear();
    alert("The Product is added")
}

function display() {
    var cartona = "";
    for (var i = 0; i < products.length; i++) {
        cartona += `<tr>
        <td> ${(i + 1)}</td>
        <td>${products[i].name}</td>
        <td>${products[i].price}</td>
        <td>${products[i].category}</td>
        <td>${products[i].Desc}</td>
        <td> <button class = "btn btn-outline-warning" onclick="updateProuduct(${i})"> update </button></td>
        <td> <button class = "btn btn-outline-danger" onclick="deleteProuduct(${i})"> delete </button></td>
        </tr>`
    }
    document.getElementById("tableBody").innerHTML = cartona;
}

function clear() {
    productName.value = "";
    productPrice.value = "";
    productCategory.value = "";
    productDesc.value = "";
};

function deleteProuduct(index) {
    products.splice(index, 1);
    localStorage.setItem("myProducts", JSON.stringify(products));
    display()
};

function search(val) {

    var searchTable = "";
    var searchList = "";
    var newVal = "";
    for (var i = 0; i < products.length; i++) {
        if (products[i].name.toLowerCase().includes(val.trim().toLowerCase()) == true && val != "") {
            searchTable += `<tr>
            <td> ${(i + 1)}</td>
            <td>${products[i].name}</td>
            <td>${products[i].price}</td>
            <td>${products[i].category}</td>
            <td>${products[i].Desc}</td>
            <td> <button class = "btn btn-outline-warning" onclick="updateProuduct(${i})"> update </button></td>
            <td> <button class = "btn btn-outline-danger" onclick="deleteProuduct(${i})"> delete </button></td>
            </tr>`;
            newVal = products[i].name.replace(val.toLowerCase(), `<span style="background-color:#09c; color:white;font-size:1.3rem; font-family:seguo ui light;">${val.toLowerCase()}</span>`)
            searchList += `<p>${newVal}</p>`;
        }
    }
    document.getElementById("tableBody").innerHTML = searchTable;
    document.getElementById("searchList").innerHTML = searchList;
    display();

}

function updateProuduct(index) {
    productName.value = products[index].name;
    productCategory.value = products[index].category;
    productPrice.value = products[index].price;
    productDesc.value = products[index].Desc;
    addBtn.innerHTML = "update";
    addBtn.className = "btn btn-warning";
    newIndex = index;
};

function saveUpdate() {
    var product = {
        name: productName.value,
        price: productPrice.value,
        category: productCategory.value,
        Desc: productDesc.value,
    };

    products[newIndex] = product;
    // products.splice(newIndex, 1, product);
    localStorage.setItem("myProducts", JSON.stringify(products));
    display();
    clear();
    alert("The Product is updated");
    addBtn.innerHTML = "add";
    addBtn.className = "btn btn-primary";

};