/**
 * @file Exporta a função de middleware que verifica se o token JWT é válido.
 * 
 */

import { Request, Response, NextFunction } from 'express';
import { jwtService } from '../shared/instances';

/**
 * @function verifyJwtAccessToken
 * @description Middleware responsavel por verificar se o token JWT é válido, verifica Header Authorization. se o token é válido, adiciona o id do usuário no header da requisição.
 *  > Injeta o id do usuário no header da requisição.
 * @param req
 * @param res 
 * @param next 
 * @returns
 */
export const verifyJwtAccessToken =  async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;
  const [bearer, token] = authHeader?.split(' ') || [];

  if (!bearer || bearer !== 'Bearer' || !token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const payload =  await jwtService.verify(token);
    req.headers.userId = payload.id;
    next();
  } catch (error: any) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

}