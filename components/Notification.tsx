import React, { useEffect } from 'react';
import { useNotification } from '../context/NotificationContext';

const typeClasses = {
  success: 'bg-green-100 border-green-500 text-green-800',
  error: 'bg-red-100 border-red-500 text-red-800',
  info: 'bg-blue-100 border-blue-500 text-blue-800',
};

const Notification: React.FC<{ id: number; message: string; type: 'success' | 'error' | 'info' }> = ({ id, message, type }) => {
  const { removeNotification } = useNotification();

  useEffect(() => {
    const timer = setTimeout(() => {
      removeNotification(id);
    }, 5000); // Auto-dismiss after 5 seconds

    return () => clearTimeout(timer);
  }, [id, removeNotification]);

  return (
    <div
      className={`relative w-full max-w-sm p-4 border-l-4 rounded-md shadow-lg animate-fade-in-right ${typeClasses[type]}`}
      role="alert"
    >
      <div className="flex">
        <div className="py-1">
           {/* You can add an icon here based on type */}
        </div>
        <div>
          <p className="font-bold">{type.charAt(0).toUpperCase() + type.slice(1)}</p>
          <p className="text-sm">{message}</p>
        </div>
        <button
          onClick={() => removeNotification(id)}
          className="absolute top-1 right-1 text-lg font-bold"
        >
          &times;
        </button>
      </div>
    </div>
  );
};


const NotificationContainer: React.FC = () => {
    const { notifications } = useNotification();

    return (
        <div className="fixed top-5 right-5 z-[100] space-y-2">
            {notifications.map(n => (
                <Notification key={n.id} id={n.id} message={n.message} type={n.type} />
            ))}
        </div>
    );
};

const style = document.createElement('style');
style.innerHTML = `
@keyframes fade-in-right {
  from { opacity: 0; transform: translateX(100%); }
  to { opacity: 1; transform: translateX(0); }
}
.animate-fade-in-right {
  animation: fade-in-right 0.3s ease-out forwards;
}
`;
document.head.appendChild(style);

export default NotificationContainer;