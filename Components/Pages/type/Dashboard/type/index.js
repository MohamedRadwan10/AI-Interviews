import dynamic from 'next/dynamic';

export const CandidateDashboard = dynamic(() => import('./candidate'));
export const CompanyDashboard = dynamic(() => import('./company'));