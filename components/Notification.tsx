
import React, { useEffect, useState } from 'react';
import type { Notification as NotificationType } from '../types';

interface NotificationProps {
    notification: NotificationType | null;
}

const Notification: React.FC<NotificationProps> = ({ notification }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (notification) {
            setVisible(true);
            const timer = setTimeout(() => {
                setVisible(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [notification]);

    if (!notification) return null;

    const baseClasses = 'fixed bottom-5 right-5 p-4 rounded-lg shadow-xl text-white font-semibold transition-all duration-500 transform';
    const variantClasses = {
        success: 'bg-green-500',
        danger: 'bg-red-500',
        warning: 'bg-yellow-500',
    };
    const visibilityClasses = visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5';

    return (
        <div className={`${baseClasses} ${variantClasses[notification.type]} ${visibilityClasses}`}>
            {notification.message}
        </div>
    );
};

export default Notification;
