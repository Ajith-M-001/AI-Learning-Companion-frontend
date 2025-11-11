"use client";

import { Suspense } from "react";
import { ResetPasswordForm } from "@/features/auth/components/ResetPasswordForm";
import { Loader2 } from "lucide-react";

const ResetPasswordPage = () => {
  return (
    <main className="flex flex-col items-center justify-center w-full bg-background">
      {/* Wrap inside Suspense boundary */}
      <Suspense
        fallback={
          <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
            <Loader2 className="h-6 w-6 animate-spin mb-2" />
            <p>Loading reset form...</p>
          </div>
        }
      >
        <ResetPasswordForm />
      </Suspense>
    </main>
  );
};

export default ResetPasswordPage;
