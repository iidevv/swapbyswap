import nextAuth from "next-auth";
import { authOptions } from "@/utils/authOptions";

const handler = nextAuth(authOptions);

export { handler as GET, handler as POST }
