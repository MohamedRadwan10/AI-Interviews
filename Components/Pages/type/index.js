import { lazy } from 'react';

export const HomePage = lazy(() => import('./Home'));
export const AboutPage = lazy(() => import('./About'));
export const AccountTypePage = lazy(() => import('./AccountType'));
export const JobsPage = lazy(() => import('./Jobs'));
export const JobDetailsPage = lazy(() => import('./JobDetails'));
