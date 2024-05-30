export const ParamsPanel = ({ params }: { params: { [k: string]: number } }) => {
  return (
    <div className="my-5 min-h-40vh bg-#ADACE311">
      <div className="flex justify-between items-center h-12 font-semibold">
        <div className="px-2 flex-1 uppercase text-foreground">Key</div>
        <div className="px-2 flex-1 uppercase text-foreground">Value</div>
      </div>
      {Object.entries(params)?.map(([key, value]) => (
        <div className="flex justify-between items-center h-12 even:bg-[rgba(173,172,227,0.06)]">
          <div className="px-2 flex-1 uppercase text-muted-foreground">{key}</div>
          <div className="px-2 flex-1 uppercase text-foreground">{value}</div>
        </div>
      ))}
    </div>
  )
}
