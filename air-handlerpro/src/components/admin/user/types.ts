export interface User {
  id: string;
  name: string;
  email: string;
  company: string;
  requestedDate: string;
  status: "pending" | "approved" | "rejected";
}

export interface Company {
  id: string;
  name: string;
  adminName: string;
  email: string;
  users: number;
  createdDate: string;
  status: "active" | "suspended";
}

export interface Stat {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
  alert?: boolean;
}

export interface Activity {
  action: string;
  detail: string;
  time: string;
}
