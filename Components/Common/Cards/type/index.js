import { lazy } from 'react';

export const FeatureCard     = lazy(() => import('./AboutFeature'));
export const JobCard         = lazy(() => import('./JobItemCard'));
export const AccountTypeCard = lazy(() => import('./AccountType'));

