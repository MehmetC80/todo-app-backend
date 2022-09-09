import { FastifyInstance } from 'fastify';
import { JwtFormat } from './user.routes';

export async function signToken(
  fastify: FastifyInstance,
  userObject: Omit<JwtFormat, 'iat'>
) {
  return fastify.jwt.sign(userObject);
}
