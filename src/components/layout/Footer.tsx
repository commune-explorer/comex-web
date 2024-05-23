import { link } from 'fs'

const links = [
  {
    title: 'Apps',
    children: [
      {
        title: 'Bittensor',
        url: 'https://bittensor.com',
      },
      {
        title: 'Comex',
        url: 'https://comex.io',
      },
      {
        title: 'Bittensor Explorer',
        url: 'https://explorer.bittensor.com',
      },
      {
        title: 'Bittensor Whitepaper',
        url: 'https://bittensor.com/whitepaper',
      },
    ],
  },
  {
    title: 'Apps',
    children: [
      {
        title: 'Bittensor',
        url: 'https://bittensor.com',
      },
      {
        title: 'Comex',
        url: 'https://comex.io',
      },
      {
        title: 'Bittensor Explorer',
        url: 'https://explorer.bittensor.com',
      },
      {
        title: 'Bittensor Whitepaper',
        url: 'https://bittensor.com/whitepaper',
      },
    ],
  },
  {
    title: 'Apps',
    children: [
      {
        title: 'Bittensor',
        url: 'https://bittensor.com',
      },
      {
        title: 'Comex',
        url: 'https://comex.io',
      },
      {
        title: 'Bittensor Explorer',
        url: 'https://explorer.bittensor.com',
      },
      {
        title: 'Bittensor Whitepaper',
        url: 'https://bittensor.com/whitepaper',
      },
    ],
  },
]

export const Footer = () => {
  return (
    <>
      <div className="mt-40">
        <div className="container mx-auto flex gap-20">
          <div className="text-xs space-y-4">
            <div className="font-bold">
              Powered by <span>Comex</span>
            </div>

            <div className="lh-6 text-muted-foreground">
              Comex is a Block Explorer and Analytics Platform for Bittensor, a decentralized machine learning network.
              This site is not affiliated with the Opentensor Foundation. The content of this website is provided for
              information purposes only. No claim is made as to the accuracy or currency of the content on this site at
              any time.
            </div>
          </div>
          <div className="min-w-1/2 flex justify-between ">
            {links.map((link) => (
              <div className="flex flex-col text-xs space-y-6">
                <div className="font-bold text-sm">{link.title}</div>
                {link.children.map((child) => (
                  <a href={child.url} className="text-muted-foreground">
                    {child.title}
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-10 h-16 flex-col-center border-t-1 border-solid border-border">
        <div className="container mx-auto flex justify-between items-center text-3.25">
          <span>Comex ©{new Date().getFullYear()}.</span>
          <span>Support us by delegating stake to the comex validator</span>
        </div>
      </div>
    </>
  )
}
