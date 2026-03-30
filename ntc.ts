//% color=#10F080 icon="\uf2c8" block="NTC Sensor"

enum NTC_B {
    //% block="B3380"
    B3380 = 3380,
    //% block="B3950"
    B3950 = 3950
}

namespace NTCSensor {
    let beta = 3950
    let Rfixed = 10000

    const T0 = 298.15  // 25°C in Kelvin
    const R0 = 10000   // Nominal resistance at T0

    /**
     * Calculate temperature (°C) from an analog pin reading (0-1023).
     */
    //% blockId="NTCSensor_GET" block="get temperature %adc"
    export function Temperature(adc: number): number {
        if (adc <= 0) return -999
        let ntcResistance = Rfixed / (1023 / adc - 1)
        let invKelvin = (1.0 / T0) + (1.0 / beta) * Math.log(ntcResistance / R0)
        let celsius = (1.0 / invKelvin) - 273.15
        return Math.round(celsius * 100) / 100
    }

    //% blockId="NTCSensor_SET" block="set B value %B"
    export function setb(B: NTC_B): void {
        beta = B as number
    }

    //% blockId="NTCSensor_SET_RF" block="set Rfixed value %Rf"
    export function setr(Rf: number): void {
        Rfixed = Rf
    }
}
