export interface Player {
  id: number;
  points: number;
  name: string;
}

export interface PlayerNames {
  player1: string;
  player2: string;
  player3: string;
  player4: string;
}

export interface GameRoomProps {
  roomId: string;
}
