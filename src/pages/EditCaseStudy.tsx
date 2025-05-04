
import React from 'react';
import { useParams } from 'react-router-dom';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import CaseStudyForm from '@/components/case-studies/CaseStudyForm';
import { getCaseStudyBySlug } from '@/data/mockData';

const EditCaseStudy = () => {
  const { id } = useParams<{ id: string }>();
  const caseStudy = getCaseStudyBySlug(id || '');
  
  if (!caseStudy) {
    return (
      <DashboardLayout title="Edit Case Study">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-2">Case Study Not Found</h2>
          <p className="text-muted-foreground mb-6">The case study you're trying to edit could not be found.</p>
        </div>
      </DashboardLayout>
    );
  }
  
  return (
    <DashboardLayout title={`Edit: ${caseStudy.title}`}>
      <CaseStudyForm editMode caseStudyId={caseStudy.id} />
    </DashboardLayout>
  );
};

export default EditCaseStudy;
