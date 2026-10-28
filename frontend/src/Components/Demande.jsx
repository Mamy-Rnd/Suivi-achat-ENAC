/** @format */

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Demande = () => {
  const [departements, seDepartements] = useState([]);
  const [date, setDate] = useState("");
  const [designation, setDesignation] = useState("");
  const [quantite, setQuantite] = useState(1);
  const [motif, setMotif] = useState("");
  const [site, setSite] = useState("");
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  const AfficherDepartements = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/departements");
      const data = await response.json();

      console.log(data);
      seDepartements(data.resultat);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    AfficherDepartements();
  }, []);

  const AddDemande = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/api/demande", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          date_demande: date,
          designation,
          quantite,
          motif,
          departement_id: site,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message);
        return;
      }
      setMessage(data.message);
      setDate("");
      setDesignation("");
      setQuantite("");
      setMotif("");

      //      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='shadow p-2 rounded bg-white'>
      <h3 className='text-center text-blue-500 text-2xl my-2'>
        Faire un démande d'achat
      </h3>
      <form className='flex flex-col gap-2 p-3' onSubmit={AddDemande}>
        <label>Date de demande</label>
        <input
          type='date'
          className='border border-gray-300 p-2 rounded'
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <label>Désignation</label>
        <input
          type='text'
          className='border border-gray-300 p-2 rounded'
          value={designation}
          onChange={(e) => setDesignation(e.target.value)}
        />
        <label>Quantite</label>
        <input
          type='number'
          className='border border-gray-300 p-2 rounded'
          value={quantite}
          onChange={(e) => setQuantite(e.target.value)}
        />
        <label>Motif</label>
        <textarea
          className='border border-gray-300 rounded p-2'
          value={motif}
          onChange={(e) => setMotif(e.target.value)}
        ></textarea>
        <label>Departements</label>
        <select
          className='border border-gray-300 p-2 rounded'
          value={site}
          onChange={(e) => setSite(e.target.value)}
        >
          {departements.map((d) => (
            <option value={d.id} key={d.id}>
              {d.nom_departements}
            </option>
          ))}
        </select>
        <button className='bg-blue-500 p-2 rounded text-white'>
          Envoyer un demande
        </button>
        <Link to='/dashboard' className='text-center text-blue-500 my-2'>
          Voir les demandes
        </Link>
      </form>
      {message && <p className='text-center'>{message}</p>}
    </div>
  );
};

export default Demande;
