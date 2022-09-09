import Fastify from 'fastify';

import cors from '@fastify/cors';
import jwtPlugin from './plugins/jwtPlugin';
import { PrismaClient } from '@prisma/client';
import prismaPlugin from './plugins/prismaPlugin';
import userRoutes from './user/user.routes';
import todoRoutes from './todo/todo.routes';

const fastify = Fastify({ logger: true });
const port = 4711;

fastify.register(cors, {});
fastify.register(jwtPlugin);
fastify.register(prismaPlugin);
fastify.register(userRoutes);
fastify.register(todoRoutes);
fastify.listen({ port: port }, (err) => {
  if (err) throw err;

  console.log(`Server läuft auf http://localhost:${port}`);
});
