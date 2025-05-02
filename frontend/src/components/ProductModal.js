// import React from 'react';
// import ProductCard from './ProductCard';

// export default function ProductModal({ product, onClose }) {
//   if (!product) return null;

//   return (
//     <div
//       className="fixed top-0 right-0 h-full w-[360px] bg-green-50 shadow-xl z-50 border-l border-green-200 animate-slide-in"
//       style={{ padding: '0.75rem', boxSizing: 'border-box' }}
//     >
//       {/* Close button */}
//       <button
//         onClick={onClose}
//         className="absolute top-1.5 right-2 text-gray-500 hover:text-red-600 text-xl font-bold"
//         aria-label="Close"
//       >
//         ×
//       </button>

//       {/* Title */}
//       <div className="mt-1 mb-2">
//         <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
//           Product Details
//         </h2>
//       </div>

//       {/* Product content */}
//       <ProductCard product={product} />
//     </div>
//   );
// }
import React, { useRef } from 'react';
import Draggable from 'react-draggable';
import ProductCard from './ProductCard';

export default function ProductModal({ product, onClose }) {
  const nodeRef = useRef(null); // ✅ use a real DOM ref

  if (!product) return null;

  return (
    <Draggable handle=".modal-header" nodeRef={nodeRef}>
      <div
        ref={nodeRef}
        style={{
          position: 'fixed',
          top: '100px',
          right: '100px',
          width: '320px',
          backgroundColor: '#e6f4ea',
          boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
          zIndex: 10000,
          borderRadius: '12px',
          padding: '12px',
          fontSize: '0.85rem',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        {/* Header */}
        <div
          className="modal-header"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '8px',
            fontWeight: '600',
            fontSize: '0.75rem',
            color: '#333',
            paddingBottom: '4px',
            borderBottom: '1px solid #cce5d8',
            cursor: 'move',
          }}
        >
          <span>Product Details</span>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '18px',
              color: '#666',
              cursor: 'pointer',
            }}
            aria-label="Close"
          >
            ×
          </button>
        </div>

        {/* Product card */}
        <ProductCard product={product} />
      </div>
    </Draggable>
  );
}
