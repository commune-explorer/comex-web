import { TokenProfile } from '@/components/home/Profile'
import { SubnetsPanel } from '@/components/home/SubnetsPanel'
import { TradingView } from '@/components/home/TradingView'

const Home = () => {
  return (
    <div className="">
      <div className="container mx-auto py-6">
        <TokenProfile />
        <div className="my-10 flex justify-between">
          <TradingView />
          <Separator orientation="vertical" className="h-auto mx-5" />
          <SubnetsPanel />
        </div>
      </div>
    </div>
  )
}

export default Home
