"use client";
import type { SignUpFormData } from "../types/auth.types";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "../schema/auth.schema";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2, Sparkles } from "lucide-react";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useSignUp } from "../hooks/auth.hooks";
export function SignUpForm() {
  const {
    control,
    handleSubmit,
    formState,
    reset,
    getValues,
    setValue,
    watch,
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
  });

  const { mutate: signUp, isPending: isSignUpPending } = useSignUp();

  const onSubmit = (data: SignUpFormData) => {
    signUp(data);
  };
  return (
    <Card className="w-full max-w-md  mx-auto shadow-2xl border-border/90 bg-card/95 backdrop-blur-md  ">
      <CardHeader className="space-y-1 text-center ">
        <div className="flex justify-center mb-2">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-primary" />
          </div>
        </div>
        <CardTitle className="text-2xl font-bold tracking-tight">
          Create Account
        </CardTitle>
        <CardDescription className="text-base">
          Start your personalized learning journey today
        </CardDescription>
      </CardHeader>
      <CardContent className="px-6">
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="space-y-6"
        >
          <FieldGroup>
            {/* First/Last Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Controller
                name="firstName"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={!!fieldState.error}>
                    <FieldLabel>
                      First Name <span className="text-destructive">*</span>
                    </FieldLabel>
                    <Input
                      {...field}
                      placeholder="John"
                      className="h-11"
                      aria-invalid={!!fieldState.error}
                      autoComplete="given-name"
                    />
                    <FieldError errors={[fieldState.error]} />
                  </Field>
                )}
              />

              <Controller
                name="lastName"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={!!fieldState.error}>
                    <FieldLabel>
                      Last Name <span className="text-destructive">*</span>
                    </FieldLabel>
                    <Input
                      {...field}
                      placeholder="Doe"
                      autoComplete="family-name"
                      className="h-11"
                      aria-invalid={!!fieldState.error}
                    />
                    <FieldError errors={[fieldState.error]} />
                  </Field>
                )}
              />
            </div>

            {/* Username */}
            <Controller
              name="username"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={!!fieldState.error}>
                  <FieldLabel>
                    Username <span className="text-destructive">*</span>
                  </FieldLabel>
                  <Input
                    {...field}
                    placeholder="johndoe_123"
                    autoComplete="username"
                    className="h-11"
                    aria-invalid={!!fieldState.error}
                  />
                  <FieldDescription className="text-xs">
                    Letters, numbers, and underscores only
                  </FieldDescription>
                  <FieldError errors={[fieldState.error]} />
                </Field>
              )}
            />

            {/* Email */}
            <Controller
              name="email"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={!!fieldState.error}>
                  <FieldLabel>
                    Email <span className="text-destructive">*</span>
                  </FieldLabel>
                  <Input
                    {...field}
                    type="email"
                    placeholder="john.doe@example.com"
                    autoComplete="email"
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
                  <FieldLabel>
                    Password <span className="text-destructive">*</span>
                  </FieldLabel>
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

            {/* Confirm Password */}
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={!!fieldState.error}>
                  <FieldLabel>
                    Confirm Password <span className="text-destructive">*</span>
                  </FieldLabel>
                  <PasswordInput
                    {...field}
                    placeholder="Re-enter your password"
                    className="h-11"
                    aria-invalid={!!fieldState.error}
                  />
                  <FieldError errors={[fieldState.error]} />
                </Field>
              )}
            />

            <Controller
              name="acceptTerms"
              control={control}
              render={({ field, fieldState }) => (
                <div
                  data-invalid={!!fieldState.error}
                  className="flex flex-col space-y-2"
                >
                  <label
                    htmlFor="acceptTerms"
                    className={cn(
                      "flex items-start gap-3 sm:items-center sm:flex-row text-sm cursor-pointer select-none",
                    )}
                  >
                    <Checkbox
                      id="acceptTerms"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      aria-invalid={!!fieldState.error}
                      className="mt-0.5 sm:mt-0 flex-shrink-0"
                    />

                    <span className="leading-snug text-muted-foreground">
                      I accept the{" "}
                      <Link
                        href="/terms"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-primary hover:underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Terms and Conditions
                      </Link>{" "}
                      and{" "}
                      <Link
                        href="/privacy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-primary hover:underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Privacy Policy
                      </Link>
                    </span>
                  </label>

                  {fieldState.error && (
                    <p className="text-sm text-destructive">
                      {fieldState.error.message}
                    </p>
                  )}
                </div>
              )}
            />
          </FieldGroup>
          <Button
            type="submit"
            size="lg"
            className="w-full h-11 text-base font-semibold shadow-lg hover:shadow-xl transition-all"
            disabled={isSignUpPending}
          >
            {isSignUpPending ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                <span>Creating Account...</span>
              </>
            ) : (
              <span>Create Account</span>
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4 pb-6">
        <div className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <a
            href="/sign-in"
            className="font-semibold text-primary hover:underline"
          >
            Sign In
          </a>
        </div>
        <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
          <a href="/help" className="hover:text-foreground transition-colors">
            Need Help?
          </a>
          <span>•</span>
          <a
            href="/contact"
            className="hover:text-foreground transition-colors"
          >
            Contact Support
          </a>
        </div>
      </CardFooter>
    </Card>
  );
}
