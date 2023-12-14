import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";

export async function loginIsRequired() {
    const session = await getServerSession();

    if (!session) return redirect("/");
}