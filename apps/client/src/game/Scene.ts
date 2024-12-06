import { Scene } from 'phaser';
import { Position, User } from '../types';

export class GameScene extends Scene {
  private players: Map<string, Phaser.GameObjects.Sprite>;
  private currentUser: User | null = null;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private socket: any;

  constructor() {
    super({ key: 'GameScene' });
    this.players = new Map();
  }

  init(data: { user: User; socket: any }) {
    this.currentUser = data.user;
    this.socket = data.socket;
  }

  preload() {
    // Load map tiles and character sprites
    this.load.image('tiles', 'path/to/tiles.png');
    this.load.spritesheet('character', 'path/to/character.png', {
      frameWidth: 32,
      frameHeight: 48,
    });
  }

  create() {
    // Create map
    const map = this.make.tilemap({ key: 'map' });
    const tileset = map.addTilesetImage('tiles');
    map.createLayer('ground', tileset);
    map.createLayer('walls', tileset);

    // Set up character animations
    this.anims.create({
      key: 'walk',
      frames: this.anims.generateFrameNumbers('character', { start: 0, end: 3 }),
      frameRate: 8,
      repeat: -1,
    });

    // Set up input
    this.cursors = this.input.keyboard.createCursorKeys();

    // Socket event listeners
    this.socket.on('player-moved', (data: { userId: string; position: Position }) => {
      this.updatePlayerPosition(data.userId, data.position);
    });

    this.socket.on('player-left', (userId: string) => {
      this.removePlayer(userId);
    });
  }

  update() {
    if (!this.currentUser) return;

    const speed = 4;
    let velocityX = 0;
    let velocityY = 0;

    if (this.cursors.left.isDown) velocityX = -speed;
    else if (this.cursors.right.isDown) velocityX = speed;
    if (this.cursors.up.isDown) velocityY = -speed;
    else if (this.cursors.down.isDown) velocityY = speed;

    if (velocityX !== 0 || velocityY !== 0) {
      const position = {
        x: this.players.get(this.currentUser.id)?.x || 0 + velocityX,
        y: this.players.get(this.currentUser.id)?.y || 0 + velocityY,
      };
      
      this.socket.emit('movement', position);
      this.updatePlayerPosition(this.currentUser.id, position);
    }
  }

  private updatePlayerPosition(userId: string, position: Position) {
    let player = this.players.get(userId);
    
    if (!player) {
      player = this.add.sprite(position.x, position.y, 'character');
      this.players.set(userId, player);
    }

    player.setPosition(position.x, position.y);
  }

  private removePlayer(userId: string) {
    const player = this.players.get(userId);
    if (player) {
      player.destroy();
      this.players.delete(userId);
    }
  }
}