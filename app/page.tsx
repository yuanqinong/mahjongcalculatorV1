"use client"

import { useState } from "react"
import { RoomCard } from "@/components/room-card"
import { GameRoom } from "@/components/game-room"

export default function MahjongCalculator() {
  const [roomId, setRoomId] = useState<string | null>(null)

  return (
    <div className="container mx-auto p-4">
      <nav className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Mahjong Calculator</h1>
      </nav>
      {!roomId ? <RoomCard onRoomJoin={setRoomId} /> : <GameRoom roomId={roomId} />}
    </div>
  )
}

