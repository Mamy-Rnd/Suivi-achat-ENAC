/** @format */

import React from "react";
import { useState, useEffect } from "react";

const ListDemande = () => {
  const [demandes, setDemandes] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [message, setMessage] = useState("");
  // const [loading, setLoading] = useState(false);

  const limit = 6;
  const role = localStorage.getItem("role");

  const AfficherDemande = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/demande?page=${page}&limit=${limit}`,
      );
      const data = await response.json();

      setDemandes(data.resultat.data);
      setTotalPage(data.resultat.totalPage);
      //   setLoading(true);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  //appelle la fonction Afficher
  useEffect(() => {
    AfficherDemande();
  }, [page]);

  /* if (loading) {
    return (
      <div>
        <h3>Chargement en cours...</h3>
      </div>
    );
  }*/

  const Envoyer = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/demande/${id}/status`,
        {
          method: "PATCH",
        },
      );
      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message);
        return;
      }
      setMessage(data.message);

      //actualiser
      await AfficherDemande();

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const AccepterDemande = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/demande/${id}/status/accepter`,
        {
          method: "PATCH",
        },
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }
      alert(data.message);
      await AfficherDemande();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className='flex flex-wrap gap-3 justify-center'>
        {demandes.map((d, index) => (
          <div
            key={index}
            className='flex justify-between shadow shadow-gray-500 p-3 rounded bg-white w-full'
          >
            <div>
              <ul>
                <li>
                  <span className='text-gray-700 font-semibold'>
                    Date de demande :{" "}
                  </span>
                  {d.date_demande.split("T")[0]}
                </li>
                <li>
                  <span className='text-gray-700 font-semibold'>
                    Nom de département :{" "}
                  </span>
                  {d.nom_departements}
                </li>
                <li>
                  <span className='text-gray-700 font-semibold'>
                    Désignation :{" "}
                  </span>
                  {d.designation}
                </li>
                <li>
                  <span className='text-gray-700 font-semibold'>
                    Quantité :{" "}
                  </span>
                  {d.quantite}
                </li>
                <li>
                  <span className='text-gray-700 font-semibold'>Motif : </span>
                  {d.motif}
                </li>
              </ul>
              {d.status === "en_attente" && role === "Responsable" && (
                <button
                  className='bg-blue-500 p-2 rounded text-white my-4'
                  onClick={() => Envoyer(d.id)}
                >
                  Transmettre
                </button>
              )}
              {role === "Directeur" && (
                <div className='flex gap-3 my-3'>
                  <button
                    className='bg-blue-500 p-2 rounded text-white hover:bg-blue-600'
                    onClick={() => AccepterDemande(d.id)}
                    disabled={d.status === "validee"}
                  >
                    Accepter
                  </button>
                  <button className='bg-blue-500 p-2 rounded text-white hover:bg-blue-600'>
                    Réfuser
                  </button>
                </div>
              )}
              {message && (
                <p className='text-center text-gray-700'>{message}</p>
              )}
            </div>
            <h3 className='text-blue-500'>{d.status}</h3>
          </div>
        ))}
      </div>
      <div className='flex justify-center my-5 gap-3 items-center'>
        <button
          className='bg-[#15370D] text-white p-2 rounded'
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          précédent
        </button>
        <span className='font-semibold'>
          Page : {page}/{totalPage}
        </span>
        <button
          className='bg-[#15370D] text-white px-3 py-2 rounded'
          onClick={() => setPage(page + 1)}
          disabled={page === totalPage}
        >
          Suivant
        </button>
      </div>
    </div>
  );
};

export default ListDemande;
