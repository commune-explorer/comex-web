import { TokenProfile } from '@/components/home/Profile'
import { RankPanel } from '@/components/home/RankPanel'
import { SubnetsPanel } from '@/components/home/SubnetsPanel'
import { TradingView } from '@/components/home/TradingView'

const Home = () => {
  return (
    <div className="">
      <div className="container mx-auto">
        <TokenProfile />
        <div className="mt-5 flex justify-between">
          <TradingView />
          <Separator orientation="vertical" className="h-auto mx-5" />
          <SubnetsPanel />
        </div>

        <div className="mt-20">
          <RankPanel />
        </div>

        <div className="my-5 text-lg text-primary font-medium">SUBNET REGISTRATION DATA</div>
        <div className="py-10 flex justify-between">
          <TradingView />
          <Separator orientation="vertical" className="h-auto mx-5" />
          <div className="min-w-280px">
            <div>Current Registration Cost</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
