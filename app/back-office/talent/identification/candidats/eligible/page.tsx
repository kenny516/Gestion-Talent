"use client";

import React, { useEffect, useState } from "react";
import { api_url, Candidat } from "@/types";
import axios from "axios";
import CandidatTable from "../(component)/candidat-table";

// Fetch candidates
const fetchCandidates = async (): Promise<Candidat[]> => {
  try {
    const response = await axios.get(api_url + "candidat/elligibles");
    return response.data as Candidat[];
  } catch (error) {
    console.error("Error fetching candidates:", error);
    return [];
  }
};

export default function CandidatesPage() {
  const [candidates, setCandidates] = useState<Candidat[]>([]);
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
      title="Eligible candidat"
      description="Liste des candidat embauchable"
      candidats={candidates}
      loading={loading}
    />
  );
}
