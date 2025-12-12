import React from "react";
import { ActitivtyIcon } from "../../../icons/icons";
import Actbox from "../../UI-components/Actbox";
import { ClockIcon } from "../../../icons/icons";

export default function ActivitiesContent() {
  const value = {
    header: true,
    value: "Activity",
    headerIcon: <ActitivtyIcon />,
    icon: <ClockIcon />,
    description:
      "When you log calls, send emails, or create tasks, they'll appear here.",
  };

  return <Actbox {...value} />;
}
