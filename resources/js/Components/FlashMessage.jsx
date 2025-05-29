import { usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function FlashMessage() {
    const { flash } = usePage().props;

    const [message, setMessage] = useState(null);
    const [type, setType] = useState(null);

    useEffect(() => {
        let timeout;
    
        if (flash.status || flash.success || flash.error || flash.updateMessage || flash.deleteMessage) {
            if (flash.status) {
                setMessage(flash.status);
                setType('status');
            } else if (flash.success) {
                setMessage(flash.success);
                setType('success');
            } else if (flash.error) {
                setMessage(flash.error);
                setType('error');
            } else if (flash.updateMessage) {
                setMessage(flash.updateMessage);
                setType('updateMessage');
            } else if (flash.deleteMessage) {
                setMessage(flash.deleteMessage);
                setType('deleteMessage');
            }
    
            timeout = setTimeout(() => {
                setMessage(null);
                setType(null);
            }, 4000);
        }
    
        return () => clearTimeout(timeout);
    }, [
        flash.status,
        flash.success,
        flash.error,
        flash.updateMessage,
        flash.deleteMessage
    ]);

    if (!message || !type) return null;

    const bgColor = {
        success: 'bg-green-500',
        error: 'bg-red-500',
        status: 'bg-blue-500',
        updateMessage: 'bg-green-500',
        deleteMessage: 'bg-red-500',
    }[type];

    return (
        <div className={`fixed top-4 right-4 text-white px-4 py-2 rounded shadow-lg z-50 ${bgColor}`}>
            {message}
        </div>
    );
}
