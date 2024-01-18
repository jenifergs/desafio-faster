import { Request, Response } from 'express';

/**
 * @description Classe responsavel por controlar os metodos de healthcheck.
 *
 * @export
 * @class HealthcheckController
 */
export class HealthcheckController {
  /**
   * @method healthcheck
   * @description Metodo responsavel por retornar o status da aplicação e o tempo de execução.
   *
   * @param {Request} req
   * @param {Response} res
   * @return {*}  {Promise<void>}
   * @memberof HealthcheckController
   */
  public async healthcheck(req: Request, res: Response): Promise<void> {
    const alive = true;
    const uptime = process.uptime();

    res.json({ status: 'ok', alive, uptime });
  }

  /**
   * @method getPing
   * @description Metodo responsavel por retornar o status da aplicação - Visual ping Retorna Pong no browser.
   *
   * @param {Request} req
   * @param {Response} res
   * @return {*}  {Promise<void>}
   * @memberof HealthcheckController
   */
  public async getPing(req: Request, res: Response): Promise<void> {
    res.send('pong');
  }

  /**
   * @method isAlive
   * @description Metodo usado em request HEAD retorna 204 indicando status ativo.
   *
   * @param {Request} req
   * @param {Response} res
   * @return {*}  {Promise<void>}
   * @memberof HealthcheckController
   */
  public async isAlive(req: Request, res: Response): Promise<void> {
    res.status(200).send();
  }
}
