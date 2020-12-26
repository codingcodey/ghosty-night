enum ActionKind {
    Walking,
    Idle,
    Jumping
}
namespace SpriteKind {
    export const Gap = SpriteKind.create()
}
controller.anyButton.onEvent(ControllerButtonEvent.Pressed, function () {
    mySprite.vy = -100
    animation.setAction(mySprite, ActionKind.Jumping)
    mySprite.startEffect(effects.fire, 300)
})
function takeDamage () {
	
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Gap, function (sprite, otherSprite) {
    if (otherSprite.right - sprite.left < 1) {
        info.changeScoreBy(1)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Projectile, function (sprite, otherSprite) {
    game.over(false)
})
let projectile: Sprite = null
let gapSprite: Sprite = null
let gapImage: Image = null
let bottomImage: Image = null
let topImage: Image = null
let gap = 0
let mySprite: Sprite = null
scene.setBackgroundColor(8)
info.setScore(0)
effects.blizzard.startScreenEffect()
mySprite = sprites.create(img`
    . . . . . . f f f f . . . . . . 
    . . . . f f 1 1 1 1 f f . . . . 
    . . . f b 1 1 1 1 1 1 b f . . . 
    . . . f d 1 1 1 1 1 1 1 f . . . 
    . . f d d 1 1 1 1 1 1 1 d f . . 
    . . f d d d 1 1 1 1 1 1 d f . . 
    . . f d d d d d d 1 1 1 d f . . 
    . . f b d d d d b f d 1 d f . . 
    . . f c b b b d c f d d b f . . 
    . . . f c b b 1 1 1 1 1 f . . . 
    . . . . f f f f f 1 b 1 f . . . 
    . . . . f b 1 1 1 c f b f . . . 
    . . . . f f b 1 b 1 f f . . . . 
    . . f . f f f b f b f . . . . . 
    . . f f f f f f f f . . . . . . 
    . . . f f f f f . . . . . . . . 
    `, SpriteKind.Player)
mySprite.ay = 300
animation.runImageAnimation(
mySprite,
[img`
    . . . . . . f f f f f . . . . . 
    . . . . f f b 1 1 1 1 f f . . . 
    . . . f b 1 1 1 1 1 1 1 b f . . 
    . . . f 1 1 1 1 1 1 1 1 1 f . . 
    . . f f f f 1 1 1 1 1 1 1 d f . 
    . f b 1 1 1 c 1 d d 1 1 1 d f . 
    . f f b 1 b 1 f d c f 1 1 b f . 
    . . f . b f b f b 1 1 1 1 1 f . 
    . . . f f f f c f d b 1 b 1 f . 
    . . . . f c c c f c f b f b f . 
    . . . . . f f f f f f f f f f . 
    . . . . . . f f f f f f . . . . 
    . . . . . . f f f f f f . . . . 
    . . f . . f f f f f f f . . . . 
    . . f f f f f f f f f . . . . . 
    . . . f f f f f f f . . . . . . 
    `,img`
    . . . . . . f f f f . . . . . . 
    . . . . f f 1 1 1 1 f f . . . . 
    . . . f b 1 1 1 1 1 1 b f . . . 
    . . f b d 1 1 1 1 1 1 1 f . . . 
    . . f d d 1 1 1 1 1 1 1 d f . . 
    . . f d d d 1 1 1 1 1 1 d f . . 
    . . f d d d d d d 1 1 1 d f . . 
    . . f d d d d d d 1 1 1 d f . . 
    . . f b d d d d d d d 1 d f . . 
    . . f f b b d d b f d 1 d f . . 
    . . . f c b b d c f d d b f . . 
    . . . f f f b d d c c f f f f . 
    . . . f f f f c f b b b 1 b c f 
    . . f f f f f f f f c d 1 b 1 f 
    f f f f f f f f f . . f d f d f 
    . f f f f f f . . . . . f . f . 
    `,img`
    . . . . . . f f f f f . . . . . 
    . . . . f f 1 1 1 1 1 f . . . . 
    . . . f b 1 1 1 1 1 1 b f . . . 
    . . f b d 1 1 1 1 1 1 1 f . . . 
    . . f d d d 1 1 1 1 1 1 d f . . 
    . . f d d d d 1 1 1 1 1 d f . . 
    . . f d d d d d d d 1 1 d f . . 
    . . f d d d d d d d 1 1 1 f . . 
    . . f d d d d d d c f 1 1 f . . 
    . . . f b d d d b 1 1 1 1 b f . 
    . . . . f f f c f d b 1 b 1 f . 
    . . . f f f f f f f f b f b f . 
    f f . f f f f f f f f f f f . . 
    . f f f f f f f f . . . . . . . 
    . f f f f f f b 1 b 1 f . . . . 
    . . f f f f f f b f b f . . . . 
    `,img`
    . . . . . . f f f f f . . . . . 
    . . . . f f b 1 1 1 1 f f . . . 
    . . . f b 1 1 1 1 1 1 1 b f . . 
    . . . f 1 1 1 1 1 1 1 1 1 f . . 
    . . f f f f 1 1 1 1 1 1 1 d f . 
    . f b 1 1 1 c 1 d d 1 1 1 d f . 
    . f f b 1 b 1 f d c f 1 1 b f . 
    . . f . b f b f b 1 1 1 1 1 f . 
    . . . f f f f c f d b 1 b 1 f . 
    . . . . f c c c f c f b f b f . 
    . . . . . f f f f f f f f f f . 
    . . . . . . f f f f f f . . . . 
    . . . . . . f f f f f f . . . . 
    . . f . . f f f f f f f . . . . 
    . . f f f f f f f f f . . . . . 
    . . . f f f f f f f . . . . . . 
    `,img`
    . . . . . . f f f f f . . . . . 
    . . . . f f 1 1 1 1 1 f . . . . 
    . . . f b 1 1 1 1 1 1 b f . . . 
    . . f b d 1 1 1 1 1 1 1 f . . . 
    . . f d d d 1 1 1 1 1 1 d f . . 
    . . f d d d d 1 1 1 1 1 d f . . 
    . . f d d d d d d d 1 1 d f . . 
    . . f d d d d d d d 1 1 1 f . . 
    . . f d d d d d d c f 1 1 f . . 
    . . . f b d d d b 1 1 1 1 b f . 
    . . . . f f f c f d b 1 b 1 f . 
    . . . f f f f f f f f b f b f . 
    f f . f f f f f f f f f f f . . 
    . f f f f f f f f . . . . . . . 
    . f f f f f f b 1 b 1 f . . . . 
    . . f f f f f f b f b f . . . . 
    `,img`
    . . . . . . f f f f . . . . . . 
    . . . . f f 1 1 1 1 f f . . . . 
    . . . f b 1 1 1 1 1 1 b f . . . 
    . . f b d 1 1 1 1 1 1 1 f . . . 
    . . f d d 1 1 1 1 1 1 1 d f . . 
    . . f d d d 1 1 1 1 1 1 d f . . 
    . . f d d d d d d 1 1 1 d f . . 
    . . f d d d d d d 1 1 1 d f . . 
    . . f b d d d d d d d 1 d f . . 
    . . f f b b d d b f d 1 d f . . 
    . . . f c b b d c f d d b f . . 
    . . . f f f b d d c c f f f f . 
    . . . f f f f c f b b b 1 b c f 
    . . f f f f f f f f c d 1 b 1 f 
    f f f f f f f f f . . f d f d f 
    . f f f f f f . . . . . f . f . 
    `],
200,
true
)
info.setLife(3)
game.onUpdate(function () {
    if (mySprite.vy > 0) {
        animation.setAction(mySprite, ActionKind.Idle)
    }
    if (mySprite.bottom > scene.screenHeight() || mySprite.top < 0) {
        game.over(false)
    }
})
game.onUpdateInterval(1500, function () {
    gap = randint(0, 3)
    if (gap == 0) {
        topImage = img`
            .....6eeeeeeeeeece6.....
            ....6776eeeeeeeee676....
            ...6776666eeee6766776...
            ..6776ee77777777667776..
            ...668ce7768867788666...
            ......ce77eeee67ee......
            ......eeeeeeeeeeee......
            ......eeeeeeeeeeee......
            ......eeeeeeeeeeee......
            ......eeeeeeeeeeee......
            ......eeeeeeeeeeee......
            ......eeeeeeeeeeee......
            ......eeeeeeeeeeee......
            ......beeeeeeeeeeb......
            .......beeeeeeeeb.......
            ........beeeeeeb........
            `
        bottomImage = img`
            ........................
            ........................
            ..........bbbb..........
            ........bbddddbb........
            .......bddbbbbddb.......
            ......bdbbddddbbdb......
            .....bdbbdbbbbdbbdb.....
            .....bdbdbddddbdbdb.....
            .....cdbbdbbbbdbbdc.....
            .....cbdbbddddbbdbc.....
            .....efbddbbbbddbce.....
            .....eeffbddddbccee.....
            .....eeeeffcccceee......
            .....ceeeeeeeeeeee......
            .....ceeeeeeeeeeee......
            .....feeeeeeeeeeee......
            .....cceeeeeeeeeee......
            ......feeeeeeeeeee......
            .....6fceeeeeeeeee6.....
            ....6776eeeeeeeee676....
            ...6777666eeee6666776...
            ..67768e67766777667776..
            ...668ee7768867788666...
            ......ee77eeee77ecee....
            ......ee6eeeeee6eef.....
            ......eeeeeeeeeeeef.....
            ......eeeeeeeeeeeef.....
            ......eeeeeeeeeeecf.....
            ......ceeeeeeeeeecf.....
            ......ceeeeeeeeeeff.....
            ......feeeeeeeeeefe.....
            .....6feeeeeeeeeef6.....
            ....6776eeeeeeeee676....
            ...6777666eeee6667776...
            ..6776ee67777777667776..
            ...668ee7768867788666...
            ......ee77eeee67ee......
            ......ee6eeeeee6ce......
            ......eefeeeeeeece......
            ......eeceeeeeeece......
            ......eeceeeeeeefe......
            ......eeceeeeeeefe......
            ......eeeeeeeeeefe......
            ......eeeeeeeeeece......
            .....6eeeeeeeeeece6.....
            ....6776eeeeeeeee676....
            ...6776666eeee6766776...
            ..6776ee77777777667776..
            ...668ce7768867788666...
            ......ce77eeee67ee......
            ......ce6eeeeee6ee......
            ......ceeeeeeeeeee......
            ......fcceeeeeecee......
            ......fccceeececce......
            ......fcceeecceccc......
            ......fccceecceccc......
            ......fccccceceecc......
            .....6fccccccccccf6.....
            ....6776ccccccccc676....
            ...6776676cccc6766776...
            ..6776cc77777777667776..
            ...668cc7768867788666...
            ......cc77cccc67cf......
            ......cc6cccccc6cf......
            `
    } else if (gap == 1) {
        topImage = img`
            .....6feeeeeeeeeef6.....
            ....6776eeeeeeeee676....
            ...6777666eeee6667776...
            ..6776ee67777777667776..
            ...668ee7768867788666...
            ......ee77eeee67ee......
            ......ee6eeeeee6ce......
            ......eefeeeeeeece......
            ......eeceeeeeeece......
            ......eeceeeeeeefe......
            ......eeceeeeeeefe......
            ......eeeeeeeeeefe......
            ......eeeeeeeeeece......
            .....6eeeeeeeeeece6.....
            ....6776eeeeeeeee676....
            ...6776666eeee6766776...
            ..6776ee77777777667776..
            ...668ce7768867788666...
            ......ce77eeee67ee......
            ......eeeeeeeeeeee......
            ......eeeeeeeeeeee......
            ......eeeeeeeeeeee......
            ......eeeeeeeeeeee......
            ......eeeeeeeeeeee......
            ......eeeeeeeeeeee......
            ......eeeeeeeeeeee......
            ......beeeeeeeeeeb......
            .......beeeeeeeeb.......
            ........beeeeeeb........
            ........................
            ........................
            ........................
            `
        bottomImage = img`
            ........................
            ........................
            ........................
            ........................
            ........................
            ........................
            ........................
            ..........bbbb..........
            ........bbddddbb........
            .......bddbbbbddb.......
            ......bdbbddddbbdb......
            .....bdbbdbbbbdbbdb.....
            .....bdbdbddddbdbdb.....
            .....cdbbdbbbbdbbdc.....
            .....cbdbbddddbbdbc.....
            .....efbddbbbbddbce.....
            .....eeffbddddbccee.....
            .....eeeeffcccceee......
            .....ceeeeeeeeeeee......
            .....ceeeeeeeeeeee......
            .....feeeeeeeeeeee......
            .....cceeeeeeeeeee......
            ......feeeeeeeeeee......
            .....6fceeeeeeeeee6.....
            ....6776eeeeeeeee676....
            ...6777666eeee6666776...
            ..67768e67766777667776..
            ...668ee7768867788666...
            ......ee77eeee77ecee....
            ......ee6eeeeee6eef.....
            ......eeeeeeeeeeeef.....
            ......eeeeeeeeeeeef.....
            ......eeeeeeeeeeecf.....
            ......ceeeeeeeeeecf.....
            ......ceeeeeeeeeeff.....
            ......feeeeeeeeeefe.....
            .....6feeeeeeeeeef6.....
            ....6776eeeeeeeee676....
            ...6777666eeee6667776...
            ..6776ee67777777667776..
            ...668ee7768867788666...
            ......ee77eeee67ee......
            ......ee6eeeeee6ce......
            ......eefeeeeeeece......
            ......eeceeeeeeece......
            ......eeceeeeeeefe......
            ......eeceeeeeeefe......
            ......eeeeeeeeeefe......
            ......eeeeeeeeeece......
            .....6eeeeeeeeeece6.....
            ....6776eeeeeeeee676....
            ...6776666eeee6766776...
            ..6776ee77777777667776..
            ...668ce7768867788666...
            ......ce77eeee67ee......
            ......ce6eeeeee6ee......
            `
    } else if (gap == 2) {
        topImage = img`
            .....6feeeeeeeeeef6.....
            ....6776eeeeeeeee676....
            ...6777666eeee6667776...
            ..6776ee67777777667776..
            ...668ee7768867788666...
            ......ee77eeee67eeee....
            ......ee6eeeeee6cef.....
            ......eeeeeeeeeeeef.....
            ......eeeeeeeeeeeef.....
            ......eeeeeeeeeeecf.....
            ......eeeeeeeeeeecf.....
            ......eeeeeeeeeeeff.....
            ......feeeeeeeeeefe.....
            .....6feeeeeeeeeef6.....
            ....6776eeeeeeeee676....
            ...6777666eeee6667776...
            ..6776ee67777777667776..
            ...668ee7768867788666...
            ......ee77eeee67ee......
            ......ee6eeeeee6ce......
            ......eefeeeeeeece......
            ......eeceeeeeeece......
            ......eeceeeeeeefe......
            ......eeceeeeeeefe......
            ......eeeeeeeeeefe......
            ......eeeeeeeeeece......
            .....6eeeeeeeeeece6.....
            ....6776eeeeeeeee676....
            ...6776666eeee6766776...
            ..6776ee77777777667776..
            ...668ce7768867788666...
            ......ce77eeee67ee......
            ......eeeeeeeeeeee......
            ......eeeeeeeeeeee......
            ......eeeeeeeeeeee......
            ......eeeeeeeeeeee......
            ......eeeeeeeeeeee......
            ......eeeeeeeeeeee......
            ......eeeeeeeeeeee......
            ......beeeeeeeeeeb......
            .......beeeeeeeeb.......
            ........beeeeeeb........
            ........................
            ........................
            ........................
            ........................
            ........................
            ........................
            `
        bottomImage = img`
            ........................
            ........................
            ........................
            ........................
            ..........bbbb..........
            ........bbddddbb........
            .......bddbbbbddb.......
            ......bdbbddddbbdb......
            .....bdbbdbbbbdbbdb.....
            .....bdbdbddddbdbdb.....
            .....cdbbdbbbbdbbdc.....
            .....cbdbbddddbbdbc.....
            .....efbddbbbbddbce.....
            .....eeffbddddbccee.....
            .....eeeeffcccceee......
            .....ceeeeeeeeeeee......
            .....ceeeeeeeeeeee......
            .....feeeeeeeeeeee......
            .....cceeeeeeeeeee......
            ......feeeeeeeeeee......
            .....6fceeeeeeeeee6.....
            ....6776eeeeeeeee676....
            ...6777666eeee6666776...
            ..67768e67766777667776..
            ...668ee7768867788666...
            ......ee77eeee77ecee....
            ......ee6eeeeee6eef.....
            ......eeeeeeeeeeeef.....
            ......eeeeeeeeeeeef.....
            ......eeeeeeeeeeecf.....
            ......ceeeeeeeeeecf.....
            ......ceeeeeeeeeeff.....
            ......feeeeeeeeeefe.....
            .....6feeeeeeeeeef6.....
            ....6776eeeeeeeee676....
            ...6777666eeee6667776...
            ..6776ee67777777667776..
            ...668ee7768867788666...
            ......ee77eeee67ee......
            ......ee6eeeeee6ce......
            `
    } else {
        topImage = img`
            .....6fceeeeeeeeee6.....
            ....6776eeeeeeeee676....
            ...6777666eeee6666776...
            ..67768e67766777667776..
            ...668ee7768867788666...
            ......ee77eeee77ecee....
            ......ee6eeeeee6eef.....
            ......eeeeeeeeeeeef.....
            ......eeeeeeeeeeeef.....
            ......eeeeeeeeeeecf.....
            ......ceeeeeeeeeecf.....
            ......ceeeeeeeeeeff.....
            ......feeeeeeeeeefe.....
            .....6feeeeeeeeeef6.....
            ....6776eeeeeeeee676....
            ...6777666eeee6667776...
            ..6776ee67777777667776..
            ...668ee7768867788666...
            ......ee77eeee67eeee....
            ......ee6eeeeee6cef.....
            ......eeeeeeeeeeeef.....
            ......eeeeeeeeeeeef.....
            ......eeeeeeeeeeecf.....
            ......eeeeeeeeeeecf.....
            ......eeeeeeeeeeeff.....
            ......feeeeeeeeeefe.....
            .....6feeeeeeeeeef6.....
            ....6776eeeeeeeee676....
            ...6777666eeee6667776...
            ..6776ee67777777667776..
            ...668ee7768867788666...
            ......ee77eeee67ee......
            ......ee6eeeeee6ce......
            ......eefeeeeeeece......
            ......eeceeeeeeece......
            ......eeceeeeeeefe......
            ......eeceeeeeeefe......
            ......eeeeeeeeeefe......
            ......eeeeeeeeeece......
            .....6eeeeeeeeeece6.....
            ....6776eeeeeeeee676....
            ...6776666eeee6766776...
            ..6776ee77777777667776..
            ...668ce7768867788666...
            ......ce77eeee67ee......
            ......eeeeeeeeeeee......
            ......eeeeeeeeeeee......
            ......eeeeeeeeeeee......
            ......eeeeeeeeeeee......
            ......eeeeeeeeeeee......
            ......eeeeeeeeeeee......
            ......eeeeeeeeeeee......
            ......beeeeeeeeeeb......
            .......beeeeeeeeb.......
            ........beeeeeeb........
            ........................
            `
        bottomImage = img`
            ........................
            ..........bbbb..........
            ........bbddddbb........
            .......bddbbbbddb.......
            ......bdbbddddbbdb......
            .....bdbbdbbbbdbbdb.....
            .....bdbdbddddbdbdb.....
            .....cdbbdbbbbdbbdc.....
            .....cbdbbddddbbdbc.....
            .....efbddbbbbddbce.....
            .....eeffbddddbccee.....
            .....eeeeffcccceee......
            .....ceeeeeeeeeeee......
            .....ceeeeeeeeeeee......
            .....feeeeeeeeeeee......
            .....cceeeeeeeeeee......
            ......feeeeeeeeeee......
            .....6fceeeeeeeeee6.....
            ....6776eeeeeeeee676....
            ...6777666eeee6666776...
            ..67768e67766777667776..
            ...668ee7768867788666...
            ......ee77eeee77ecee....
            ......ee6eeeeee6eef.....
            `
    }
    gapImage = image.create(2, scene.screenHeight())
    gapImage.fill(1)
    gapSprite = sprites.create(gapImage, SpriteKind.Gap)
    gapSprite.setFlag(SpriteFlag.AutoDestroy, true)
    gapSprite.setFlag(SpriteFlag.Invisible, true)
    gapSprite.left = scene.screenWidth()
    gapSprite.vx = -45
    projectile = sprites.createProjectileFromSide(topImage, -45, 0)
    projectile.top = 0
    projectile = sprites.createProjectileFromSide(bottomImage, -45, 0)
    projectile.bottom = scene.screenHeight()
})
