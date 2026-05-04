import swaggerJsdoc from 'swagger-jsdoc';

export const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'OrionTek API - Gestión de Clientes',
      version: '1.0.0',
      description:
        'API REST para administrar clientes y sus direcciones. ' +
        'Cada cliente puede tener N direcciones.',
      contact: {
        name: 'Esmerlin Cheriel',
      },
    },
    servers: [
      {
        url: 'http://localhost:4000',
        description: 'Servidor de desarrollo local',
      },
    ],
    security: [{ bearerAuth: [] }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description:
            'Pegá aquí el token JWT que devuelve `POST /api/auth/login`.',
        },
      },
      schemas: {
        PublicUser: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            email: { type: 'string', format: 'email' },
            name: { type: 'string' },
            role: { type: 'string', enum: ['admin', 'employee'] },
            avatar: { type: 'string', nullable: true },
          },
        },
        Client: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            name: { type: 'string' },
            email: { type: 'string', format: 'email' },
            phone: { type: 'string' },
            document: { type: 'string' },
            createdAt: { type: 'string', format: 'date-time' },
            addresses: {
              type: 'array',
              items: { $ref: '#/components/schemas/Address' },
            },
          },
        },
        Address: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            clientId: { type: 'string', format: 'uuid' },
            street: { type: 'string' },
            city: { type: 'string' },
            state: { type: 'string' },
            zipCode: { type: 'string' },
            country: { type: 'string' },
            isPrimary: { type: 'boolean' },
          },
        },
        CreateClientDTO: {
          type: 'object',
          required: ['name', 'email', 'phone', 'document'],
          properties: {
            name: { type: 'string', example: 'Empresa SRL' },
            email: { type: 'string', example: 'contacto@empresa.com' },
            phone: { type: 'string', example: '+1 809-555-0100' },
            document: { type: 'string', example: '1-30-12345-6' },
          },
        },
        UpdateClientDTO: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            email: { type: 'string' },
            phone: { type: 'string' },
            document: { type: 'string' },
          },
        },
        CreateAddressDTO: {
          type: 'object',
          required: ['street', 'city', 'state', 'zipCode', 'country'],
          properties: {
            street: { type: 'string' },
            city: { type: 'string' },
            state: { type: 'string' },
            zipCode: { type: 'string' },
            country: { type: 'string' },
            isPrimary: { type: 'boolean' },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.ts'],
});
