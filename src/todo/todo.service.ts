import { FastifyReply, FastifyRequest } from 'fastify';

export async function jwtToUserValidation(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const jwt = await request.jwtVerify();
    return jwt;
  } catch (err) {
    reply.send(err);
  }
}
