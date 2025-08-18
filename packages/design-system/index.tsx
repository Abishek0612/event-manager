"use client";

import { Toaster } from "@repo/design-system/components/ui/sonner";
import { TooltipProvider } from "@repo/design-system/components/ui/tooltip";
import { ThemeProvider } from "@repo/design-system/providers/theme";
import type { ReactNode } from "react";

type DesignSystemProviderProperties = {
  readonly children: ReactNode;
  readonly privacyUrl?: string;
  readonly termsUrl?: string;
  readonly helpUrl?: string;
};

export const DesignSystemProvider = ({
  children,
  ...properties
}: DesignSystemProviderProperties) => (
  <ThemeProvider {...properties}>
    <TooltipProvider>
      {children}
      <Toaster />
    </TooltipProvider>
  </ThemeProvider>
);
