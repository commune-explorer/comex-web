interface IModule {
  id: number
  address: string
  active: boolean
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
    immunityPeriod: number
  }
}
