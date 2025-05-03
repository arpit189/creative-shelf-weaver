
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import CaseStudyForm from '@/components/case-studies/CaseStudyForm';

const CreateCaseStudy = () => {
  return (
    <DashboardLayout title="Create Case Study">
      <CaseStudyForm />
    </DashboardLayout>
  );
};

export default CreateCaseStudy;
