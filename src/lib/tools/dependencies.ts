import { AuthService } from "@/services/auth/auth.service";
import { AdminService } from "@/services/dashboard/admin/admin.service";
import { Play2WinService } from "@/services/dashboard/admin/play2win/play2win.service";
import { HomeService } from "@/services/dashboard/vendor/home/home.service";
import { DashboardOrderService } from "@/services/dashboard/vendor/orders/order.service";
import { PayoutService } from "@/services/dashboard/vendor/payouts/payout.service";
import { DashboardProductService } from "@/services/dashboard/vendor/products/product.service";
import { PromotionService } from "@/services/dashboard/vendor/promotions/promotion.service";
import { SettingsService } from "@/services/dashboard/vendor/settings/settings.service";
import { DashboardProfileService } from "@/services/dashboard/vendor/users/profile.service";
import { AppService } from "@/services/externals/app/app.service";
import { OnboardingUserService } from "@/services/externals/onboarding/onboarding-user.service";
import { UserService } from "@/services/externals/user/user.service";

import { HttpAdapter } from "../http/http-adapter";

const dependencies = {
  HTTP_ADAPTER: Symbol("httpAdapter"),
  APP_SERVICE: Symbol("AppService"),
  AUTH_SERVICE: Symbol("AuthService"),
  HOME_SERVICE: Symbol("HomeService"),
  USER_SERVICE: Symbol("UserService"),
  ONBOARDING_USER_SERVICE: Symbol("OnboardingUserService"),
  DASHBOARD_PRODUCT_SERVICE: Symbol("DashboardProductService"),
  DASHBOARD_ORDER_SERVICE: Symbol("DashboardOrderService"),
  DASHBOARD_PROFILE_SERVICE: Symbol("DashboardProfileService"),
  PAYOUT_SERVICE: Symbol("PayoutService"),
  PROMOTION_SERVICE: Symbol("PromotionService"),
  ADMIN_SERVICE: Symbol("AdminService"),
  SETTINGS_SERVICE: Symbol("SettingsService"),
  PLAY2WIN_SERVICE: Symbol("Play2WinService"),
};

// Types are now globally available in src/types/

const httpAdapter = new HttpAdapter();
const appService = new AppService(httpAdapter);
const authService = new AuthService(httpAdapter);
const homeService = new HomeService(httpAdapter);
const userService = new UserService(httpAdapter);
const onboardingUserService = new OnboardingUserService();
const dashboardProductService = new DashboardProductService(httpAdapter);
const dashboardOrderService = new DashboardOrderService(httpAdapter);
const dashboardProfileService = new DashboardProfileService(httpAdapter);
const payoutService = new PayoutService(httpAdapter);
const promotionService = new PromotionService(httpAdapter);
const adminService = new AdminService(httpAdapter);
const settingsService = new SettingsService(httpAdapter);
const play2WinService = new Play2WinService(httpAdapter);

class DependencyContainer implements IDependencyContainer {
  _dependencies = {};

  add<T>(key: symbol, dependency: T) {
    Object.defineProperty(this._dependencies, key, {
      value: dependency,
    });
  }

  get<T>(key: symbol): T {
    return Object.getOwnPropertyDescriptor(this._dependencies, key)?.value as T;
  }
}

const container = new DependencyContainer();

container.add(dependencies.HTTP_ADAPTER, httpAdapter);
container.add(dependencies.APP_SERVICE, appService);
container.add(dependencies.AUTH_SERVICE, authService);
container.add(dependencies.HOME_SERVICE, homeService);
container.add(dependencies.USER_SERVICE, userService);
container.add(dependencies.ONBOARDING_USER_SERVICE, onboardingUserService);
container.add(dependencies.DASHBOARD_PRODUCT_SERVICE, dashboardProductService);
container.add(dependencies.DASHBOARD_ORDER_SERVICE, dashboardOrderService);
container.add(dependencies.DASHBOARD_PROFILE_SERVICE, dashboardProfileService);
container.add(dependencies.PAYOUT_SERVICE, payoutService);
container.add(dependencies.PROMOTION_SERVICE, promotionService);
container.add(dependencies.ADMIN_SERVICE, adminService);
container.add(dependencies.SETTINGS_SERVICE, settingsService);
container.add(dependencies.PLAY2WIN_SERVICE, play2WinService);

export { container, dependencies };
