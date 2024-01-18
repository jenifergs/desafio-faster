import { hash, compare, genSalt } from 'bcrypt';
/**
 * @description Contém a instância do serviço de criptografia.
 * > Importante: metodos privados 'Function' são wrappers para funções do bcrypt. com o objetivo de facilitar a criação de testes unitários.
 *
 * @export
 * @class CypherService
 */
export class CypherService {
  /**
   * Creates an instance of CypherService.
   * @param {number} saltRounds - Numero de rounds para a geração do salt.
   * @memberof CypherService
   */
  constructor(private readonly saltRounds: number) {}

  /**
   * @method cypher
   * @description Metodo responsavel por criptografar uma senha.
   *
   * @param {string} password
   * @return {*}  {Promise<string>}
   * @memberof CypherService
   */
  public async cypher(password: string): Promise<string> {
    const salt = await this.generateSalt();
    return this.hashFunction(password, salt);
  }

  /**
   * @method compare
   * @description Metodo responsavel por comparar uma senha com uma senha criptografada.
   *
   * @param {string} password
   * @param {string} hash
   * @return {*}  {Promise<boolean>}
   * @memberof CypherService
   */
  public async compare(password: string, hash: string): Promise<boolean> {
    return this.compareFunction(password, hash);
  }

  /**
   * @method generateSalt
   * @description Metodo responsavel por gerar um salt.
   *
   * @private
   * @return {*}  {Promise<string>}
   * @memberof CypherService
   */
  private async generateSalt(): Promise<string> {
    return await this.generateSaltFunction();
  }

  /**
   * @method generateSaltFunction
   * @description Wrapper para a função 'genSalt' do bcrypt.
   *
   * @private
   * @return {*}  {Promise<string>}
   * @memberof CypherService
   */
  private generateSaltFunction(): Promise<string> {
    return genSalt(this.saltRounds);
  }

  /**
   * @method hashFunction
   * @description Wrapper para a função 'hash' do bcrypt.
   *
   * @private
   * @param {string} password
   * @param {string} salt
   * @return {*}  {Promise<string>}
   * @memberof CypherService
   */
  private hashFunction(password: string, salt: string): Promise<string> {
    return hash(password, salt);
  }

  /**
   * @method compareFunction
   * @description Wrapper para a função 'compare' do bcrypt.
   *
   * @private
   * @param {string} password
   * @param {string} hash
   * @return {*}  {Promise<boolean>}
   * @memberof CypherService
   */
  private compareFunction(password: string, hash: string): Promise<boolean> {
    return compare(password, hash);
  }
}
