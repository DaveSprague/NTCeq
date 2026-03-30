let AmbientTemperature = 0
NTCSensor.setb(NTC_B.B3950)
AmbientTemperature = NTCSensor.Temperature(pins.analogReadPin(AnalogPin.P1))
