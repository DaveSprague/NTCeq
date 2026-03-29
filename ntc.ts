/**
 * NTC Temperature Sensor Extension for micro:bit
 * Based on the Steinhart-Hart / Beta Equation
 */

enum NTC_B {
    //% block="3380"
    B3380,
    //% block="3950"
    B3950
}

let beta = 3380
let Rf = 10000 // Fixed pull-up resistor (10k Ohms)

//% weight=20 color=#10F080 icon="\uf2c8" block="NTC Sensor"
namespace NTCSensorEq {

    /**
     * Calculate temperature from an analog pin reading (0-1023).
     * @param adc the raw value from the analog pin, eg: 512
     */
    //% blockId="NTCSenor_GET" block="get temperature %adc"
    //% weight=80 blockGap=8
    export function Temperature(adc: number): number {
        // --- 1. THE CIRCUIT (Voltage Divider) ---
        // Convert the 10-bit ADC value into the NTC's resistance.
        // Formula: R_ntc = R_fixed / ((1023 / adc) - 1)
        let ntcResistance = Rf / (1023 / adc - 1);

        // --- 2. THE PHYSICS (Beta Equation) ---
        // Standard NTC specs: 10k Ohms at 25°C (298.15 Kelvin)
        const T0 = 25 + 273.15;
        const R0 = 10000;

        // Calculate 1/T (Inverse Temperature in Kelvin)
        // Formula: 1/T = 1/T0 + 1/B * ln(R/R0)
        let invKelvin = (1.0 / T0) + (1.0 / beta) * Math.log(ntcResistance / R0);

        // --- 3. THE CONVERSION ---
        // Convert Kelvin back to Celsius
        let celsius = (1.0 / invKelvin) - 273.15;

        // Round to 2 decimal places (keeping it as a number type)
        return Math.round(celsius * 100) / 100;
    }

    /**
     * Calculate the natural logarithm (ln) of a number.
     * Useful for manual math in blocks!
     */
    //% block="ln %n"
    //% weight=70
    export function ln(n: number): number {
        return Math.log(n);
    }

    /**
     * Set the Beta value for your specific NTC sensor.
     * @param B selection from the dropdown (3380 or 3950)
     */
    //% blockId="NTCSensor_SET" block="set B value %B"
    //% weight=100 blockGap=8
    export function setb(B: NTC_B): void {
        if (B == NTC_B.B3380) {
            beta = 3380;
        } else {
            beta = 3950;
        }
    }

    /**
     * Set the value of your fixed pull-up resistor (default 10000).
     */
    //% blockId="NTCSensor_SET_RF" block="set Rf value %Rfixed"
    //% weight=60
    export function setr(Rfixed: number): void {
        Rf = Rfixed;
    }

    // Default initialization
    setb(NTC_B.B3950);
}
