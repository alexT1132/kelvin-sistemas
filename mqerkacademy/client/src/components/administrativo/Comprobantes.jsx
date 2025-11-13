import React, { useState } from 'react';
import { Check } from 'lucide-react';
import PaymentProofs from './PaymentProofs';

const CourseSelector = ({ onCourseSelect, onGroupSelect }) => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);

  const courses = [
    { id: 1, code: 'EEAU', name: 'Enseñanza de Español como Lengua Adicional' },
    { id: 2, code: 'EEAP', name: 'Enseñanza Efectiva en el Aula Presencial' },
    { id: 3, code: 'DIGI', name: 'Digitalización en la Educación' },
    { id: 4, code: 'MIND', name: 'Mindfulness para Educadores' },
    { id: 5, code: 'SPEAK', name: 'Speaking Skills Development' },
    { id: 6, code: 'PCE', name: 'Planificación y Evaluación de Cursos' }
  ];

  // Grupos disponibles por curso (ejemplo - puedes obtenerlos de tu API)
  const courseGroups = {
    'EEAU': [
      { id: 'v1', name: 'V1', count: 6, schedule: 'Vespertino' },
      { id: 'v2', name: 'V2', count: 1, schedule: 'Vespertino' }
    ],
    'EEAP': [
      { id: 'm1', name: 'M1', count: 8, schedule: 'Matutino' },
      { id: 'v1', name: 'V1', count: 5, schedule: 'Vespertino' }
    ],
    'DIGI': [
      { id: 's1', name: 'S1', count: 10, schedule: 'Sabatino' },
      { id: 'v1', name: 'V1', count: 7, schedule: 'Vespertino' }
    ],
    'MIND': [
      { id: 'm1', name: 'M1', count: 4, schedule: 'Matutino' }
    ],
    'SPEAK': [
      { id: 'v1', name: 'V1', count: 9, schedule: 'Vespertino' },
      { id: 's1', name: 'S1', count: 3, schedule: 'Sabatino' }
    ],
    'PCE': [
      { id: 'm1', name: 'M1', count: 6, schedule: 'Matutino' },
      { id: 'v1', name: 'V1', count: 8, schedule: 'Vespertino' },
      { id: 's1', name: 'S1', count: 2, schedule: 'Sabatino' }
    ]
  };

  const handleCourseClick = (course) => {
    setSelectedCourse(course);
    setSelectedGroup(null); // Reset group selection
    if (onCourseSelect) {
      onCourseSelect(course);
    }
  };

  const handleGroupClick = (group) => {
    setSelectedGroup(group);
    if (onGroupSelect) {
      onGroupSelect(group);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center animate-slide-down">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
          Seleccionar Curso para Comprobantes de Pago
        </h1>
        <p className="text-gray-600 text-sm md:text-base">
          Selecciona el curso para gestionar los comprobantes de pago
        </p>
      </div>

      {/* Courses Container */}
      <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 md:p-12 animate-fade-in animation-delay-200">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">
          Cursos Disponibles
        </h2>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {courses.map((course, index) => (
            <button
              key={course.id}
              onClick={() => handleCourseClick(course)}
              className={`
                group relative
                px-6 py-6 rounded-2xl
                font-bold text-lg text-white
                transition-all duration-300
                transform hover:scale-105 hover:-translate-y-1
                shadow-md hover:shadow-xl
                animate-fade-in
                ${selectedCourse?.id === course.id
                  ? 'bg-gradient-to-br from-purple-600 to-purple-700 ring-4 ring-purple-300 ring-offset-2'
                  : 'bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700'
                }
              `}
              style={{ animationDelay: `${index * 100 + 300}ms` }}
            >
              {selectedCourse?.id === course.id && (
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg animate-bounce-in">
                  <Check className="w-5 h-5 text-white" strokeWidth={3} />
                </div>
              )}
              <span className="relative z-10">{course.code}</span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300"></div>
            </button>
          ))}
        </div>
      </div>

      {/* Groups Section */}
      {selectedCourse && courseGroups[selectedCourse.code] && (
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 md:p-12 animate-fade-in">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">
            Grupos Disponibles para {selectedCourse.code}
          </h2>

          <div className="flex flex-wrap justify-center gap-4 mb-6">
            {courseGroups[selectedCourse.code].map((group, index) => (
              <button
                key={group.id}
                onClick={() => handleGroupClick(group)}
                className={`
                  relative px-8 py-6 rounded-2xl
                  font-bold text-lg
                  transition-all duration-300
                  transform hover:scale-105 hover:-translate-y-1
                  shadow-md hover:shadow-xl
                  animate-fade-in
                  ${selectedGroup?.id === group.id
                    ? 'bg-purple-600 text-white border-4 border-purple-500 ring-4 ring-purple-200'
                    : 'bg-white border-2 border-gray-200 text-purple-600 hover:border-purple-400'
                  }
                `}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {selectedGroup?.id === group.id && (
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg animate-bounce-in">
                    <Check className="w-5 h-5 text-white" strokeWidth={3} />
                  </div>
                )}
                <div className="text-center">
                  <div className="text-2xl mb-1">{group.name} ({group.count})</div>
                  {selectedGroup?.id === group.id && (
                    <div className="text-sm text-white/90">Prof. García López</div>
                  )}
                </div>
              </button>
            ))}
          </div>

          <div className="flex flex-wrap justify-center items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
              <span className="text-gray-600">Matutino</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
              <span className="text-gray-600">Vespertino</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-emerald-500 rounded-full"></div>
              <span className="text-gray-600">Sabatino</span>
            </div>
          </div>
        </div>
      )}

      {/* Payment Proofs Section - Only shown when group is selected */}
      {selectedGroup && (
        <PaymentProofs 
          selectedCourse={selectedCourse} 
          selectedGroup={selectedGroup} 
        />
      )}
    </div>
  );
};

export default CourseSelector;