"use client";

import React, { useEffect, useState } from "react";
import { api_url, CandidatDisplay } from "@/types";
import axios from "axios";
import CandidatTable from "./(component)/candidat-table";

// Fetch candidates
const fetchCandidates = async (): Promise<CandidatDisplay[]> => {
  try {
    const response = await axios.get(api_url + "candidat");
    return response.data as CandidatDisplay[];
  } catch (error) {
    console.error("Error fetching candidates:", error);
    return [];
  }
};

export default function CandidatesPage() {
  const [candidates, setCandidates] = useState<CandidatDisplay[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCandidates = async () => {
      setLoading(true);
      const data = await fetchCandidates();
      setCandidates(data);
      setLoading(false);
    };
    getCandidates();
  }, []);

  return (
    <CandidatTable
      title="Liste des candidats"
      description="Liste des candidat qui on postuler a une offre"
      candidats={candidates}
      loading={loading}
    />
  );
}
