import React, { useState } from 'react';
import { X, AlertTriangle, CheckCircle, HelpCircle } from 'lucide-react';

interface PhishingSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PhishingSimulatorModal: React.FC<PhishingSimulatorModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [discoveredClues, setDiscoveredClues] = useState<number[]>([]);

  if (!isOpen) return null;

  const clues = [
    {
      id: 1,
      title: 'Adresa expeditorului este falsă',
      detail: 'Expeditorul este „suport-notificari@banca-securizata-cont.xyz” în loc de domeniul oficial al instituției.',
    },
    {
      id: 2,
      title: 'Urgență falsă și amenințare',
      detail: 'Formularea „Contul dvs. va fi blocat definitiv în 6 ore!” mizează pe panică pentru a nu-ți lăsa timp de gândire.',
    },
    {
      id: 3,
      title: 'Formulă de adresare generică',
      detail: 'Începe cu „Stimate Client” sau „Dragă utilizator”, fără să folosească numele tău real asociat contului.',
    },
    {
      id: 4,
      title: 'Link malițios mascat',
      detail: 'Textul butonului spune „Deblochează Contul”, dar adresa ascunsă sub el duce către un site clona `.xyz` creat ieri.',
    },
  ];

  const handleToggleClue = (id: number) => {
    if (!discoveredClues.includes(id)) {
      setDiscoveredClues([...discoveredClues, id]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#17265E]">
                Laborator Interactiv: Detectează Capcana de Phishing
              </h3>
              <p className="text-xs text-slate-500">
                Apasă pe zonele suspecte din emailul de mai jos pentru a descoperi indiciile de fraudă.
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

        {/* Progress */}
        <div className="my-4 flex items-center justify-between text-xs">
          <span className="font-semibold text-slate-600">
            Indicii descoperite: <strong className="text-[#7652D6]">{discoveredClues.length} din {clues.length}</strong>
          </span>
          {discoveredClues.length === clues.length && (
            <span className="text-emerald-700 font-bold flex items-center gap-1">
              <CheckCircle className="w-4 h-4 text-emerald-600" /> Ai găsit toate semnalele de alarmă!
            </span>
          )}
        </div>

        {/* Mock Email Canvas */}
        <div className="rounded-2xl border-2 border-slate-200 overflow-hidden bg-slate-50 shadow-inner">
          {/* Email top bar */}
          <div className="bg-slate-200/80 px-4 py-2.5 border-b border-slate-300 flex items-center justify-between text-xs text-slate-700">
            <span className="font-mono">Mesaj Inbox — Notificare Urgentă</span>
            <span className="text-slate-500">Azi, 08:42</span>
          </div>

          <div className="p-5 sm:p-6 space-y-4 bg-white text-sm text-slate-800">
            {/* Clue 1: Sender */}
            <div
              onClick={() => handleToggleClue(1)}
              className={`p-2.5 rounded-xl border cursor-pointer transition-all ${
                discoveredClues.includes(1)
                  ? 'bg-amber-50 border-amber-300 ring-2 ring-amber-200'
                  : 'bg-slate-50 border-dashed border-slate-300 hover:border-[#7652D6]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500 font-mono">
                  De la: <strong className="text-[#17265E]">Centrul de Securitate</strong> &lt;suport-notificari@banca-securizata-cont.xyz&gt;
                </span>
                <span className="text-[11px] font-semibold text-[#7652D6] flex items-center gap-1">
                  <HelpCircle className="w-3.5 h-3.5" /> Verifică adresa
                </span>
              </div>
            </div>

            {/* Clue 3: Greeting */}
            <div
              onClick={() => handleToggleClue(3)}
              className={`p-2.5 rounded-xl border cursor-pointer transition-all ${
                discoveredClues.includes(3)
                  ? 'bg-amber-50 border-amber-300 ring-2 ring-amber-200'
                  : 'hover:bg-slate-50 border-transparent hover:border-slate-300'
              }`}
            >
              <p className="font-semibold text-slate-900">Stimate Utilizator de Card,</p>
            </div>

            {/* Clue 2: Urgency */}
            <div
              onClick={() => handleToggleClue(2)}
              className={`p-3 rounded-xl border cursor-pointer transition-all ${
                discoveredClues.includes(2)
                  ? 'bg-amber-50 border-amber-300 ring-2 ring-amber-200'
                  : 'hover:bg-slate-50 border-dashed border-slate-200 hover:border-[#7652D6]'
              }`}
            >
              <p className="text-red-600 font-bold mb-1">
                ⚠️ ALERTA DE SECURITATE: Contul tău a fost temporar restricționat din motive de activitate neobișnuită!
              </p>
              <p className="text-slate-700 text-xs leading-relaxed">
                Dacă nu vă confirmați datele bancare și codul secret în următoarele <strong>6 ore</strong>, accesul la fonduri va fi suspendat permanent conform noilor reglementări!
              </p>
            </div>

            {/* Clue 4: Button with fake link */}
            <div
              onClick={() => handleToggleClue(4)}
              className={`p-4 rounded-xl border cursor-pointer text-center transition-all ${
                discoveredClues.includes(4)
                  ? 'bg-amber-50 border-amber-300 ring-2 ring-amber-200'
                  : 'hover:bg-slate-50 border-dashed border-slate-200 hover:border-[#7652D6]'
              }`}
            >
              <div className="inline-block px-6 py-2.5 bg-red-600 text-white font-bold rounded-xl text-xs shadow hover:bg-red-700">
                Deblochează Contul Imediat
              </div>
              <p className="text-[11px] font-mono text-slate-400 mt-2">
                🔗 https://securitate-deblocare-cont-clienti-2026.xyz/login
              </p>
            </div>
          </div>
        </div>

        {/* Revealed Clues List */}
        <div className="mt-5 space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#17265E]">
            Analiză de Securitate
          </h4>
          <div className="space-y-2">
            {clues.map((clue) => {
              const isFound = discoveredClues.includes(clue.id);
              return (
                <div
                  key={clue.id}
                  className={`p-3 rounded-xl border text-xs transition-colors ${
                    isFound
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                      : 'bg-slate-50 border-slate-200 text-slate-400'
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold">
                    {isFound ? (
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-slate-300 shrink-0" />
                    )}
                    <span>{clue.title}</span>
                  </div>
                  {isFound && <p className="mt-1 text-slate-600 pl-6">{clue.detail}</p>}
                </div>
              );
            })}
          </div>
        </div>

        {/* Close CTA */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 text-xs font-semibold text-white bg-[#7652D6] hover:bg-[#6442C4] rounded-xl transition-colors"
          >
            Am înțeles, închide simulatorul
          </button>
        </div>
      </div>
    </div>
  );
};
