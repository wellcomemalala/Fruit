
import React from 'react';

const Header: React.FC = () => {
    return (
        <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white p-8 text-center relative overflow-hidden">
             <div className="absolute inset-0 bg-repeat bg-center opacity-10" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'}}></div>
            <h1 className="text-4xl font-bold mb-2 relative z-10">🍽️ ระบบทำบัญชีร้านอาหาร</h1>
            <p className="text-xl opacity-90 relative z-10">จัดการรายรับรายจ่ายอย่างมีประสิทธิภาพ</p>
        </div>
    );
};

export default Header;
