"use client";

import { Button } from "@repo/design-system/components/ui/button";
import { Input } from "@repo/design-system/components/ui/input";
import { Label } from "@repo/design-system/components/ui/label";
import { Textarea } from "@repo/design-system/components/ui/textarea";
import type { Dictionary } from "@repo/internationalization";
import { Check, MoveRight } from "lucide-react";
import { useState } from "react";

type ContactFormProps = {
  dictionary: Dictionary;
};

export const ContactForm = ({ dictionary }: ContactFormProps) => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    // Reset after 3 seconds
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <div className="w-full py-20 lg:py-40">
      <div className="container mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <h4 className="max-w-xl text-left font-regular text-3xl tracking-tighter md:text-5xl">
                  {dictionary.web.contact.meta.title}
                </h4>
                <p className="max-w-sm text-left text-lg text-muted-foreground leading-relaxed tracking-tight">
                  {dictionary.web.contact.meta.description}
                </p>
              </div>
            </div>
            {dictionary.web.contact.hero.benefits.map((benefit, index) => (
              <div
                className="flex flex-row items-start gap-6 text-left"
                key={index}
              >
                <Check className="mt-2 h-4 w-4 text-primary" />
                <div className="flex flex-col gap-1">
                  <p>{benefit.title}</p>
                  <p className="text-muted-foreground text-sm">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center">
            <form
              onSubmit={handleSubmit}
              className="flex max-w-sm flex-col gap-4 rounded-md border p-8"
            >
              <p>Contact Form</p>

              <div className="grid w-full max-w-sm items-center gap-1">
                <Label htmlFor="name">Name</Label>
                <Input id="name" type="text" required />
              </div>

              <div className="grid w-full max-w-sm items-center gap-1">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" required />
              </div>

              <div className="grid w-full max-w-sm items-center gap-1">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" required />
              </div>

              <Button className="w-full gap-4" type="submit">
                {isSubmitted ? "Sent!" : "Send Message"}
                <MoveRight className="h-4 w-4" />
              </Button>

              {isSubmitted && (
                <p className="text-green-600 text-sm text-center">
                  Thank you for your message! (Demo mode - email not actually
                  sent)
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
