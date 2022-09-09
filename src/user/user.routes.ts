import { FastifyInstance } from 'fastify';
import bcrypt from 'bcrypt';
import { loginSchema, registerSchema } from './user.schema';
import { signToken } from './user.service';

export default async function userRoutes(fastify: FastifyInstance) {
  fastify.post<{ Body: UserRegisterInput }>(
    '/register',
    {
      schema: registerSchema,
    },
    async (request) => {
      const { name, password } = request.body;
      if (name === '' || name.length <= 2) {
        throw new Error('Name zu kurz');
      }
      const encryptedPassword = await bcrypt.hash(password, 10);

      const newUser = await fastify.prisma.user.create({
        data: { name, password: encryptedPassword },
      });
      console.log(newUser);

      const token = await signToken(fastify, {
        sub: newUser.id,
        name: newUser.name,
      });
      console.log(token);

      return { token };
    }
  );

  fastify.post<{ Body: UserLoginInput }>(
    '/login',
    {
      schema: loginSchema,
    },
    async (request) => {
      const { name, password } = request.body;
      const user = await fastify.prisma.user.findFirst({ where: { name } });
      if (user === null) throw new Error('Login nicht möglich');
      const isSamePassword = await bcrypt.compare(password, user.password);
      if (isSamePassword) {
        const token = await signToken(fastify, {
          sub: user.id,
          name: user.name,
        });
        return { token };
      } else {
        throw new Error('Login nicht möglich');
      }
    }
  );
}

interface UserRegisterInput extends UserLoginInput {}

interface UserLoginInput {
  name: string;
  password: string;
}

export interface JwtFormat {
  sub: string;
  name: string;
  iat: number;
}
