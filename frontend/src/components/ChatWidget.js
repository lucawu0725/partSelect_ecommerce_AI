// import React, { useState } from 'react';
// import ChatWindow from './ChatWindow';
// import Draggable from 'react-draggable';

// export default function ChatWidget() {
//   const [isOpen, setIsOpen] = useState(true); // default open for testing

//   return (
//     <Draggable>
//       <div className="fixed bottom-6 right-6 z-50">
//         {isOpen ? (
//           <ChatWindow onClose={() => setIsOpen(false)} />
//         ) : (
//           <button
//             onClick={() => setIsOpen(true)}
//             className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-full shadow-xl text-sm font-semibold"
//           >
//             💬 Chat with Us
//           </button>
//         )}
//       </div>
//     </Draggable>
//   );
// }


import React, { useState, useRef } from 'react';
import ChatWindow from './ChatWindow';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(true);
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const widgetRef = useRef(null);

  const handleMouseDown = (e) => {
    const startX = e.clientX;
    const startY = e.clientY;
    const startPos = { ...position };

    const handleMouseMove = (e) => {
      const newX = startPos.x + e.clientX - startX;
      const newY = startPos.y + e.clientY - startY;
      setPosition({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div
      ref={widgetRef}
      onMouseDown={handleMouseDown}
      className="z-50"
      style={{
        position: 'fixed',
        left: position.x,
        top: position.y,
        cursor: 'move',
      }}
    >
      {isOpen ? (
        <ChatWindow onClose={() => setIsOpen(false)} />
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-full shadow-xl text-sm font-semibold"
        >
          💬 Chat with Us
        </button>
      )}
    </div>
  );
}
