import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";

export async function loginIsRequiredServer() {
    const session = await getServerSession();

    if (!session) return redirect("/");
}

export function loginIsRequiredClient() {
    if (typeof window !== "undefined") {
        const session = useSession();
        const router = useRouter();
        if (!session) router.push("/");
    }
}