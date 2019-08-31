//product list skeleton for POST
let productList = {
  products: []
};

//set first product ID
let idNumber = 1;

//create product
function create(obj) {
  obj.id = idNumber;
  productList.products.push(obj);
  idNumber++;
  return productList.products;
}

//get product by ID number in product list
function getProd(paramId) {
  let lengthOfProdList = productList.products.length;
  for (let i = 0; i < lengthOfProdList; i++) {
    if (productList.products[i].id === parseInt(paramId)) {
      return productList.products[i];
    }
  }
}

//edit product list by ID number
function edit(id, name, price, inventory) {
  let item = getProd(id);
  if (id === item.id) {
    item.name = name;
    item.price = price;
    item.inventory = inventory;
  }
  return item;
}

//delete product by ID number
function deleteItem(reqId) {
  let deleteObj = getProd(reqId);
  let itemIndex = productList.products.indexOf(deleteObj);
  productList.products.splice(itemIndex, 1);
}

//get completed list
function retrieveAll() {
  return productList;
}

module.exports = {
  productList,
  create,
  getProd,
  edit,
  deleteItem,
  retrieveAll
};
