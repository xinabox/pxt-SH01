/**
 * XinaBox SH01 extension for makecode
 */

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
    let tri_enable: boolean = false
    let sqr_enable: boolean = false
    let crcl_enable: boolean = false
    let no_enable: boolean = false

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

        if (rk & 0x01) {
            // Triangle
            while (getreg(REG_InputStatus) != 0x00)
            {
                let main_reg: number = getreg(0x00)
                setreg(REG_MainControl, main_reg & ~0x01)
            }
            tri_enable = true
        } else if (rk & 0x20) {
            // Circle
            while (getreg(REG_InputStatus) != 0x00) {
                let main_reg: number = getreg(0x00)
                setreg(REG_MainControl, main_reg & ~0x01)
            }
            crcl_enable = true
        } else if (rk & 0x10) {
            // Square
            while (getreg(REG_InputStatus) != 0x00) {
                let main_reg: number = getreg(0x00)
                setreg(REG_MainControl, main_reg & ~0x01)
            }
            sqr_enable = true
        } else if (rk & 0x08) {
            // Cross
            while (getreg(REG_InputStatus) != 0x00) {
                let main_reg: number = getreg(0x00)
                setreg(REG_MainControl, main_reg & ~0x01)
            }
            no_enable = true
        }

    }

    /**
     * Triangle pressed
     */
    //% block="SH01 is triangle pressed"
    export function tri_pressed(): boolean {
        let tri_press: boolean = false

        if (tri_enable) {
            tri_press = true
            tri_enable = false
        }
        else {
            tri_press = false
        }

        return tri_press
    }

    /**
    * Square pressed
    */
    //% block="SH01 is square pressed"
    export function sqr_pressed(): boolean {
        let sqr_press: boolean = false

        if (sqr_enable) {
            sqr_press = true
            sqr_enable = false
        }
        else {
            sqr_press = false
        }

        return sqr_press
    }

    /**
    * Circle pressed
    */
    //% block="SH01 is circle pressed"
    export function crcl_pressed(): boolean {
        let crcl_press: boolean = false

        if (crcl_enable) {
            crcl_press = true
            crcl_enable = false
        }
        else {
            crcl_press = false
        }

        return crcl_press
    }

    /**
    * Cross pressed
    */
    //% block="SH01 is cross pressed"
    export function cross_pressed(): boolean {
        let no_press: boolean = false

        if (no_enable) {
            no_press = true
            no_enable = false
        }
        else {
            no_press = false
        }

        return no_press
    }

}