//% weight=20 color=#10F080 icon="\uf2c8" block="NTC Sensor"
namespace NTCSensorEq {
    let beta = 3380
    let Rfixed = 10000 // Using Rfixed for clarity

    /**
     * Calculate temperature from an analog pin reading (0-1023).
     */
    //% blockId="NTCSensor_GET" block="get temperature %adc"
    export function Temperature(adc: number): number {
        // --- 1. THE CIRCUIT (Voltage Divider) ---
        // Formula: R_ntc = R_fixed / ((1023 / adc) - 1)
        // Note: The "-1" comes from Vin/Vout = (Rf + Rn)/Rn = Rf/Rn + 1
        let ntcResistance = Rfixed / (1023 / adc - 1);

        // --- 2. THE PHYSICS (Beta Equation) ---
        const T0 = 25 + 273.15; // 298.15 Kelvin
        const R0 = 10000;       // 10k at 25°C
        let invKelvin = (1.0 / T0) + (1.0 / beta) * Math.log(ntcResistance / R0);

        // --- 3. THE CONVERSION ---
        let celsius = (1.0 / invKelvin) - 273.15;
        return Math.round(celsius * 100) / 100; // Round to 2 decimal places
    }

    // Set B-Value (3380 or 3950)
    //% blockId="NTCSensor_SET" block="set B value %B"
    export function setb(B: NTC_B): void {
        beta = (B == NTC_B.B3380) ? 3380 : 3950;
    }

    // Set Fixed Resistor (e.g., 10000)
    //% blockId="NTCSensor_SET_RF" block="set Rfixed value %Rf"
    export function setr(Rf: number): void {
        Rfixed = Rf;
    }
}
