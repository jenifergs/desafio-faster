/**
 * User model
 * @description Interface que representa o modelo de usuários.
 *
 * @export
 * @interface UserModel
 */
export interface UserModel {
  id: number;
  name: string;
  email: string;
  birthday: Date;
  password: string;
}
