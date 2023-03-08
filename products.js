const token = localStorage.getItem("token");
const baseUrl = "http://localhost:3000";

//target DOM elements
const productsContainer = document.getElementById("productsContainer");

let productName = document.getElementById("productName");
let productPrice = document.getElementById("productPrice");

let docForm = document.getElementById("docForm");

docForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const productNameText = productName.value;
  const productPriceText = productPrice.value;
  console.log(productNameText, productPriceText);

  fetch(`${baseUrl}/products`, {
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ name: productNameText, price: productPriceText }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("successfully Added new product: ", data);
      fetchProducts();
    });
});

function fetchProducts() {
  fetch(`${baseUrl}/products`, {
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(typeof data);
      if (Array.isArray(data)) {
        const productsElements = data.map(function renderElement(productObj) {
          const { id, name, price } = productObj;
          const productElement = document.createElement("div");
          productElement.innerText = `Name: ${name}
          price: ${price}
          id: ${id}`;
          productElement.style.cssText = `width:400px;
          height:400px;
          border:5px solid red;
          border-radius:24px;
          font-size:40px;
          font-weight:bold;
          margin:32px`;
          return productElement;
        });
        productsContainer.replaceChildren(...productsElements);
      }
    })
    .catch(function (error) {
      console.log("error: ", error);
    });
}

document.addEventListener("DOMContentLoaded", () => {
  fetchProducts();
});
