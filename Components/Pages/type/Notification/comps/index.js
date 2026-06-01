import dynamic from 'next/dynamic';

export const CandidateNotification = dynamic(() => import('./Candidate'));
export const CompanyNotification = dynamic(() => import('./Company'));