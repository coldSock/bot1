import { config } from 'dotenv';
import { resolve } from 'path';

const EnvFile = process.env.NODE_ENV === 'development' ? '.dev.env' : '.env';

const EnvFilePath = resolve(process.cwd(), EnvFile);

// Initialize environment variables from .env file.
config({ path: EnvFilePath });

// Attempts to get an environment variable, and throws an error if it is not set.
export function getEnvVar(name: string, fallback?: string): string {
  const value = process.env[name] ?? fallback;
  if (value === undefined) {
    throw new Error(`Environment variable ${name} is not set.`);
  }

  return value;
}
