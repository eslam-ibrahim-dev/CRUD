var productName = document.getElementById("pName");
var productPrice = document.getElementById("pPrice");
var productCat = document.getElementById("pCategory");
var productDescription = document.getElementById("pDescription");
var alertName = document.getElementById("nameAlert");
var alertPrice = document.getElementById("priceAlert");
var alertcat = document.getElementById("alertcat");
var alertdesc = document.getElementById("alertdesc");
var Btn = document.getElementById("mybtn");

var allProducts = [];

//return the products
if (localStorage.getItem("saveProducts") != null) {
    allProducts = JSON.parse(localStorage.getItem("saveProducts"));
    displayProduct();
}

// add the product
function addProduct() {
    if (VaildateProductName() == true
        && VaildateProductPrice() == true
        && ValidateProductCategory() == true
        && VaildateProductDescription() == true) {
        var product = {
            name: productName.value,
            price: productPrice.value,
            category: productCat.value,
            description: productDescription.value,
        };
        allProducts.push(product);
        localStorage.setItem("saveProducts", JSON.stringify(allProducts));
        displayProduct();
        clearProducts();
        Btn.disabled = true;


    }
    else {

    }

}

//reset the inputs
function clearProducts() {
    productName.value = '';
    productPrice.value = '';
    productCat.value = '';
    productDescription.value = '';
}


// display the table 
function displayProduct() {
    var newProduct = ``;
    for (var i = 0; i < allProducts.length; i++) {
        newProduct += `<tr><td>${i}</td>
        <td>${allProducts[i].name}</td>
        <td>${allProducts[i].price}</td>
        <td>${allProducts[i].category}</td>
        <td>${allProducts[i].description}</td>
        <td><a href="#" class="text-decoration-none">
        <i onclick="updateProduct(${i})" class="fas fa-edit text-warning"></i></a></td>
        <td><a href="#" class="text-decoration-none"><i onclick="deleteProduct(${i})" class="fas fa-minus-circle text-danger"></i></a></td></tr>`
    }

    document.getElementById("tbody").innerHTML = newProduct;
}


// delete the product
function deleteProduct(index) {
    allProducts.splice(index, 1);
    localStorage.setItem("saveProducts", JSON.stringify(allProducts));
    displayProduct();
}

//udpate the product
function updateProduct(index) {
    productName.value = allProducts[index].name;
    productPrice.value = allProducts[index].price;
    productCat.value = allProducts[index].category;
    productDescription.value = allProducts[index].description;

    Btn.innerHTML = "Update Product"
    Btn.setAttribute("onclick", `UpdateCurrentProduct(${index})`);
    Btn.classList.remove("mybtn");
    Btn.classList.add("btn-warning");
}

//update the current product
function UpdateCurrentProduct(index) {
    allProducts[index].name = productName.value;
    allProducts[index].price = productPrice.value;
    allProducts[index].category = productCat.value;
    allProducts[index].description = productDescription.value;

    displayProduct();
    clearProducts();
    localStorage.setItem("saveProducts", JSON.stringify(allProducts));

    Btn.innerHTML = "Add Product"
    Btn.setAttribute("onclick", `addProduct`);
    Btn.classList.add("mybtn");
    Btn.classList.remove("btn-warning");
}

//search bar
function Search(userword) {
    var newProduct = '';

    for (var i = 0; i < allProducts.length; i++) {
        if (allProducts[i].name.toLowerCase().includes(userword.toLowerCase()) == true) {
            newProduct += `<tr><td>${i}</td>
            <td>${allProducts[i].name}</td>
            <td>${allProducts[i].price}</td>
            <td>${allProducts[i].category}</td>
            <td>${allProducts[i].description}</td>
            <td><a href="#" class="text-decoration-none">
            <i onclick="updateProduct(${i})" class="fas fa-edit text-warning"></i></a></td>
            <td><a href="#" class="text-decoration-none"><i onclick="deleteProduct(${i})" class="fas fa-minus-circle text-danger"></i></a></td></tr>`
        }
    }
    document.getElementById("tbody").innerHTML = newProduct;
}


//vaildate the name of the product
function VaildateProductName() {
    var regex = /^[A-Z][a-z A-z 0-9]{2,}$/;
    if (regex.test(productName.value) == true) {
        alertName.classList.remove("d-block");
        alertName.classList.add("d-none");

        return true;
    }
    else {
        alertName.classList.remove("d-none");
        alertName.classList.add("d-block");
        return false;
    }
}


// vaildate the price of the product
function VaildateProductPrice() {
    var regex = /^([1-4][0-9]{3,4}|5000|50000)$/
    if (regex.test(productPrice.value) == true) {
        alertPrice.classList.remove("d-block");
        alertPrice.classList.add("d-none");
        return true;
    }
    else {
        alertPrice.classList.add("d-block");
        alertPrice.classList.remove("d-none");
        return false;
    }
}

//Vaildate Category
function ValidateProductCategory() {
    var regex = /^(mobile|tv|laptop)$/
    if (regex.test(productCat.value) == true) {
        alertcat.classList.remove("d-block");
        alertcat.classList.add("d-none");
        return true;
    }
    else {
        alertcat.classList.add("d-block");
        alertcat.classList.remove("d-none");
        return false;
    }
}

//Vaildate Description
function VaildateProductDescription() {
    var regex = /^\w{5,}$/
    if (regex.test(productDescription.value) == true) {
        alertdesc.classList.remove("d-block");
        alertdesc.classList.add("d-none");
        console.log("hello")
        return true;
    }
    else {
        alertdesc.classList.add("d-block");
        alertdesc.classList.remove("d-none");
        return false;
    }
}