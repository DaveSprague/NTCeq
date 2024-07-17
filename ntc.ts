/**
 * makecode NTC Temperature Sensor Package.
 * From microbit/micropython Chinese community.
 * http://www.micropython.org.cn
 */



enum NTC_B {
    //% block="3380"
    B3380,
    //% block="3950"
    B3950
}

let beta = 3380

/**
 * NTC mudule
 */
//% weight=20 color=#10F080 icon="\uf2c8" block="NTC Sensor"
namespace NTCSensor {
    /**
     * get NTC Temperature
     * @param adc is ADC convert value, eg: 256
     */
    //% blockId="NTCSenor_GET" block="get temperature %adc"
    //% weight=80 blockGap=8
    export function Temperature(adc: number): number {
        // convert the value to resistance
        number = 1023 / number - 1
        number = 10000 / number
      
      let steinhart = 850;
      steinhart = number / 10000;     // (R/Ro)
      steinhart = log(steinhart);                  // ln(R/Ro)
      steinhart /= beta;                   // 1/B * ln(R/Ro)
      steinhart += 1.0 / (25 + 273.15); // + (1/To)
      steinhart = 1.0 / steinhart;                 // Invert
      steinhart -= 273.15;                         // convert absolute temp to C
        return steinhart;  // tenths of degrees
    }

    /**
     * set NTC B value
     * @param B is NTC B value, eg: NTC_B.B3380
     */
    //% blockId="NTCSenor_SET" block="set B value %B"
    //% weight=100 blockGap=8
    export function set(B: NTC_B): void {
        if (B == NTC_B.B3380)
            beta = 3380
        else
            beta = 3950
    }
    
    set(NTC_B.B3950)
}
