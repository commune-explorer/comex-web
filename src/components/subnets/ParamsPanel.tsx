export const ParamsPanel = ({ params }: { params: { [k: string]: number } }) => {
  return (
    <div className="py-5 min-h-40vh">
      <div className="flex justify-between items-center h-12">
        <div className="px-2 flex-1 uppercase text-muted-foreground">Key</div>
        <div className="px-2 flex-1 uppercase text-muted-foreground">Value</div>
      </div>
      {Object.entries(params)?.map(([key, value]) => (
        <div className="flex justify-between items-center h-12 even:bg-[rgba(173,172,227,0.03)]">
          <div className="px-2 flex-1 uppercase text-muted-foreground">{key}</div>
          <div className="px-2 flex-1 uppercase text-muted-foreground">{value}</div>
        </div>
      ))}
    </div>
  )
}
