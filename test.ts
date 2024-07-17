let AmbientTemperature = 0
NTCSenor.setb(NTC_B.B3950)
AmbientTemperature = NTCSenor.Temperature(pins.analogReadPin(AnalogPin.P1))
