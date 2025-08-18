import React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div
      className={cn(
        "bg-white rounded-lg border border-gray-200 shadow-sm",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader: React.FC<CardProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div className={cn("p-6 pb-0", className)} {...props}>
      {children}
    </div>
  );
};

export const CardContent: React.FC<CardProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div className={cn("p-6", className)} {...props}>
      {children}
    </div>
  );
};
