export interface IModule {
  uid: number
  key: string
  emission: number
  incentive: number
  dividends: number
  delegation_fee: number
  stake: number
  address: string
  active: boolean
  in_immunity: boolean
}

export interface ISubnet {
  id: number
  name: string
  activeKeys: number
  totalKeys: number
  activeValidators: number
  totalValidators: number
  activeMiners: number
  totalMiners: number
  registerCost: number
  githubUrl: string
  registeredAt: string
  registeredBy: string
  emissionPercentage: number
  modules: IModule[]
  params: {
    [k: string]: number
  }
}
