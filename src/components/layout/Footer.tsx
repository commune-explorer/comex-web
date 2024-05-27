const links = [
  {
    title: 'Resources',
    children: [
      {
        title: 'Commune',
        url: 'https://bittensor.com',
      },
      {
        title: 'Docs',
        url: 'https://communeai.org/docs/getting-started/intro',
      },
      {
        title: 'Community',
        url: 'https://discord.com/invite/A8JGkZ9Dmm',
      },
      {
        title: 'Blog',
        url: 'https://mirror.xyz/0xD80E194aBe2d8084fAecCFfd72877e63F5822Fc5',
      },
    ],
  },
  {
    title: 'Apps',
    children: [
      {
        title: 'Governance',
        url: 'https://governance.communeai.org/',
      },
      {
        title: 'Wallet',
        url: 'https://wallet.communeai.org/',
      },
    ],
  },
]

export const Footer = () => {
  return (
    <div className="mt-10 py-6 flex-col-center border-t-1 border-solid border-border">
      <div className="container mx-auto flex justify-between">
        <div className="w-1/2 text-xs space-y-4">
          <div className="font-bold">
            Powered by <span>Comex</span>
          </div>

          <div className="lh-6 text-muted-foreground">
            Comex is an Explorer and Analytics Platform for CommuneAI, a protocol and market system for incentive-driven
            coordination of decentralized AI. The content of this website is provided for information purposes only. No
            claim is made as to the accuracy or currency of the content on this site at any time.
          </div>
        </div>
        <div className="flex gap-20 justify-between ">
          {links.map((link) => (
            <div className="flex flex-col text-xs space-y-3">
              <div className="font-bold text-sm">{link.title}</div>
              {link.children.map((child) => (
                <a href={child.url} className="text-muted-foreground hover:text-foreground">
                  {child.title}
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
