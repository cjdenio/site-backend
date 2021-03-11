module.exports = ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  admin: {
    auth: {
      // btw this jwt secret isn't used in prod, so don't think about hacking my backend
      secret: env("ADMIN_JWT_SECRET", "b730c4fa376452a873d1b5a7f7fa4237"),
    },
  },
});
