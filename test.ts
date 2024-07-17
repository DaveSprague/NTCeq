let AmbientTemperature = 0
NTCSenor.set(NTC_B.B3950)
AmbientTemperature = NTCSenor.Temperature(pins.analogReadPin(AnalogPin.P1), 10000)
