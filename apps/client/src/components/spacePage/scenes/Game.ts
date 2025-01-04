


export class MainScene extends Phaser.Scene {
    constructor() {
      super({ key: 'MainScene' });
    }
  
    async preload() {
      // Fetch space data from the API
      const spaceData =  {
        data: {
          space: {
            id: 'cm5fl8tqh0002m168bqyresjr',
            dimensions: '200x200',
            elements: [
              {
                id: 'cm5fl8ttq0003m16815fslb64',
                element: {
                  id: 'cm4ofwak90000jtk1z9ne02mp',
                  thumbnail: 'http://res.cloudinary.com/dnpy0i6sj/image/upload/v1734196621/workspace-simulation-game/klfuulmj846eeet7ebde.jpg',
                  width: 4,
                  height: 4,
                  static: true,
                },
                x: 4,
                y: 5,
              },
              {
                id: 'cm5fl8ttq0004m16829zd2b7h',
                element: {
                  id: 'cm4og2u3r0000a8kfpupgacz1',
                  thumbnail: 'http://res.cloudinary.com/dnpy0i6sj/image/upload/v1734196928/workspace-simulation-game/hh7c3ec3b0thui7gtzaf.jpg',
                  width: 4,
                  height: 4,
                  static: true,
                },
                x: 16,
                y: 25,
              },
            ],
          },
        },
      };
  
      // Load element thumbnails dynamically
      spaceData.data.space.elements.forEach((element) => {
        this.load.image(element.element.id, element.element.thumbnail);
      });
  
      // Load map data (if any)
      //this.load.tilemapTiledJSON('map', 'assets/maps/map.json');
    }
  
    create() {
      // Create map (if using a tilemap)
    //   const map = this.make.tilemap({ key: 'map' });
    //   const tileset = map.addTilesetImage('tileset', 'tiles');
    //   const layer = map.createStaticLayer('Ground', tileset, 0, 0);
  
      // Fetch space data again (or pass it from preload)
      const spaceData = {
        data: {
          space: {
            id: 'cm5fl8tqh0002m168bqyresjr',
            dimensions: '200x200',
            elements: [
              {
                id: 'cm5fl8ttq0003m16815fslb64',
                element: {
                  id: 'cm4ofwak90000jtk1z9ne02mp',
                  thumbnail: 'http://res.cloudinary.com/dnpy0i6sj/image/upload/v1734196621/workspace-simulation-game/klfuulmj846eeet7ebde.jpg',
                  width: 4,
                  height: 4,
                  static: true,
                },
                x: 4,
                y: 5,
              },
              {
                id: 'cm5fl8ttq0004m16829zd2b7h',
                element: {
                  id: 'cm4og2u3r0000a8kfpupgacz1',
                  thumbnail: 'http://res.cloudinary.com/dnpy0i6sj/image/upload/v1734196928/workspace-simulation-game/hh7c3ec3b0thui7gtzaf.jpg',
                  width: 4,
                  height: 4,
                  static: true,
                },
                x: 16,
                y: 25,
              },
            ],
          },
        },
      };
  
      // Place elements on the map
      spaceData.data.space.elements.forEach((element) => {
        const { x, y, element: elementData } = element;
        this.add.image(x * 32, y * 32, elementData.id).setOrigin(0, 0); // Assuming 32x32 tiles
      });
  
      // Create player
      this.player = this.physics.add.sprite(100, 100, 'player');
      this.player.setCollideWorldBounds(true);
  
      // Camera follows player
      this.cameras.main.startFollow(this.player);
  
      // Enable keyboard input
      this.cursors = this.input.keyboard.createCursorKeys();
    }
  
    update() {
      const speed = 300;
  
      // Player movement
      if (this.cursors.left.isDown) {
        this.player.setVelocityX(-speed);
      } else if (this.cursors.right.isDown) {
        this.player.setVelocityX(speed);
      } else {
        this.player.setVelocityX(0);
      }
  
      if (this.cursors.up.isDown) {
        this.player.setVelocityY(-speed);
      } else if (this.cursors.down.isDown) {
        this.player.setVelocityY(speed);
      } else {
        this.player.setVelocityY(0);
      }
    }
  }