module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '3f8a9b2c4d5e6f7890a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w'),
  },
  apiToken: {
    salt: 'XyZ1a2b3c4d5e6f7g8h9i0j==',
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT','xXh9+GhsS2fUe34Pqlz+Hg=='),
    },
  },
  flags: {
    nps: env.bool('FLAG_NPS', true),
    promoteEE: env.bool('FLAG_PROMOTE_EE', true),
  },
});
