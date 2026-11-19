import { createFileRoute } from "@tanstack/react-router";
import { GlobalCncApp } from "@/components/GlobalCncApp";

// The home route ships no og:image, so serve-time hosting can inject the
// project's social preview (explicit og:image or latest screenshot).
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Global CNC Pvt. Ltd. | Precision, engineered" },
      {
        name: "description",
        content:
          "Special purpose machines, CNC and VMC systems, and industrial automation engineered in Pune, India by Global CNC Pvt. Ltd.",
      },
      { property: "og:title", content: "Global CNC Pvt. Ltd. | Precision, engineered" },
      {
        property: "og:description",
        content:
          "Purpose-built machines and intelligent automation for India's manufacturing industry.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return <GlobalCncApp />;
}
