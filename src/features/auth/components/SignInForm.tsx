"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema } from "../schema/auth.schema";
import type { SignInFormData } from "../types/auth.types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2, LogIn } from "lucide-react";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useSignIn } from "../hooks/auth.hooks";

export function SignInForm() {
  const {
    control,
    handleSubmit,
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { mutate: signIn, isPending: isSignInPending } = useSignIn();

  const onSubmit = (data: SignInFormData) => {
  

    signIn(data); // ✅ send correct structure
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-2xl border-border/90 bg-card/95 backdrop-blur-md">
      <CardHeader className="space-y-1 text-center">
        <div className="flex justify-center mb-2">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <LogIn className="w-6 h-6 text-primary" />
          </div>
        </div>
        <CardTitle className="text-2xl font-bold tracking-tight">
          Welcome Back
        </CardTitle>
        <CardDescription className="text-base">
          Sign in to continue your learning journey
        </CardDescription>
      </CardHeader>

      <CardContent className="px-6">
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
          <FieldGroup>
            {/* Username or Email */}
            <Controller
              name="username"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={!!fieldState.error}>
                  <FieldLabel>
                    Username or Email <span className="text-destructive">*</span>
                  </FieldLabel>
                  <Input
                    {...field}
                    placeholder="johndoe or john@example.com"
                    autoComplete="username"
                    className="h-11"
                    aria-invalid={!!fieldState.error}
                  />
                  <FieldError errors={[fieldState.error]} />
                </Field>
              )}
            />

            {/* Password */}
            <Controller
              name="password"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={!!fieldState.error}>
                  <div className="flex items-center justify-between">
                    <FieldLabel>
                      Password <span className="text-destructive">*</span>
                    </FieldLabel>
                    <Link
                      href="/forgot-password"
                      className="text-sm text-primary hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <PasswordInput
                    {...field}
                    placeholder="Enter your password"
                    className="h-11"
                    aria-invalid={!!fieldState.error}
                  />
                  <FieldError errors={[fieldState.error]} />
                </Field>
              )}
            />
          </FieldGroup>

          <Button
            type="submit"
            size="lg"
            className="w-full h-11 text-base font-semibold shadow-lg hover:shadow-xl transition-all"
            disabled={isSignInPending}
          >
            {isSignInPending ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                <span>Signing In...</span>
              </>
            ) : (
              <span>Sign In</span>
            )}
          </Button>
        </form>
      </CardContent>

      <CardFooter className="flex flex-col space-y-4 pb-6">
        <div className="text-center text-sm text-muted-foreground">
          Don’t have an account?{" "}
          <Link
            href="/sign-up"
            className="font-semibold text-primary hover:underline"
          >
            Create one
          </Link>
        </div>

        <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
          <a href="/help" className="hover:text-foreground transition-colors">
            Need Help?
          </a>
          <span>•</span>
          <a href="/contact" className="hover:text-foreground transition-colors">
            Contact Support
          </a>
        </div>
      </CardFooter>
    </Card>
  );
}
