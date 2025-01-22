"use client"

import { useState } from "react"
import { RoomCard } from "@/components/room-card"
import { GameRoom } from "@/components/game-room"

export default function MahjongCalculator() {
  const [roomId, setRoomId] = useState<string | null>(null)

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-10">Mahjong Calculator</h1>
      {!roomId ? <RoomCard onRoomJoin={setRoomId} /> : <GameRoom roomId={roomId} />}
    </div>
  )
}

