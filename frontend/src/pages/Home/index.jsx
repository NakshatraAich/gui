import { useState, useEffect } from 'preact/hooks';
import { fan } from '../../assets';

export function Home() {
    const [motorStates, setMotorStates] = useState([0, 0, 0, 0]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://127.0.0.1:8000/data");
                const data = await response.json();

                if (data.serial_data) {
                    // Convert object to array [motor1, motor2, motor3, motor4]
                    setMotorStates([
                        data.serial_data.motor1 || 0,
                        data.serial_data.motor2 || 0,
                        data.serial_data.motor3 || 0,
                        data.serial_data.motor4 || 0
                    ]);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
        const interval = setInterval(fetchData, 1000); // Fetch every second

        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    return (
        <div className="home h-[320px] w-[480px] bg-black grid grid-cols-4 px-8 py-12 gap-3">
            {motorStates.map((state, index) => (
                <div key={index} className="flex flex-col items-center">
                    <img src={fan} className={`w-16 h-16 ${state ? "animate-spin" : ""}`} />
                    <div className="font-semibold text-sm text-white">Motor {index + 1}</div>
                </div>
            ))}
        </div>
    );
}


// export function Home() {
//     const [currentTime, setCurrentTime] = useState(new Date());
//     const [lifetimeSeconds, setLifetimeSeconds] = useState(0);

// 	const lifetime = 100;

//     useEffect(() => {
//         const timeInterval = setInterval(() => {
//             setCurrentTime(new Date());
//         }, 1000);

//         const lifetimeInterval = setInterval(() => {
//             setLifetimeSeconds((prev) => prev + 1);
//         }, 1000);

//         return () => {
//             clearInterval(timeInterval);
//             clearInterval(lifetimeInterval);
//         };
//     }, []);

//     const formattedTime = currentTime.toLocaleTimeString();
//     const formattedDate = currentTime.toLocaleDateString('en-GB', {  
//         day: 'numeric',  
//         month: 'long',  
//         year: 'numeric'  
//     }).toUpperCase();

// 	const percentage = Math.floor(Math.min(100, (lifetimeSeconds / lifetime) * 100));

//     // Convert seconds to hh:mm:ss format
//     const formatLifetime = (seconds) => {
//         const h = String(Math.floor(seconds / 3600)).padStart(2, '0');
//         const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
//         const s = String(seconds % 60).padStart(2, '0');
//         return `${h}:${m}:${s}`;
//     };

//     return (
//         <div className="home h-[480px] w-[800px] rounded-xl bg-black grid grid-cols-10 grid-rows-10 p-3 gap-3">
//             <div className="bg-[#1D1D1D] col-start-1 col-end-5 row-start-1 row-end-7 rounded-lg p-3 text-[#626262] flex flex-col">
//                 <div className="text-xs font-semibold tracking-wider">CAPACITY</div>
//                 <div className="text-8xl font-bold text-white self-center mt-11">{100 - percentage}%</div>
//                 <div className="transition transition-all ease-in-out duration-700 w-full p-6 rounded border border-white bg-gradient-to-r from-[#B5D411] to-[#FFFB06] mt-8 relative">
//                 	<div className="absolute top-0 left-0 h-full bg-[#1D1D1D] rounded-l" style={{width: `${percentage}%`}}></div>
//                 </div>
//             </div>
			
//             <div className="bg-[#1D1D1D] col-start-1 col-end-5 row-start-7 row-end-10 rounded-lg p-3 text-[#626262] flex flex-col">
//                 <div className="text-xs font-semibold tracking-wider">LIFETIME</div>
//                 <div className="text-5xl font-bold text-white self-center mt-3">{formatLifetime(lifetimeSeconds)}</div>
// 				<div className="text-[10px] font-semibold flex flex-row gap-12 mt-2 self-center">
// 					<div>HRS</div>
// 					<div>MIN</div>
// 					<div>SEC</div>
// 				</div>
//             </div>

//             <div className="bg-[#1D1D1D] col-start-5 col-end-8 row-start-1 row-end-4 rounded-lg p-3 text-[#626262] flex flex-col">
//                 <div className="text-xs font-semibold tracking-wider">CONNECTIONS</div>
// 				<div className="text-5xl font-bold text-white self-center mt-4">100 W</div>
//             </div>

//             <div className="bg-[#1D1D1D] col-start-5 col-end-8 row-start-4 row-end-7 rounded-lg p-3 text-[#626262] flex flex-col">
//                 <div className="text-xs font-semibold tracking-wider">POWER DRAWN</div>
// 				<div className="text-5xl font-bold text-white self-center mt-4">100 W</div>

//             </div>

//             <div className="bg-[#1D1D1D] col-start-5 col-end-8 row-start-7 row-end-10 rounded-lg p-3 text-[#626262] flex flex-col">
//                 <div className="text-xs font-semibold tracking-wider">POWER AVAILABLE</div>
// 				<div className="text-5xl font-bold text-white self-center mt-4">100 W</div>
//             </div>

//             <div className="bg-gradient-to-r from-[#B5D411] via-[#B5D411] via-[#B5D411] to-[#FFFB06] col-start-8 col-end-11 row-start-1 row-end-4 rounded-lg p-3 text-[#626262] flex flex-col justify-center items-center">
// 				<img src={logo} className="h-8 w-auto"/>
//             </div>

// 			<div className="bg-[#1D1D1D] col-start-8 col-end-11 row-start-4 row-end-10 rounded-lg p-3 text-[#626262] flex flex-col h-full">
// 				<div className="text-xs font-semibold tracking-wider">STATISTICS</div>
// 				<div className="flex-1 p-2">
// 					<ScrollableLineChart />
// 				</div>
// 			</div>

//             <div className="col-start-1 col-end-11 row-start-10 row-end-11 rounded-lg px-2 flex flex-col w-full items-center text-white flex flex-row justify-between text-xs font-bold">
//                 <div className="text-[#707070]">{formattedDate}</div>
//                 <div className="text-[#707070]">{formattedTime}</div>
//             </div>
//         </div>
//     );
// }