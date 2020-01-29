/**
 * XinaBox SH01 extension for makecode
 */

enum SH01_KEY {
    //% block="UP"
    KEY_UP = 1,
    //% block="DOWN"
    KEY_DOWN = 8,
    //% block="LEFT"
    KEY_LEFT = 16,
    //% block="RIGHT"
    KEY_RIGHT = 32,
    //% block="TRIANGLE"
    KEY_TRIANGLE = 1,
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
//% weight=100 color=#444444 icon="\uf0a7" block="SH01"
namespace SH01 {

    const keyPressEventID = 3101;
    const keyReleaseEventID = 3101;
    const CAP1296_I2C_ADDRESS = 40
    const REG_MainControl = 0
    const REG_InputStatus = 3
    const _interval = 100
    let enable: boolean = false

    let KeyPressed: boolean[] = [false, false, false, false, false, false, false, false]
    let KeyReleased: boolean[] = [true, true, true, true, true, true, true, true]
    //let buf = pins.createBuffer(2)
    let rk: number = 0

    function setreg(reg: number, dat: number): void {
        //buf[0] = reg;
        //buf[1] = dat;
        //pins.i2cWriteBuffer(CAP1296_I2C_ADDRESS, buf);
        pins.i2cWriteNumber(CAP1296_I2C_ADDRESS, (reg << 8) + dat, NumberFormat.UInt16BE);
    }

    function getreg(reg: number): number {
        pins.i2cWriteNumber(CAP1296_I2C_ADDRESS, reg, NumberFormat.UInt8BE);
        return pins.i2cReadNumber(CAP1296_I2C_ADDRESS, NumberFormat.UInt8BE);
    }

    /**
     * Poll SH01
     */
    //% block="SH01 poll"
    export function poll_sh01(): void {
        rk = getreg(REG_InputStatus)

        console.logValue("ID", rk)

        if (rk & 0x01) {
            // Triangle
            let main_reg: number = getreg(0x00)
            setreg(REG_MainControl, main_reg & ~0x01)
            enable = true
            control.raiseEvent(7, 0)
        } else if (rk & 0x20) {
            // Circle
            let main_reg: number = getreg(0x00)
            setreg(REG_MainControl, main_reg & ~0x01)
            enable = true
            control.raiseEvent(8, 0)
        } else if (rk & 0x10) {
            // Square
            let main_reg: number = getreg(0x00)
            setreg(REG_MainControl, main_reg & ~0x01)
            enable = true
            control.raiseEvent(9, 0)
        } else if (rk & 0x08) {
            // Cross
            let main_reg: number = getreg(0x00)
            setreg(REG_MainControl, main_reg & ~0x01)
            enable = true
            control.raiseEvent(10, 0)
        }

        console.log(enable.toString())
    }

    /**
     * Key Pressed Event
     */
    //% block="SH01 on %key Key Pressed"
    export function onKeyPressed(key: SH01_KEY, body: () => void): void {
        if ((key == SH01_KEY.KEY_TRIANGLE) && enable) {
            control.onEvent(7, 0, body)
        } else if ((key == SH01_KEY.KEY_CIRCLE) && enable) {
            control.onEvent(8, 0, body)
        } else if ((key == SH01_KEY.KEY_SQUARE) && enable) {
            control.onEvent(9, 0, body)
        } else if ((key == SH01_KEY.KEY_NO) && enable) {
            control.onEvent(10, 0, body)
        }
    }

    /**
     * Key Released Event
     */
    //% block="SH01 on %key Key Released"
    export function onKeyReleased(key: SH01_KEY, body: () => void): void {
        /*
        control.inBackground(function () {
            while (true) {
                if (rk <= 32) {
                    if (rk == key) {
                        KeyReleased[key >> 3] = false
                    }
                    else {
                        if (KeyReleased[key >> 3] == false) {
                            KeyReleased[key >> 3] = true
                            body()
                        }
                    }
                }
                basic.pause(_interval)
            }
        }) */
        control.onEvent(keyReleaseEventID, key, body);
        control.inBackground(() => {
            while (true) {
                if (rk <= 32) {
                    if (rk == key) {
                        KeyReleased[key >> 3] = false
                    }
                    else {
                        if (KeyReleased[key >> 3] == false) {
                            KeyReleased[key >> 3] = true
                            control.raiseEvent(keyReleaseEventID, key);
                        }
                    }
                }
                basic.pause(_interval)
            }
        })
    }

    /**
     * If one key has been pressed.
     */
    //% block="SH01 %key has been pressed"
    export function keypressed(key: SH01_KEY): boolean {
        return rk == key
    }
}