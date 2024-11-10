import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const CreatePosition = () => {
  const [formData, setFormData] = useState({
    titre: '',
    description: '',
    departement: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await axios.post('/api/positions', formData);
      alert('Position created successfully!');
      setFormData({ titre: '', description: '', departement: '' });
    } catch (err) {
      setError("Erreur lors de la création du poste");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Créer un nouveau poste</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="titre" className="block text-sm font-medium text-gray-700">
                Titre
              </label>
              <Input
                id="titre"
                name="titre"
                placeholder="Titre"
                value={formData.titre}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <Textarea
                id="description"
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="departement" className="block text-sm font-medium text-gray-700">
                Département
              </label>
              <Input
                id="departement"
                name="departement"
                placeholder="Département"
                value={formData.departement}
                onChange={handleChange}
                required
              />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <Button type="submit" disabled={loading}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Créer le poste'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreatePosition;