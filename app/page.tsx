import { prisma } from "@/lib/prisma"

const page = async () => {
  const products = await prisma.product.findMany({})
  return (
    <>
      {products.map((product) => (
        <div>{product.title}</div>
      ))}
    </>
  )
}

export default page
