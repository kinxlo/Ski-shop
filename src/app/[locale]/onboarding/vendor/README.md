# Vendor Onboarding Flow

This directory contains the vendor onboarding flow, which has been converted from a single-page multi-step form to individual pages for better routing and user experience.

## Page Structure

### Main Entry Point

- `page.tsx` - Redirects to the first step (`/verify-email`)

### Onboarding Steps

1. **Verify Email** (`/verify-email`)

   - First step of the onboarding process
   - No progress indicator shown
   - Redirects to business-info on completion

2. **Business Info** (`/business-info`)

   - Step 2 of 4
   - Shows progress indicator
   - Redirects to store-setup on completion

3. **Store Setup** (`/store-setup`)

   - Step 3 of 4
   - Shows progress indicator
   - Redirects to bank-payout on completion

4. **Bank & Payout** (`/bank-payout`)

   - Step 4 of 4
   - Shows progress indicator
   - Redirects to success on completion

5. **Success** (`/success`)
   - Final step
   - No progress indicator shown
   - Redirects to login on completion

## Components

### Shared Components

- `_components/onboarding-layout.tsx` - Shared layout component with logo and progress indicator
- `_components/progress-indicator.tsx` - Progress indicator component
- `_components/verify-email.tsx` - Email verification component
- `_components/business-info-form.tsx` - Business information form
- `_components/store-form.tsx` - Store setup form
- `_components/bank-payout-form.tsx` - Bank and payout information form
- `_components/onboarding-success.tsx` - Success page component

## Routing

Each step is now a separate page with its own URL:

- `/onboarding/vendor/verify-email`
- `/onboarding/vendor/business-info`
- `/onboarding/vendor/store-setup`
- `/onboarding/vendor/bank-payout`
- `/onboarding/vendor/success`

## Benefits

1. **Better SEO** - Each step has its own URL
2. **Improved UX** - Users can bookmark specific steps
3. **Better Navigation** - Browser back/forward buttons work properly
4. **Cleaner Code** - Each page is focused on a single responsibility
5. **Easier Testing** - Each step can be tested independently

## Token Handling

Each step can receive and pass along tokens via URL parameters for maintaining state across the onboarding flow.
