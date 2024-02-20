import { asNextRoute } from "@defer/client/next";
import generateGitHubProfile from "@/defer/generateGitHubProfile";

// Transform our Defer Function to a Next.js poolable API route
export const { GetHandler: GET, PostHandler: POST } = asNextRoute(
  generateGitHubProfile
);
