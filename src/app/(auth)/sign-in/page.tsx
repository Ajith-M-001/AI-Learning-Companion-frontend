import { AuthHero } from "@/features/auth/components/AuthHero";
import { SignInForm } from "@/features/auth/components/SignInForm";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-background text-foreground">
     

      {/* left Side - Form */}
      <div className="flex w-full lg:w-[50%] items-center justify-center p-8 lg:p-12 bg-card">
        <SignInForm />
      </div>

       {/* Right Side - Hero */}
      <AuthHero
        title="AI Learning Companion"
        subtitle="Start your learning journey today"
        tagline="Learn smarter with AI-powered roadmaps, insights, and progress tracking."
      />
    </div>
  );
}
