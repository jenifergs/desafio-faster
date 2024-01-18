import { PrismaClient } from '@prisma/client';
import { CreatedUser } from '../models/created-user.model';
import { CypherService } from './cypher.service';
import { UserModel } from '../models/user.model';
import { DrinksModel } from '../models/drinks.model';
/**
 * User service
 * @description Classe responsável por conter a lógica de negócio dos usuários.
 *
 * @export
 * @class UserService
 */
export class UserService {
  /**
   * Criar uma instancia de UserService.
   * @param {PrismaClient} repository - Instancia do repositorio com conexão com o banco de dados.
   * @param {CypherService} cypherService - Instancia do serviço de criptografia. Capaz de criptografar e comparar senhas.
   * @memberof UserService
   */
  constructor(
    private readonly repository: PrismaClient,
    private readonly cypherService: CypherService,
  ) {}

  /**
   * @method create
   * @description Metodo responsavel por criar um usuário.
   * Metodo criptografa a senha do usuário antes de salvar no banco de dados.
   *
   *
   * @param {string} email
   * @param {string} name
   * @param {string} password
   * @param {string} birthday
   * @return {*}  {Promise<CreatedUser>}
   * @memberof UserService
   */
  public async create(
    email: string,
    name: string,
    password: string,
    birthday: string,
  ): Promise<CreatedUser> {
    const cypherPassword = await this.cypherService.cypher(password);
    const user = await this.repository.users.create({
      data: {
        email,
        name,
        password: cypherPassword,
        birthday: new Date(birthday),
      },
    });

    return {
      email: user.email,
      id: user.id,
    };
  }

  /**
   * @method existsByEmail
   * @description Metodo responsavel por verificar se um usuário existe pelo email.
   *
   *
   * @param {string} email
   * @return {*}  {Promise<boolean>}
   * @memberof UserService
   */
  public async existsByEmail(email: string): Promise<boolean> {
    const user = await this.repository.users.findFirst({
      where: {
        email,
      },
    });

    return !!user;
  }

  /**
   * @method findByEmail
   * @description Metodo responsavel por retornar um usuário pelo email.
   *
   * @param {string} emailCriteria
   * @return {*}  {Promise<UserModel>}
   * @memberof UserService
   */
  public async findByEmail(emailCriteria: string): Promise<UserModel> {
    const { birthday, email, id, name, password } =
      await this.repository.users.findFirstOrThrow({
        where: {
          email: emailCriteria,
        },
      });

    return {
      birthday,
      email,
      id,
      name,
      password,
    };
  }

  /**
   * @method getLikedDrinks
   * @description Metodo responsavel por retornar as bebidas favoritas do usuário.
   * Metodo busca as bebidas favoritas do usuário pelo id do usuário, em seguida mapeia as bebidas para o modelo de bebidas.
   *
   * @param {number} id
   * @return {*}  {Promise<DrinksModel[]>}
   * @memberof UserService
   */
  public async getLikedDrinks(id: number): Promise<DrinksModel[]> {
    const drinks = await this.repository.liked_drinks.findMany({
      where: {
        user_id: id,
      },
      include: {
        drinks: {
          select: {
            id: true,
            name: true,
            price: true,
            description: true,
            image: true,
            drink_categories: {
              select: {
                name: true,
                id: true,
              },
            },
          },
        },
      },
    });

    return drinks.map((drink: any) => {
      const response: DrinksModel = {
        categoryId: drink.drinks.drink_categories.id,
        categoryName: drink.drinks.drink_categories.name,
        description: drink.drinks.description,
        id: drink.drinks.id,
        imageUrl: drink.drinks.image,
        name: drink.drinks.name,
        price: drink.drinks.price,
        isLiked: true,
      };

      return response;
    });
  }
}
