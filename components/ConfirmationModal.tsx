import React, { useState } from 'react';

interface ConfirmationModalProps {
  message: string;
  onConfirm: (reason?: string) => void;
  onCancel: () => void;
  reasonRequired?: boolean;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ message, onConfirm, onCancel, reasonRequired = false }) => {
  const [reason, setReason] = useState('');

  const handleConfirm = () => {
    if (reasonRequired && !reason.trim()) {
      alert('A reason is required to proceed.');
      return;
    }
    onConfirm(reason);
  };
  
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
        <h3 className="text-lg font-bold text-slate-900">Confirm Action</h3>
        <p className="text-slate-600 mt-2 mb-6">{message}</p>
        
        {reasonRequired && (
            <div className="mb-4">
                <label htmlFor="reason" className="block text-sm font-medium text-slate-700 mb-1">Reason for Action</label>
                <textarea
                    id="reason"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-slate-900 focus:ring-fuchsia-600 focus:border-fuchsia-600"
                    placeholder="Please provide a brief reason..."
                    required
                />
            </div>
        )}

        <div className="flex justify-end gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-md font-semibold text-slate-700 bg-slate-200 hover:bg-slate-300 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 rounded-md font-semibold text-white bg-red-600 hover:bg-red-700 transition-colors"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;