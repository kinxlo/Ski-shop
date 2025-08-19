"use client";

import { LoginForm } from "../_views/login-form";

const LoginPage = () => {
  return (
    <section>
      <div className="mb-[22px] space-y-[5px]">
        <h3 className="text-[20px] lg:text-[28px]">Welcome Back, Admin!</h3>
        <p className="text-mid-grey-II text-[14px] lg:text-[18px]">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit.
        </p>
      </div>
      <LoginForm />
    </section>
  );
};
export default LoginPage;
