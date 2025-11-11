"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import Link from "next/link";

// ✅ Validation schema
const forgotPasswordSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address")
    .min(1, "Email is required")
    .trim()
    .toLowerCase(),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export function ForgotPasswordForm() {
  const { control, handleSubmit } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: { email: "" },
  });

  const onSubmit = (data: ForgotPasswordFormData) => {
    console.log("Forgot Password Data:", data);
    // forgotPassword(data);
  };

  return (
    <div className="w-full flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-muted/20">
      <Card className="w-full max-w-md mx-auto shadow-2xl border-border/80 bg-card/95 backdrop-blur-md rounded-2xl">
        <CardHeader className="text-center space-y-2 pb-2">
          <div className="flex justify-center mb-2">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Mail className="w-6 h-6 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">
            Forgot Password
          </CardTitle>
          <CardDescription className="text-base text-muted-foreground">
            Enter your email to receive a password reset link
          </CardDescription>
        </CardHeader>

        <CardContent className="px-6">
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="space-y-6"
          >
            <FieldGroup>
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
                      placeholder="you@example.com"
                      autoComplete="email"
                      className="h-11 rounded-xl"
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
              className="w-full h-11 text-base font-semibold shadow-md hover:shadow-lg transition-all rounded-xl"
            >
              Send Reset Link
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col space-y-4 pb-6">
          <div className="text-center text-sm text-muted-foreground">
            Remember your password?{" "}
            <Link
              href="/sign-in"
              className="font-semibold text-primary hover:underline"
            >
              Sign In
            </Link>
          </div>

          <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
            <Link
              href="/help"
              className="hover:text-foreground transition-colors"
            >
              Need Help?
            </Link>
            <span>•</span>
            <Link
              href="/contact"
              className="hover:text-foreground transition-colors"
            >
              Contact Support
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
