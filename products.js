const token = localStorage.getItem("token");
console.log("token: ", token);

const baseUrl = "http://localhost:3000";

document.addEventListener("DOMContentLoaded", () => {
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
        document.body.append(...productsElements);
      }
    })
    .catch(function (error) {
      console.log("error: ", error);
    });
});
