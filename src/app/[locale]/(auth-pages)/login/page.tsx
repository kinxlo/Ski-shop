"use client";

import { LoginForm } from "../_views/login-form";

const LoginPage = () => {
  return (
    <section className="w-full">
      <div className="mb-6 space-y-2 text-center sm:mb-8 sm:text-left">
        <h3 className="text-xl font-semibold sm:text-2xl lg:text-3xl">Welcome Back!</h3>
        <p className="text-muted-foreground text-sm sm:text-base lg:text-lg">
          Sign in to access your dashboard and continue your journey.
        </p>
      </div>
      <LoginForm />
    </section>
  );
};
export default LoginPage;
