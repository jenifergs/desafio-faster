import { PrismaClient } from '@prisma/client';
import { DrinksModel } from '../models/drinks.model';

/**
 * @typedef DrinksWithCategory
 * @description Este tipo representa o retorno do banco de dados ao buscar bebidas. Ele é composto por um array de categorias de bebidas, um array de bebidas curtidas e os dados da bebida.
 */
type DrinksWithCategory = {
  drink_categories: { name: string };
  liked_drinks: { id: number; user_id: number; drink_id: number }[];
} & {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category_id: number;
};

/**
 * Drinks service
 * @description Classe responsável por conter a lógica de negócio das bebidas.
 *
 * @export
 * @class DrinksService
 */
export class DrinksService {
  /**
   * Criar uma instancia de DrinksService.
   * @param {PrismaClient} repository - Instancia do repositorio com conexão com o banco de dados.
   * @memberof DrinksService
   */
  constructor(private readonly repository: PrismaClient) {}

  /**
   * @method getDrinksByCategoryId
   * @description Metodo responsavel por retornar todas as bebidas de uma categoria.
   * > Metodo utiliza o id do usuário para verificar se o usuário favoritou ou não a bebida.
   *
   * @param {number} categoryId
   * @param {number} userId
   * @return {*}  {Promise<DrinksModel[]>}
   * @memberof DrinksService
   */
  public async getDrinksByCategoryId(
    categoryId: number,
    userId: number,
  ): Promise<DrinksModel[]> {
    const drinks = await this.repository.drinks.findMany({
      where: {
        category_id: categoryId,
      },
      include: {
        drink_categories: {
          select: {
            name: true,
          },
        },
        liked_drinks: {
          where: {
            user_id: userId,
          },
        },
      },
    });

    return this.mapDrinks(drinks);
  }

  /**
   * @method getDrinksByCategoryAndName
   * @description Metodo responsavel por retornar todas as bebidas de uma categoria que contenham o nome passado como parametro.
   *
   * > Metodo utiliza o id do usuário para verificar se o usuário favoritou ou não a bebida.
   *
   * @param {number} categoryId
   * @param {string} name
   * @param {number} userId
   * @return {*}  {Promise<DrinksModel[]>}
   * @memberof DrinksService
   */
  public async getDrinksByCategoryAndName(
    categoryId: number,
    name: string,
    userId: number,
  ): Promise<DrinksModel[]> {
    const drinks = await this.repository.drinks.findMany({
      distinct: ['id'],
      where: {
        category_id: categoryId,
        name: {
          contains: name,
          mode: 'insensitive',
        },
      },
      include: {
        liked_drinks: {
          where: {
            user_id: userId,
          },
        },
        drink_categories: {
          select: {
            name: true,
          },
        },
      },
    });

    return this.mapDrinks(drinks);
  }

  /**
   * @method toggleDrinkLike
   * @description Metodo responsavel por favoritar ou desfavoritar uma bebida.
   *
   * @param {number} id
   * @param {number} userId
   * @return {*}  {Promise<void>}
   * @memberof DrinksService
   */
  public async toggleDrinkLike(id: number, userId: number): Promise<void> {
    const likedDrink = await this.findDrinkByUserIdAndDrinkId(userId, id);

    return await (likedDrink
      ? this.unklikeDrink(likedDrink)
      : this.likeDrink(id, userId));
  }

  /**
   * @method searchDrinksByName
   * @description Metodo responsavel por retornar bebidas que contenham o nome passado como parametro.
   * > Metodo utiliza o id do usuário para verificar se o usuário favoritou ou não a bebida.
   *
   * @param {string} name
   * @param {number} userId
   * @return {*}  {Promise<DrinksModel[]>}
   * @memberof DrinksService
   */
  public async searchDrinksByName(
    name: string,
    userId: number,
  ): Promise<DrinksModel[]> {
    const drinks = await this.repository.drinks.findMany({
      where: {
        name: {
          contains: name,
          mode: 'insensitive',
        },
      },
      include: {
        liked_drinks: {
          where: {
            user_id: userId,
          },
        },
        drink_categories: {
          select: {
            name: true,
          },
        },
      },
    });

    return this.mapDrinks(drinks);
  }

  /**
   * @method getAllDrinks
   * @description Metodo responsavel por retornar todas as bebidas cadastradas.
   * > Metodo utiliza o id do usuário para verificar se o usuário favoritou ou não a bebida.
   *
   * @param {number} userId
   * @return {*}  {Promise<DrinksModel[]>}
   * @memberof DrinksService
   */
  public async getAllDrinks(userId: number): Promise<DrinksModel[]> {
    const drinks = await this.repository.drinks.findMany({
      include: {
        drink_categories: {
          select: {
            name: true,
          },
        },
        liked_drinks: {
          where: {
            user_id: userId,
          },
        },
      },
    });

    return drinks.map((drink: any) => ({
      categoryId: drink.category_id,
      categoryName: drink.drink_categories.name,
      description: drink.description,
      id: drink.id,
      name: drink.name,
      price: drink.price,
      imageUrl: drink.image,
      isLiked: drink.liked_drinks.length > 0,
    }));
  }
  /**
   * @method mapDrinks
   * @description Metodo responsavel por mapear os dados retornados do banco de dados para o modelo de bebidas.
   *
   * @private
   * @param {DrinksWithCategory[]} drinks
   * @return {*}  {DrinksModel[]}
   * @memberof DrinksService
   */
  private mapDrinks(drinks: DrinksWithCategory[]): DrinksModel[] {
    return drinks.map(drink => ({
      categoryId: drink.category_id,
      categoryName: drink.drink_categories.name,
      description: drink.description,
      id: drink.id,
      name: drink.name,
      price: drink.price,
      imageUrl: drink.image,
      isLiked: drink.liked_drinks.length > 0,
    }));
  }

  /**
   * @method findDrinkByUserIdAndDrinkId
   * @description Metodo responsavel por buscar uma bebida pelo id do usuário e pelo id da bebida.
   *
   * @private
   * @param {number} userId
   * @param {number} id
   * @return {*}  {(Promise<{ id: number } | null>)}
   * @memberof DrinksService
   */
  private async findDrinkByUserIdAndDrinkId(
    userId: number,
    id: number,
  ): Promise<{ id: number } | null> {
    return await this.repository.liked_drinks.findFirst({
      where: {
        user_id: userId,
        drink_id: id,
      },
    });
  }

  /**
   * @method likeDrink
   * @description Metodo responsavel por favoritar uma bebida.
   * Na prática, ele cria um registro na tabela liked_drinks.
   *
   * @private
   * @param {number} id
   * @param {number} userId
   * @memberof DrinksService
   */
  private async likeDrink(id: number, userId: number) {
    await this.repository.liked_drinks.create({
      data: {
        drink_id: id,
        user_id: userId,
      },
    });
  }

  /**
   * @method unklikeDrink
   * @description Metodo responsavel por desfavoritar uma bebida.
   * Na prática, ele deleta um registro na tabela liked_drinks.
   *
   * @private
   * @param {{ id: number }} likedDrink
   * @return {*}
   * @memberof DrinksService
   */
  private async unklikeDrink(likedDrink: { id: number }) {
    await this.repository.liked_drinks.delete({
      where: likedDrink,
    });
    return;
  }
}
