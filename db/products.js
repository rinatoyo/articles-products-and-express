//product list skeleton for POST
let productList = {
  products: []
  // message: "",
  // showMessage: false
};

//set first product ID
let idNumber = 1;

//product POST function
function create(obj) {
  obj.id = idNumber;
  productList.products.push(obj);
  idNumber++;
  // const hasKeys = obj.name && obj.price && obj.inventory;
  // console.log("key", hasKeys);
  // if (hasKeys) {
  //   obj.id = idNumber;
  //   productList.products.push(obj);
  //   idNumber++;
  //   productList.message = "{success: true}";
  //   productList.showMessage = true;
  // } else {
  //   productList.message = "{success: false}";
  //   productList.showMessage = true;
  // }
}

function getProd(paramId) {
  let lengthOfProdList = productList.products.length;
  for (let i = 0; i < lengthOfProdList; i++) {
    if (productList.products[i].id === parseInt(paramId)) {
      return productList.products[i];
    }
  }
}

function edit(id, name, price, inventory) {
  let item = getProd(id);
  if (id === item.id) {
    item.name = name;
    item.price = price;
    item.inventory = inventory;
  }
  return item;
}

function deleteItem(reqId) {
  let deleteObj = getProd(reqId);
  console.log("delete object", deleteObj);
  let itemIndex = productList.products.indexOf(deleteObj);
  productList.products.splice(itemIndex, 1);
}

//get completed list
function retrieveAll() {
  return productList;
}

module.exports = {
  create,
  getProd,
  edit,
  deleteItem,
  retrieveAll
};
