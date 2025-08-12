/**
 * Form data types for the Ski Shop application
 */

declare global {
  // ============================================================================
  // FORM DATA TYPES (from schemas)
  // ============================================================================

  /** Bank payout form data */
  interface BankPayoutFormData {
    bankName: string;
    accountNumber: string;
    accountName: string;
    code: string;
  }

  /** Register form data */
  // interface RegisterFormData {
  //   firstName: string;
  //   lastName: string;
  //   email: string;
  //   password: string;
  //   passwordConfirmation: string;
  // }

  /** Login form data */
  interface LoginFormData {
    email: string;
    password: string;
  }

  /** Forgot password data */
  interface ForgotPasswordData {
    email: string;
  }

  /** Verify OTP data */
  interface VerifyOTP {
    email: string;
    otp: string;
  }

  /** Reset password data */
  interface ResetPasswordData {
    email: string;
    otp: string;
    password: string;
    passwordConfirmation: string;
  }

  /** Withdrawal data */
  interface WithdrawalData {
    amount: number;
    bankId: string;
  }

  /** Bank form data */
  interface BankFormData {
    bankName: string;
    accountNumber: string;
    accountName: string;
  }

  /** Review form data */
  interface ReviewFormData {
    rating: number;
    comment: string;
    productId: string;
  }

  /** Contact form data */
  interface ContactFormData {
    name: string;
    email: string;
    subject: string;
    message: string;
  }

  /** Profile form data */
  interface ProfileFormData {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
  }

  /** Vendor profile form data */
  interface VendorProfileFormData {
    store: {
      name?: string;
      description?: string;
      category?: string;
    };
    logo?: File;
    user: {
      firstName?: string;
      lastName?: string;
      phone?: string;
    };
    business: {
      type?: string;
      businessRegNumber?: string;
      businessName?: string;
      country?: string;
      state?: string;
      address?: string;
    };
  }

  /** Email notification setting form data */
  interface EmailNotificationSettingFormData {
    purchase?: boolean;
    news_updates?: boolean;
    product_creation?: boolean;
    payout?: boolean;
  }

  /** Change password form data */
  interface ChangePasswordFormData {
    password: string;
    new_password: string;
    new_password_confirmation: string;
  }

  /** Change email form data */
  interface ChangeEmailFormData {
    email?: string;
    alt_email?: string;
  }

  /** KYC form data */
  interface KycFormData {
    country: string;
    document_type: string;
    document_image: File;
  }

  /** Email integration form data */
  interface EmailIntegrationFormData {
    provider?: string;
    token: string;
  }

  /** Funnel form data */
  interface FunnelFormData {
    title: string;
    thumbnail: File;
    product_id: string;
    assets: File[];
  }

  /** Funnel setting form data */
  interface FunnelSettingFormData {
    title?: string;
    logo?: File;
  }

  /** External contact form data */
  interface ExternalContactFormData {
    name: string;
    email: string;
    message: string;
  }

  /** Business info form data */
  interface BusinessInfoFormData {
    type: string;
    businessRegNumber?: string;
    contactNumber: string;
    address: string;
    country: string;
    state: string;
    kycVerificationType: string;
    identificationNumber: string;
  }

  /** Store form data */
  interface StoreFormData {
    name: string;
    description: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    image: File | any;
  }

  /** Product form data */
  interface ProductFormData {
    name: string;
    description: string;
    price: number;
    category: string;
    images: File[];
    stockCount: number;
  }

  /** Edit product form data */
  interface EditProductFormData extends ProductFormData {
    id: string;
  }

  /** Password form data */
  interface PasswordFormData {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }

  /** Notification settings data */
  interface NotificationSettingsData {
    email: boolean;
    push: boolean;
    sms: boolean;
  }

  /** Checkout form data */
  interface CheckoutFormData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: Address;
  }

  /** Address form data */
  interface AddressFormData {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  }
}

export {};
