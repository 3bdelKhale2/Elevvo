import React from 'react'

export default function StatusBadge({ status }) {
  const cls =
    status === 'Applied' ? 'badge badge-applied' :
    status === 'Interviewing' ? 'badge badge-interviewing' :
    status === 'Offer' ? 'badge badge-offer' :
    status === 'Rejected' ? 'badge badge-rejected' : 'badge'
  return <span className={cls}>{status}</span>
}