export const SubnetsPanel = () => {
  return (
    <div className="">
      <div className="uppercase text-lg"> subnets</div>
      <div className="mt-4 grid grid-cols-8 gap-1">
        {Array(36)
          .fill(1)
          .map((item, index) => (
            <div className="w-8 h-8 text-primary bg-secondary flex-col-center">{index + 1}</div>
          ))}
      </div>
    </div>
  )
}
