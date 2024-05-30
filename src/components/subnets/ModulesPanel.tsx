import { shorten } from '@did-network/dapp-sdk'
import { CaretSortIcon } from '@radix-ui/react-icons'
import { useQuery } from '@tanstack/react-query'
import { ColumnDef } from '@tanstack/react-table'

import { subnetKeys } from '@/apis/queries'
import type { IModule } from '@/types'
import { get } from '@/utils'

const columns: ColumnDef<IModule>[] = [
  {
    accessorKey: 'uid',
    header: 'Uid',
  },
  {
    header: 'Key',
    accessorKey: 'key',
    cell: ({ row }) => shorten(row.getValue('key')),
  },
  {
    header: 'Emission',
    accessorKey: 'emission',
  },
  {
    header: 'Incentive',
    accessorKey: 'incentive',
  },
  {
    header: 'Dividends',
    accessorKey: 'dividends',
  },
  {
    header: 'Delegation Fee',
    accessorKey: 'delegationFee',
  },
  {
    header: 'Stake',
    accessorKey: 'stake',
  },
  {
    header: 'Address',
    accessorKey: 'address',
  },
  {
    header: 'Active',
    accessorKey: 'active',
  },
  {
    header: 'In Immunity',
    accessorKey: 'inImmunity',
  },
]

export const ModulesPanel = ({ netuid }: { netuid: number }) => {
  const { data: { data: { modules = [] } = {} } = {}, isLoading } = useQuery<{ data: { modules: IModule[] } }>({
    queryKey: subnetKeys.detailModules(netuid),
    queryFn: () => get(`/api/subnets/${netuid}/modules`),
  })

  const sortColumns = columns.map(
    (item) =>
      ({
        ...item,
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              className="uppercase px-0"
              onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
              {item.header as string}
              <CaretSortIcon className="ml-2 h-4 w-4" />
            </Button>
          )
        },
      } as ColumnDef<IModule>)
  )

  return (
    <div className="py-5">
      <div className="text-sm">
        <DataTable loading={isLoading} columns={sortColumns} data={modules} searchKey={'key'} />
      </div>
    </div>
  )
}
