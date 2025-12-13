import React from "react";
import StatsCard from "./StatsCard";
import {StatsCardsRowProps} from "@/components/interface/DataTypes"

export default function StatsCardsRow({ stats }: StatsCardsRowProps) {
  return (
    <div className="grid grid-cols-4 h-fit gap-6 mb-7">
      {stats.map((stat, index) => (
        <StatsCard key={index} {...stat} />
      ))}
    </div>
  );
}
