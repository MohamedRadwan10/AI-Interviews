"use client";
import dynamic from 'next/dynamic';
import RouteLoading from '@/Components/Common/LoadingSkeleton/RouteLoading';

export const HomePage = dynamic(() => import('./Home'), { 
    loading: () => <RouteLoading type="home" /> 
});

export const AboutPage = dynamic(() => import('./About'), { 
    loading: () => <RouteLoading type="about" /> 
});

export const AccountTypePage = dynamic(() => import('./AccountType'), { 
    loading: () => <RouteLoading type="accountType" />,
    ssr: false
});

export const JobsPage = dynamic(() => import('./Jobs'), { 
    loading: () => <RouteLoading type="jobs" />,
    ssr: false
});

export const JobDetailsPage = dynamic(() => import('./JobDetails'), { 
    loading: () => <RouteLoading type="jobDetails" />,
    ssr: false
});

export const ForgetPasswordPage = dynamic(() => import('./ForgetPassword'), { 
    loading: () => <RouteLoading type="forget-password" />,
    ssr: false
});

export const VerifyEmailRequestPage = dynamic(() => import('./VerifyEmail/VerifyEmailRequest'), { 
    loading: () => <RouteLoading type="form" />,
    ssr: false
});

export const VerifyEmailProcessPage = dynamic(() => import('./VerifyEmail/VerifyEmailProcess'), { 
    loading: () => <RouteLoading type="verify-email" />,
    ssr: false
});

export const InterviewIntroPage = dynamic(() => import('./InterviewSession').then(m => m.InterviewIntroPage), { 
    loading: () => <RouteLoading type="interviewInstructions" />,
    ssr: false
});

export const InterviewRoomPage = dynamic(() => import('./InterviewSession').then(m => m.InterviewRoomPage), { 
    loading: () => <RouteLoading type="interviewRoom" />,
    ssr: false
});

export const ActiveSessionsPage = dynamic(() => import('./ActiveSessions'), { 
    loading: () => <RouteLoading type="activeSessions" />,
    ssr: false
});

export const ReportPage = dynamic(() => import('./Report'), { 
    loading: () => <RouteLoading type="report" />,
    ssr: false
});

export const PostJobPage = dynamic(() => import('./PostJob'), { 
    loading: () => <RouteLoading type="postJob" />,
    ssr: false
});

export const EditJobPage = dynamic(() => import('./EditJob'), { 
    loading: () => <RouteLoading type="postJob" />,
    ssr: false
});

export const DashboardPage = dynamic(() => import('./Dashboard'), { 
    loading: () => <RouteLoading type="candidateDashboard" />,
    ssr: false
});

export const JobApplicantsPage = dynamic(() => import('./JobApplicants'), { 
    loading: () => <RouteLoading type="jobApplicants" />,
    ssr: false
});
