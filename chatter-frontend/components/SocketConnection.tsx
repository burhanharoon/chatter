'use client'

import React, { useState, useEffect } from 'react'
import { socket } from '../socket'
import ConnectionState from './ConnectionState'
import { Events } from './Events'
import { ConnectionManager } from './ConnectionManager'
import { MyForm } from './MyForm'
// import { ConnectionState } from './components/ConnectionState'
// import { ConnectionManager } from './components/ConnectionManager'
// import { Events } from './components/Events'
// import { MyForm } from './components/MyForm'

const SocketConnection = () => {
  const [isConnected, setIsConnected] = useState<boolean>(false)
  const [fooEvents, setFooEvents] = useState([])

  useEffect(() => {
    function onConnect() {
      setIsConnected(true)
    }

    function onDisconnect() {
      setIsConnected(false)
    }

    function onMessageEvent(value: any) {
      console.log(value)
      // setFooEvents((previous) => [...previous, value])
    }

    socket.on('connect', onConnect)
    socket.on('disconnect', onDisconnect)
    socket.on('message', onMessageEvent)

    return () => {
      socket.off('connect', onConnect)
      socket.off('disconnect', onDisconnect)
      socket.off('message', onMessageEvent)
    }
  }, [])

  useEffect(() => {
    console.log(socket.id)
    setIsConnected(socket.connected)
  }, [socket])

  return (
    <div>
      <ConnectionState isConnected={isConnected} />
      <Events events={fooEvents} />
      <ConnectionManager />
      <MyForm />
    </div>
  )
}
export default SocketConnection
