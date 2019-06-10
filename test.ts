let touch = 0
basic.forever(function () {
    touch = SH01.read()
    if (touch == 1) {
        basic.showLeds(`
            . . . . .
            . . # . .
            . # . # .
            # # # # #
            . . . . .
            `)
    } else if (touch == 2) {
        basic.showLeds(`
            # . . . #
            . # . # .
            . . # . .
            . # . # .
            # . . . #
            `)
    } else if (touch == 3) {
        basic.showLeds(`
            # # # # #
            # . . . #
            # . . . #
            # . . . #
            # # # # #
            `)
    } else if (touch == 4) {
        basic.showLeds(`
            . # # # .
            # . . . #
            # . . . #
            # . . . #
            . # # # .
            `)
    } else {
        basic.showLeds(`
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            `)
    }
    basic.pause(100)
})
