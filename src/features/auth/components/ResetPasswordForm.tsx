"use client";

import { useSearchParams } from "next/navigation";
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
import { PasswordInput } from "@/components/ui/PasswordInput";
import { Button } from "@/components/ui/button";
import { Lock, Loader2 } from "lucide-react";
import Link from "next/link";

// import { useResetPassword } from "../hooks/auth.hooks"; // Hook placeholder

// ✅ Schema — reuse your PasswordSchema logic if available
const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[a-z]/, "Must contain a lowercase letter")
      .regex(/[A-Z]/, "Must contain an uppercase letter")
      .regex(/\d/, "Must contain a number")
      .regex(
        /[^A-Za-z0-9]/,
        "Must contain a special character (e.g. !@#$%^&*)"
      ),
    confirmPassword: z.string().min(8, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const {
    control,
    handleSubmit,
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  // const { mutate: resetPassword, isPending: isLoading } = useResetPassword();

  const onSubmit = (data: ResetPasswordFormData) => {
    if (!token) {
      alert("Reset token missing or invalid");
      return;
    }

    const payload = {
      token,
      password: data.password,
    };

    console.log("Reset Password Payload:", payload);
    // resetPassword(payload);
  };

  return (
    <div className="w-full flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-muted/20">
      <Card className="w-full max-w-md mx-auto shadow-2xl border-border/80 bg-card/95 backdrop-blur-md rounded-2xl">
        <CardHeader className="text-center space-y-2 pb-2">
          <div className="flex justify-center mb-2">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Lock className="w-6 h-6 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">
            Reset Password
          </CardTitle>
          <CardDescription className="text-base text-muted-foreground">
            Enter your new password below
          </CardDescription>
        </CardHeader>

        <CardContent className="px-6">
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="space-y-6"
          >
            <FieldGroup>
              {/* New Password */}
              <Controller
                name="password"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={!!fieldState.error}>
                    <FieldLabel>
                      New Password <span className="text-destructive">*</span>
                    </FieldLabel>
                    <PasswordInput
                      {...field}
                      placeholder="Enter new password"
                      className="h-11 rounded-xl"
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
                      Confirm Password{" "}
                      <span className="text-destructive">*</span>
                    </FieldLabel>
                    <PasswordInput
                      {...field}
                      placeholder="Re-enter new password"
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
              {/* {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  <span>Resetting Password...</span>
                </>
              ) : ( */}
              <span>Reset Password</span>
              {/* )} */}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col space-y-4 pb-6">
          <div className="text-center text-sm text-muted-foreground">
            Back to{" "}
            <Link
              href="/sign-in"
              className="font-semibold text-primary hover:underline"
            >
              Sign In
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
