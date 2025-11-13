import React from 'react';
import { X, Download, ExternalLink } from 'lucide-react';

export default function ModalViewer({ isOpen, onClose, fileUrl, studentName }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-4xl rounded-xl shadow-xl relative overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-100">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Visualizador de Comprobante</h2>
            <p className="text-sm text-gray-500">Revisando pago de <strong>{studentName}</strong></p>
          </div>
          <div className="flex gap-2">
            <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 p-2">
              <ExternalLink className="w-5 h-5" />
            </a>
            <a href={fileUrl} download className="text-green-600 hover:text-green-800 p-2">
              <Download className="w-5 h-5" />
            </a>
            <button onClick={onClose} className="text-gray-600 hover:text-red-600 p-2">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Contenido del modal */}
        <div className="p-0">
          <iframe
            src={fileUrl}
            title="Comprobante PDF"
            className="w-full h-[80vh]"
          />
        </div>
      </div>
    </div>
  );
}
