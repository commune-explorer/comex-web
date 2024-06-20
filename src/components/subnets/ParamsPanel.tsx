export const ParamsPanel = ({ params }: { params: { [k: string]: number } }) => {
  return (
    <div className="my-8 min-h-40vh bg-#ADACE311 text-sm">
      {Object.entries(params)?.map(([key, value]) => (
        <div key={key} className="flex justify-between items-center py-2 px-6 even:bg-[rgba(173,172,227,0.06)]">
          <div className="px-2 flex-1 text-muted-foreground/90 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
          <div className="px-2 flex-1 text-foreground truncate">{value}</div>
        </div>
      ))}
    </div>
  )
}
