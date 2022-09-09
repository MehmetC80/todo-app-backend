import { FastifyInstance } from 'fastify';
import { JwtFormat } from '../user/user.routes';
import { getTodosSchema, postTodoSchema } from './todo.schema';
import { jwtToUserValidation } from './todo.service';

export default async function todoRoutes(fastify: FastifyInstance) {
  fastify.addHook('onRequest', async (request, reply) => {
    await jwtToUserValidation(request, reply);
  });

  fastify.get(
    '/todos',
    {
      schema: getTodosSchema,
    },
    async (request) => {
      const user = request.user as JwtFormat;
      const items = await fastify.prisma.todo.findMany({
        where: { userId: user.sub },
        orderBy: { insertedAt: 'desc' },
      });
      return items;
    }
  );

  fastify.post<{ Body: Todo; Reply: Todo }>(
    '/todo',
    {
      schema: postTodoSchema,
    },
    async (request) => {
      const user = request.user as JwtFormat;
      const userFromDatabase = await fastify.prisma.user.findUnique({
        where: { id: user.sub },
      });
      if (userFromDatabase) {
        try {
          const item = await fastify.prisma.todo.create({
            data: {
              text: String(request.body.text),
              createdAt: String(request.body.createdAt),
              user: { connect: { id: user.sub } },
            },
          });
          return item;
        } catch (error) {
          console.error(error);
          throw new Error('Kann TodoItem nicht erstellen');
        }
      } else {
        throw new Error();
      }
    }
  );

  fastify.delete<{
    Body: Todo;
    Reply: Todo;
    Params: DeleteParams;
  }>('/todo/:id', async (request) => {
    const id = request.params.id;
    const user = request.user as JwtFormat;

    const item = await fastify.prisma.todo.findFirst({
      where: {
        id: id,
        userId: user.sub,
      },
    });

    if (item && item.userId === user.sub) {
      const deletedItem = await fastify.prisma.todo.delete({
        where: { id },
      });
      return deletedItem;
    } else {
      throw new Error('Kann Todo nicht löschen');
    }
  });
}

interface DeleteParams {
  id: string;
}
export interface Todo {
  text: String;
  checked?: boolean | null;
  createdAt: String;
}
