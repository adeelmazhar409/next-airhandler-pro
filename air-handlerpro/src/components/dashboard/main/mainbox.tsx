import { RightArrowIcon } from "@/components/icons/icons";
import Link from "next/link";
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
      className="bg-white border border-silver flex flex-col justify-between rounded-small-block shadow-[0_2px_4px_rgba(0,0,0,0.1),0_8px_16px_rgba(76,92,104,0.2),0_16px_32px_rgba(76,92,104,0.15)]"
     
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
          <Link
            href={buttonHref || "#"}
            className={`w-full ${
              button ? "flex" : "hidden"
            } items-center justify-center hover:bg-slate hover:text-white px-4 py-2 text-sm font-medium rounded-pill transition-colors ${buttonColor}`}
          >
            {buttonText}
            <RightArrowIcon />
          </Link>

          <Link
            href={buttonHref || "#"}
            className={`w-full ${
              buttontwo ? "flex" : "hidden"
            } items-center justify-center hover:bg-slate hover:text-white px-4 py-2 text-sm font-medium rounded-pill transition-colors ${buttonColor}`}
          >
            {buttonText}
            <RightArrowIcon />
          </Link>
        </div>
      </div>
    </div>
  );
}
