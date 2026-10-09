import React from 'react';
import { Layers, Smartphone, Cpu, Wrench } from 'lucide-react';
import { getDashboardStats } from '../../data/componentsService';

export const StatsSection: React.FC = () => {
  const stats = getDashboardStats();

  const statItems = [
    {
      label: 'Smartphone Brands',
      value: stats.totalBrands,
      suffix: '',
      subtitle: 'Apple, Samsung, Xiaomi & more',
      icon: Smartphone,
      color: 'from-blue-600 to-indigo-600',
      textColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-100'
    },
    {
      label: 'Catalogued Models',
      value: stats.totalModels,
      suffix: '+',
      subtitle: 'Flagship & budget handsets',
      icon: Layers,
      color: 'from-indigo-600 to-purple-600',
      textColor: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      borderColor: 'border-indigo-100'
    },
    {
      label: 'Component Categories',
      value: stats.totalCategories,
      suffix: '',
      subtitle: 'From screens to micro-screws',
      icon: Cpu,
      color: 'from-sky-600 to-blue-600',
      textColor: 'text-sky-600',
      bgColor: 'bg-sky-50',
      borderColor: 'border-sky-100'
    },
    {
      label: 'Spare Parts Catalogued',
      value: stats.totalSparePartsCatalogued.toLocaleString(),
      suffix: '+',
      subtitle: 'Dynamic model-mapped items',
      icon: Wrench,
      color: 'from-emerald-600 to-teal-600',
      textColor: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-100'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {statItems.map((item, idx) => {
        const IconComponent = item.icon;
        return (
          <div
            key={idx}
            className={`p-5 sm:p-6 rounded-2xl bg-white border ${item.borderColor} shadow-xs hover:shadow-md transition-all group hover:-translate-y-0.5`}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                {item.label}
              </span>
              <div className={`w-10 h-10 rounded-xl ${item.bgColor} ${item.textColor} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <IconComponent className="w-5 h-5" />
              </div>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
                {item.value}
              </span>
              {item.suffix && (
                <span className={`text-xl font-bold ${item.textColor}`}>{item.suffix}</span>
              )}
            </div>
            <p className="text-xs text-slate-500 mt-1 font-medium">{item.subtitle}</p>
          </div>
        );
      })}
    </div>
  );
};
