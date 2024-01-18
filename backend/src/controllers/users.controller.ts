import { Request, Response } from 'express';
import { UserService } from '../services/users.service';

/**
 * @description Classe responsavel por controlar os metodos de usuários.
 *
 *
 * @export
 * @class UserController
 */
export class UserController {
  /**
   * Cria uma instancia de UserController.
   * @param {UserService} service - Instancia do serviço de usuários.
   * @memberof UserController
   */
  constructor(private readonly service: UserService) {}

  /**
   * @method create
   * @description Metodo responsavel por criar um usuário.
   * > Metodo verifica se o usuário já existe, caso não exista, cria o usuário e retorna o usuário criado.
   *
   * @param {Request} req
   * @param {Response} res
   * @return {*}  {Promise<unknown>}
   * @memberof UserController
   */
  public async create(req: Request, res: Response): Promise<unknown> {
    try {
      const { body } = req;
      const { name, password, email, birthday } = body;

      const alreadyExists = await this.service.existsByEmail(email);

      if (alreadyExists) {
        return res.status(409).json({ message: 'User already exists' });
      }

      const createdUser = await this.service.create(
        email,
        name,
        password,
        birthday,
      );
      return res.status(201).json({ user: createdUser });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  /**
   * @method likedDrinks
   * @description Metodo responsavel por retornar as bebidas favoritas do usuário.
   *
   * @param {Request} req
   * @param {Response} res
   * @return {*}  {Promise<unknown>}
   * @memberof UserController
   */
  public async getLikedDrinks(req: Request, res: Response): Promise<unknown> {
    try {
      const { userId } = req.headers;
      const drinks = await this.service.getLikedDrinks(Number(userId));
      return res.status(200).json(drinks);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
}
