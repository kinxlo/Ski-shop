"use client";

import SkiButton from "@/components/shared/button";
import { ReusableDialog } from "@/components/shared/dialog/Dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { DialogFooter as UIDialogFooter } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CheckCircle } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";
import { toast } from "sonner";

type PlanId = "monthly" | "quarterly" | "yearly";

type Plan = {
  id: PlanId;
  name: string;
  price: number;
  note?: string;
  saveLabel?: string;
};

const PLANS: Plan[] = [
  { id: "monthly", name: "Monthly", price: 5000 },
  { id: "quarterly", name: "Quarterly", price: 13_500, note: "Save ₦1,500 (10%)" },
  { id: "yearly", name: "Yearly", price: 50_000, note: "Save ₦9,000 (17%)" },
];

const currency = (amount: number) =>
  new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 }).format(amount);

export function SubscriptionFlow() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedPlan, setSelectedPlan] = useState<PlanId>("monthly");
  const [paymentMethod, setPaymentMethod] = useState<"bank" | "paystack">("bank");
  const [showBankDialog, setShowBankDialog] = useState(false);

  const activePlan = useMemo(() => PLANS.find((p) => p.id === selectedPlan)!, [selectedPlan]);

  const handleProceed = () => {
    if (paymentMethod === "paystack") {
      toast.success("Redirecting to Paystack to complete your subscription");
      // Integrate with real checkout here
    } else {
      setShowBankDialog(true);
    }
  };

  return (
    <section className="space-y-8">
      {/* Header / Progress */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="!text-4xl font-bold">Become a Star Seller</h2>
          <p className="text-muted-foreground mt-1 text-sm">
            Upgrade your store and unlock premium features that help you grow faster.
          </p>
        </div>
        <Image src="/images/skicom-star.svg" width={48} height={48} alt="Skicom Star" />
      </div>

      {/* Steps */}
      {step === 1 && (
        <Card className={`shadow-none`}>
          <CardHeader className="border-b">
            <CardTitle>Unlock Star Seller Benefits</CardTitle>
            <CardDescription>
              Enjoy powerful tools and badges that boost your visibility and credibility.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6 pt-6 md:grid-cols-2">
            <ul className="bg-primary/5 border-primary space-y-4 rounded-xl border p-4">
              <li className="flex items-center gap-3">
                <CheckCircle className="text-primary mt-0.5 size-6" />
                <span className="text-sm font-medium lg:text-base">Boosted product visibility</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="text-primary mt-0.5 size-6" />
                <span className="text-sm font-medium lg:text-base">Verified Star Seller badge</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="text-primary mt-0.5 size-6" />
                <span className="text-sm font-medium lg:text-base">Access to campaign promotions</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="text-primary mt-0.5 size-6" />
                <span className="text-sm font-medium lg:text-base">Advanced analytics</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="text-primary mt-0.5 size-6" />
                <span className="text-sm font-medium lg:text-base">Priority support</span>
              </li>
            </ul>

            {/* Plan selection */}
            <div>
              <p className="mb-3 text-sm font-semibold">Choose a Plan</p>
              <RadioGroup
                value={selectedPlan}
                onValueChange={(value) => setSelectedPlan(value as PlanId)}
                className="space-y-3"
              >
                {PLANS.map((plan) => (
                  <label key={plan.id} className="block">
                    <div className="hover:bg-accent/50 flex cursor-pointer items-center justify-between rounded-xl border p-4 transition-colors">
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value={plan.id} className="mt-0.5" />
                        <div className="leading-tight">
                          <p className="text-sm font-semibold">{plan.name}</p>
                          {plan.note && <p className="text-muted-foreground mt-0.5 text-xs">{plan.note}</p>}
                        </div>
                      </div>
                      <p className="text-sm font-semibold">{currency(plan.price)}</p>
                    </div>
                  </label>
                ))}
              </RadioGroup>
            </div>
          </CardContent>
          <CardFooter className="border-t pt-6">
            <Button variant="primary" size="lg" className="ml-auto" onClick={() => setStep(2)}>
              Continue
            </Button>
          </CardFooter>
        </Card>
      )}

      {step === 2 && (
        <Card className={`shadow-none`}>
          <CardHeader className="border-b">
            <CardTitle>Payment</CardTitle>
            <CardDescription>Select a payment method to activate your Star Seller benefits.</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="mb-2 text-sm font-semibold">Payment Method</p>
            <div className="space-y-3">
              <label className="block">
                <div className="hover:bg-accent/50 flex cursor-pointer items-start justify-between rounded-xl border p-4 transition-colors">
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="payment"
                      value="bank"
                      checked={paymentMethod === "bank"}
                      onChange={() => setPaymentMethod("bank")}
                      className="mt-1"
                    />
                    <div className="leading-tight">
                      <p className="text-sm font-semibold">Direct Bank Transfer</p>
                      <p className="text-muted-foreground mt-1 text-xs">
                        Make your payment directly to our account to activate your subscription. Your Star Seller
                        benefits will be activated once your payment is confirmed.
                      </p>
                    </div>
                  </div>
                </div>
              </label>

              <label className="block">
                <div className="hover:bg-accent/50 flex cursor-pointer items-center justify-between rounded-xl border p-4 transition-colors">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      value="paystack"
                      checked={paymentMethod === "paystack"}
                      onChange={() => setPaymentMethod("paystack")}
                      className="mt-1"
                    />
                    <Image src="/images/paystack-logo.svg" alt="Paystack" width={100} height={24} />
                  </div>
                </div>
              </label>
            </div>
          </CardContent>
          <CardFooter className="border-t pt-6">
            <div className="ml-auto flex items-center gap-3">
              <SkiButton variant="outline" onClick={() => setStep(1)}>
                Back
              </SkiButton>
              <SkiButton variant="primary" size="lg" onClick={handleProceed}>
                Proceed to Pay ({currency(activePlan.price)})
              </SkiButton>
            </div>
          </CardFooter>
        </Card>
      )}

      {/* Bank Transfer Dialog */}
      <ReusableDialog
        open={showBankDialog}
        onOpenChange={setShowBankDialog}
        title="Direct Transfer"
        className="sm:max-w-md"
        trigger={<button className="hidden" aria-hidden />}
        headerClassName={`!text-lg !text-center`}
      >
        <div className="bg-background border-border rounded-xl border p-4">
          <div className="text-muted-foreground mb-3 text-center text-xs">
            Please wait while we confirm your payment to the displayed account details
          </div>
          <div className="bg-primary/10 border-primary rounded-xl border p-4 text-center">
            <p className="text-muted-foreground text-xs font-medium">Guaranty Trust Bank</p>
            <div className="mt-2 text-sm font-semibold">Skicom Store Limited</div>
            <div className="mt-3 text-lg font-bold tracking-wider">8087374878</div>
            <div className="text-muted-foreground mt-2 text-xs">Amount Payable</div>
            <div className="mt-1 text-base font-semibold">{currency(activePlan.price)}</div>
          </div>
          <p className="text-muted-foreground mt-3 flex items-center justify-center gap-2 text-xs">
            <span className="bg-primary inline-flex h-2 w-2 animate-pulse rounded-full" /> Confirming Payment...
          </p>
        </div>
        <UIDialogFooter>
          <Button
            variant="primary"
            className="w-full"
            onClick={() => {
              setShowBankDialog(false);
              setStep(3);
              toast.success("Payment instructions sent. We will confirm and activate your benefits shortly.");
            }}
          >
            I have made the transfer
          </Button>
        </UIDialogFooter>
      </ReusableDialog>

      {step === 3 && (
        <Card className={`shadow-none`}>
          <CardHeader className="border-b">
            <CardTitle>You&apos;re all set 🎉</CardTitle>
            <CardDescription>
              We are confirming your payment. You will receive an update once your Star Seller benefits are activated.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="text-sm">
              Selected plan: {activePlan.name} — {currency(activePlan.price)}
            </p>
          </CardContent>
          <CardFooter className="border-t pt-6">
            <Button variant="primary" className="ml-auto" onClick={() => setStep(1)}>
              Manage Subscription
            </Button>
          </CardFooter>
        </Card>
      )}
    </section>
  );
}

export default SubscriptionFlow;
