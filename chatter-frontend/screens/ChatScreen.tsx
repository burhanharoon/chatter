'use client'
import ChatBox from '@/components/ChatBox'
// import { SocketContext } from '@/socket'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Socket, io } from 'socket.io-client'

const ChatScreen = () => {
  const socket = useRef<Socket>()

  const [messages, setMessages] = useState<string[]>([])
  // State to store the current message
  const [currentMessage, setCurrentMessage] = useState('')

  //   const socket = useContext(SocketContext)

  //   useEffect(() => {
  //     function onConnect() {
  //       console.log('Connected', socket.connected, socket.id)
  //       // setIsConnected(true)
  //     }

  //     function onDisconnect() {
  //       console.log('Disconnected', socket.disconnected)
  //       // setIsConnected(false)
  //     }

  //     function onMessageEvent(value: any) {
  //       console.log(value)
  //       // setFooEvents((previous) => [...previous, value])
  //     }

  //     socket.on('connect', onConnect)
  //     socket.on('disconnect', onDisconnect)
  //     socket.on('message', onMessageEvent)

  //     return () => {
  //       socket.off('connect', onConnect)
  //       socket.off('disconnect', onDisconnect)
  //       socket.off('message', onMessageEvent)
  //     }
  //   }, [])

  useEffect(() => {
    socket.current = io('ws://localhost:5000')

    socket.current?.on('message', (message) => {
      setMessages((prevMessages: string[]) => [...prevMessages, message])
    })

    return () => {
      socket.current?.disconnect()
    }
  }, [])

  const sendMessage = () => {
    // Send the message to the server
    socket.current?.emit('message', currentMessage)
    // Clear the currentMessage state
    setCurrentMessage('')
  }

  return (
    <main className='flex h-screen'>
      <div className='bg-gray-50 border-r basis-2/6 p-6'>
        <h1 className='text-2xl font-bold'>Chats</h1>
        <div className='mt-4 flex gap-3 items-center'>
          <div className='bg-black w-11 h-11 rounded-full'></div>
          <div>
            <h1 className='font-medium'>Burhan Haroon</h1>
            <p className='text-xs text-gray-700'>
              Hi there! How are you doing?
            </p>
          </div>
        </div>
      </div>
      <div className='basis-full relative'>
        <div className='flex items-center gap-3 border-b w-full p-3 shadow'>
          <div className='bg-black w-11 h-11 rounded-full'></div>
          <h1 className='text-lg'>Burhan Haroon</h1>
        </div>
        <div className='flex flex-col h-[91%]'>
          <ChatBox messages={messages} />
          <input
            type='text'
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            className='w-full border-t p-4'
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </main>
  )
}

export default ChatScreen
