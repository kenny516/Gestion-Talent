import { FC } from 'react';
import { PageHeader } from '@/components/page-header';

const TalentManagementIntro: FC = () => {
  return (
    <div className="space-y-6">
    <PageHeader
      title="Talent Management System"
      description="Streamline your talent identification, acquisition, and development processes"
    />
    <div className="max-w-7xl mx-auto px-4 py-12 bg-slate-700/50 rounded-md">
      <h1 className="text-4xl font-semibold text-center  mb-8">
        Introduction à la Gestion des Talents
      </h1>
      <div className="space-y-8">
        {/* Développement des talents */}
        <div className=" p-6 rounded-lg shadow-md bg-slate-500/50">
          <h2 className="text-2xl font-medium mb-4">Développement des Talents</h2>
          <p className="text-lg ">
            Le développement des talents est un processus continu qui permet à chaque employé de progresser dans sa carrière.
            Cela inclut la formation, les plans de développement, et les opportunités de mentorat pour garantir leur épanouissement au sein de l&apos;entreprise.
          </p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default TalentManagementIntro;
