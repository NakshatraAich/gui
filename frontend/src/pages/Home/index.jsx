import { useState, useEffect } from 'preact/hooks';
import { fan, logo } from '../../assets';

export function Home() {

    const [capacity, setCapacity] = useState(100);

    const [dateTime, setDateTime] = useState({
        date: "",
        time: ""
    });

    const [timer, setTimer] = useState(0); // 8 hours in seconds (example)

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
        }, 1000/(100/60)); // Decrease every second

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
        <div className="home h-[320px] w-[480px] bg-black grid grid-cols-8 grid-rows-9 p-2 gap-2">
            <div className="flex flex-col justify-center items-center">
                <img src={logo} className="h-3 w-auto"/>
            </div>

            <div className="bg-[#1D1D1D] col-start-1 tracking-wider col-end-5 row-start-2 row-end-10 rounded flex flex-col justify-between items-center">
                <div className="text-[#626262] font-semibold text-[8px] mt-4">CAPACITY</div>
                <div className="custom-font font-bold flex-stretch h-full flex flex-col justify-center items-center">
                    <div className="text-8xl">{capacity}</div>
                    <div className="text-2xl text-[#B5D411]">%</div>
                </div>
                <div className="relative w-full rounded-t overflow-hidden transition-all duration-300 rotate-180">
                    <div className="h-[20px] bg-[#B5D411] relative" style={{ width: `${capacity}%` }}>                  
                    </div>
                </div>
            </div>

            <div className="border border-[#1D1D1D] tracking-wider col-start-5 col-end-7 row-start-2 row-end-7 rounded flex flex-col justify-between items-center">
                <div className="text-[#626262] font-semibold text-[8px] mt-4">TIMER</div>
                <div className="font-bold flex-stretch h-full flex flex-col justify-center items-center">
                    <div className="text-lg -mt-1">{hrs}</div>
                    <div className="text-[5px] text-[#626262] -mt-1">HRS</div>
                    <div className="text-lg -mt-1">{mins}</div>
                    <div className="text-[5px] text-[#626262] -mt-1">MIN</div>
                    <div className="text-lg -mt-1">{secs}</div>
                    <div className="text-[5px] text-[#626262] -mt-1">SEC</div>
                </div>
            </div>

            <div className="border border-[#1D1D1D] col-start-7 col-end-9 row-start-2 row-end-7 rounded flex flex-col justify-between items-center">
                <div className="text-[#626262] font-semibold text-[8px] mt-4">OUTPUT</div>
                <div className="font-bold flex-stretch h-full flex flex-col justify-center items-center -mt-4">
                    <div className="text-4xl -mt-1">100</div>
                    <div className="text-[5px] text-[#626262]">WATTS</div>
                </div>
            </div>

            <div className="custom-font col-start-5 col-end-9 row-start-7 row-end-10 rounded flex flex-col justify-center items-center font-bold text-4xl">
                <div>AL <span className="text-[#B5D411] tracking-tighter">500</span></div>
            </div>

            <div className="col-start-1 col-end-9 row-start-10 row-end-11 rounded-sm text-[#626262] flex flex-row w-full justify-between px-1">
                <div className="text-[9px] font-bold tracking-wider self-center">{dateTime.date.toUpperCase()}</div>
                <div className="text-[9px] font-bold self-center">{dateTime.time}</div>
            </div>
        </div>
    );
}
