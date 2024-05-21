import { useAccount } from 'wagmi'

import { TokenProfile } from '@/components/home/Profile'
import { SubnetsPanel } from '@/components/home/SubnetsPanel'

const Home = () => {
  return (
    <div className="">
      <div className=" container mx-auto">
        <TokenProfile />
        <div className="mt-5 flex justify-between">
          <SubnetsPanel />
        </div>
      </div>
    </div>
  )
}

export default Home
