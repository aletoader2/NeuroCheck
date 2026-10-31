import React, { useState } from 'react';
import { KeyRound, Check, X, ShieldAlert, ShieldCheck, Sparkles } from 'lucide-react';

export const InteractivePasswordTester: React.FC = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Criteria calculations
  const lengthValid = password.length >= 12;
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);
  const isPassphrase = password.trim().split(/\s+|-/).length >= 3 && password.length >= 16;

  // Calculate score 0 - 100
  let score = 0;
  if (password.length > 0) {
    if (password.length >= 8) score += 20;
    if (password.length >= 12) score += 20;
    if (password.length >= 16) score += 20;
    if (hasUpper) score += 10;
    if (hasLower) score += 10;
    if (hasNumber) score += 10;
    if (hasSpecial) score += 10;
    if (isPassphrase) score = Math.max(score, 95);
  }
  score = Math.min(score, 100);

  // Crack time estimate text
  const getCrackTime = () => {
    if (!password) return 'Introdu o parolă pentru a simula timpul de decriptare';
    if (password.length < 6) return 'Instantaneu (sub 1 secundă)';
    if (password.length < 8 && !hasSpecial) return 'Câteva secunde prin atac de dicționar';
    if (password.length < 10) return 'Aproximativ 2-15 minute';
    if (score < 60) return 'Câteva ore sau zile';
    if (score < 80) return 'Aproximativ 3 - 5 ani';
    if (isPassphrase || score >= 90) return 'Peste 100.000 de ani (practic imposibil de spart prin forță brută)';
    return 'Peste 50 de ani';
  };

  const getStrengthLabel = () => {
    if (!password) return { label: 'Așteptare introducere', color: 'text-slate-400', barColor: 'bg-slate-200' };
    if (score < 40) return { label: 'Foarte Slabă — Risc Maxim', color: 'text-red-500', barColor: 'bg-red-500' };
    if (score < 70) return { label: 'Medie — Recomandăm îmbunătățire', color: 'text-amber-500', barColor: 'bg-amber-500' };
    if (score < 90) return { label: 'Sigură — Nivel Bun', color: 'text-emerald-500', barColor: 'bg-emerald-500' };
    return { label: 'Excelentă — Fortăreață Digitală', color: 'text-[#7652D6]', barColor: 'bg-[#7652D6]' };
  };

  const strength = getStrengthLabel();

  // Generator of a safe Romanian passphrase
  const generatePassphrase = () => {
    const words = [
      'caiet', 'stea', 'robot', 'lup', 'munte', 'pian', 'galben', 'umbra',
      'cafea', 'racheta', 'ocean', 'castel', 'padure', 'fulger', 'atlas'
    ];
    const picked: string[] = [];
    for (let i = 0; i < 4; i++) {
      const idx = Math.floor(Math.random() * words.length);
      picked.push(words[idx]);
    }
    const num = Math.floor(10 + Math.random() * 90);
    const generated = `${picked.join('-')}-${num}`;
    setPassword(generated);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-[#7652D6]/10 text-[#7652D6] flex items-center justify-center">
              <KeyRound className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-[#17265E]">
              Simulator Interactiv: Cât de rezistentă e parola ta?
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Testarea se execută 100% în browserul tău. Niciun caracter nu este trimis pe internet.
          </p>
        </div>

        <button
          onClick={generatePassphrase}
          className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#7652D6] bg-[#7652D6]/10 hover:bg-[#7652D6]/20 rounded-xl transition-colors shrink-0"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Generează o frază-parolă sigură</span>
        </button>
      </div>

      <div className="mt-6 space-y-4">
        {/* Input */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#17265E] mb-2">
            Introdu o parolă de test (nu folosi parola ta reală)
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="ex: scoala-vara-racheta-42 sau parolaTa123#"
              className="w-full px-4 py-3 text-sm rounded-xl border border-slate-300 focus:border-[#7652D6] focus:ring-2 focus:ring-[#7652D6]/20 transition-all text-[#17265E]"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-500 hover:text-[#17265E] px-2 py-1 rounded"
            >
              {showPassword ? 'Ascunde' : 'Arată'}
            </button>
          </div>
        </div>

        {/* Strength Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-700">Punctaj de rezistență:</span>
            <span className={`font-bold ${strength.color}`}>{strength.label} ({score}/100)</span>
          </div>
          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${strength.barColor}`}
              style={{ width: `${score}%` }}
            />
          </div>
        </div>

        {/* Time to Crack Callout */}
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
          <div className="mt-0.5">
            {score >= 70 ? (
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
            ) : (
              <ShieldAlert className="w-5 h-5 text-amber-500" />
            )}
          </div>
          <div className="text-xs">
            <p className="font-bold text-[#17265E]">Timp estimat de spargere prin forță brută:</p>
            <p className="text-slate-700 mt-0.5 font-medium">{getCrackTime()}</p>
          </div>
        </div>

        {/* Checkpoints */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-xs">
          <div className={`p-2 rounded-lg border flex items-center gap-1.5 ${lengthValid ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-slate-50 border-slate-200 text-slate-500'}`}>
            {lengthValid ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
            <span>Minim 12 caractere</span>
          </div>
          <div className={`p-2 rounded-lg border flex items-center gap-1.5 ${hasUpper && hasLower ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-slate-50 border-slate-200 text-slate-500'}`}>
            {hasUpper && hasLower ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
            <span>Litere mari & mici</span>
          </div>
          <div className={`p-2 rounded-lg border flex items-center gap-1.5 ${hasNumber ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-slate-50 border-slate-200 text-slate-500'}`}>
            {hasNumber ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
            <span>Cifre (0-9)</span>
          </div>
          <div className={`p-2 rounded-lg border flex items-center gap-1.5 ${hasSpecial ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-slate-50 border-slate-200 text-slate-500'}`}>
            {hasSpecial ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
            <span>Simboluri (@#!?)</span>
          </div>
        </div>

        {/* Pro Tip */}
        <div className="pt-2 text-xs text-slate-500 leading-relaxed border-t border-slate-100">
          <span className="font-bold text-[#17265E]">Sfatul NeuroCheck:</span> Parolele lungi formate din 4 cuvinte separate prin cratime (cum ar fi <em>„caiet-lup-ocean-castel-42”</em>) sunt mult mai ușor de ținut minte pentru tine, dar aproape imposibil de ghicit de un calculator!
        </div>
      </div>
    </div>
  );
};
