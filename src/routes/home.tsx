import { createFileRoute, redirect } from "@tanstack/react-router";

// The original app linked "Home" to /home; the landing page now lives at /.
export const Route = createFileRoute("/home")({
  beforeLoad: () => {
    throw redirect({ to: "/", statusCode: 301 });
  },
});
