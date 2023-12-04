import { prisma } from "@/lib/prisma"

const page = async () => {
  const user = await prisma.user.findFirst({
    where: {
      email: 'test@test.com'
    }
  })
  return (
    <>Hi, {user?.name}</>
  )
}

export default page
