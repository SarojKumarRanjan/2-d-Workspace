export interface User {
  id: string;
  username: string;
  avatarId: string;
}

export interface Space {
  id: string;
  name: string;
  mapId: string;
  createdBy: string;
  participants: User[];
}

export interface Element {
  id: string;
  type: string;
  x: number;
  y: number;
  properties: Record<string, any>;
}

export interface Position {
  x: number;
  y: number;
}