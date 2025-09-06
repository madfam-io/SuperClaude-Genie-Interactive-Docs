"use client";

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-bg-dark via-bg-light to-bg-dark">
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary rounded-full mix-blend-multiply filter blur-xl animate-float"></div>
          <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-secondary rounded-full mix-blend-multiply filter blur-xl animate-float animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-accent rounded-full mix-blend-multiply filter blur-xl animate-float animation-delay-4000"></div>
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(99,102,241,0.1)_0%,transparent_50%),radial-gradient(circle_at_80%_20%,rgba(139,92,246,0.1)_0%,transparent_50%),radial-gradient(circle_at_40%_40%,rgba(236,72,153,0.05)_0%,transparent_50%)] animate-rotate"></div>
      </div>
    </div>
  );
}
