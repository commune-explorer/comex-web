import { useAccount } from 'wagmi'

import { TokenProfile } from '@/components/home/Profile'
import { SubnetsPanel } from '@/components/home/SubnetsPanel'

const Home = () => {
  return (
    <div className="">
      <div className=" container mx-auto">
        <TokenProfile />
        <div className="mt-5 flex justify-between">
          <div className="flex-1">Trading View</div>
          <Separator orientation="vertical" className="h-auto mx-5" />
          <SubnetsPanel />
        </div>
      </div>
    </div>
  )
}

export default Home
