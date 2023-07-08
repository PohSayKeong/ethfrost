'use client'

import { useEthersSigner } from '../hooks/useEthersSigner'
import { squid } from '../utils/squid'

export function SquidTest() {
  const signer = useEthersSigner()

  return (
    <button onClick={() =>  signer && squid(signer)}>Squid</button>
  )
}
