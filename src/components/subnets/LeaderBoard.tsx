import { formatAmount, shorten } from '@did-network/dapp-sdk'
import { CaretSortIcon } from '@radix-ui/react-icons'
import { useQuery } from '@tanstack/react-query'
import { ColumnDef } from '@tanstack/react-table'

import { subnetKeys } from '@/apis/queries'
import { get } from '@/utils'

interface ILeaderBoard {
  uid: number
  name: string
  rank: number
  tokenPerDay: number
  usdPerDay: number
}

const columns: ColumnDef<ILeaderBoard>[] = [
  {
    accessorKey: 'rank',
    header: 'Rank',
  },
  {
    accessorKey: 'uid',
    header: 'Uid',
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'tokenPerDay',
    header: 'Rewards / Day',
    cell: ({ row }) => formatAmount(row.getValue('tokenPerDay'), 0, 2),
  },
  {
    accessorKey: 'usdPerDay',
    header: 'USD Value',
    cell: ({ row }) => '$' + formatAmount(row.getValue('usdPerDay'), 0, 2),
  },
]

export const LeaderBoard = ({ netuid }: { netuid: number }) => {
  const { data: { data: { records = [] } = {} } = {}, isLoading } = useQuery<{ data: { records: ILeaderBoard[] } }>({
    queryKey: subnetKeys.detailLeaderboard(netuid),
    queryFn: () => get(`/api/subnets/${netuid}/leaderboard`),
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
      } as ColumnDef<ILeaderBoard>)
  )
  return (
    <div className="py-5">
      <div className="text-sm">
        <DataTable loading={isLoading} columns={sortColumns} data={records} searchKey={'name'} />
      </div>
    </div>
  )
}
