basic.forever(function () {
    SH01.poll_sh01()
    if (SH01.tri_pressed()) {
        basic.showString("Trangle!")
    }
    if (SH01.sqr_pressed()) {
        basic.showString("Square!")
    }
    if (SH01.crcl_pressed()) {
        basic.showString("Circle!")
    }
    if (SH01.cross_pressed()) {
        basic.showString("Cross!")
    }
})
