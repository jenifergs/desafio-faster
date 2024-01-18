import { UserModel } from '../models/user.model';
import { CypherService } from './cypher.service';
import { JWTService } from './jwt.service';

/**
 * @description Contém a instância do serviço de autenticação.
 * Capaz de gerar e verificar tokens JWT.
 * Capaz de criptografar e comparar senhas.
 *
 * @export
 * @class AuthService
 */
export class AuthService {
  /**
   * Creates an instance of AuthService.
   * @param {CypherService} cypherService - Instancia do serviço de criptografia. Capaz de criptografar e comparar senhas.
   * @param {JWTService} jwtService - Instancia do serviço de token JWT. Capaz de gerar e verificar tokens JWT.
   * @memberof AuthService
   */
  constructor(
    private readonly cypherService: CypherService,
    private readonly jwtService: JWTService,
  ) {}

  /**
   * @method compare
   * @description Metodo responsavel por comparar uma senha com uma senha criptografada.
   *
   * @param {string} password - Senha a ser comparada.
   * @param {string} cypherPassword - Senha criptografada a ser comparada.
   * @return {*}  {Promise<boolean>}
   * @memberof AuthService
   */
  public async compare(
    password: string,
    cypherPassword: string,
  ): Promise<boolean> {
    return this.cypherService.compare(password, cypherPassword);
  }

  /**
   * @method generateToken
   * @description Metodo responsavel por gerar um token JWT.
   *
   * @param {Omit<UserModel, 'password'>} payload
   * @return {*}  {Promise<string>}
   * @memberof AuthService
   */
  public async generateToken(
    payload: Omit<UserModel, 'password'>,
  ): Promise<string> {
    return this.jwtService.sign(payload);
  }
}
