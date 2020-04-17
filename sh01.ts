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
//% weight=100 color=#70c0f0 icon="\uf0a7" block="SH01"
namespace SH01 {

    const CAP1296_I2C_ADDRESS = 40
    const REG_MainControl = 0
    const REG_InputStatus = 3
    const _interval = 100

    let KeyPressed: boolean[] = [false, false, false, false, false, false, false, false]
    let KeyReleased: boolean[] = [true, true, true, true, true, true, true, true]
    let buf = pins.createBuffer(2)
    let rk: number = 0

    function setreg(reg: number, dat: number): void {
        buf[0] = reg;
        buf[1] = dat;
        pins.i2cWriteBuffer(CAP1296_I2C_ADDRESS, buf);
    }

    function getreg(reg: number): number {
        pins.i2cWriteNumber(CAP1296_I2C_ADDRESS, reg, NumberFormat.UInt8BE);
        return pins.i2cReadNumber(CAP1296_I2C_ADDRESS, NumberFormat.UInt8BE);
    }

    // read touch key interval
    function _readkey(): void {
        startParallel(function () {
            while (true) {
                rk = getreg(REG_InputStatus)
                if (rk > 0) {
                    setreg(REG_MainControl, 0)
                }
                basic.pause(_interval)
            }
        })
    }

    /**
     * Key Pressed Event
     */
    //% block="on %key Key Pressed"
    export function onKeyPressed(key: SH01_KEY, body: () => void): void {
        startParallel(function () {
            while (true) {
                if (rk <= 32) {
                    if (rk == key) {
                        if (KeyPressed[key >> 3] == false) {
                            KeyPressed[key >> 3] = true
                            body()
                        }
                    }
                    else KeyPressed[key >> 3] = false
                }
                basic.pause(_interval)
            }
        })
    }

    /**
     * Key Released Event
     */
    //% block="on %key Key Released"
    export function onKeyReleased(key: SH01_KEY, body: () => void): void {
        startParallel(function () {
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
        })
    }

    /**
     * If one key has been pressed.
     */
    //% block="%key has been pressed"
    export function keypressed(key: SH01_KEY): boolean {
        return rk == key
    }

	//% shim=parall::startParallel
	export function startParallel(u: () => void)
	{
	return 1;
	}

    _readkey()
}
