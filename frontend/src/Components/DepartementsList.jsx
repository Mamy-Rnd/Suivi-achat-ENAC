/** @format */

import React from "react";
import { useEffect, useState } from "react";
import { CirclePlus } from "lucide-react";
import { Link } from "react-router-dom";

const DepartementsList = () => {
  const [departements, setDepartements] = useState([]);

  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  const Afficher = async () => {
    const response = await fetch("http://localhost:3000/api/departements", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();

    console.log(data.resultat);
    setDepartements(data.resultat);
  };

  useEffect(() => {
    Afficher();
  }, []);
  return (
    <div className='py-10'>
      <h3 className='text-center text-3xl text-[#086288] py-3'>
        Listes des départements
      </h3>
      <table className='w-full mx-auto'>
        <thead className='bg-[#086288] border border-gray-300'>
          <tr>
            <th className='px-10 py-3 text-white border border-gray-300'>ID</th>
            <th className='px-10 py-3 text-white border border-gray-300'>
              Nom de département
            </th>
          </tr>
        </thead>
        <tbody>
          {departements.map((d) => (
            <tr key={d.id}>
              <td className='px-10 py-3 border border-gray-300 text-center'>
                {d.id}
              </td>
              <td className='px-10 py-3 border border-gray-300 text-center'>
                {d.nom_departements}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {role == "Responsable" && (
        <Link
          to='/ajouter/departement'
          className='flex gap-3 items-center bg-blue-500 p-2 text-white rounded mx-auto my-10 w-1/4'
        >
          <CirclePlus />
          <p>Ajouter un département</p>
        </Link>
      )}
    </div>
  );
};

export default DepartementsList;
