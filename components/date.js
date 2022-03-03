import { parseISO, format } from 'date-fns'

export default function Date({ dateString }) {
  const date = parseISO(dateString)
  return <time dateTime={dateString}>{format(date, 'LLLL d, yyyy')}</time>
}
// Dynamic routing is a technique in which a router learns about routing information without an administrator's help and adds the best route to its routing table.
// Dynamically means that you are generating HTML through code. Instead of hosting static HTML pages.