from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import serial
import threading

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

SERIAL_PORT = "COM6"#"/dev/ttyUSB0"
BAUD_RATE = 9600

try:
    ser = serial.Serial(SERIAL_PORT, BAUD_RATE, timeout=1)
except Exception as e:
    print(f"Error opening serial port: {e}")
    ser = None

data = {"power": 0.0}

def read_serial():
    global data
    while ser:
        try:
            line = ser.readline().decode(errors='ignore').strip()
            if line:
                try:
                    power_value = float(line)  # Convert to float instead of int
                    data = {"power": round(power_value, 2)}  # Store as float with 2 decimal places
                except ValueError:
                    print(f"Invalid data received: {line}")  # Debugging
        except Exception as e:
            print(f"Serial Error: {e}")

if ser:
    threading.Thread(target=read_serial, daemon=True).start()

@app.get("/data")
def get_data():
    return data
