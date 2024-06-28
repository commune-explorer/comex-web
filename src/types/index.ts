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

export interface IAccountInfo {
  rank: number
  address: string
  tag?: IAccountTag
  updatedAt: string
  balanceFree: string
  balanceStaked: string
  balanceTotal: string
}

export interface IDelegationEvents {
  account: string
  accountTag?: IAccountTag
  action: string
  amount: string
  extrinsicId: number
  height: number
  id: string
  module: string
  moduleTag?: IAccountTag
  netUid: number
  nodeId: string
}

export interface ITransfer {
  to: string
  toTag?: IAccountTag
  nodeId: string
  id: string
  from: string
  fromTag?: IAccountTag
  extrinsicId: number
  blockNumber: string
  amount: string
}

export interface IAccountTag {
  text: string
  color?: string
}
