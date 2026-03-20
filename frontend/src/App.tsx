import React from "react";

function Login() {

  async function fazerLogin() {
    const response = await fetch("https://localhost:44373/api/usuario/AuthAsync", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: "zed",
        password: "123"
      })
    });

    const data = await response.json();

    console.log(data);
  }

  return (
    <div>
      <h2>Login</h2>

      <button onClick={fazerLogin}>
        Fazer Login
      </button>
    </div>
  );
}

export default Login;