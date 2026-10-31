import React, { useState } from 'react';
import { X, CheckSquare, Square, ShieldCheck, AlertCircle } from 'lucide-react';

interface VerificationChecklistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VerificationChecklistModal: React.FC<VerificationChecklistModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [headline, setHeadline] = useState('');
  const [checks, setChecks] = useState<Record<string, boolean>>({
    source: false,
    authorDate: false,
    evidence: false,
    lateral: false,
    visuals: false,
  });

  if (!isOpen) return null;

  const toggleCheck = (key: string) => {
    setChecks((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const countChecked = Object.values(checks).filter(Boolean).length;
  const percentage = Math.round((countChecked / 5) * 100);

  const getVerdict = () => {
    if (countChecked <= 1) {
      return {
        label: 'Risc Ridicat de Dezinformare',
        color: 'text-red-700 bg-red-50 border-red-200',
        advice: 'Informația nu trece filtrele de bază. Nu o distribui și trateaz-o ca neverificată.',
      };
    }
    if (countChecked <= 3) {
      return {
        label: 'Incertitudine — Dovezi Insuficiente',
        color: 'text-amber-800 bg-amber-50 border-amber-200',
        advice: 'Ai bifat doar o parte din criterii. Deschide surse independente de fact-checking înainte de a crede afirmația.',
      };
    }
    return {
      label: 'Nivel Bun de Verificabilitate',
      color: 'text-emerald-800 bg-emerald-50 border-emerald-200',
      advice: 'Informația are surse clare, autor identificabil și confirmare laterală. Poate fi considerată de încredere.',
    };
  };

  const verdict = getVerdict();

  const criteria = [
    {
      key: 'source',
      title: '1. Sursă Asumată & Domeniu Credibil',
      desc: 'Site-ul are o pagină clară de redacție/contact și o adresă web legitimă (fără extensii bizare).',
    },
    {
      key: 'authorDate',
      title: '2. Autor Real & Dată Recentă Identificabilă',
      desc: 'Articolul are un autor jurnalist/expert verificat și nu este o știre veche recirculată („zombie news”).',
    },
    {
      key: 'evidence',
      title: '3. Dovezi Primare & Citate Reale',
      desc: 'Există linkuri directe către studii, statistici oficiale (INS, OMS) sau înregistrări fără trunchieri.',
    },
    {
      key: 'lateral',
      title: '4. Confirmare Laterală (Cel puțin 2 alte surse)',
      desc: 'Evenimentul este relatat și de alte publicații de încredere sau agenții de presă independente.',
    },
    {
      key: 'visuals',
      title: '5. Imagini Autentice (Fără anomalii IA)',
      desc: 'Fotografiile au trecut căutarea inversă (Google Lens) și nu prezintă detalii anatomice topite sau ilogice.',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-8">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#7652D6]/10 text-[#7652D6] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#17265E]">
                Verificatorul Tău Pas cu Pas
              </h3>
              <p className="text-xs text-slate-500">
                Testează orice știre sau mesaj viral folosind cele 5 criterii de verificare.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Input claim */}
        <div className="mt-5 space-y-2">
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#17265E]">
            Titlul știrii sau afirmația pe care o analizezi (opțional)
          </label>
          <input
            type="text"
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
            placeholder="ex: Se oferă laptopuri gratuite tuturor elevilor..."
            className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:border-[#7652D6] focus:ring-2 focus:ring-[#7652D6]/20 text-[#17265E]"
          />
        </div>

        {/* Criteria checkboxes */}
        <div className="mt-6 space-y-3">
          <p className="text-xs font-bold uppercase tracking-wider text-[#17265E]">
            Bifează criteriile pe care le îndeplinește știrea:
          </p>
          {criteria.map((item) => {
            const isChecked = checks[item.key];
            return (
              <div
                key={item.key}
                onClick={() => toggleCheck(item.key)}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                  isChecked
                    ? 'bg-[#A9D8FF]/20 border-[#7652D6]/40 shadow-xs'
                    : 'bg-slate-50 border-slate-200 hover:bg-slate-100/60'
                }`}
              >
                <div className="mt-0.5 text-[#7652D6]">
                  {isChecked ? (
                    <CheckSquare className="w-5 h-5 fill-[#7652D6] text-white" />
                  ) : (
                    <Square className="w-5 h-5 text-slate-400" />
                  )}
                </div>
                <div>
                  <p className="text-xs font-bold text-[#17265E]">{item.title}</p>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Score & Diagnosis */}
        <div className="mt-6 p-4 rounded-2xl border bg-slate-50 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-700">Scor de Credibilitate:</span>
            <span className="font-bold text-[#7652D6]">{percentage}% ({countChecked}/5 criterii)</span>
          </div>
          <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#7652D6] transition-all duration-300"
              style={{ width: `${percentage}%` }}
            />
          </div>

          <div className={`p-3 rounded-xl border flex items-start gap-2.5 ${verdict.color}`}>
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <div className="text-xs">
              <p className="font-bold">{verdict.label}</p>
              <p className="mt-0.5 leading-relaxed">{verdict.advice}</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
          <button
            onClick={() =>
              setChecks({
                source: false,
                authorDate: false,
                evidence: false,
                lateral: false,
                visuals: false,
              })
            }
            className="text-xs text-slate-500 hover:text-slate-800 underline"
          >
            Resetează criteriile
          </button>
          <button
            onClick={onClose}
            className="px-5 py-2.5 text-xs font-semibold text-white bg-[#7652D6] hover:bg-[#6442C4] rounded-xl transition-colors"
          >
            Finalizează evaluarea
          </button>
        </div>
      </div>
    </div>
  );
};
