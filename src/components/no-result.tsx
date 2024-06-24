import Image from 'next/image'
import React from 'react'

interface NoresutProps {
  itemName: string
}

export function Noresult({ itemName }: NoresutProps) {
  return (
    <section className="mt-40 flex flex-col items-center">
      <Image
        priority
        src="/assets/images/no-data.png"
        width={180}
        height={128}
        alt="no data"
      />
      <div className="mt-4 text-muted-foreground">{`No ${itemName} found`}</div>
    </section>
  )
}
