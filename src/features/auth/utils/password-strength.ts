// src\features\auth\utils\password-strength.ts

export function getPasswordCriteria(password: string) {
  return {
    hasMinLength: password.length >= 8,
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasNumber: /\d/.test(password),
    hasSpecial: /[^A-Za-z0-9]/.test(password),
  };
}

export function getPasswordStrengthScore(criteria: Record<string, boolean>) {
  return Object.values(criteria).reduce((acc, valid) => acc + (valid ? 1 : 0), 0);
}

export function getPasswordStrengthConfig(score: number) {
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
