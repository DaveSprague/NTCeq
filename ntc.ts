/**
 * makecode NTC Temperature Sensor Package.
 * http://www.micropython.org.cn
 */



enum NTC_B {
    //% block="3380"
    B3380,
    //% block="3950"
    B3950
}

let beta = 3380
let Rf = 10000

/**
 * NTC mudule
 */
//% weight=20 color=#10F080 icon="\uf2c8" block="NTC Sensor"
namespace NTCSensorEq {
    /**
     * get NTC Temperature
     * @param adc is ADC convert value, eg: 256
     */
    //% blockId="NTCSenor_GET" block="get temperature %adc"
    //% weight=80 blockGap=8
    export function Temperature(adc: number): number {
        // convert the value to resistance
        adc = 1023 / adc - 1
        adc = 10000 / adc
      
      let steinhart = 850;
      steinhart = adc / 10000;     // (R/Ro)
      steinhart = Math.log(steinhart);                  // ln(R/Ro)
      steinhart /= beta;                   // 1/B * ln(R/Ro)
      steinhart += 1.0 / (25 + 273.15); // + (1/To)
      steinhart = 1.0 / steinhart;                 // Invert
      steinhart -= 273.15;                         // convert absolute temp to C
        return Math.round(100*steinhart)/100
    }


    /**
     * set NTC B value
     * @param B is NTC B value, eg: NTC_B.B3380
     */
    //% blockId="NTCSensor_SET" block="set B value %B"
    //% weight=100 blockGap=8
    export function setb(B: NTC_B): void {
        if (B == NTC_B.B3380)
            beta = 3380
        else
            beta = 3950
    }

    // /**
    //  * set Fixed Resistor value
    //  * @param Rfixed is NTC Fixed R value, eg: 10000
    //  */
    // //% blockId="NTCSenor_SET" block="set Rf value %B"
    // //% weight=100 blockGap=8
    // export function setr(Rfixed: number): void {
    //     Rf = Rfixed
    // }
    
    setb(NTC_B.B3950)
}
