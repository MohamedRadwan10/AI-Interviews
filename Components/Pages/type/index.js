import dynamic from 'next/dynamic';
import { HomeLoading } from '@/Components/Common/LoadingSkeleton/type/HomeLoading';
import { AboutLoading } from '@/Components/Common/LoadingSkeleton/type/AboutLoading';
import { JobsLoading } from '@/Components/Common/LoadingSkeleton/type/JobsLoading';
import { JobDetailsLoading } from '@/Components/Common/LoadingSkeleton/type/JobDetailsLoading';
import { ActiveSessionsLoading } from '@/Components/Common/LoadingSkeleton/type/ActiveSessionsLoading';

export const HomePage = dynamic(() => import('./Home'), { loading: () => <HomeLoading /> });
export const AboutPage = dynamic(() => import('./About'), { loading: () => <AboutLoading /> });
export const AccountTypePage = dynamic(() => import('./AccountType'));
export const JobsPage = dynamic(() => import('./Jobs'), { loading: () => <JobsLoading /> });
export const JobDetailsPage = dynamic(() => import('./JobDetails'), { loading: () => <JobDetailsLoading /> });
export const ForgetPasswordPage = dynamic(() => import('./ForgetPassword'));
export const VerifyEmailRequestPage = dynamic(() => import('./VerifyEmail/VerifyEmailRequest'));
export const VerifyEmailProcessPage = dynamic(() => import('./VerifyEmail/VerifyEmailProcess'));
export const InterviewIntroPage = dynamic(() => import('./InterviewSession').then(m => m.InterviewIntroPage));
export const InterviewRoomPage = dynamic(() => import('./InterviewSession').then(m => m.InterviewRoomPage));
export const ActiveSessionsPage = dynamic(() => import('./ActiveSessions'), { loading: () => <ActiveSessionsLoading /> });
