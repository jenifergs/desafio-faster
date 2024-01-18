import { sign, verify, decode } from 'jsonwebtoken';

/**
 * @class JWTService
 * @description Contém a instância do serviço de token JWT.
 *
 * @export
 * @class JWTService
 */
export class JWTService {
  /**
   * Cria uma instância do serviço de token JWT.
   * @param {string} secret - Chave secreta para a geração do token.
   * @memberof JWTService
   */
  constructor(private readonly secret: string) {}

  /**
   * @method sign
   * @description Metodo responsavel por gerar um token JWT.
   *
   * @param {*} payload - Payload a ser inserido no token.
   * @return {*}  {Promise<string>}
   * @memberof JWTService
   */
  public async sign(payload: any): Promise<string> {
    return this.signInFunction(payload);
  }

  /**
   * @method decode
   * @description Metodo responsavel por decodificar um token JWT.
   *
   * @private
   * @param {*} payload
   * @return {*}  {Promise<string>}
   * @memberof JWTService
   */
  private async signInFunction(payload: any): Promise<string> {
    return sign(payload, this.secret);
  }
  /**
   * @method decode
   * @description Metodo responsavel por decodificar um token JWT.
   *
   * @param {string} token
   * @return {*}  {Promise<any>}
   * @memberof JWTService
   */
  public async verify(token: string): Promise<any> {
    return this.verifyFunction(token);
  }

  /**
   * @method verifyFunction
   * @description Wrapper para a função 'verify' do jsonwebtoken.
   *
   * @private
   * @param {string} token
   * @return {*}  {*}
   * @memberof JWTService
   */
  private verifyFunction(token: string): any {
    return verify(token, this.secret);
  }
}
