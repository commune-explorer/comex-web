export interface IModule {
  uid: number
  key: string
  emission: number
  incentive: number
  dividends: number
  delegationFee: number
  stake: number
  address: string
  active: boolean
  inImmunity: boolean
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
  params: {
    [k: string]: number
  }
}

export interface ITrading {
  timestamp: string
  price: number
  volume: number
}
