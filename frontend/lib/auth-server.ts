// Implements: T012 [US1] (Server Config)
import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { bearer, jwt } from "better-auth/plugins";
import { Pool } from "pg";

const globalPool = globalThis as unknown as { _pgPool?: Pool };

if (!globalPool._pgPool) {
  globalPool._pgPool = new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 10, // Limit pool size
    idleTimeoutMillis: 30000,
  });
}

export const auth = betterAuth({
  database: globalPool._pgPool,
  emailAndPassword: {
    enabled: true,
  },
  session: {
    // jwt: true, // Replaced by jwt() and bearer() plugins
  },
  secret: process.env.BETTER_AUTH_SECRET,
  plugins: [nextCookies(), bearer(), jwt()],
});