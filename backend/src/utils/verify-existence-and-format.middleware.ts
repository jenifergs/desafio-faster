/**
 * @file Export uma função base para middlewares para verificar a existência e o formato de uma propriedade.
 */
import { NextFunction, Request, Response } from 'express';

/**
 * @function verifyExistenceAndFormat
 * @param req
 * @param res
 * @param next
 * @param propertyName  - Nome da propriedade a ser verificada dentro do corpo da requisiçãol.
 * @param propertyFormat - Formato da propriedade (RegEx) a ser verificada dentro do corpo da requisição.
 */
export async function verifyExistenceAndFormat(
  req: Request,
  res: Response,
  propertyName: string,
  propertyFormat: RegExp,
): Promise<{ hasError: boolean} > {
  if (!req.body) {
    res.status(400).json({
      error: 'The body is required',
    });
  }

  const propertyValue = req.body[propertyName];

  if (!propertyValue) {
    res.status(400).json({
      error: `The property "${propertyName}" is required`,
    });

    return { hasError: true };
  } else if (!propertyFormat.test(propertyValue)) {
    res.status(400).json({
      error: `The property "${propertyName}" is not in the correct format (expected: ${propertyFormat})`,
    });
    return { hasError: true };
  }

  return { hasError: false };
}
