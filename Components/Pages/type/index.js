import dynamic from 'next/dynamic';

export const HomePage = dynamic(() => import('./Home'));
export const AboutPage = dynamic(() => import('./About'));
export const AccountTypePage = dynamic(() => import('./AccountType'));
export const JobsPage = dynamic(() => import('./Jobs'));
export const JobDetailsPage = dynamic(() => import('./JobDetails'));
export const ForgetPasswordPage = dynamic(() => import('./ForgetPassword'));
export const VerifyEmailRequestPage = dynamic(() => import('./VerifyEmail/VerifyEmailRequest'));
export const VerifyEmailProcessPage = dynamic(() => import('./VerifyEmail/VerifyEmailProcess'));
export const InterviewIntroPage = dynamic(() => import('./InterviewSession').then(m => m.InterviewIntroPage));
export const InterviewRoomPage = dynamic(() => import('./InterviewSession').then(m => m.InterviewRoomPage));
export const ActiveSessionsPage = dynamic(() => import('./ActiveSessions'));
