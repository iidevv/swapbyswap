import { loginIsRequiredServer } from "@/lib/auth";
import { prisma } from "@/lib/prisma"
import SignoutButton from '@/components/auth/signout-button';
import Link from 'next/link';
import Sidebar from "@/components/account/sidebar";
import Heading from "@/components/layout/heading";

const page = async () => {
    await loginIsRequiredServer();
    return (
        <>
            <Heading title="My Account" />
            <Sidebar />
        </>
    )
}

export default page