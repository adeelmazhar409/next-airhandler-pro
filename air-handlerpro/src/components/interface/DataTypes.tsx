interface PasswordStrength {
  length: boolean;
  lower: boolean;
  upper: boolean;
  number: boolean;
  special: boolean;
  score: number;
}

interface StatData {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  alert?: boolean;
  hoverable?: boolean;
}

interface StatsCardsRowProps {
  stats: StatData[];
}

export type { PasswordStrength, StatsCardsRowProps };
