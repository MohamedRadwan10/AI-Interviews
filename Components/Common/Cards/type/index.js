import { lazy } from 'react';

export const FeatureCard = lazy(() => import('./AboutFeature'));
export const JobItemCard = lazy(() => import('./JobItemCard'));
export const AccountTypeCard = lazy(() => import('./AccountType'));
export const JobCard = lazy(() => import('./JobCard'));
export const JobHeaderCard = lazy(() => import('./JobHeaderCard'));
export const JobSpecsCard = lazy(() => import('./JobSpecsCard'));
export const JobContentCard = lazy(() => import('./JobContentCard'));
export const ActiveSessionCard = lazy(() => import('./ActiveSessionCard'));

