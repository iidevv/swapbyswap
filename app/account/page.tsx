import { loginIsRequiredServer } from "@/lib/auth";
import { prisma } from "@/lib/prisma"
import SignoutButton from '@/components/account/signout-button';

const page = async () => {
    await loginIsRequiredServer();
    return (
        <>
            <p>My account</p>
            <SignoutButton />
        </>
    )
}

export default page