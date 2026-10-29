/** @format */

import React from "react";
import { useState } from "react";

const Directeur = () => {
  const [demandes, setDemandes] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState();

  const limit = 6;

  const AfficherDemande = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/demande/directeur?page=${page}&limit=${limit}`,
      );
      const data = await response.json();

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return <div>Directeur</div>;
};

export default Directeur;
