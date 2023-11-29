import { prisma } from "@/lib/prisma"

const page = async () => {
  const user = await prisma.user.findFirst({
    where: {
      email: 'test@test.com'
    }
  })
  return (
    <main>Hi, {user?.name}</main>
  )
}

export default page
