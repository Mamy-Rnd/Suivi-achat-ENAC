/** @format */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  //etat
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const Connexion = async (e) => {
    e.preventDefault();

    if (email === "" || password === "") {
      setMessage("veuillez remplir tous les champs!");
      return;
    }
    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message);
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      setMessage(data.message);
      navigate("/dashboard");

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className='py-20'>
      <div className='shadow w-1/2 mx-auto px-3 py-5 rounded-2xl bg-white'>
        <h3 className='text-[#186049] text-2xl font-semibold text-center my-3'>
          Se Connecter
        </h3>
        <form className='flex flex-col gap-5 ' onSubmit={Connexion}>
          <input
            type='text'
            placeholder='Entrez votre addresse email'
            className='border border-gray-200 p-2 rounded w-full'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type='password'
            placeholder='Entrez votre mot de passe'
            className='border border-gray-200 p-2 rounded w-full'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className='text-white p-2 bg-[#186049] rounded'>
            Connexion
          </button>
        </form>
        <h3 className='text-center my-3'>S'inscrivez-vous</h3>
        <h3 className='text-center'>Mot de passe oublié</h3>

        {message && <p className='text-center text-red-500'>{message}</p>}
      </div>
    </div>
  );
};

export default Login;
