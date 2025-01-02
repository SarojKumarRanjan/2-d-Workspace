interface CloudObject extends Phaser.GameObjects.Shape {
    speed: number;
    cloudParts: Phaser.GameObjects.Shape[];
}

interface StarObject extends Phaser.GameObjects.Arc {
    twinkleSpeed: number;
    baseAlpha: number;
}

export default class EnhancedSkyScene extends Phaser.Scene {
    private bg!: Phaser.GameObjects.Rectangle;
    private clouds!: Phaser.GameObjects.Group;
    private stars!: Phaser.GameObjects.Group;
    private sun!: Phaser.GameObjects.Container;
    private moon!: Phaser.GameObjects.Container;
    private isDay: boolean = true;
    private timeElapsed: number = 0;
    
    constructor() {
        super({ key: 'EnhancedSkyScene' });
    }

    create(): void {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        // Create gradient background
        this.bg = this.add.rectangle(0, 0, width, height, 0x87CEEB);
        this.bg.setOrigin(0, 0);
        
        // Create stars
        this.createStars();
        
        // Create detailed sun
        this.createSun();
        
        // Create detailed moon
        this.createMoon();
        
        // Create clouds
        this.createClouds();

        // Set up day/night cycle (1 minute)
        this.time.addEvent({
            delay: 60000,
            callback: this.toggleDayNight,
            callbackScope: this,
            loop: true
        });
    }

    private createSun(): void {
        const sunContainer = this.add.container(200, 150);
        
        // Main sun body
        const sunCore = this.add.circle(0, 0, 40, 0xFDB813);
        const sunGlow = this.add.circle(0, 0, 50, 0xFDB813);
        sunGlow.setAlpha(0.3);
        
        // Sun rays
        const rayCount = 12;
        const rays: Phaser.GameObjects.Line[] = [];
        for (let i = 0; i < rayCount; i++) {
            const angle = (i * Math.PI * 2) / rayCount;
            const ray = this.add.line(
                0, 0,
                0, 0,
                Math.cos(angle) * 70,
                Math.sin(angle) * 70,
                0xFDB813
            );
            ray.setLineWidth(3);
            rays.push(ray);
        }

        sunContainer.add([sunGlow, sunCore, ...rays]);
        this.sun = sunContainer;
        
        // Add pulsing animation
        this.tweens.add({
            targets: sunGlow,
            scaleX: 1.2,
            scaleY: 1.2,
            alpha: 0.2,
            duration: 2000,
            yoyo: true,
            repeat: -1
        });
    }

    private createMoon(): void {
        const moonContainer = this.add.container(600, 150);
        
        // Main moon body
        const moonBody = this.add.circle(0, 0, 35, 0xECECEC);
        const moonGlow = this.add.circle(0, 0, 45, 0xECECEC);
        moonGlow.setAlpha(0.2);
        
        // Moon craters
        const craters = [];
        for (let i = 0; i < 5; i++) {
            const crater = this.add.circle(
                Phaser.Math.Between(-20, 20),
                Phaser.Math.Between(-20, 20),
                Phaser.Math.Between(3, 8),
                0xD3D3D3
            );
            craters.push(crater);
        }

        moonContainer.add([moonGlow, moonBody, ...craters]);
        this.moon = moonContainer;
        this.moon.setVisible(false);
        
        // Add subtle glow animation
        this.tweens.add({
            targets: moonGlow,
            scaleX: 1.1,
            scaleY: 1.1,
            alpha: 0.15,
            duration: 3000,
            yoyo: true,
            repeat: -1
        });
    }

