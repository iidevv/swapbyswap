import { prisma } from "@/lib/prisma"

const page = async () => {
  const items = await prisma.item.findMany({})
  return (
    <>
      {items.map((item) => (
        <div key={item.id}>{item.title}</div>
      ))}
    </>
  )
}

export default page
