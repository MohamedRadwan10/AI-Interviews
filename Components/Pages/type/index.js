import dynamic from 'next/dynamic';
import RouteLoading from '@/Components/Common/LoadingSkeleton/RouteLoading';

export const HomePage = dynamic(() => import('./Home'), { 
    loading: () => <RouteLoading type="home" /> 
});

export const AboutPage = dynamic(() => import('./About'), { 
    loading: () => <RouteLoading type="about" /> 
});

export const AccountTypePage = dynamic(() => import('./AccountType'), { 
    loading: () => <RouteLoading type="accountType" /> 
});

export const JobsPage = dynamic(() => import('./Jobs'), { 
    loading: () => <RouteLoading type="jobs" /> 
});

export const JobDetailsPage = dynamic(() => import('./JobDetails'), { 
    loading: () => <RouteLoading type="jobDetails" /> 
});

export const ForgetPasswordPage = dynamic(() => import('./ForgetPassword'), { 
    loading: () => <RouteLoading type="forget-password" /> 
});

export const VerifyEmailRequestPage = dynamic(() => import('./VerifyEmail/VerifyEmailRequest'), { 
    loading: () => <RouteLoading type="form" /> 
});

export const VerifyEmailProcessPage = dynamic(() => import('./VerifyEmail/VerifyEmailProcess'), { 
    loading: () => <RouteLoading type="verify-email" /> 
});

export const InterviewIntroPage = dynamic(() => import('./InterviewSession').then(m => m.InterviewIntroPage), { 
    loading: () => <RouteLoading type="interviewInstructions" /> 
});

export const InterviewRoomPage = dynamic(() => import('./InterviewSession').then(m => m.InterviewRoomPage), { 
    loading: () => <RouteLoading type="interviewRoom" /> 
});

export const ActiveSessionsPage = dynamic(() => import('./ActiveSessions'), { 
    loading: () => <RouteLoading type="activeSessions" /> 
});

export const ReportPage = dynamic(() => import('./Report'), { 
    loading: () => <RouteLoading type="report" /> 
});

export const PostJobPage = dynamic(() => import('./PostJob'), { 
    loading: () => <RouteLoading type="postJob" /> 
});

export const EditJobPage = dynamic(() => import('./EditJob'), { 
    loading: () => <RouteLoading type="postJob" /> 
});

export const DashboardPage = dynamic(() => import('./Dashboard'), { 
    loading: () => <RouteLoading type="candidateDashboard" /> 
});

export const JobApplicantsPage = dynamic(() => import('./JobApplicants'), { 
    loading: () => <RouteLoading type="jobApplicants" /> 
});
