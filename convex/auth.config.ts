import { AuthConfig } from "convex/server";

export default {
  providers: [
    {
      // Set this in your Convex deployment environment.
      domain: "https://probable-spider-73.clerk.accounts.dev",
      applicationID: "convex",
    },
  ],
} satisfies AuthConfig;
