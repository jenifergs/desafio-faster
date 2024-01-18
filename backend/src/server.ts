import express, { Express } from 'express';
import { Routers } from './utils/routers';

/**
 * @description Configuração do servidor.
 */
export type ServerConfig = {
  port: number;
  routers: Routers[];
  globalMiddlewares: { path?: string; middleware: any[] }[];
};

/**
 * @description Classe responsavel por iniciar o servidor.
 * Essa classe funciona como um wrapper para o express
 *
 * @export
 * @class Server
 */
export class Server {
  private readonly app: Express;
  private readonly port: number;

  constructor(config: ServerConfig) {
    const { port, routers, globalMiddlewares } = config;
    this.app = express();

    for (const { path, middleware } of globalMiddlewares) {
      if (path) {
        this.app.use(path, ...middleware);
      } else {
        this.app.use(...middleware);
      }
    }

    for (const { basePath, router } of routers) {
      this.app.use(basePath, router);
    }

    this.port = port;
  }

  /**
   * @method start
   * @description Metodo responsavel por iniciar o servidor.
   *
   * @return {*}
   * @memberof Server
   */
  public async start() {
    return new Promise((resolve, reject) => {
      this.app
        .listen(this.port, () => {
          console.log(`Server started on port ${this.port}`);

          resolve(true);
        })
        .on('error', reject);
    });
  }
}
