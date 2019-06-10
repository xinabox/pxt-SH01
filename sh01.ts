/**
 * XinaBox SH01 extension for makecode
 */

/**
 * SH01 block
 */
//% weight=100 color=#70c0f0 icon="\uf0a7" block="SH01"
namespace SH01 {
    let CAP1296_I2C_ADDRESS = 40
    let REG_MainControl = 0
    let REG_InputStatus = 3

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
     * read touch key, if a touch key pressed, return 1-4.
     * If no touch key pressed, return 0.
     */
    //% blockId="SH01_READ" block="Read Touch"
    //% weight=80 blockGap=8
    export function read(): number {
        let t = getreg(REG_InputStatus)

        if (t > 0) {
            setreg(REG_MainControl, 0)
        }
        switch (t) {
            case 1:
                return 1
            case 8:
                return 2
            case 16:
                return 3
            case 32:
                return 4
            default:
                return 0
        }
    }

    read()
}
