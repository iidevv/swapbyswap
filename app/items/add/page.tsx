import AddItem from '@/components/items/add-item'
import Heading from '@/components/layout/heading'
import { loginIsRequired } from '@/lib/auth'

const Page = async () => {
    await loginIsRequired();
     
    return (
        <div>
            <Heading title="Create new item" />
            <AddItem />
        </div>
    )
}

export default Page