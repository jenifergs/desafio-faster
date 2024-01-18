/**
 * @file Exporta a função de middleware que verifica se os parametros de criação de usuário são válidos.
 */

import { NextFunction, Request, Response } from 'express';
import { verifyExistenceAndFormat } from '../shared/verify-existence-and-format.middleware';
/**
 * @function verifyUserCreation
 * @description Middleware responsavel por verificar se os parametros de criação de usuário são válidos. Ou seja, se o email, nome, senha e data de nascimento estão no formato correto.
 * @param req
 * @param res
 * @param next
 */
export const verifyUserCreation = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const emailRegEx = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const nameRegEx = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
  const passwordRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
  const birthdayRegEx = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
  const validators = [
    verifyExistenceAndFormat(req, res, 'email', emailRegEx),
    verifyExistenceAndFormat(req, res, 'name', nameRegEx),
    verifyExistenceAndFormat(req, res, 'password', passwordRegEx),
    verifyExistenceAndFormat(req, res, 'birthday', birthdayRegEx),
  ];

  for (const validator of validators) {
    const response = await validator;
    if (response.hasError) {
      return;
    }
  }

  next();
};
