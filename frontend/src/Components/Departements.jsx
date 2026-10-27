/** @format */

import React, { useState } from "react";

const Departements = () => {
  const [nom, setNom] = useState("");
  const [message, setMessage] = useState("");

  const AjouterDepartements = async (e) => {
    e.preventDefault();

    if (nom === "") {
      setMessage("Veuillez remplir le champ");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/departements", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nom_departements: nom }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message);
        return;
      }
      setMessage(data.message);
      setNom("");

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className='py-10'>
      <div className='shadow bg-white p-5 rounded w-1/2 mx-auto'>
        <h3 className='text-2xl text-center text-[#186049]'>
          Ajouter un département
        </h3>
        <form
          className='flex flex-col gap-3 my-5'
          onSubmit={AjouterDepartements}
        >
          <label className='text-gray-500'>Nom de département</label>
          <input
            type='text'
            placeholder='Entrez un nom...'
            className='border border-gray-200 p-2 rounded w-full'
            value={nom}
            onChange={(e) => setNom(e.target.value)}
          />
          <button className='text-white p-2 rounded bg-[#186049] '>
            Ajouter
          </button>
          <a href='/' className='text-center text-[#186049] cursor-pointer'>
            Voir les listes de départements
          </a>
        </form>
        {message && <p className='text-red-600 text-center'>{message}</p>}
      </div>
    </div>
  );
};

export default Departements;
