"use server"

import { v4 as uuidv4 } from "uuid"
import { Player, PlayerNames } from "@/types/game-room"

const rooms = new Map()
const users = new Map()

export async function createRoom(playerNames: PlayerNames) {
  const roomId = uuidv4()
  rooms.set(roomId, {
    players: [
      { id: 1, points: 25000, name: playerNames.player1 },
      { id: 2, points: 25000, name: playerNames.player2 },
      { id: 3, points: 25000, name: playerNames.player3 },
      { id: 4, points: 25000, name: playerNames.player4 },
    ],
  })
  return roomId
}

export async function joinRoom(playerNames: PlayerNames) {
  // Implementation for joining with player names
  const roomId = uuidv4() // temporary implementation
  return { roomId }
}

export async function getRoomData(roomId: string) {
  return rooms.get(roomId) || { players: [] }
}

export async function updatePlayerPoints(roomId: string, playerId: number, points: number) {
  const room = rooms.get(roomId)
  if (room) {
    const playerIndex = room.players.findIndex((p: Player) => p.id === playerId)
    if (playerIndex !== -1) {
      room.players[playerIndex].points = points
      rooms.set(roomId, room)
      return true
    }
  }
  return false
}

export async function loginUser(email: string, password: string) {
  // This is a mock implementation. In a real app, you'd check against a database and use proper authentication.
  if (users.has(email) && users.get(email) === password) {
    return { success: true }
  }
  return { success: false, message: "Invalid credentials" }
}

export async function signupUser(email: string, password: string) {
  // This is a mock implementation. In a real app, you'd store this in a database securely.
  if (users.has(email)) {
    return { success: false, message: "User already exists" }
  }
  users.set(email, password)
  return { success: true }
}

export async function checkAuth() {
  // This is a mock implementation. In a real app, you'd check the session or JWT.
  return true
}

export async function logout() {
  // This is a mock implementation. In a real app, you'd clear the session or JWT.
  return true
}

