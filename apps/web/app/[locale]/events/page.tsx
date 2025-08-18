import { getDictionary } from "@repo/internationalization";
import { createMetadata } from "@repo/seo/metadata";
import type { Metadata } from "next";
import EventsPage from "@/components/events/page";

type EventsProps = {
  params: Promise<{
    locale: string;
  }>;
};

export const generateMetadata = async ({
  params,
}: EventsProps): Promise<Metadata> => {
  return createMetadata({
    title: "Event Manager - Organize Your Events",
    description:
      "Powerful event management system with search, filters, and export capabilities. Built with Next.js, TypeScript, and Tailwind CSS.",
  });
};

const Events = async ({ params }: EventsProps) => {
  return <EventsPage />;
};

export default Events;
