import { lazy } from 'react';

export const HomePage = lazy(() => import('./Home'));
export const AboutPage = lazy(() => import('./About'));
export const AccountTypePage = lazy(() => import('./AccountType'));
export const JobsPage = lazy(() => import('./Jobs'));
export const JobDetailsPage = lazy(() => import('./JobDetails'));
export const ForgetPasswordPage = lazy(() => import('./ForgetPassword'));
export const VerifyEmailRequestPage = lazy(() => import('./VerifyEmail/VerifyEmailRequest'));
export const VerifyEmailProcessPage = lazy(() => import('./VerifyEmail/VerifyEmailProcess'));
export const InterviewIntroPage = lazy(() => import('./InterviewSession').then(m => ({ default: m.InterviewIntroPage })));
export const InterviewRoomPage = lazy(() => import('./InterviewSession').then(m => ({ default: m.InterviewRoomPage })));
export const ActiveSessionsPage = lazy(() => import('./ActiveSessions'));
