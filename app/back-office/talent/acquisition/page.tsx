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
        {/* Acquisition des talents */}
        <div className=" p-6 rounded-lg shadow-md bg-slate-500/50">
          <h2 className="text-2xl font-medium  mb-4">Acquisition des Talents</h2>
          <p className="text-lg ">
            Une fois les talents identifiés, il est essentiel de les attirer. L&apos;acquisition des talents comprend la création de campagnes de recrutement,
            des partenariats avec des écoles, et d&apos;autres stratégies pour attirer les meilleurs candidats.
          </p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default TalentManagementIntro;
