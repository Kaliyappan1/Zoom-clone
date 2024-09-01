"use client"

import MeetingRoom from '@/components/ui/MeetingRoom';
import MeetingSetup from '@/components/ui/MeetingSetup';
import { useUser } from '@clerk/nextjs'
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk';
import React, { useState } from 'react'
import { useGetCallById } from '../../../../../hooks/useGetCallById';
import Loader from '@/components/ui/Loader';

function Meeting({ params: {id} }: { params: { id: string } }) {
  const {user, isLoaded} = useUser();
  const [isSetupComplete, setIsSetupCplete] = useState(false);
const {call, isCallLoading} = useGetCallById(id)

if(!isLoaded || isCallLoading) return <Loader/>;

  return (
    <main className='h-screen w-full'>
      <StreamCall call={call}>
        <StreamTheme>
          {!isSetupComplete ? (
            <MeetingSetup/>
          ) : (
            <MeetingRoom/>
          )}
        </StreamTheme>
      </StreamCall>
    </main>
  )
}

export default Meeting