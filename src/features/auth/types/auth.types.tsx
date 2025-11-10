import  { z } from "zod";
import type {
  signInSchema,
  signUpSchemaWithTerms,
} from "../schema/auth.schema";

export type SignInFormData = z.infer<typeof signInSchema>;
export type SignUpFormData = z.infer<typeof signUpSchemaWithTerms>;
