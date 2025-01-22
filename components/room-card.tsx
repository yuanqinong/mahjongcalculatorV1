"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { createRoom, joinRoom } from "@/app/actions"

interface RoomCardProps {
  onRoomJoin: (roomId: string) => void
}

export function RoomCard({ onRoomJoin }: RoomCardProps) {
  const [playerNames, setPlayerNames] = useState({
    player1: "",
    player2: "",
    player3: "",
    player4: ""
  })
  const [error, setError] = useState("")

  const handleCreateRoom = async () => {
    if (!areAllPlayersNamed()) {
      setError("Please enter names for all players")
      return
    }
    const newRoomId = await createRoom(playerNames)
    onRoomJoin(newRoomId)
  }

  const handleJoinRoom = async () => {
    if (!areAllPlayersNamed()) {
      setError("Please enter names for all players")
      return
    }
    const joined = await joinRoom(playerNames)
    if (joined) {
      onRoomJoin(joined.roomId)
    } else {
      setError("Failed to create room")
    }
  }

  const areAllPlayersNamed = () => {
    return Object.values(playerNames).every(name => name.trim() !== "")
  }

  const handleNameChange = (player: keyof typeof playerNames) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayerNames(prev => ({
      ...prev,
      [player]: e.target.value
    }))
    setError("")
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Join or Create a Room</CardTitle>
        <CardDescription>Enter names for all players</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input 
          placeholder="Enter Player 1 name" 
          value={playerNames.player1} 
          onChange={handleNameChange("player1")}
        />
        <Input 
          placeholder="Enter Player 2 name" 
          value={playerNames.player2} 
          onChange={handleNameChange("player2")}
        />
        <Input 
          placeholder="Enter Player 3 name" 
          value={playerNames.player3} 
          onChange={handleNameChange("player3")}
        />
        <Input 
          placeholder="Enter Player 4 name" 
          value={playerNames.player4} 
          onChange={handleNameChange("player4")}
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={handleCreateRoom} disabled={!areAllPlayersNamed()}>
          Create New Room
        </Button>
      </CardFooter>
    </Card>
  )
}

