import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  PORT: z.coerce.number().int().positive().default(4000),
  DATABASE_URL: z
    .string()
    .default(
      process.env.DATABASE_URL ||
        "postgresql://postgres.dxultlqvjalebaruaizh:%40Saanvi9661%40@aws-0-ap-northeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1"
    ),
  JWT_ACCESS_SECRET: z
    .string()
    .default(
      process.env.JWT_ACCESS_SECRET ||
        "SuW3anzgo9r+aOSWnQCBQ4BJIOFWMhu2mx+TFD3/P40="
    ),
  JWT_REFRESH_SECRET: z
    .string()
    .default(
      process.env.JWT_REFRESH_SECRET ||
        "YIag8eBKv/7MK89UGKEeQ1ize9shyFxX/IiIkbpzCwI="
    ),
  JWT_ACCESS_EXPIRES_IN: z.string().default("15m"),
  JWT_REFRESH_EXPIRES_IN: z.string().default("7d"),
  CORS_ORIGIN: z.string().default("*"),
});

export type Env = z.infer<typeof envSchema>;

function parseEnv(): Env {
  const result = envSchema.safeParse(process.env);

  if (!result.success) {
    const formatted = result.error.flatten().fieldErrors;
    console.warn("Notice: Environment variables using defaults:", formatted);
    return envSchema.parse({});
  }

  return result.data;
}

export const env = parseEnv();

export function getCorsOrigins(): string[] {
  if (env.CORS_ORIGIN === "*") return ["*"];
  return env.CORS_ORIGIN.split(",").map((origin) => origin.trim()).filter(Boolean);
}
