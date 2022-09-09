import jwt from '@fastify/jwt';
import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';

const jwtPlugin: FastifyPluginAsync = async (fastify) => {
  fastify.register(jwt, { secret: 'x12I57ntz13YSD33lpi83gd' });
};

export default fp(jwtPlugin);
