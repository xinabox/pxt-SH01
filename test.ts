SH01.onKeyPressed(SH01_KEY.KEY_UP, function () {
    basic.showIcon(IconNames.Heart)
    basic.showIcon(IconNames.SmallHeart)
})
SH01.onKeyReleased(SH01_KEY.KEY_LEFT, function () {
    basic.showIcon(IconNames.Yes)
    basic.showIcon(IconNames.No)
})
basic.forever(function () {
    if (SH01.read() == SH01.KEY_CIRCLE()) {
        basic.showIcon(IconNames.Square)
        basic.showIcon(IconNames.SmallSquare)
    }
})
