
import React, { useState } from 'react';
import { MessageBox } from 'react-chat-elements';
import 'react-chat-elements/dist/main.css';
import ProductModal from './ProductModal';

export default function MessageList({ messages, isTyping = false }) {
  const [modalProduct, setModalProduct] = useState(null);

  return (
    <div style={{ maxHeight: '100%', overflowY: 'auto', padding: '1rem' }}>
      {messages.map((msg, index) => {
        const isUser = msg.from === 'user';

        return (
          <div key={index}>
            <MessageBox
              position={isUser ? 'right' : 'left'}
              type="text"
              text={msg.text}
              date={new Date()}
              title={isUser ? 'You' : 'PartSelect AI'}
              avatar={
                isUser
                  ? undefined
                  : 'https://cdn-icons-png.flaticon.com/512/4712/4712033.png'
              }
            />

            {!isUser && msg.product && (
              <div style={{ marginLeft: '55px', marginTop: '0.5rem' }}>
                <button
                  onClick={() => setModalProduct(msg.product)}
                  style={{
                    backgroundColor: '#007bff',
                    color: 'white',
                    padding: '5px 12px',
                    borderRadius: '6px',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                  }}
                >
                  Show Product Info
                </button>
              </div>
            )}
          </div>
        );
      })}

      {isTyping && (
        <MessageBox
          position="left"
          type="text"
          text="Typing..."
          title="PartSelect AI"
          date={new Date()}
          avatar="https://cdn-icons-png.flaticon.com/512/4712/4712033.png"
        />
      )}

      {modalProduct && (
        <ProductModal
          product={modalProduct}
          onClose={() => setModalProduct(null)}
        />
      )}
    </div>
  );
}
