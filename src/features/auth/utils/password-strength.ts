export function validatePasswordStrength(password: string) {
  const checks = {
    length: password.length >= 8,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    number: /\d/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };

  const passedCount = Object.values(checks).filter(Boolean).length;

  let strength: "weak" | "medium" | "strong" = "weak";
  if (passedCount >= 4) strength = "strong";
  else if (passedCount >= 2) strength = "medium";

  return {
    checks, // detailed pass/fail per rule
    strength, // "weak" | "medium" | "strong"
    score: passedCount, // 0–5
    isValid: passedCount === 5, // all conditions passed
  };
}

export function getPasswordStrengthColor(strength: "weak" | "medium" | "strong") {
  switch (strength) {
    case "weak":
      return "red";
    case "medium":
      return "yellow";
    case "strong":
      return "green";
  }
}