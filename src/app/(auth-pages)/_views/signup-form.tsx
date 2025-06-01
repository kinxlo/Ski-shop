"use client";

import SkiButton from "@/components/shared/button";
import { FormField } from "@/components/shared/FormFields";
import { RegisterFormData, registerSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { FormProvider, useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa";

export const SignupForm = () => {
  const methods = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      first_name: "",
      last_name: "",
    },
  });

  const {
    handleSubmit,
    // formState: {},
  } = methods;

  // eslint-disable-next-line unused-imports/no-unused-vars, @typescript-eslint/no-unused-vars
  const handleSubmitForm = async (data: RegisterFormData) => {
    // await login(data);
  };

  return (
    <section className="mx-auto lg:min-w-[550px]">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleSubmitForm)} className="">
          <section className={`space-y-4`}>
            <FormField placeholder={`Enter email address`} className={`h-14 w-full`} name={"email"} />
            <div className="grid grid-cols-1 gap-4 space-y-2 lg:grid-cols-2">
              <FormField placeholder={`Enter first name`} className={`h-14 w-full`} name={"first_name"} />
              <FormField placeholder={`Enter last name`} className={`h-14 w-full`} name={"last_name"} />
            </div>
            <FormField type={`password`} placeholder={`Enter password`} className={`h-14 w-full`} name={"password"} />
          </section>
          <section className="mt-[23px] flex items-center justify-between">
            <div className="text-muted-foreground mb-4">
              <p>
                By signing up, you’re agreeing to Skicom&apos;s
                <Link href="/privacy" className="text-primary hover:underline">
                  {" "}
                  Privacy Policy
                </Link>
                , and{" "}
                <Link href="/terms" className="text-primary hover:underline">
                  Terms & Conditions.
                </Link>
              </p>
            </div>
          </section>

          {/* CTA */}
          <section className="flex flex-col items-center justify-center gap-[20px] pt-[20px]">
            <SkiButton size="lg" className="h-[56px] w-full rounded-full" variant="primary" type="submit">
              Sign up
            </SkiButton>
            <span className="text-mid-grey-II">-------------------- OR --------------------</span>
            <SkiButton
              size="lg"
              className="border-primary text-primary h-[56px] w-full rounded-full"
              variant="outline"
              isRightIconVisible
              icon={<FaGoogle />}
            >
              Signup with Google
            </SkiButton>
          </section>
          <p className="mt-6 text-center text-gray-500">
            Already a user?{" "}
            <Link href="/login" className="text-primary font-medium hover:underline">
              Log In
            </Link>
          </p>
        </form>
      </FormProvider>
    </section>
  );
};
