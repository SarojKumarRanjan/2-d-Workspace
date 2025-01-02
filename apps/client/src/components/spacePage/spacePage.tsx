
import Phaser from 'phaser'
import { useRef,useEffect } from 'react'
import EnhancedSkyScene from './scenes/Background';

export default function SpaceMainPage() {
    const gameRef = useRef<HTMLDivElement| null>(null);
    const game = useRef<Phaser.Game | null>(null);


 
   
useEffect(() => {

    if(gameRef.current){
        const config: Phaser.Types.Core.GameConfig = {
            type: Phaser.AUTO,
            parent: 'phaser-container',
            backgroundColor: '#93cbee',
            pixelArt: true, 
            scale: {
              mode: Phaser.Scale.ScaleModes.RESIZE,
              width: window.innerWidth,
              height: window.innerHeight,
            },
            physics: {
              default: 'arcade',
              arcade: {
               
                debug: false,
              },
            },
            autoFocus: true,
            scene: [ EnhancedSkyScene],
          }
          
          const phaserGame = new Phaser.Game(config)
          
          ;(window as any).game = phaserGame


            game.current = phaserGame;
          







        return () => {
            if (game.current) {
              game.current.destroy(true);
              game.current = null;
            }
          };
    }






},[gameRef])

  return (
    <>
    <h1>Space Main Page</h1>
    <div
    ref={gameRef} 
     />
     

</>
       
  )
}

