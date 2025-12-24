"use client"

import { fetchCompanies } from "@/service/api/companies";

const response = await fetchCompanies();

export default function first() {
  console.log("Companies response:", response);
}
