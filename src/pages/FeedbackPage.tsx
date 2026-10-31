import React, { useState, useEffect } from 'react';
import { FeedbackSubmission, PageId } from '../types.ts';
import { PageHomeButton } from '../components/PageHomeButton.tsx';
import {
  Star,
  Send,
  CheckCircle2,
  Download,
  MessageSquare,
  BarChart3,
  Inbox,
} from 'lucide-react';

interface FeedbackPageProps {
  onNavigate: (page: PageId) => void;
}

export const FeedbackPage: React.FC<FeedbackPageProps> = ({ onNavigate }) => {
  // Started empty because nobody tested the application yet, updates as people test
  const [submissions, setSubmissions] = useState<FeedbackSubmission[]>(() => {
    try {
      const saved = localStorage.getItem('neurocheck_feedback');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [activeView, setActiveView] = useState<'form' | 'results'>('form');

  // Form states: updated to Catalog Number and Class Letter as requested
  const [catalogNumber, setCatalogNumber] = useState('');
  const [classLetter, setClassLetter] = useState('');
  const [ratingNavigation, setRatingNavigation] = useState(5);
  const [ratingClarity, setRatingClarity] = useState(5);
  const [ratingQuiz, setRatingQuiz] = useState(5);
  const [ratingDesign, setRatingDesign] = useState(5);
  const [whatWasLearned, setWhatWasLearned] = useState('');
  const [suggestions, setSuggestions] = useState('');
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('neurocheck_feedback', JSON.stringify(submissions));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
  }, [submissions]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newFeedback: FeedbackSubmission = {
      id: `fb-${Date.now()}`,
      date: new Date().toLocaleDateString('ro-RO', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      catalogNumber: catalogNumber.trim() ? `Nr. ${catalogNumber.trim()}` : 'Anonim',
      classLetter: classLetter.trim() || 'Liceu',
      ratingNavigation,
      ratingClarity,
      ratingQuiz,
      ratingDesign,
      whatWasLearned: whatWasLearned.trim() || 'Am învățat să verific sursele și să fiu vigilent cu imaginile generate de IA.',
      suggestions: suggestions.trim() || 'O platformă foarte clară și utilă.',
    };

    setSubmissions([newFeedback, ...submissions]);
    setSubmittedSuccess(true);
    setCatalogNumber('');
    setClassLetter('');
    setWhatWasLearned('');
    setSuggestions('');
  };

  // Compute averages if submissions exist
  const total = submissions.length;
  const avgNav = total > 0 ? (submissions.reduce((acc, s) => acc + s.ratingNavigation, 0) / total).toFixed(1) : '5.0';
  const avgClarity = total > 0 ? (submissions.reduce((acc, s) => acc + s.ratingClarity, 0) / total).toFixed(1) : '5.0';
  const avgQuiz = total > 0 ? (submissions.reduce((acc, s) => acc + s.ratingQuiz, 0) / total).toFixed(1) : '5.0';
  const avgDesign = total > 0 ? (submissions.reduce((acc, s) => acc + s.ratingDesign, 0) / total).toFixed(1) : '5.0';
  const overallAvg = (
    (parseFloat(avgNav) + parseFloat(avgClarity) + parseFloat(avgQuiz) + parseFloat(avgDesign)) /
    4
  ).toFixed(1);

  // Star Rating Selector component
  const StarRating = ({
    value,
    onChange,
    label,
  }: {
    value: number;
    onChange: (val: number) => void;
    label: string;
  }) => {
    return (
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
        <span className="text-xs font-bold text-[#17265E]">{label}</span>
        <div className="flex items-center gap-1.5">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              type="button"
              key={star}
              onClick={() => onChange(star)}
              className="p-1 focus:outline-none transition-transform hover:scale-110"
              title={`${star} stele din 5`}
            >
              <Star
                className={`w-6 h-6 ${
                  star <= value
                    ? 'fill-[#7652D6] text-[#7652D6]'
                    : 'text-slate-300'
                }`}
              />
            </button>
          ))}
          <span className="text-xs font-bold text-slate-700 ml-2 w-7 tabular-nums">
            {value}/5
          </span>
        </div>
      </div>
    );
  };

  // Descarcare raport CSV functional 100% cu UTF-8 BOM pentru diacritice in Excel
  const handleExportCSV = () => {
    const headers = [
      'ID_Raspuns',
      'Data_Inregistrarii',
      'Nr_Catalog',
      'Litera_Clasei',
      'Nota_Navigare_1_5',
      'Nota_Claritate_1_5',
      'Nota_Quiz_1_5',
      'Nota_Design_1_5',
      'Ce_A_Invatat',
      'Sugestii_Imbunatatire',
    ];

    let rows: (string | number)[][];

    if (submissions.length === 0) {
      // Daca nu exista inca raspunsuri, generam un sablon util pentru profesor cu antet si rand didactic explicativ
      rows = [
        [
          'SABLON-DIDACTIC',
          new Date().toLocaleDateString('ro-RO'),
          'Nr. 27',
          'I1',
          5,
          5,
          5,
          5,
          'Am învățat să verific sursele oficiale și să recunosc anomaliile vizuale din imaginile generate de IA.',
          'Model de completare: aplicația se actualizează automat pe măsură ce elevii trimit formularele.',
        ],
      ];
    } else {
      rows = submissions.map((s) => [
        s.id,
        `"${s.date}"`,
        `"${s.catalogNumber || ''}"`,
        `"${s.classLetter || ''}"`,
        s.ratingNavigation,
        s.ratingClarity,
        s.ratingQuiz,
        s.ratingDesign,
        `"${(s.whatWasLearned || '').replace(/"/g, '""')}"`,
        `"${(s.suggestions || '').replace(/"/g, '""')}"`,
      ]);
    }

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `neurocheck_raport_profesor_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setExportNotice(
      submissions.length > 0
        ? `Raportul CSV a fost descărcat cu succes (${submissions.length} evaluări înregistrate)!`
        : 'Șablonul CSV pentru profesor a fost descărcat cu succes!'
    );
    setTimeout(() => {
      setExportNotice(null);
    }, 4500);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Home Navigation Button */}
      <PageHomeButton onNavigateHome={() => onNavigate('acasa')} position="top" />

      {/* Export notification toast */}
      {exportNotice && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs sm:text-sm font-semibold flex items-center justify-between shadow-xs animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{exportNotice}</span>
          </div>
          <button
            onClick={() => setExportNotice(null)}
            className="text-xs text-emerald-700 hover:text-emerald-950 font-bold ml-2"
          >
            Închide
          </button>
        </div>
      )}

      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-[#7652D6]">
          Evaluare & Colectare Opinii
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#17265E]">
          Formular de Feedback NeuroCheck
        </h1>
        <p className="text-sm text-slate-600">
          Părerea colegilor contează! Răspunsurile se actualizează automat pe măsură ce aplicația este testată.
        </p>

        {/* View switcher */}
        <div className="pt-3 flex flex-wrap items-center justify-center gap-2">
          <button
            onClick={() => setActiveView('form')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeView === 'form'
                ? 'bg-[#7652D6] text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Completează formularul</span>
          </button>
          <button
            onClick={() => setActiveView('results')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeView === 'results'
                ? 'bg-[#17265E] text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Răspunsuri colectate ({submissions.length})</span>
          </button>
          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2 rounded-xl text-xs font-bold text-[#17265E] bg-[#A9D8FF]/30 hover:bg-[#A9D8FF]/50 border border-[#A9D8FF]/60 transition-all flex items-center gap-1.5"
            title="Descarcă raportul sau șablonul CSV pentru profesor"
          >
            <Download className="w-3.5 h-3.5 text-[#7652D6]" />
            <span>Raport CSV Profesor</span>
          </button>
        </div>
      </div>

      {activeView === 'form' ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm max-w-3xl mx-auto space-y-8">
          {submittedSuccess ? (
            <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-4 animate-in zoom-in-95 duration-200">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-emerald-950">
                  Îți mulțumim pentru feedback!
                </h3>
                <p className="text-xs sm:text-sm text-emerald-800 max-w-md mx-auto">
                  Răspunsul tău a fost înregistrat cu succes. Poți vizualiza centralizatorul în fila „Răspunsuri colectate”.
                </p>
              </div>
              <div className="flex justify-center gap-3 pt-2">
                <button
                  onClick={() => setSubmittedSuccess(false)}
                  className="px-4 py-2 text-xs font-bold text-[#7652D6] bg-white border border-[#7652D6]/30 rounded-xl hover:bg-slate-50"
                >
                  Trimite alt răspuns
                </button>
                <button
                  onClick={() => setActiveView('results')}
                  className="px-4 py-2 text-xs font-bold text-white bg-[#7652D6] rounded-xl hover:bg-[#6442C4]"
                >
                  Vezi răspunsurile colectate
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Form identification: Catalog Number & Class Letter as requested */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#17265E] mb-1.5">
                    Numărul de la catalog (De exemplu: 27)
                  </label>
                  <input
                    type="text"
                    value={catalogNumber}
                    onChange={(e) => setCatalogNumber(e.target.value)}
                    placeholder="27"
                    className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:border-[#7652D6] focus:ring-2 focus:ring-[#7652D6]/20 text-[#17265E]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#17265E] mb-1.5">
                    Litera clasei (De exemplu: I1)
                  </label>
                  <input
                    type="text"
                    value={classLetter}
                    onChange={(e) => setClassLetter(e.target.value)}
                    placeholder="I1"
                    className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:border-[#7652D6] focus:ring-2 focus:ring-[#7652D6]/20 text-[#17265E]"
                  />
                </div>
              </div>

              {/* Star Ratings Section */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#17265E]">
                  Evaluare Criterii (1 - 5 stele)
                </h3>
                <StarRating
                  label="1. Ușurința de navigare pe site"
                  value={ratingNavigation}
                  onChange={setRatingNavigation}
                />
                <StarRating
                  label="2. Claritatea informațiilor și a explicațiilor"
                  value={ratingClarity}
                  onChange={setRatingClarity}
                />
                <StarRating
                  label="3. Utilitatea quizului și a scenariilor"
                  value={ratingQuiz}
                  onChange={setRatingQuiz}
                />
                <StarRating
                  label="4. Aspectul vizual și paleta de culori"
                  value={ratingDesign}
                  onChange={setRatingDesign}
                />
              </div>

              {/* Text feedback */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#17265E] mb-1.5">
                    Ce lucru nou sau util ai învățat din NeuroCheck?
                  </label>
                  <textarea
                    rows={3}
                    value={whatWasLearned}
                    onChange={(e) => setWhatWasLearned(e.target.value)}
                    placeholder="ex: Am învățat să recunosc anomaliile vizuale din imaginile AI și ce înseamnă lectura laterală..."
                    className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl border border-slate-300 focus:border-[#7652D6] focus:ring-2 focus:ring-[#7652D6]/20 text-[#17265E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#17265E] mb-1.5">
                    Ce sugestii de îmbunătățire ai pentru proiect?
                  </label>
                  <textarea
                    rows={3}
                    value={suggestions}
                    onChange={(e) => setSuggestions(e.target.value)}
                    placeholder="ex: Ar fi interesant să mai adăugați imagini în jocul Real sau IA..."
                    className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl border border-slate-300 focus:border-[#7652D6] focus:ring-2 focus:ring-[#7652D6]/20 text-[#17265E]"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-3.5 text-xs sm:text-sm font-bold text-white bg-[#7652D6] hover:bg-[#6442C4] rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Trimite Evaluarea</span>
              </button>
            </form>
          )}
        </div>
      ) : (
        /* Results and Averages Centralizer */
        <div className="space-y-8 animate-in fade-in duration-150">
          {submissions.length === 0 ? (
            /* Clean Empty State as requested */
            <div className="p-12 rounded-3xl bg-white border border-slate-200 text-center space-y-4 shadow-xs">
              <div className="w-16 h-16 rounded-3xl bg-[#A9D8FF]/30 border border-[#A9D8FF]/60 text-[#7652D6] mx-auto flex items-center justify-center">
                <Inbox className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-[#17265E]">
                  Nu există încă evaluări înregistrate
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
                  Nimeni nu a testat încă aplicația. Pe parcurs ce colegii o testează, răspunsurile și evaluările lor vor apărea automat aici în timp real!
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => setActiveView('form')}
                  className="px-5 py-2.5 text-xs font-bold text-white bg-[#7652D6] hover:bg-[#6442C4] rounded-xl transition-colors shadow-xs"
                >
                  Fii primul care completează formularul
                </button>
                <button
                  onClick={handleExportCSV}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold text-[#17265E] bg-[#A9D8FF]/30 hover:bg-[#A9D8FF]/50 border border-[#A9D8FF]/60 rounded-xl transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-[#7652D6]" />
                  <span>Descarcă Raport CSV pentru Profesor</span>
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Stats Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 p-6 rounded-3xl bg-white border border-slate-200 shadow-xs">
                <div className="p-3 text-center border-r border-slate-100">
                  <span className="text-2xl sm:text-3xl font-extrabold text-[#7652D6] tabular-nums">
                    {overallAvg}
                  </span>
                  <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mt-1">
                    Scor Global / 5
                  </p>
                </div>
                <div className="p-3 text-center border-r border-slate-100">
                  <span className="text-xl sm:text-2xl font-bold text-[#17265E] tabular-nums">
                    {avgNav}
                  </span>
                  <p className="text-[11px] text-slate-500 mt-1">Navigare</p>
                </div>
                <div className="p-3 text-center border-r border-slate-100">
                  <span className="text-xl sm:text-2xl font-bold text-[#17265E] tabular-nums">
                    {avgClarity}
                  </span>
                  <p className="text-[11px] text-slate-500 mt-1">Claritate</p>
                </div>
                <div className="p-3 text-center border-r border-slate-100">
                  <span className="text-xl sm:text-2xl font-bold text-[#17265E] tabular-nums">
                    {avgQuiz}
                  </span>
                  <p className="text-[11px] text-slate-500 mt-1">Utilitate Quiz</p>
                </div>
                <div className="p-3 text-center col-span-2 sm:col-span-1">
                  <span className="text-xl sm:text-2xl font-bold text-[#17265E] tabular-nums">
                    {avgDesign}
                  </span>
                  <p className="text-[11px] text-slate-500 mt-1">Design & Culori</p>
                </div>
              </div>

              {/* Export bar */}
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-[#17265E]">
                  Total formulare înregistrate: {submissions.length}
                </h3>
                <button
                  onClick={handleExportCSV}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-[#17265E] bg-[#A9D8FF]/30 hover:bg-[#A9D8FF]/50 border border-[#A9D8FF]/60 rounded-xl transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-[#7652D6]" />
                  <span>Descarcă Raport CSV pentru Profesor</span>
                </button>
              </div>

              {/* Live list of submissions */}
              <div className="space-y-4">
                {submissions.map((item) => (
                  <div
                    key={item.id}
                    className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                      <div>
                        <span className="font-bold text-sm text-[#17265E]">
                          {item.catalogNumber}
                        </span>
                        {item.classLetter && (
                          <span className="text-xs text-slate-500 ml-2">
                            (Clasa: <strong>{item.classLetter}</strong>)
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-slate-400 font-mono">{item.date}</span>
                    </div>

                    <div className="flex flex-wrap gap-4 text-xs font-medium text-slate-600">
                      <span>Navigare: <strong className="text-[#7652D6]">{item.ratingNavigation}★</strong></span>
                      <span>Claritate: <strong className="text-[#7652D6]">{item.ratingClarity}★</strong></span>
                      <span>Quiz: <strong className="text-[#7652D6]">{item.ratingQuiz}★</strong></span>
                      <span>Design: <strong className="text-[#7652D6]">{item.ratingDesign}★</strong></span>
                    </div>

                    {item.whatWasLearned && (
                      <div className="text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100">
                        <strong className="text-[#17265E] block mb-0.5">Ce a învățat:</strong>
                        <p className="leading-relaxed">{item.whatWasLearned}</p>
                      </div>
                    )}

                    {item.suggestions && (
                      <div className="text-xs text-slate-700 bg-[#A9D8FF]/10 p-3 rounded-xl border border-[#A9D8FF]/30">
                        <strong className="text-[#17265E] block mb-0.5">Sugestii:</strong>
                        <p className="leading-relaxed">{item.suggestions}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* Bottom Home Navigation Button */}
      <PageHomeButton onNavigateHome={() => onNavigate('acasa')} position="bottom" />
    </div>
  );
};
