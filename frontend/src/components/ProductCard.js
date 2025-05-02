// import React from "react";

// export default function ProductCard({ product }) {
//     if (!product) return null;

//     return (
//         <div className="border p-3 ronded-lg shadow-md bg-white">
//             <img src={product.image} alt={product.title} className="w-full h-40 object-contain" />
//             <div className="mt-2 font-bold">
//                 {product.title}
//             </div>
//             <div className="text-green-700">
//                 {product.price}
//             </div>
//             <a 
//                 href={product.url}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-blue-500 uderline mt-1 block"
//             >
//                 View Product
//             </a>
//         </div>
//     );
// }
import React from "react";

export default function ProductCard({ product }) {
  if (!product || typeof product !== 'object') return <div className="text-red-600">Invalid product</div>;

  return (
    <div className="border rounded-lg shadow-md bg-white mt-2 p-3 text-sm" style={{ maxWidth: '100%' }}>
      {/* {product.image && (
        <img
          src={product.image}
          alt={product.title || "product image"}
          className="w-full h-40 object-contain rounded mb-2"
        />
      )} */}

      {product.title && (
        <div className="font-semibold text-gray-800 mb-1">{product.title}</div>
      )}

      {product.price && (
        <div className="text-green-700 font-medium mb-1">{product.price}</div>
      )}

      {(product.function || product.info) && (
        <div className="text-gray-700 mb-2">
          {product.function || product.info}
        </div>
      )}

      {product.url && (
        <a
          href={product.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline font-medium"
        >
          View Product →
        </a>
      )}
    </div>
  );
}
