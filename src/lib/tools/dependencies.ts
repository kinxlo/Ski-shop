import { AppService } from "@/services/app/app.service";
import { AuthService } from "@/services/auth/auth.service";
import { HomeService } from "@/services/dashboard/vendor/home/home.service";
import { DashboardProductService } from "@/services/dashboard/vendor/products/product.service";
import { OnboardingUserService } from "@/services/externals/onboarding/onboarding-user.service";
import { ProductService } from "@/services/externals/products/product.service";
import { UserService } from "@/services/externals/user/user.service";

import { HttpAdapter } from "../http/http-adapter";

const dependencies = {
  HTTP_ADAPTER: Symbol("httpAdapter"),
  APP_SERVICE: Symbol("AppService"),
  AUTH_SERVICE: Symbol("AuthService"),
  PRODUCT_SERVICE: Symbol("ProductService"),
  HOME_SERVICE: Symbol("HomeService"),
  USER_SERVICE: Symbol("UserService"),
  ONBOARDING_USER_SERVICE: Symbol("OnboardingUserService"),
  DASHBOARD_PRODUCT_SERVICE: Symbol("DashboardProductService"),
};

interface IDependencyContainer {
  add<T>(key: symbol, dependency: T): void;
  get<T>(key: symbol): T;
}

const httpAdapter = new HttpAdapter();
const appService = new AppService(httpAdapter);
const authService = new AuthService(httpAdapter);
const productService = new ProductService(httpAdapter);
const homeService = new HomeService(httpAdapter);
const userService = new UserService(httpAdapter);
const onboardingUserService = new OnboardingUserService();
const dashboardProductService = new DashboardProductService(httpAdapter);

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
container.add(dependencies.PRODUCT_SERVICE, productService);
container.add(dependencies.HOME_SERVICE, homeService);
container.add(dependencies.USER_SERVICE, userService);
container.add(dependencies.ONBOARDING_USER_SERVICE, onboardingUserService);
container.add(dependencies.DASHBOARD_PRODUCT_SERVICE, dashboardProductService);

export { container, dependencies };
