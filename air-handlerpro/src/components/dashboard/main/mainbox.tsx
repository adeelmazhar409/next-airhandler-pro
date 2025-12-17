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
  buttontwoText?: string;
  buttontwoHref?: string;
  buttontwoColor?: string;
  center?: string;
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
  buttontwoColor,
  buttontwoText,
  buttontwoHref,
  center,
}: MainboxProps) {
  return (
    <div
      className={`${center} bg-white border-2 border-charcoal flex flex-col justify-between rounded-small-block 
        transition-all duration-300
        shadow-[2px_2px_0_0_rgba(76,92,104,1),4px_4px_0_0_rgba(70,73,76,1),6px_6px_0_0_rgba(25,133,161,1)]
        hover:shadow-[0_0_0_2px_rgba(25,133,161,1),8px_8px_0_0_rgba(76,92,104,1)]
        hover:-translate-y-1`}
    >
      <div className="p-6">
        <h3
          className={`${titleSize} font-semibold flex items-center gap-2 text-charcoal`}
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
        <div className="flex justify-center gap-4">
          <Link
            href={buttonHref || "#"}
            className={`${
              button ? "flex" : "hidden"
            } items-center justify-center hover:bg-slate hover:text-white px-4 py-2 text-sm font-medium rounded-pill transition-colors ${buttonColor}`}
          >
            {buttonText}
            <RightArrowIcon />
          </Link>

          <Link
            href={buttontwoHref || "#"}
            className={`${
              buttontwo ? "flex" : "hidden"
            } items-center justify-center hover:bg-slate hover:text-white px-4 py-2 text-sm font-medium rounded-pill transition-colors ${buttontwoColor}`}
          >
            {buttontwoText}
            <RightArrowIcon />
          </Link>
        </div>
      </div>
    </div>
  );
}
