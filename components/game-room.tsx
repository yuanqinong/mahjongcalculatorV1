"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { getRoomData, updatePlayerPoints } from "@/app/actions"
import { GameRoomProps, Player } from "@/types/game-room"

export function GameRoom({ roomId }: GameRoomProps) {
  const [players, setPlayers] = useState<Player[]>([])
  const [results, setResults] = useState<string[]>([])

  useEffect(() => {
    const fetchRoomData = async () => {
      const data = await getRoomData(roomId)
      setPlayers(data.players)
    }
    fetchRoomData()
  }, [roomId])

  const handlePointsChange = (id: number, points: number) => {
    setPlayers(players.map((player) => (player.id === id ? { ...player, points } : player)))
  }

  const calculateResults = () => {
    const BASE_POINTS = 25000
    const newResults: string[] = []
    const transactions: { from: number; to: number; amount: number }[] = []

    // First, identify winners (players with points > 25000)
    const winners = players.filter(player => player.points > BASE_POINTS)
    const losers = players.filter(player => player.points < BASE_POINTS)

    // Calculate and show individual results
    players.forEach((player) => {
      const difference = player.points - BASE_POINTS
      const money = Math.round(difference / 100) / 10  // Round to nearest 0.1
      newResults.push(`Player ${player.name}: ${money > 0 ? "Wins" : "Loses"} RM${Math.abs(money).toFixed(1)}`)
    })

    // Calculate transactions from losers to winners
    losers.forEach((loser) => {
      const lossAmount = Math.round((BASE_POINTS - loser.points) / 100) / 10
      
      winners.forEach((winner) => {
        const totalWinnersPoints = winners.reduce((sum, w) => sum + (w.points - BASE_POINTS), 0)
        const winnerShare = (winner.points - BASE_POINTS) / totalWinnersPoints
        
        const transactionAmount = Math.round(lossAmount * winnerShare * 10) / 10
        
        if (transactionAmount > 0) {
          transactions.push({
            from: loser.id,
            to: winner.id,
            amount: transactionAmount,
          })
        }
      })
    })

    // Add transaction details to results
    transactions.forEach((transaction) => {
      const fromPlayer = players.find(p => p.id === transaction.from)
      const toPlayer = players.find(p => p.id === transaction.to)
      newResults.push(
        `${fromPlayer?.name} pays RM${transaction.amount.toFixed(1)} to ${toPlayer?.name}`
      )
    })

    setResults(newResults)
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Game Room: {roomId}</CardTitle>
      </CardHeader>
      <CardContent>
        {players.map((player) => (
          <div key={player.id} className="mb-4">
            <label htmlFor={`player-${player.id}`} className="block mb-2">
              {player.name} Points:
            </label>
            <Input
              id={`player-${player.id}`}
              type="number"
              min="-100000"
              value={player.points}
              onChange={(e) => {
                const value = e.target.value === '' ? 0 : parseInt(e.target.value)
                handlePointsChange(player.id, value)
              }}
            />
          </div>
        ))}
        <div className="flex gap-4 mt-4">
          <Button onClick={calculateResults}>
            Calculate Results
          </Button>
          <Button 
            onClick={() => players.forEach(p => handlePointsChange(p.id, 25000))}
            variant="outline"
          >
            Reset Points
          </Button>
        </div>
        {results.length > 0 && (
          <div className="mt-4">
            <h3 className="font-bold mb-2">Results:</h3>
            <ul className="space-y-2">
              {results.map((result, index) => (
                <li key={index} className={result.includes("pays") ? "text-red-500" : "text-green-500"}>
                  {result}
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

