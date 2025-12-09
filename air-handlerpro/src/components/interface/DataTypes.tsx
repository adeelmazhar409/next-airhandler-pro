interface PasswordStrength {
    length: boolean;
    lower: boolean;
    upper: boolean;
    number: boolean;
    special: boolean;
    score: number;
  }

export type { PasswordStrength };