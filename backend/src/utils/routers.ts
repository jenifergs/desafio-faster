import { Router } from 'express';

export class Routers<T extends object = any> {
  public readonly router;
  

  constructor(
    public readonly basePath: string,
    private readonly controller: T
  ) {
    this.router = Router();
  }

  public setupRoutes( setupFunction: (router: Router, controller: T) => void ): Routers<T> {
    setupFunction(this.router, this.controller);

    return this;
  }
}
