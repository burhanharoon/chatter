'use client'

import React from 'react'

const ChatBox: React.FC<{ messages: string[] }> = ({ messages }) => {
  // const messageBox = useRef<HTMLDivElement>(null)

  //   useEffect(() => {
  //     messageBox.current?.scrollIntoView()
  //   }, [])

  return (
    <div className='h-full flex flex-col gap-2 p-2 overflow-y-scroll'>
      {messages.map((message: any, index: number) => (
        <div className='flex justify-end w-full' key={index}>
          <div className='bg-blue-600 text-white rounded-full px-3 py-2'>
            {message}
          </div>
        </div>
      ))}
      {/* <div className='flex justify-start w-full'>
        <div className='bg-[#F0F0F0] rounded-full px-3 py-2'>Doing great</div>
      </div> */}

      {/* <div ref={messageBox}></div> */}
    </div>
  )
}

export default ChatBox
