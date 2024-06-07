import { CheckboxIcon, CopyIcon } from '@radix-ui/react-icons'
import { useCopyToClipboard } from 'usehooks-ts'

export function CopyButton({ value }: { value: string }) {
  const [, copy] = useCopyToClipboard()

  const [copied, setCopied] = useState(false)

  if (copied) {
    return <CheckboxIcon className="h-4 text-muted-foreground hover:text-foreground cursor-pointer" />
  }

  return (
    <CopyIcon
      className="h-4 text-muted-foreground hover:text-foreground cursor-pointer"
      onClick={async () => {
        const success = await copy(value)
        if (success) {
          setCopied(true)
          setTimeout(() => setCopied(false), 1000)
        } else {
          toast({ title: 'Copy failed' })
        }
      }}
    />
  )
}
