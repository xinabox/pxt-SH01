/**
 * XinaBox SH01 extension for makecode
 */

declare enum SH01_KEY {
    //% block="UP"
    KEY_UP = 1,
    //% block="DOWN"
    KEY_DOWN = 8,
    //% block="LEFT"
    KEY_LEFT = 16,
    //% block="RIGHT"
    KEY_RIGHT = 32,
    //% block="TRIANGLE"
    KEY_TRI = 1,
    //% block="NO"
    KEY_NO = 8,
    //% block="SQUARE"
    KEY_SQUARE = 16,
    //% block="CIRCLE"
    KEY_CIRCLE = 32,
}

/**
 * SH01 block
 */
//% weight=100 color=#70c0f0 icon="\uf0a7" block="SH01"
namespace SH01 {
    let CAP1296_I2C_ADDRESS = 40
    let REG_MainControl = 0
    let REG_InputStatus = 3
    let KeyPressed = false
    let KeyReleased = true

    function setreg(reg: number, dat: number): void {
        let buf = pins.createBuffer(2);
        buf[0] = reg;
        buf[1] = dat;
        pins.i2cWriteBuffer(CAP1296_I2C_ADDRESS, buf);
    }

    function getreg(reg: number): number {
        pins.i2cWriteNumber(CAP1296_I2C_ADDRESS, reg, NumberFormat.UInt8BE);
        return pins.i2cReadNumber(CAP1296_I2C_ADDRESS, NumberFormat.UInt8BE);
    }

    /**
     * Key Pressed Event
     */
    //% block="Key Pressed %key"
    export function onKeyPressed(key: SH01_KEY, body: () => void): void {
        control.inBackground(function () {
            while (true) {
                if (read() == key) {
                    if (!KeyPressed) {
                        KeyPressed = true
                        body()
                    }
                }
                else KeyPressed = false
                basic.pause(100)
            }
        })
    }

    /**
     * Key Released Event
     */
    //% block="Key Released %key"
    export function onKeyReleased(key: SH01_KEY, body: () => void): void {
        control.inBackground(function () {
            while (true) {
                if (read() == key) {
                    KeyReleased = false
                }
                else {
                    if (!KeyReleased) {
                        KeyReleased = true
                        body()
                    }
                }
                basic.pause(100)
            }
        })
    }

    /**
     * TRIANGLE KEY
     */
    //% block="TRIANGLE" advanced=true
    export function KEY_TRI(): SH01_KEY {
        return SH01_KEY.KEY_UP
    }

    /**
     * NO KEY
     */
    //% block="NO" advanced=true
    export function KEY_NO(): SH01_KEY {
        return SH01_KEY.KEY_DOWN
    }

    /**
     * SQUARE KEY
     */
    //% block="SQUARE" advanced=true
    export function KEY_SQUARE(): SH01_KEY {
        return SH01_KEY.KEY_LEFT
    }

    /**
     * CIRCLE KEY
     */
    //% block="CIRCLE" advanced=true
    export function KEY_CIRCLE(): SH01_KEY {
        return SH01_KEY.KEY_RIGHT
    }

    /**
     * UP KEY
     */
    //% block="UP" advanced=true
    export function KEY_UP(): SH01_KEY {
        return SH01_KEY.KEY_UP
    }

    /**
     * DOWN KEY
     */
    //% block="DOWN" advanced=true
    export function KEY_DOWN(): SH01_KEY {
        return SH01_KEY.KEY_DOWN
    }

    /**
     * LEFT KEY
     */
    //% block="LEFT" advanced=true
    export function KEY_LEFT(): SH01_KEY {
        return SH01_KEY.KEY_LEFT
    }

    /**
     * RIGHT KEY
     */
    //% block="RIGHT" advanced=true
    export function KEY_RIGHT(): SH01_KEY {
        return SH01_KEY.KEY_RIGHT
    }

    /**
     * read touch key, if a touch key pressed, return 1-4.
     * If no touch key pressed, return 0.
     */
    //% block="Read Touch"
    //% weight=80
    export function read(): SH01_KEY {
        let t = getreg(REG_InputStatus)

        if (t > 0) {
            setreg(REG_MainControl, 0)
        }
        return t
    }

    read()
}
