import { AppService } from "@/services/app/app.service";
import { AuthService } from "@/services/auth/auth.service";
import { ProductService } from "@/services/products/product.service";

import { HttpAdapter } from "../http/http-adapter";

const dependencies = {
  HTTP_ADAPTER: Symbol("httpAdapter"),
  APP_SERVICE: Symbol("AppService"),
  AUTH_SERVICE: Symbol("AuthService"),
  PRODUCT_SERVICE: Symbol("ProductService"),
};

interface IDependencyContainer {
  add<T>(key: symbol, dependency: T): void;
  get<T>(key: symbol): T;
}

const httpAdapter = new HttpAdapter();
const appService = new AppService(httpAdapter);
const authService = new AuthService(httpAdapter);
const productService = new ProductService(httpAdapter);

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

export { container, dependencies };
