import React, { useState } from "react";
import { ActitivtyIcon } from "../../../icons/icons";
import Actbox from "../../UI-components/Actbox";
import { ClockIcon } from "../../../icons/icons";
import { ActivityForm } from "./forms/ActivityForm";

export default function ActivitiesContent() {
  const [formToggle, setFormToggle] = useState(false);

  const handleCreateEstimate = () => {
    setFormToggle(true);
  };

  const handleCancel = () => {
    setFormToggle(false);
  };

  const handleSubmit = (formData: any) => {
    console.log("Form submitted:", formData);
    // Handle form submission logic
    // After successful submission, you might want to close the form:
    // setFormToggle(false);
  };

  if (formToggle) {
    return (
      <ActivityForm
        onCancel={handleCancel}
        onSubmit={handleSubmit}
      />
    );
  }
  const ActBoxData = {
    data:true,
    header: true,
    value: "Activity",
    formOpen: handleCreateEstimate,
    headerIcon: <ActitivtyIcon />,
    icon: <ClockIcon />,
    description:
      "When you log calls, send emails, or create tasks, they'll appear here.",
  };

  return <Actbox {...ActBoxData} />;
}
