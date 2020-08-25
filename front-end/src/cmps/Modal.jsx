import React from 'react'



export function Modal({ children ,  onRemoveModal}) {
    
    return (
        <main>
            <div className="screen">
                <div className="modal">
                    <button className="close-modal-btn" onClick={onRemoveModal}>X</button>
                    <div className="modal-details">
                        {children}
                    </div>
                </div>
            </div>
        </main>
    )
}

