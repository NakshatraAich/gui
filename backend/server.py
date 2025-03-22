from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import serial
import threading

app = FastAPI()

# Allow requests from frontend (Vite server on port 5173)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change to ["http://localhost:5173"] for security
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

SERIAL_PORT = "COM6"
BAUD_RATE = 9600
ser = serial.Serial(SERIAL_PORT, BAUD_RATE, timeout=1)

data = ""

import json

def read_serial():
    global data
    while True:
        try:
            line = ser.readline().decode(errors='ignore').strip()
            if line:
                values = line.split(",")
                if len(values) == 4:  # Ensure exactly 4 motor states
                    data = {
                        "motor1": int(values[0]),
                        "motor2": int(values[1]),
                        "motor3": int(values[2]),
                        "motor4": int(values[3])
                    }
                else:
                    data = {"raw": line}  # Store raw data if parsing fails
        except Exception as e:
            print(f"Serial Error: {e}")

threading.Thread(target=read_serial, daemon=True).start()

@app.get("/data")
def get_data():
    return {"serial_data": data}