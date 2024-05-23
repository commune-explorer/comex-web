export const Prompting = () => {
  return (
    <div>
      <div className="text-[#ADACE3] text-7.5 font-400 lh-9 font-[Krona_One]">Text Prompting</div>
      <div className="mt-3 space-y-3">
        <div className="flex items-center">
          <span className="w-30 text-brand">Subnet info</span>
          <span className="text-[#6B68FF] text-4 font-400">https://github.com</span>
        </div>
        <div className="flex items-center">
          <span className="w-30 text-brand">Registered on</span>
          <span className="text-primary text-4 font-400">18 Dec 2023 13:01:48</span>
        </div>
        <div className="flex items-center">
          <span className="w-30 text-brand">Registered to</span>
          <span className="text-#FF8023 text-4 font-400">5nEIN32124NZFEF3R3H89HFNABFBE</span>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-4 gap-3">
        {[
          {
            title: 'Emissions',
            value: '4.89%',
          },
          {
            title: 'Recycled',
            value: '891312.90',
          },
          {
            title: 'Recycled(24h)',
            value: '12.90',
          },
          {
            title: 'Registration Cost',
            value: '0.90',
          },
          {
            title: 'Active Keys',
            value: '1024/1024',
          },
          {
            title: 'Active Validators',
            value: '22/128',
          },
          {
            title: 'Active Miners',
            value: '996/1024',
          },
          {
            title: 'Active Dual Miners/Validators',
            value: '2/128',
          },
        ].map((item) => (
          <div className="flex flex-col gap-.5">
            <span className="text-brand">{item.title}</span>
            <span className="text-primary">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
