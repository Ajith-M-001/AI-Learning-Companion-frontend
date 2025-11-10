import { AuthHero } from "@/features/auth/components/AuthHero";
import { SignUpForm } from "@/features/auth/components/SignUpForm";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-background text-foreground">
      {/* Left Side - Hero */}
      <AuthHero
        title="AI Learning Companion"
        subtitle="Start your learning journey today"
        tagline="Learn smarter with AI-powered roadmaps, insights, and progress tracking."
      />

      {/* Right Side - Form */}
      <div className="flex w-full lg:w-[50%] items-center justify-center p-8 lg:p-12 bg-card">
        <SignUpForm />
      </div>
    </div>
  );
}
