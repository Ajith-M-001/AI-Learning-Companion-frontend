import { ToggleTheme } from "@/components/mode-toggle";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold text-primary">
        🚀 AI Learn Companion Frontend
      </h1>
      <p className="mt-4 text-gray-600">
        Built with Next.js 16, React 19, and TailwindCSS v4
      </p>
      <ToggleTheme />
    </main>
  );
}
