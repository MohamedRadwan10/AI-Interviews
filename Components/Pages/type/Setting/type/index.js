import dynamic from 'next/dynamic';

export const CandidateSetting = dynamic(() => import('./candidate'));
export const CompanySetting = dynamic(() => import('./company'));
