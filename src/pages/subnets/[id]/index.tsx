import { useNavigate } from 'react-router'
import { useParams } from 'react-router-dom'

export default function SubnetsPage() {
  const { id } = useParams()

  const nav = useNavigate()
  useEffect(() => {
    nav(`/subnets/${id}/modules`)
  }, [id, nav])
  return null
}
