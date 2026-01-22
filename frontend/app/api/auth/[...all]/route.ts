// Implements: T012 [US1]
import { auth } from "@/lib/auth-server"; // Need server config
import { toNextJsHandler } from "better-auth/next-js";

export const { GET, POST } = toNextJsHandler(auth);
