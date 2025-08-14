// Define route patterns for different roles
const PUBLIC_ROUTES = [
  "/",
  "/pricing",
  "/terms-and-conditions",
  "/privacy-policy",
  "/about",
  "/contact",
  "/shop",
  "/home",
  "/earn",
  "/login",
  "/signup",
  "/signup/vendor",
  "/forgot-password",
  "/reset-password",
  "/auth",
  "/onboarding/verify-email",
  "/onboarding/vendor",
  "/onboarding/vendor/verify-email",
  "/onboarding/vendor/business-info",
  "/onboarding/vendor/store-setup",
  "/onboarding/vendor/bank-payout",
  "/onboarding/vendor/success",
];

const VENDOR_ROUTES = ["/dashboard"];

const ADMIN_ROUTES = ["/admin"];

const SUPER_ADMIN_ROUTES = ["/super-admin"];

export { PUBLIC_ROUTES, VENDOR_ROUTES, ADMIN_ROUTES, SUPER_ADMIN_ROUTES };
