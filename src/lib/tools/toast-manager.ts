interface ExtendedToastProperties {
  message: string;
  type?: "success" | "error" | "warning" | "info";
  duration?: number;
}

export class Toast {
  private static instance: Toast;
  private toastFunction: ((properties: ExtendedToastProperties) => void) | undefined;

  private constructor() {}

  public static getInstance(): Toast {
    if (!Toast.instance) {
      Toast.instance = new Toast();
    }
    return Toast.instance;
  }

  public initialize(toast: (properties: ExtendedToastProperties) => void) {
    this.toastFunction = toast;
  }

  public showToast(properties: ExtendedToastProperties) {
    if (this.toastFunction) {
      this.toastFunction(properties);
    }
    // else {
    //   console.warn("Toast function is not set up yet");
    // }
  }
}
