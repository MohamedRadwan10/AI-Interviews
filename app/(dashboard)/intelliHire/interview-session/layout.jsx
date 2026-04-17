"use client";
import ProtectedRouter from "@/Components/admin/Layout/Protected/ProtectedRoute";
import { ReduxProvider } from "@/Store/ReduxProvider";

export default function InterviewLayout({ children }) {
  return (
    <ReduxProvider>
      <ProtectedRouter>
        <div className="min-h-screen bg-light-primary dark:bg-dark-primary-1 flex items-center justify-center p-4">
          <div className="w-full">
            {children}
          </div>
        </div>
      </ProtectedRouter>
    </ReduxProvider>
  );
}
