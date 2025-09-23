"use client";

import SkiButton from "@/components/shared/button";
import { FormField } from "@/components/shared/inputs/FormFields";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { contactSchema, type ContactFormData } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { HelpCircle, Mail, MessageCircle, Phone } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";

const faqs: { id: string; question: string; answer: string }[] = [
  {
    id: "getting-started",
    question: "How do I get started as a vendor?",
    answer:
      "Create an account, complete your store profile, and add your first products. Our onboarding checklist in your dashboard will guide you step-by-step.",
  },
  {
    id: "payouts",
    question: "When do I receive payouts?",
    answer:
      "Payouts are processed to your verified bank account based on your withdrawal settings. You can track status in Dashboard → Payouts.",
  },
  {
    id: "orders",
    question: "How can I manage orders and refunds?",
    answer:
      "Go to Dashboard → Orders to view, fulfill, or refund orders. Customers are notified automatically of updates.",
  },
  {
    id: "support",
    question: "How do I contact support?",
    answer:
      "Use the contact form on this page. For urgent issues, use live chat if available in the bottom-right corner during business hours.",
  },
];

export default function HelpSupportPage() {
  const methods = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { email: "", subject: "", message: "", fullName: "" },
  });

  const {
    handleSubmit,
    formState: { isSubmitting, isDirty },
    reset,
  } = methods;

  const onSubmit = async (data: ContactFormData) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 900));
      toast.success("Message sent", {
        description: `Thanks ${data.email}. Our support team will get back to you within 24 hours.`,
      });
      reset();
    } catch {
      toast.error("Failed to send message", {
        description: "Please try again or reach us via the alternative channels below.",
      });
    }
  };

  return (
    <section className="space-y-8">
      <div className="">
        <h4 className="">Help & Support</h4>
        <p className="text-mid-grey-II">Find quick answers or contact our team. We&apos;re here to help.</p>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-5">
        {/* Contact form */}
        <Card className="shadow-none lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <MessageCircle className="h-4 w-4" /> Contact us
            </CardTitle>
            <CardDescription>Send a message to our support team.</CardDescription>
          </CardHeader>
          <Separator />
          <CardContent className="pt-4">
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <FormField name="fullName" type="text" placeholder="John Doe" className={`h-14`} required />
                <FormField name="email" type="email" placeholder="you@company.com" className={`h-14`} required />
                <FormField name="subject" type="text" placeholder="How can we help?" className={`h-14`} required />
                <FormField
                  name="message"
                  type="textarea"
                  placeholder="Tell us a bit more about your request..."
                  required
                  className="min-h-[120px]"
                />

                <div className="flex items-center gap-3 pt-2">
                  <SkiButton
                    type="submit"
                    size="lg"
                    variant={`primary`}
                    className={`w-full`}
                    isDisabled={!isDirty || isSubmitting}
                    isLoading={isSubmitting}
                  >
                    Send message
                  </SkiButton>
                </div>
              </form>
            </FormProvider>

            <div className="mt-6 space-y-3">
              <Separator />
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="text-muted-foreground flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4" /> support@skishop.example
                </div>
                <div className="text-muted-foreground flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4" /> +1 (555) 123-4567
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        {/* FAQ */}
        <Card className="shadow-none lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <HelpCircle className="h-4 w-4" /> Frequently asked questions
            </CardTitle>
            <CardDescription>Browse common questions from vendors and shoppers.</CardDescription>
          </CardHeader>
          <Separator />
          <CardContent className="pt-4">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((item) => (
                <AccordionItem key={item.id} value={item.id}>
                  <AccordionTrigger className="text-left text-sm sm:text-base">{item.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm">{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
