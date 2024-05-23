export const ParamsPanel = () => {
  return (
    <div className="py-5 min-h-40vh">
      <div className="flex justify-between items-center h-12">
        <div className="flex-1 uppercase text-muted-foreground">Key</div>
        <div className="flex-1 uppercase text-muted-foreground">Value</div>
      </div>
      {Array(12)
        .fill(1)
        .map(() => (
          <div className="flex justify-between items-center h-12 even:bg-[rgba(173,172,227,0.03)]">
            <div className="flex-1 uppercase text-muted-foreground">Key</div>
            <div className="flex-1 uppercase text-muted-foreground">Value</div>
          </div>
        ))}
    </div>
  )
}
