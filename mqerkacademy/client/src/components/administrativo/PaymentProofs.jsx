import React, { useState } from 'react';
import { Clock, CheckCircle, XCircle, Search, Download, FileText, Eye } from 'lucide-react';
import ModalViewer from './ModalComprobante';

const PaymentProofs = ({ selectedCourse, selectedGroup }) => {
  const [activeTab, setActiveTab] = useState('pending'); // pending, approved, rejected
  const [searchTerm, setSearchTerm] = useState('');
  const [editingPayments, setEditingPayments] = useState({}); // Para manejar los valores editables
  const [viewerOpen, setViewerOpen] = useState(false);
  const [selectedProofUrl, setSelectedProofUrl] = useState('');
  const [selectedStudent, setSelectedStudent] = useState('');

  // Inicializar valores editables
  const initializeEditablePayment = (payment) => {
    if (!editingPayments[payment.id]) {
      setEditingPayments(prev => ({
        ...prev,
        [payment.id]: {
          amount: payment.amount || '',
          method: payment.method === 'Método de pago' ? '' : payment.method
        }
      }));
    }
  };

  // Manejar cambios en inputs
  const handleAmountChange = (paymentId, value) => {
    setEditingPayments(prev => ({
      ...prev,
      [paymentId]: {
        ...prev[paymentId],
        amount: value
      }
    }));
  };

  const handleMethodChange = (paymentId, value) => {
    setEditingPayments(prev => ({
      ...prev,
      [paymentId]: {
        ...prev[paymentId],
        method: value
      }
    }));
  };

  // Datos de ejemplo - Reemplazar con datos de tu API
  const groupData = {
    professor: 'García López',
    pendingCount: 1,
    approvedCount: 3,
    rejectedCount: 0
  };

  const payments = {
    pending: [
      {
        id: 1,
        folio: 'MEEAU26-0010',
        studentName: 'martin Ramirez',
        date: '6/11/2025, 2:35:39 p.m.',
        amount: 0.00,
        method: 'Método de pago',
        amountStatus: 'Requerido',
        methodStatus: 'Requerido',
        proofUrl: '#'
      }
    ],
    approved: [
      {
        id: 2,
        folio: 'MEEAU26-0003',
        studentName: 'Jessica Fernandez',
        date: '11/8/2025, 1:50:53 p.m.',
        amount: 1200.00,
        method: 'efectivo',
        approvalDate: '11/8/2025, 1:50:53 p.m.',
        proofUrl: '#'
      },
      {
        id: 3,
        folio: 'MEEAU26-0005',
        studentName: 'Gerardo Arcilla',
        date: '12/8/2025, 1:55:27 p.m.',
        amount: 10500.00,
        method: 'efectivo',
        approvalDate: '12/8/2025, 1:55:27 p.m.',
        proofUrl: '#'
      },
      {
        id: 4,
        folio: 'MEEAU26-0007',
        studentName: 'Juan Perez Del Rio',
        date: '21/8/2025, 12:19:53 p.m.',
        amount: 10500.00,
        method: 'efectivo',
        approvalDate: '21/8/2025, 12:19:53 p.m.',
        proofUrl: '#'
      }
    ],
    rejected: []
  };

  const tabs = [
    {
      id: 'pending',
      label: 'Pendientes',
      count: groupData.pendingCount,
      icon: Clock,
      color: 'orange',
      activeColor: 'bg-amber-500',
      textColor: 'text-amber-600',
      borderColor: 'border-amber-500'
    },
    {
      id: 'approved',
      label: 'Aprobados',
      count: groupData.approvedCount,
      icon: CheckCircle,
      color: 'green',
      activeColor: 'bg-green-500',
      textColor: 'text-green-600',
      borderColor: 'border-green-500'
    },
    {
      id: 'rejected',
      label: 'Rechazados',
      count: groupData.rejectedCount,
      icon: XCircle,
      color: 'red',
      activeColor: 'bg-red-500',
      textColor: 'text-red-600',
      borderColor: 'border-red-500'
    }
  ];

  const currentPayments = payments[activeTab].filter(payment =>
    payment.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.folio.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTableHeaders = () => {
    const commonHeaders = ['FOLIO', 'NOMBRE DEL ALUMNO', 'FECHA Y HORA', 'IMPORTE', 'MÉTODO'];
    
    if (activeTab === 'pending') {
      return [...commonHeaders, 'COMPROBANTE', 'ACCIONES'];
    } else if (activeTab === 'approved') {
      return [...commonHeaders, 'FECHA APROBACIÓN', 'COMPROBANTE'];
    } else {
      return [...commonHeaders, 'MOTIVO RECHAZO', 'FECHA RECHAZO', 'COMPROBANTE'];
    }
  };

  const getTableColor = () => {
    switch (activeTab) {
      case 'pending':
        return 'bg-gray-800';
      case 'approved':
        return 'bg-green-600';
      case 'rejected':
        return 'bg-red-600';
      default:
        return 'bg-gray-800';
    }
  };

  const handleApprove = (paymentId) => {
    const editedData = editingPayments[paymentId];
    console.log('Aprobar pago:', {
      paymentId,
      amount: editedData?.amount,
      method: editedData?.method
    });
    // Aquí iría tu lógica para aprobar el pago con los valores editados
  };

  const handleReject = (paymentId) => {
    console.log('Rechazar pago:', paymentId);
    // Aquí iría tu lógica para rechazar el pago
  };

  const EmptyState = ({ type }) => {
    const config = {
      pending: {
        icon: FileText,
        iconColor: 'text-gray-400',
        bgColor: 'bg-gray-100',
        title: 'No hay comprobantes pendientes',
        description: 'Los comprobantes aparecerán aquí cuando estén disponibles para validación'
      },
      approved: {
        icon: FileText,
        iconColor: 'text-green-400',
        bgColor: 'bg-green-100',
        title: 'No hay comprobantes aprobados',
        description: 'Los comprobantes aprobados aparecerán aquí'
      },
      rejected: {
        icon: FileText,
        iconColor: 'text-red-400',
        bgColor: 'bg-red-100',
        title: 'No hay comprobantes rechazados',
        description: 'Los comprobantes rechazados aparecerán aquí'
      }
    };

    const { icon: Icon, iconColor, bgColor, title, description } = config[type];

    return (
      <div className="flex flex-col items-center justify-center py-16 animate-fade-in">
        <div className={`w-20 h-20 ${bgColor} rounded-full flex items-center justify-center mb-4`}>
          <Icon className={`w-10 h-10 ${iconColor}`} />
        </div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">{title}</h3>
        <p className="text-gray-500 text-sm text-center max-w-md">{description}</p>
      </div>
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Group Info Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 md:p-8 text-white shadow-lg animate-slide-down">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">
          Grupo Activo: {selectedCourse?.code} - {selectedGroup?.name}
        </h2>
        <p className="text-blue-100">
          Profesor Asignado: <span className="font-semibold">{groupData.professor}</span>
        </p>
      </div>

      {/* Status Tabs */}
      <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 animate-fade-in animation-delay-200">
        <div className="flex flex-wrap justify-center gap-3">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center gap-2 px-6 py-3 rounded-xl
                  font-semibold text-sm md:text-base
                  transition-all duration-300 transform
                  ${isActive
                    ? `${tab.activeColor} text-white shadow-lg scale-105`
                    : `bg-gray-100 ${tab.textColor} hover:bg-gray-200`
                  }
                `}
              >
                <Icon className="w-5 h-5" />
                <span>{tab.label} ({tab.count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Payment Table Section */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden animate-fade-in animation-delay-300">
        {/* Table Header */}
        <div className="p-6 border-b border-gray-200 bg-gray-50">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h3 className="text-xl md:text-2xl font-bold text-gray-800">
              Comprobantes {tabs.find(t => t.id === activeTab)?.label} - {selectedCourse?.code} {selectedGroup?.name}
            </h3>

            {/* Search and Export - Only for approved */}
            {activeTab === 'approved' && currentPayments.length > 0 && (
              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <div className="relative flex-1 md:w-96">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Buscar en aprobados: nombre, folio, correo, método..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <button className="flex items-center justify-center gap-2 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-semibold shadow-md hover:shadow-lg">
                  <Download className="w-5 h-5" />
                  <span>Exportar Excel</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Table Content */}
        {currentPayments.length === 0 ? (
          <EmptyState type={activeTab} />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className={`${getTableColor()} text-white`}>
                <tr>
                  {getTableHeaders().map((header, index) => (
                    <th key={index} className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider whitespace-nowrap">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentPayments.map((payment, index) => (
                  <tr 
                    key={payment.id} 
                    className="hover:bg-gray-50 transition-colors animate-fade-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {/* Folio */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-semibold text-blue-600 hover:text-blue-700 cursor-pointer">
                        {payment.folio}
                      </span>
                    </td>

                    {/* Nombre */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900">
                        {payment.studentName}
                      </span>
                    </td>

                    {/* Fecha y Hora */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-600">
                        {payment.date}
                      </span>
                    </td>

                    {/* Importe */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col items-start">
                        <input
                          type="number"
                          step="0.01"
                          min="0"
                          value={editingPayments[payment.id]?.amount ?? payment.amount}
                          onChange={(e) => handleAmountChange(payment.id, e.target.value)}
                          onFocus={() => initializeEditablePayment(payment)}
                          placeholder="0.00"
                          className={`text-sm font-semibold px-3 py-2 w-32 rounded-md
                            focus:outline-none focus:ring-2 transition-all duration-200
                            ${editingPayments[payment.id]?.amount && parseFloat(editingPayments[payment.id].amount) > 0
                              ? 'border-blue-500 focus:ring-blue-500 bg-white text-gray-800 placeholder-gray-400'
                              : 'border-red-300 focus:ring-red-400 bg-red-50 text-red-600 placeholder-red-400'
                            }
                          `}
                        />
                        {(!editingPayments[payment.id]?.amount || parseFloat(editingPayments[payment.id]?.amount) === 0) && (
                          <span className="text-xs text-red-600 mt-1 font-medium">Requerido</span>
                        )}
                      </div>
                    </td>

                    {/* Método */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col items-start">
                        <input
                          type="text"
                          value={editingPayments[payment.id]?.method ?? (payment.method === 'Método de pago' ? '' : payment.method)}
                          onChange={(e) => handleMethodChange(payment.id, e.target.value)}
                          onFocus={() => initializeEditablePayment(payment)}
                          placeholder="Método de pago"
                          className={`text-sm px-3 py-2 w-44 rounded-md
                            focus:outline-none focus:ring-2 transition-all duration-200
                            ${editingPayments[payment.id]?.method
                              ? 'border-blue-500 focus:ring-blue-500 bg-white text-gray-800 placeholder-gray-400'
                              : 'border-red-300 focus:ring-red-400 bg-red-50 text-red-600 placeholder-red-400'
                            }
                          `}
                        />
                        {!editingPayments[payment.id]?.method && (
                          <span className="text-xs text-red-600 mt-1 font-medium">Requerido</span>
                        )}
                      </div>
                    </td>

                    {/* Fecha de Aprobación (solo para aprobados) */}
                    {activeTab === 'approved' && (
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-green-600 font-medium">
                          {payment.approvalDate}
                        </span>
                      </td>
                    )}

                    {/* Comprobante */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button 
                        className="text-blue-600 hover:text-blue-800 font-medium text-sm hover:underline flex items-center gap-1 transition-colors"
                        onClick={() => {
                          setSelectedProofUrl(payment.proofUrl);
                          setSelectedStudent(payment.studentName);
                          setViewerOpen(true);
                        }}
                      >
                        <Eye className="w-4 h-4" />
                        Ver comprobante
                      </button>
                    </td>

                    {/* Acciones (solo para pendientes) */}
                    {activeTab === 'pending' && (
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleReject(payment.id)}
                            className="px-4 py-2 bg-red-500 text-white text-sm font-bold rounded-lg hover:bg-red-600 transition-colors shadow-md hover:shadow-lg"
                          >
                            RECHAZAR
                          </button>
                          <button
                            onClick={() => handleApprove(payment.id)}
                            className="px-4 py-2 bg-green-500 text-white text-sm font-bold rounded-lg hover:bg-green-600 transition-colors shadow-md hover:shadow-lg"
                          >
                            VALIDAR
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <ModalViewer
          isOpen={viewerOpen}
          onClose={() => setViewerOpen(false)}
          fileUrl={selectedProofUrl}
          studentName={selectedStudent}
        />

      </div>

      {/* Estilos de animación */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }

        .animate-slide-down {
          animation: slide-down 0.6s ease-out;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
        }

        .animation-delay-300 {
          animation-delay: 0.3s;
        }
      `}</style>
    </div>
  );
};

export default PaymentProofs;