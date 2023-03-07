const form = document.getElementById("loginForm");
const username = document.getElementById("username");
const password = document.getElementById("password");

const baseUrl = "http://localhost:3000";

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const usernameValue = username.value;
  const passwordValue = password.value;

  const reqBody = {
    username: usernameValue,
    password: passwordValue,
  };

  let token = null;

  console.log("reqBody: ", JSON.stringify(reqBody));

  fetch(`${baseUrl}/login`, {
    headers: { "Content-Type": "application/json" },
    method: "post",
    body: JSON.stringify(reqBody),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.token) {
        console.log("data: ", data);
        localStorage.setItem("token", data.token);
        window.location.href = "products.html";
      } else {
        alert("wrong credentials");
      }
    })
    .catch((e) => console.log(e));
});
