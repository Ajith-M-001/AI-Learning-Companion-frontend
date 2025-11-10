"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { signUpSchema } from "../schema/auth.schema";

import { CheckCircle2, XCircle, Loader2, Info } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldDescription,
} from "@/components/ui/field";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { PasswordInput } from "@/components/ui/PasswordInput";

// Extended schema with terms acceptance
const signUpSchemaExtended = signUpSchema.extend({
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
});

type SignUpFormData = z.infer<typeof signUpSchemaExtended>;

// Password strength utilities
function getPasswordCriteria(password: string) {
  return {
    hasMinLength: password.length >= 8,
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasNumber: /\d/.test(password),
    hasSpecial: /[^A-Za-z0-9]/.test(password),
  };
}

function getPasswordStrengthScore(criteria: Record<string, boolean>) {
  return Object.values(criteria).reduce(
    (acc, valid) => acc + (valid ? 1 : 0),
    0,
  );
}

function getPasswordStrengthConfig(score: number) {
  if (score <= 2)
    return {
      label: "Weak",
      color: "bg-red-500",
      textColor: "text-red-600",
      width: "w-1/3",
    };
  if (score <= 4)
    return {
      label: "Moderate",
      color: "bg-yellow-500",
      textColor: "text-yellow-600",
      width: "w-2/3",
    };
  return {
    label: "Strong",
    color: "bg-green-500",
    textColor: "text-green-600",
    width: "w-full",
  };
}

