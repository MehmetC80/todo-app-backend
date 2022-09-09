export const getTodosSchema = {
  response: {
    200: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          text: { type: 'string' },
          createdAt: { type: 'string' },
          insertedAt: { type: 'string' },
        },
      },
    },
  },
};

export const postTodoSchema = {
  body: {
    type: 'object',
    properties: {
      text: { type: 'string' },
      checked: { type: 'boolean' },
      createdAt: { type: 'string' },
    },
  },
};
