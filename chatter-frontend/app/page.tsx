'use client'

import ChatBox from '@/components/ChatBox'
import SocketConnection from '@/components/SocketConnection'
import ChatScreen from '@/screens/ChatScreen'
// import { SocketContext, socket } from '@/socket'
import { useContext, useEffect } from 'react'

export default function Home() {
  // const [isConnected, setIsConnected] = useState<boolean>(false)
  // const [fooEvents, setFooEvents] = useState([])

  // useEffect(() => {
  //   console.log(socket.id)
  //   setIsConnected(socket.connected)
  // }, [socket])

  return (
    // <SocketContext.Provider value={socket}>
    <ChatScreen />
    // </SocketContext.Provider>
  )
}
