import { lazy } from 'react';

export const CandidateCard = lazy(() => import('./Candidate'));
export const CompanyCard = lazy(() => import('./Company'));

