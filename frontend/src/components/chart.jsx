// ScrollableLineChart.jsx
import React, { useState, useRef, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const ScrollableLineChart = () => {
  // Extended data array for scrolling
  const allData = [
    { x: 0, y: 50 },
    { x: 1, y: 80 },
    { x: 2, y: 40 },
    { x: 3, y: 20 },
    { x: 4, y: 60 },
    { x: 5, y: 40 },
    { x: 6, y: 70 },
    { x: 7, y: 90 },
    { x: 8, y: 50 },
    { x: 9, y: 30 },
    { x: 10, y: 60 },
    { x: 11, y: 50 },
    { x: 12, y: 75 }
  ];

  // State for tracking scroll position
  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 5; // Show 5 data points at a time
  const maxStartIndex = Math.max(0, allData.length - visibleCount);
  
  // Get visible data slice
  const visibleData = allData.slice(startIndex, startIndex + visibleCount + 1);
  
  // Dragging state
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragStartIndex, setDragStartIndex] = useState(0);
  const containerRef = useRef(null);

  // Mouse event handlers
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStartX(e.clientX);
    setDragStartIndex(startIndex);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    const chartWidth = containerRef.current?.offsetWidth || 300;
    const dx = e.clientX - dragStartX;
    const indexChange = Math.round((-dx / chartWidth) * visibleCount);
    
    let newIndex = dragStartIndex + indexChange;
    newIndex = Math.max(0, Math.min(maxStartIndex, newIndex));
    
    setStartIndex(newIndex);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };
  
  // Add global event listeners
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragStartX, dragStartIndex]);

  return (
    <div 
      ref={containerRef}
      className="w-full h-full bg-transparent pt-4"
      style={{ 
        cursor: isDragging ? 'grabbing' : 'grab',
        minHeight: '200px', // Minimum height to ensure the chart is visible
      }}
      onMouseDown={handleMouseDown}
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={visibleData}
          margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
        >
          <CartesianGrid stroke="#444" />
          <XAxis 
            dataKey="x"
            tick={{ fill: '#fff' }}
            axisLine={{ stroke: '#444' }}
            tickLine={{ stroke: '#444' }}
          />
          <YAxis 
            hide={true}
            domain={[0, 100]}
          />
          <Line
            type="monotone"
            dataKey="y"
            stroke="#fff"
            strokeWidth={2}
            dot={{ r: 4, fill: '#fff', stroke: '#fff' }}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ScrollableLineChart;