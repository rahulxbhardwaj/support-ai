import { getSession } from '@/lib/getSession';
import React from 'react'
import DashboardClient from '@/components/DashboardClient';

export default async function Page() {
const session = await getSession();

  return (
    <>
      <DashboardClient ownerId={session?.user?.id || ''} />
    </>
  )
}