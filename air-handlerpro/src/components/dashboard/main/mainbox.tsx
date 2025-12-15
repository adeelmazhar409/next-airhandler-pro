import React from "react";

interface MainboxProps {
    title: string;
    titleSize?: string;
  titleIcon?: React.ReactNode;
    description: string;
    descriptionSize?: string;
  list?: {
    value: string;
    icon: React.ReactNode;
  }[];
  button?: boolean;
  buttonText?: string;
  buttonHref?: string;
  buttonColor?: string;
  buttontwo?: boolean;
  
}

export default function Mainbox({
    title,
    titleSize,
  titleIcon,
    description,
    descriptionSize,
  list,
  button,
  buttonText,
  buttonHref,
  buttonColor,
  buttontwo,
}: MainboxProps) {
  return (
    <div
      className="bg-white border border-silver flex flex-col justify-between "
      style={{
        boxShadow:
          "rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset",
      }}
    >
      <div className="p-6">
        <h3
          className={` ${titleSize} font-semibold flex items-center gap-2 text-charcoal`}
        >
          {titleIcon}
          {title}
        </h3>
      </div>
      <div className="px-4 pb-4">
        <p className={`text-slate mb-6 ${descriptionSize}`}>{description}</p>
        {list && list.length > 0 && (
          <div className="space-y-3 mb-6">
            {list.map((item, index) => (
              <div key={index} className="flex items-start gap-2">
                <div className="h-4 w-4 text-cerulean mt-0.5">{item.icon}</div>
                <span className="text-sm text-charcoal">{item.value}</span>
              </div>
            ))}
          </div>
        )}
        <div className="flex ">
          <a
            href={buttonHref}
            className={`w-full ${
              button ? "flex" : "hidden"
            } items-center justify-center hover:bg-slate hover:text-white px-4 py-2 text-sm font-medium transition-colors ${buttonColor}`}
          >
            {buttonText}
            <svg
              className="ml-2 h-4 w-4" 
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 12h14M12 5l7 7-7 7"
              />
            </svg>
          </a>

          <a
            href={buttonHref}
            className={`w-full ${
              buttontwo ? "flex" : "hidden"
            } items-center justify-center hover:bg-slate hover:text-white px-4 py-2 text-sm font-medium transition-colors ${buttonColor}`}
          >
            {buttonText}
            <svg
              className="ml-2 h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 12h14M12 5l7 7-7 7"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}