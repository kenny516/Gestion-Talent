import React, { useState } from 'react';

interface FormulaireHeureSupProps {
  onSubmit: (data: { date: string; heures: number }) => void;
}

const FormulaireHeureSup: React.FC<FormulaireHeureSupProps> = ({ onSubmit }) => {
  const [date, setDate] = useState('');
  const [heures, setHeures] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (date && heures > 0) {
      onSubmit({ date, heures });
      setDate('');
      setHeures(0);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="date" className="block text-sm font-medium text-gray-700">
          Date
        </label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
        />
      </div>

      <div>
        <label htmlFor="heures" className="block text-sm font-medium text-gray-700">
          Heures Supplémentaires
        </label>
        <input
          type="number"
          id="heures"
          value={heures}
          onChange={(e) => setHeures(Number(e.target.value))}
          min="1"
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
        />
      </div>

      <button
        type="submit"
        className="mt-4 w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md"
      >
        Ajouter les Heures
      </button>
    </form>
  );
};

export default FormulaireHeureSup;