    private createClouds(): void {
        this.clouds = this.add.group();
        
        for (let i = 0; i < 6; i++) {
            const cloudContainer = this.add.container(
                Phaser.Math.Between(0, this.cameras.main.width),
                Phaser.Math.Between(50, 300)
            );
            
            // Create multi-part cloud
            const cloudParts: Phaser.GameObjects.Shape[] = [];
            const baseCloud = this.add.circle(0, 0, 30, 0xFFFFFF);
            cloudParts.push(baseCloud);
            
            // Add additional cloud puffs
            for (let j = 0; j < 3; j++) {
                const puff = this.add.circle(
                    Phaser.Math.Between(-20, 20),
                    Phaser.Math.Between(-10, 10),
                    Phaser.Math.Between(20, 35),
                    0xFFFFFF
                );
                cloudParts.push(puff);
            }
            
            cloudContainer.add(cloudParts);
            
            // Add to group with custom properties
            const cloudObj = cloudContainer as any as CloudObject;
            cloudObj.speed = Phaser.Math.FloatBetween(0.3, 0.8);
            cloudObj.cloudParts = cloudParts;
            this.clouds.add(cloudObj);
        }
    }

    private createStars(): void {
        this.stars = this.add.group();
        
        for (let i = 0; i < 100; i++) {
            const star = this.add.circle(
                Phaser.Math.Between(0, this.cameras.main.width),
                Phaser.Math.Between(0, this.cameras.main.height / 2),
                Phaser.Math.FloatBetween(1, 2),
                0xFFFFFF
            ) as StarObject;
            
            star.visible = false;
            star.twinkleSpeed = Phaser.Math.FloatBetween(0.02, 0.05);
            star.baseAlpha = Phaser.Math.FloatBetween(0.5, 1);
            this.stars.add(star);
        }
    }

    update(): void {
        // Update cloud positions with wrapping
        this.clouds.children.iterate((cloud: CloudObject) => {
            cloud.x += cloud.speed;
            if (cloud.x > this.cameras.main.width + 100) {
                cloud.x = -100;
            }
            return true;
        });

        // Animate stars at night
        if (!this.isDay) {
            this.stars.children.iterate((star: StarObject) => {
                star.alpha = star.baseAlpha + 
                    Math.sin(this.timeElapsed * star.twinkleSpeed) * 0.3;
                return true;
            });
        }

        this.timeElapsed += 0.016;
    }

    private toggleDayNight(): void {
        this.isDay = !this.isDay;
        
        if (this.isDay) {
            // Transition to day
            this.tweens.add({
                targets: this.bg,
                fillColor: { from: 0x1A237E, to: 0x87CEEB },
                duration: 3000,
                onStart: () => {
                    this.sun.setAlpha(0);
                    this.sun.setVisible(true);
                }
            });
            
            // Fade in sun
            this.tweens.add({
                targets: this.sun,
                alpha: 1,
                duration: 2000
            });
            
            // Fade out moon
            this.tweens.add({
                targets: this.moon,
                alpha: 0,
                duration: 2000,
                onComplete: () => {
                    this.moon.setVisible(false);
                }
            });
            
            // Fade out stars
            this.stars.children.iterate((star: StarObject) => {
                this.tweens.add({
                    targets: star,
                    alpha: 0,
                    duration: Phaser.Math.Between(1000, 2000),
                    onComplete: () => {
                        star.setVisible(false);
                    }
                });
                return true;
            });
            
        } else {
            // Transition to night
            this.tweens.add({
                targets: this.bg,
                fillColor: { from: 0x87CEEB, to: 0x1A237E },
                duration: 3000,
                onStart: () => {
                    this.moon.setAlpha(0);
                    this.moon.setVisible(true);
                }
            });
            
            // Fade out sun
            this.tweens.add({
                targets: this.sun,
                alpha: 0,
                duration: 2000,
                onComplete: () => {
                    this.sun.setVisible(false);
                }
            });
            
            // Fade in moon
            this.tweens.add({
                targets: this.moon,
                alpha: 1,
                duration: 2000
            });
            
            // Fade in stars gradually
            this.stars.children.iterate((star: StarObject) => {
                star.setVisible(true);
                this.tweens.add({
                    targets: star,
                    alpha: star.baseAlpha,
                    duration: Phaser.Math.Between(1000, 3000),
                    delay: Phaser.Math.Between(0, 1000)
                });
                return true;
            });
        }
    }
}