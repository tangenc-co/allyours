export default ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'nkOfXq+CRZcBrSgrGsOc2A=='),
  },
  app: {
    keys: env.array('APP_KEYS', ['qvruvo+hAbyQPpwRxOhOvg==', 'B5HvDwx/jlXWR5BSg8NeKQ==', 'tt9ggXNtch5fgMfP8gK/Vw==', 'yKLL8D8GgU87MKnSqVAy8w==']),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT', 'p8FxqLiMJl522zLo1rGSfg=='),
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT', 'w50ng9w4P63exGnqbXm2Iw=='),
    },
  },
  secrets: {
    encryptionKey: env('ENCRYPTION_KEY', '9Cg9JBfoTdT1hTRVfUPd8w=='),
  },
  flags: {
    nps: env.bool('FLAG_NPS', true),
    promoteEE: env.bool('FLAG_PROMOTE_EE', true),
  },
});
