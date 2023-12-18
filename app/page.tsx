import { prisma } from "@/lib/prisma"

const Page = async () => {
  const items = await prisma.item.findMany({
    include: {
      ItemImage: true
    }
  })
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
      {items.length ? items.map((item) => (
        <div key={item.id} className="overflow-hidden rounded-lg shadow-lg cursor-pointer h-90 w-full">
          <a href={`items/${item.id}`} className="block w-full h-full">
            <img alt={`${item.title} - photo`} src={item.ItemImage[0] ? item.ItemImage[0].imageUrl : ""} className="object-cover w-full max-h-40" />
            <div className="w-full p-4 bg-white">
              <p className="font-medium text-indigo-500 text-md">
              </p>
              <p className="mb-2 text-xl font-medium text-gray-800">
                {item.title}
              </p>
              <p className="mb-2 text-lg font-medium text-gray-800">
                ${item.price}
              </p>
              <p className="font-light text-gray-400 text-md truncate">
                {item.description}
              </p>
            </div>
          </a>
        </div>
      ))
        : 'No items yet'
      }
    </div>
  )
}

export default Page
