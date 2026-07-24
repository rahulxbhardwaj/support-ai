import React from 'react'
import { getSession } from '@/lib/getSession';
import { EmbedClient }  from '@/components/embedClient';
const page = async() => {
    const session = await getSession();

  return (
    <div>
        <EmbedClient ownerId = {session?.user?.id!} />

    </div>
  )
}

export default page