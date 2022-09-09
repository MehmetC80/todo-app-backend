export const loginSchema = {
  response: {
    200: {
      type: 'object',
      properties: {
        token: { type: 'string' },
      },
    },
  },
  body: {
    type: 'object',
    properties: {
      name: { type: 'string' },
      password: { type: 'string' },
    },
  },
};

export const registerSchema = {
  response: {
    200: {
      type: 'object',
      properties: {
        token: { type: 'string' },
      },
    },
  },
  body: {
    type: 'object',
    properties: {
      token: { type: 'string' },
      password: { type: 'string' },
    },
  },
};
