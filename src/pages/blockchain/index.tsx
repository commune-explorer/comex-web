import { useNavigate } from 'react-router'
import { useParams } from 'react-router-dom'

export default function SubnetsPage() {
  const { id } = useParams()

  const nav = useNavigate()
  useEffect(() => {
    nav(`/blockchain/accounts`)
  }, [id, nav])
  return null
}
