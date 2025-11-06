#include <PulseSensorPlayground.h>   // Pulse sensor library
#include <Wire.h>
#include <LiquidCrystal_I2C.h>       // LCD I2C library

// ---------------- Variables ----------------
const int PulseWire = A0;            // PulseSensor connected to A0
const int LED = LED_BUILTIN;         // Built-in LED blinks with heartbeat
int Threshold = 550;                 // Adjust depending on your sensor

PulseSensorPlayground pulseSensor;   // Create pulse sensor object
LiquidCrystal_I2C lcd(0x3F, 16, 2);  // LCD I2C address (0x27 or 0x3F common)

// ---------------- Setup ----------------
void setup() {
  Serial.begin(115200);
  lcd.init();                        // Initialize LCD
  lcd.backlight();                   // Turn on backlight
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("Initializing...");
  
  pulseSensor.analogInput(PulseWire);
  pulseSensor.blinkOnPulse(LED);
  pulseSensor.setThreshold(Threshold);

  if (pulseSensor.begin()) {
    Serial.println("✅ PulseSensor Object Created!");
    lcd.setCursor(0, 1);
    lcd.print("Sensor Ready...");
    delay(2000);
    lcd.clear();
  } else {
    Serial.println("⚠️ Sensor init failed!");
    lcd.setCursor(0, 1);
    lcd.print("Sensor Failed!");
  }
}

// ---------------- Loop ----------------
void loop() {
  if (pulseSensor.sawStartOfBeat()) {
    int myBPM = pulseSensor.getBeatsPerMinute();

    Serial.println("♥ Heartbeat Detected!");
    Serial.print("BPM: ");
    Serial.println(myBPM);

    // -------- LCD Display --------
    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print("Heart BPM:");
    lcd.setCursor(11, 0);
    lcd.print(myBPM);

    // Small heartbeat animation
    lcd.setCursor(0, 1);
    lcd.print("♥ ♥ ♥");
  }

  delay(20);
}
