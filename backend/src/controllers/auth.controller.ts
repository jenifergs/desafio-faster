import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/users.service';

/**
 * @description Classe responsavel por controlar os metodos de auteneticação.
 * @export
 * @class AuthController
 */
export class AuthController {
  /**
   * Cria uma instancia de AuthController.
   * @param {AuthService} service - Instancia do serviço de autenticação.
   * @param {UserService} userService - Instancia do serviço de usuários.
   * @memberof AuthController
   */
  constructor(
    private readonly service: AuthService,
    private readonly userService: UserService,
  ) {}

  /**
   * @method login
   * @description Metodo responsavel por autenticar um usuário. verifica se o usuário existe e se a senha está correta.
   *  Caso esteja, gera um token JWT e retorna para o usuário.
   *
   * @param {Request} req
   * @param {Response} res
   * @return {*}  {Promise<unknown>}
   * @memberof AuthController
   */
  public async login(req: Request, res: Response): Promise<unknown> {
    try {
      const { body } = req;
      const { email, password } = body;

      const user = await this.userService.findByEmail(email);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const isPasswordValid = await this.service.compare(
        password,
        user.password,
      );

      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Wrong password' });
      }

      const token = await this.service.generateToken({
        birthday: user.birthday,
        email: user.email,
        id: user.id,
        name: user.name,
      });

      return res.status(200).json({ token });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
}
