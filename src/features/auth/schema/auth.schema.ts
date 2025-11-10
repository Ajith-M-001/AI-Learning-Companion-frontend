//src\features\auth\schema\auth.schema.ts
import type { ZodString } from "zod";
import { z } from "zod";

export const LIMITS = {
  PASSWORD: { MIN: 8, MAX: 64 },
  USERNAME: { MIN: 3, MAX: 100 },
  EMAIL: { MAX: 254 },
  FIRST_NAME: { MIN: 3, MAX: 100 },
  LAST_NAME: { MIN: 1, MAX: 100 },
} as const;

const baseString = () => z.string().trim();

const withMinMax = (
  schema: ZodString,
  min: number,
  max: number,
  field: string
) =>
  schema
    .min(min, `${field} must be at least ${min} characters`)
    .max(max, `${field} must be at most ${max} characters`);

const REGEX = {
  USERNAME: /^[a-zA-Z0-9_]+$/,
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // RFC 5322 simplified
  LOWERCASE: /[a-z]/,
  UPPERCASE: /[A-Z]/,
  NUMBER: /\d/,
  SPECIAL: /[^A-Za-z0-9]/,
};

export const PasswordSchema = baseString()
  .min(
    LIMITS.PASSWORD.MIN,
    `Password must be at least ${LIMITS.PASSWORD.MIN} characters`
  )
  .max(
    LIMITS.PASSWORD.MAX,
    `Password must be at most ${LIMITS.PASSWORD.MAX} characters`
  )
  .regex(REGEX.LOWERCASE, "Password must contain at least one lowercase letter")
  .regex(REGEX.UPPERCASE, "Password must contain at least one uppercase letter")
  .regex(REGEX.NUMBER, "Password must contain at least one number")
  .regex(
    REGEX.SPECIAL,
    "Password must contain at least one special character (e.g. !@#$%^&*)"
  );

export const usernameSchema = withMinMax(
  baseString(),
  LIMITS.USERNAME.MIN,
  LIMITS.USERNAME.MAX,
  "Username"
).regex(
  REGEX.USERNAME,
  "Username can only contain letters, numbers, and underscores"
);

export const emailSchema = z
  .email()
  .max(LIMITS.EMAIL.MAX, `Email must be at most ${LIMITS.EMAIL.MAX} characters`)
  .trim()
  .toLowerCase();

export const firstNameSchema = withMinMax(
  baseString(),
  LIMITS.FIRST_NAME.MIN,
  LIMITS.FIRST_NAME.MAX,
  "First name"
);

export const lastNameSchema = withMinMax(
  baseString(),
  LIMITS.LAST_NAME.MIN,
  LIMITS.LAST_NAME.MAX,
  "Last name"
);

export const loginIdSchema = baseString()
  .nonempty("username or email is required")
  .refine(
    (val) =>
      usernameSchema.safeParse(val).success ||
      emailSchema.safeParse(val).success,
    { message: "Must be a valid username or email" }
  );
export const signInSchema = z.object({
  loginId: loginIdSchema,
  password: PasswordSchema,
});

export const signUpSchema = z.object({
  firstName: firstNameSchema,
  lastName: lastNameSchema,
  username: usernameSchema,
  email: emailSchema,
  password: PasswordSchema,
});

// Extended schema with terms acceptance for the form
export const signUpSchemaWithTerms = signUpSchema.extend({
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
});
