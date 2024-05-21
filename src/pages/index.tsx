import { useAccount } from 'wagmi'

import { TokenProfile } from '@/components/home/Profile'

const Home = () => {
  return (
    <div className="">
      <div className=" container mx-auto">
        <TokenProfile />
      </div>
    </div>
  )
}

export default Home
