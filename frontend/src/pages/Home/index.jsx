import { useState, useEffect } from 'preact/hooks';
import { fan, logo } from '../../assets';

export function Home() {

    const [capacity, setCapacity] = useState(100);
    const [power, setPower] = useState(100); // Store power value
    const [dateTime, setDateTime] = useState({
        date: "",
        time: ""
    });

    const [timer, setTimer] = useState(0); // Timer for elapsed time

    // Update Date & Time
    useEffect(() => {
        const updateDateTime = () => {
            const now = new Date();
            const options = { day: "numeric", month: "long", year: "numeric" };
            const formattedDate = now.toLocaleDateString("en-US", options);
            const formattedTime = now.toLocaleTimeString("en-US", { hour12: false });

            setDateTime({ date: formattedDate, time: formattedTime });
        };

        updateDateTime();
        const interval = setInterval(updateDateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    // Timer
    useEffect(() => {
        const interval = setInterval(() => {
            setTimer((prev) => prev + 1);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    // Capacity Countdown
    useEffect(() => {
        const interval = setInterval(() => {
            setCapacity((prev) => (Math.floor(prev > 0 ? prev - 1 : 0)));
        }, (25*60*60*1000)/100); // Decrease every second

        return () => clearInterval(interval);
    }, []);

    // Fetch Power from Localhost
    useEffect(() => {
        const fetchPower = async () => {
            try {
                const response = await fetch("http://localhost:8000/data");
                const data = await response.json();
                if (data && data.power) {
                    setPower(data.power);
                    console.log(data.power);
                }
            } catch (error) {
                console.error("Error fetching power:", error);
            }
        };

        fetchPower();
        const interval = setInterval(fetchPower, 2000); // Fetch every 2 seconds
        return () => clearInterval(interval);
    }, []);

    // Format Time (HH:MM:SS)
    const formatTime = (seconds) => {
        const hrs = String(Math.floor(seconds / 3600)).padStart(2, "0");
        const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
        const secs = String(seconds % 60).padStart(2, "0");
        return { hrs, mins, secs };
    };

    const { hrs, mins, secs } = formatTime(timer);

    return (
        <div className="home h-[320px] w-[480px] bg-black flex flex-col text-white">

            <div className="flex flex-row w-full justify-start gap-3 py-4 px-4">
                <div className="self-center"><img src={logo} className="h-5"/></div>
                <div className="p-[0.5px] bg-[#1D1D1D] h-full"></div>
                <div className="text-[14px] text-white font-bold self-center custom-font">AL <span className="text-[#]">500</span></div>
            </div>

            <div className="flex-stretch py-2 px-4 h-full flex flex-row gap-4">
                <div className="flex flex-col w-[240px] shrink-0 items-center justify-center gap-1">
                    <div className="text-7xl font-bold">{capacity}%</div>
                    <div className="w-full p-1 rounded-full my-4 mx-16 relative">
                        <div className="absolute bg-[#B5D411] h-full top-0 left-0 rounded-l-full" style={{ width: `${capacity}%` }}></div>
                        <div className="absolute bg-[#1D1D1D] h-full top-0 right-0 rounded-r-full" style={{ width: `${100 - capacity}%` }}></div>
                    </div>
                </div>
                <div className="p-[0.5px] bg-[#1D1D1D] h-full"></div>
                <div className="flex flex-col w-full justify-center">
                    <div className="p-4">
                        <div className="font-bold text-[#626262] text-sm">POWER</div>
                        <div className="font-bold text-white text-3xl">{Math.floor(power)}W</div>
                    </div>
                    <div className="p-[0.5px] bg-[#1D1D1D] w-full"></div>
                    <div className="p-4">
                        <div className="font-bold text-[#626262] text-sm">TIME ELAPSED</div>
                        <div className="font-bold text-white text-3xl">{hrs}:{mins}:{secs}</div>
                    </div>
                </div>
            </div>

            <div className="rounded-sm text-[#626262] flex flex-row w-full justify-between py-4 px-4">
                <div className="text-[10px] font-bold tracking-wider self-center">{dateTime.date.toUpperCase()}</div>
                <div className="text-[10px] font-bold self-center">{dateTime.time}</div>
            </div>

        </div>
    );
}
