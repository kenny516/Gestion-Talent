"use client";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { Poste } from '@/types';


const PosteList = () => {
  const [postes, setpostes] = useState<Poste[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchpostes = async () => {
      try {
        setLoading(true);
        const response = await axios.get<Poste[]>('/api/postes');
        setpostes(response.data);
        setError(null);
      } catch (err) {
        setError("Erreur lors du chargement des postes");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchpostes();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-4">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Postes disponibles</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {postes.map(poste => (
          <Card key={poste.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-2">{poste.titre}</h2>
              <p className="text-sm text-muted-foreground mb-4">
                {poste.departement}
              </p>
              {poste.description && (
                <p className="text-sm line-clamp-3">
                  {poste.description}
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      {postes.length === 0 && (
        <p className="text-center text-muted-foreground">
          Aucun poste disponible pour le moment
        </p>
      )}
    </div>
  );
};

export default PosteList;