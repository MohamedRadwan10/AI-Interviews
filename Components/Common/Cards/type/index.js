import { lazy } from 'react';

export const FeatureCard = lazy(() => import('./AboutFeature'));
export const JobItemCard = lazy(() => import('./JobItemCard'));
export const AccountTypeCard = lazy(() => import('./AccountType'));
export const JobCard = lazy(() => import('./JobCard'));