export function SignUpForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const firstInputRef = useRef<HTMLInputElement | null>(null);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid, isDirty },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchemaExtended),
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      acceptTerms: false,
    },
  });

  // Auto-focus first input
  useEffect(() => {
    firstInputRef.current?.focus();
  }, []);

  const password = watch("password", "");
  const acceptTerms = watch("acceptTerms", false);

  // Memoized password calculations
  const passwordCriteria = useMemo(
    () => getPasswordCriteria(password),
    [password],
  );
  const allCriteriaValid = useMemo(
    () => Object.values(passwordCriteria).every(Boolean),
    [passwordCriteria],
  );
  const strengthScore = useMemo(
    () => getPasswordStrengthScore(passwordCriteria),
    [passwordCriteria],
  );
  const strengthConfig = useMemo(
    () => getPasswordStrengthConfig(strengthScore),
    [strengthScore],
  );

  const onSubmit = async (data: SignUpFormData) => {
    try {
      setIsSubmitting(true);
      // Simulate API call
      await new Promise((res) => setTimeout(res, 2000));
      console.log("Form submitted:", { ...data, password: "[REDACTED]" });
      alert("✅ Account created successfully!");
    } catch (error) {
      console.error("Submission error:", error);
      alert("❌ Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-2xl border-border/50 bg-card/95 backdrop-blur-sm">
      <CardHeader className="space-y-2 text-center pb-6">
        <div className="flex justify-center mb-2">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Info className="w-6 h-6 text-primary" />
          </div>
        </div>
        <CardTitle className="text-3xl font-bold tracking-tight">
          Create Account
        </CardTitle>
        <CardDescription className="text-base">
          Enter your information to get started
        </CardDescription>
      </CardHeader>

      <CardContent className="px-6">
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="space-y-5"
        >
          <FieldGroup className="space-y-5">
            {/* First Name & Last Name - Side by Side on Desktop */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* First Name */}
              <Controller
                name="firstName"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={!!fieldState.error}>
                    <FieldLabel htmlFor="firstName">
                      First Name <span className="text-destructive">*</span>
                    </FieldLabel>
                    <Input
                      ref={(e) => {
                        field.ref(e);
                        if (!firstInputRef.current) firstInputRef.current = e;
                      }}
                      id="firstName"
                      placeholder="John"
                      {...field}
                      aria-invalid={!!fieldState.error}
                      autoComplete="given-name"
                      className="h-11 transition-all focus:ring-2"
                    />
                    <FieldError errors={[fieldState.error]} />
                  </Field>
                )}
              />

              {/* Last Name */}
              <Controller
                name="lastName"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={!!fieldState.error}>
                    <FieldLabel htmlFor="lastName">
                      Last Name <span className="text-destructive">*</span>
                    </FieldLabel>
                    <Input
                      id="lastName"
                      placeholder="Doe"
                      {...field}
                      aria-invalid={!!fieldState.error}
                      autoComplete="family-name"
                      className="h-11 transition-all focus:ring-2"
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
                  <FieldLabel htmlFor="username">
                    Username <span className="text-destructive">*</span>
                  </FieldLabel>
                  <Input
                    id="username"
                    placeholder="johndoe_123"
                    {...field}
                    aria-invalid={!!fieldState.error}
                    autoComplete="username"
                    className="h-11 transition-all focus:ring-2"
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
                  <FieldLabel htmlFor="email">
                    Email <span className="text-destructive">*</span>
                  </FieldLabel>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john.doe@example.com"
                    {...field}
                    aria-invalid={!!fieldState.error}
                    autoComplete="email"
                    className="h-11 transition-all focus:ring-2"
                  />
                  <FieldDescription className="text-xs">
                    We'll never share your email
                  </FieldDescription>
                  <FieldError errors={[fieldState.error]} />
                </Field>
              )}
            />

            {/* Password with Enhanced UI */}
            <Controller
              name="password"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={!!fieldState.error}>
                  <FieldLabel htmlFor="password">
                    Password <span className="text-destructive">*</span>
                  </FieldLabel>
                  <PasswordInput
                    id="password"
                    placeholder="Create a strong password"
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    aria-describedby="password-criteria password-strength"
                    aria-invalid={!!fieldState.error}
                    autoComplete="new-password"
                    className="h-11"
                  />

                  {/* Password Strength Indicator */}
                  {password && (
                    <div className="mt-3 space-y-2">
                      {/* Strength Bar */}
                      <div className="relative h-1.5 w-full bg-muted rounded-full overflow-hidden">
                        <div
                          className={`h-full ${strengthConfig.color} transition-all duration-500 ease-out ${strengthConfig.width}`}
                        />
                      </div>

                      {/* Strength Label */}
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-xs font-semibold ${strengthConfig.textColor}`}
                          id="password-strength"
                        >
                          Password Strength: {strengthConfig.label}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {strengthScore}/5 criteria met
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Password Criteria Checklist */}
                  {password && (
                    <ul id="password-criteria" className="mt-3 space-y-1.5">
                      {[
                        {
                          label: "At least 8 characters",
                          valid: passwordCriteria.hasMinLength,
                        },
                        {
                          label: "One uppercase letter",
                          valid: passwordCriteria.hasUppercase,
                        },
                        {
                          label: "One lowercase letter",
                          valid: passwordCriteria.hasLowercase,
                        },
                        {
                          label: "One number",
                          valid: passwordCriteria.hasNumber,
                        },
                        {
                          label: "One special character",
                          valid: passwordCriteria.hasSpecial,
                        },
                      ].map((item) => (
                        <li
                          key={item.label}
                          className="flex items-center space-x-2 text-xs"
                          role="status"
                          aria-label={`${item.label}: ${item.valid ? "met" : "not met"}`}
                        >
                          {item.valid ? (
                            <CheckCircle2 className="h-3.5 w-3.5 text-green-500 flex-shrink-0" />
                          ) : (
                            <XCircle className="h-3.5 w-3.5 text-muted-foreground/50 flex-shrink-0" />
                          )}
                          <span
                            className={
                              item.valid
                                ? "text-green-600 dark:text-green-500 font-medium"
                                : "text-muted-foreground"
                            }
                          >
                            {item.label}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}

                  <FieldError errors={[fieldState.error]} />
                </Field>
              )}
            />

            {/* Terms and Conditions Checkbox */}
            <Controller
              name="acceptTerms"
              control={control}
              render={({ field, fieldState }) => (
                <Field
                  orientation="horizontal"
                  data-invalid={!!fieldState.error}
                  className="items-start"
                >
                  <Checkbox
                    id="acceptTerms"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    aria-invalid={!!fieldState.error}
                    className="mt-1"
                  />
                  <div className="flex flex-col gap-1">
                    <FieldLabel
                      htmlFor="acceptTerms"
                      className="font-normal text-sm leading-none"
                    >
                      I accept the{" "}
                      <a
                        href="/terms"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-primary hover:underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Terms and Conditions
                      </a>{" "}
                      and{" "}
                      <a
                        href="/privacy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-primary hover:underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Privacy Policy
                      </a>
                    </FieldLabel>
                    <FieldError errors={[fieldState.error]} />
                  </div>
                </Field>
              )}
            />
          </FieldGroup>

          {/* Submit Button */}
          <Button
            type="submit"
            size="lg"
            className="w-full h-11 text-base font-semibold shadow-lg hover:shadow-xl transition-all"
            disabled={
              isSubmitting || !isValid || !allCriteriaValid || !acceptTerms
            }
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Creating Account...
              </>
            ) : (
              "Create Account"
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

        {/* Additional Links */}
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
