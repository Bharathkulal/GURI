"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  PenTool, Brain, Target, ArrowRight, CheckCircle2, XCircle,
  RefreshCw, Code, Zap, ChevronRight, Play, BookOpen, Clock
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// Initial state structures for real integration
const RECENT_PRACTICE = null;
const WEAK_AREAS: any[] = [];
const ROADMAP_MODULES: any[] = [];
const HISTORY: any[] = [];
const QUESTIONS: any[] = [];

export default function PracticeFlow() {
  const [step, setStep] = useState<'home' | 'choose' | 'setup' | 'session' | 'result' | 'review'>('home');
  const [selectedConcept, setSelectedConcept] = useState<string | null>(null);
  const [practiceType, setPracticeType] = useState<string | null>(null);
  const [difficulty, setDifficulty] = useState<string | null>(null);
  
  // Session State
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);
  
  const router = useRouter();

  const handleStartPractice = (concept: string) => {
    setSelectedConcept(concept);
    setStep('setup');
  };

  const submitAnswer = (optionIndex: number) => {
    if (showExplanation) return;
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = optionIndex;
    setAnswers(newAnswers);
    setShowExplanation(true);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowExplanation(false);
    } else {
      setStep('result');
    }
  };

  const resetSession = () => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setShowExplanation(false);
    setStep('session');
  };

  const renderHome = () => {
    const hasData = RECENT_PRACTICE || WEAK_AREAS.length > 0 || HISTORY.length > 0;
    
    if (!hasData) {
      return (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-neutral-800 rounded-2xl"
        >
          <Target size={48} className="text-neutral-600 mb-6" />
          <h2 className="text-xl font-medium text-white mb-2">No practice activity yet.</h2>
          <p className="text-neutral-400 mb-8 max-w-md">Start practicing concepts from your roadmap to see your statistics and history here.</p>
          <button onClick={() => setStep('choose')} className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2.5 rounded-xl font-medium transition-colors flex items-center gap-2">
            <Play size={18} /> Start Practicing
          </button>
        </motion.div>
      );
    }
    
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="space-y-8"
      >
        <div className="flex flex-col md:flex-row gap-6">
          {/* Continue Practice Card */}
          {RECENT_PRACTICE && (
            <div className="flex-1 bg-neutral-900 border border-neutral-800 rounded-2xl p-6 relative overflow-hidden group hover:border-emerald-500/30 transition-all">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl -mr-10 -mt-10"></div>
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-xl font-medium text-white mb-1">Continue Practice</h2>
                  <p className="text-neutral-400 text-sm">Pick up where you left off</p>
                </div>
                <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400">
                  <Play size={20} />
                </div>
              </div>
              
              <div className="bg-neutral-950 rounded-xl p-4 mb-6 border border-neutral-800/50">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-white">{RECENT_PRACTICE.concept}</span>
                  <span className="text-emerald-400 text-sm">{RECENT_PRACTICE.lastScore}%</span>
                </div>
                <p className="text-neutral-400 text-sm">{RECENT_PRACTICE.remaining} questions remaining</p>
              </div>
              
              <button 
                onClick={() => handleStartPractice(RECENT_PRACTICE.concept)}
                className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white py-3 px-4 rounded-xl font-medium transition-all"
              >
                Continue <ArrowRight size={18} />
              </button>
            </div>
          )}

          {/* Action Grid */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button onClick={() => setStep('choose')} className="flex flex-col items-start text-left p-5 bg-neutral-900 border border-neutral-800 rounded-2xl hover:border-neutral-600 transition-all">
              <BookOpen size={24} className="text-neutral-400 mb-4" />
              <span className="font-medium text-white mb-1">Specific Concept</span>
              <span className="text-xs text-neutral-400">Choose from your roadmap</span>
            </button>
            
            <button onClick={() => WEAK_AREAS.length > 0 && handleStartPractice(WEAK_AREAS[0].concept)} className="flex flex-col items-start text-left p-5 bg-neutral-900 border border-neutral-800 rounded-2xl hover:border-rose-500/30 transition-all">
              <Target size={24} className="text-rose-400 mb-4" />
              <span className="font-medium text-white mb-1">Weak Areas</span>
              <span className="text-xs text-neutral-400">Improve low scores</span>
            </button>

            <button onClick={() => handleStartPractice('Random')} className="flex flex-col items-start text-left p-5 bg-neutral-900 border border-neutral-800 rounded-2xl hover:border-neutral-600 transition-all">
              <RefreshCw size={24} className="text-blue-400 mb-4" />
              <span className="font-medium text-white mb-1">Random Practice</span>
              <span className="text-xs text-neutral-400">Mixed concepts test</span>
            </button>

            <button onClick={() => handleStartPractice('Full Module')} className="flex flex-col items-start text-left p-5 bg-neutral-900 border border-neutral-800 rounded-2xl hover:border-neutral-600 transition-all">
              <Brain size={24} className="text-purple-400 mb-4" />
              <span className="font-medium text-white mb-1">Entire Module</span>
              <span className="text-xs text-neutral-400">Comprehensive review</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Weak Areas Section */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
            <h3 className="text-lg font-medium text-white mb-4">Your Weak Areas</h3>
            {WEAK_AREAS.length === 0 ? (
              <div className="text-sm text-neutral-500">No weak areas identified yet.</div>
            ) : (
              <div className="space-y-3">
                {WEAK_AREAS.map((area, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-neutral-950 rounded-lg border border-neutral-800">
                    <span className="text-white">{area.concept}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-rose-400 text-sm font-medium">{area.score}%</span>
                      <button 
                        onClick={() => handleStartPractice(area.concept)}
                        className="text-xs bg-neutral-800 hover:bg-neutral-700 text-white px-3 py-1.5 rounded-md transition-colors"
                      >
                        Practice
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* History Section */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
            <h3 className="text-lg font-medium text-white mb-4">Recent Sessions</h3>
            {HISTORY.length === 0 ? (
              <div className="text-sm text-neutral-500">No recent sessions found.</div>
            ) : (
              <div className="space-y-3">
                {HISTORY.map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 border-b border-neutral-800 last:border-0 pb-3">
                    <div>
                      <div className="text-white font-medium">{item.concept}</div>
                      <div className="text-xs text-neutral-500 mt-1">{item.date}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-emerald-400 font-medium">{item.percent}%</div>
                      <div className="text-xs text-neutral-500 mt-1">{item.score}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    );
  };

  const renderChoose = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-3xl mx-auto"
    >
      <button onClick={() => setStep('home')} className="text-neutral-400 hover:text-white mb-6 flex items-center gap-2 text-sm">
        <ArrowRight size={16} className="rotate-180" /> Back to Practice Home
      </button>

      <h2 className="text-2xl font-serif text-white mb-6">Choose Concept from Roadmap</h2>
      
      <div className="space-y-6">
        {ROADMAP_MODULES.map((module, i) => (
          <div key={i} className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden">
            <div className="bg-neutral-950 p-4 border-b border-neutral-800">
              <h3 className="font-medium text-white">{module.name}</h3>
            </div>
            <div className="p-2">
              {module.topics.map((topic, j) => (
                <button 
                  key={j}
                  onClick={() => topic.status !== 'locked' && handleStartPractice(topic.name)}
                  disabled={topic.status === 'locked'}
                  className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors ${
                    topic.status === 'locked' 
                      ? 'opacity-50 cursor-not-allowed text-neutral-500' 
                      : 'hover:bg-neutral-800 text-neutral-300 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {topic.status === 'learned' && <CheckCircle2 size={16} className="text-emerald-500" />}
                    {topic.status === 'current' && <ArrowRight size={16} className="text-blue-400" />}
                    {topic.status === 'locked' && <div className="w-4 h-4 rounded-full border border-neutral-600" />}
                    <span>{topic.name}</span>
                  </div>
                  {topic.status !== 'locked' && <ChevronRight size={16} className="text-neutral-600" />}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );

  const renderSetup = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="max-w-2xl mx-auto"
    >
      <button onClick={() => setStep('choose')} className="text-neutral-400 hover:text-white mb-8 flex items-center gap-2 text-sm">
        <ArrowRight size={16} className="rotate-180" /> Back
      </button>

      <h2 className="text-3xl font-serif text-white mb-2">{selectedConcept}</h2>
      <p className="text-neutral-400 mb-8">How would you like to practice this concept?</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        <button 
          onClick={() => setPracticeType('quiz')}
          className={`p-6 rounded-2xl border text-left transition-all ${
            practiceType === 'quiz' ? 'bg-emerald-500/10 border-emerald-500' : 'bg-neutral-900 border-neutral-800 hover:border-neutral-600'
          }`}
        >
          <Target size={24} className={`mb-4 ${practiceType === 'quiz' ? 'text-emerald-400' : 'text-neutral-400'}`} />
          <h3 className="font-medium text-white mb-1">Quiz</h3>
          <p className="text-sm text-neutral-500">Test your understanding with questions</p>
        </button>

        <button 
          onClick={() => setPracticeType('coding')}
          className={`p-6 rounded-2xl border text-left transition-all ${
            practiceType === 'coding' ? 'bg-blue-500/10 border-blue-500' : 'bg-neutral-900 border-neutral-800 hover:border-neutral-600'
          }`}
        >
          <Code size={24} className={`mb-4 ${practiceType === 'coding' ? 'text-blue-400' : 'text-neutral-400'}`} />
          <h3 className="font-medium text-white mb-1">Coding</h3>
          <p className="text-sm text-neutral-500">Solve coding challenges</p>
        </button>

        <button 
          onClick={() => setPracticeType('quick')}
          className={`p-6 rounded-2xl border text-left transition-all ${
            practiceType === 'quick' ? 'bg-purple-500/10 border-purple-500' : 'bg-neutral-900 border-neutral-800 hover:border-neutral-600'
          }`}
        >
          <Zap size={24} className={`mb-4 ${practiceType === 'quick' ? 'text-purple-400' : 'text-neutral-400'}`} />
          <h3 className="font-medium text-white mb-1">Quick Test</h3>
          <p className="text-sm text-neutral-500">5 quick questions</p>
        </button>
      </div>

      {practiceType && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h3 className="text-lg font-medium text-white mb-4">Select Difficulty</h3>
          <div className="flex flex-wrap gap-3 mb-8">
            {['Adaptive', 'Beginner', 'Intermediate', 'Advanced'].map(diff => (
              <button
                key={diff}
                onClick={() => setDifficulty(diff)}
                className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  difficulty === diff 
                    ? diff === 'Adaptive' ? 'bg-gradient-to-r from-emerald-600 to-blue-600 text-white border-0' : 'bg-white text-black'
                    : 'bg-neutral-900 border border-neutral-800 text-neutral-300 hover:bg-neutral-800'
                }`}
              >
                {diff} {diff === 'Adaptive' && '✨'}
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {practiceType && difficulty && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-end">
          <button 
            onClick={() => setStep('session')}
            className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-3 rounded-xl font-medium flex items-center gap-2 transition-all"
          >
            Start Practice <ArrowRight size={18} />
          </button>
        </motion.div>
      )}
    </motion.div>
  );

  const renderSession = () => {
    const question = QUESTIONS[currentQuestionIndex];
    const isAnswered = answers[currentQuestionIndex] !== undefined;
    const isCorrect = answers[currentQuestionIndex] === question.correctAnswer;
    const progress = ((currentQuestionIndex) / QUESTIONS.length) * 100;

    return (
      <div className="max-w-3xl mx-auto flex flex-col min-h-[70vh]">
        <div className="flex justify-between items-center mb-6">
          <button onClick={() => setStep('home')} className="text-neutral-500 hover:text-white text-sm">
            Exit
          </button>
          <div className="text-neutral-400 text-sm font-medium">
            Question {currentQuestionIndex + 1} of {QUESTIONS.length}
          </div>
          <div className="flex items-center gap-2 text-neutral-400 text-sm">
            <Clock size={16} /> 04:20
          </div>
        </div>

        <div className="w-full bg-neutral-900 h-1.5 rounded-full mb-10 overflow-hidden">
          <motion.div 
            className="h-full bg-emerald-500 rounded-full"
            initial={{ width: `${((currentQuestionIndex) / QUESTIONS.length) * 100}%` }}
            animate={{ width: `${((currentQuestionIndex + (isAnswered ? 1 : 0)) / QUESTIONS.length) * 100}%` }}
          />
        </div>

        <div className="flex-1">
          <h2 className="text-2xl text-white font-medium mb-8 leading-snug">{question.question}</h2>
          
          <div className="space-y-3">
            {question.options.map((option, idx) => {
              const isSelected = answers[currentQuestionIndex] === idx;
              const isOptionCorrect = idx === question.correctAnswer;
              
              let btnClass = "w-full text-left p-4 rounded-xl border transition-all text-[15px] ";
              if (!showExplanation) {
                btnClass += "bg-neutral-900 border-neutral-800 hover:border-neutral-500 text-neutral-200 hover:bg-neutral-800";
              } else {
                if (isOptionCorrect) {
                  btnClass += "bg-emerald-500/10 border-emerald-500 text-emerald-100";
                } else if (isSelected) {
                  btnClass += "bg-rose-500/10 border-rose-500 text-rose-100";
                } else {
                  btnClass += "bg-neutral-950 border-neutral-900 text-neutral-600 opacity-50";
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => submitAnswer(idx)}
                  disabled={showExplanation}
                  className={btnClass}
                >
                  <div className="flex items-center justify-between">
                    <span>{option}</span>
                    {showExplanation && isOptionCorrect && <CheckCircle2 size={18} className="text-emerald-500" />}
                    {showExplanation && isSelected && !isOptionCorrect && <XCircle size={18} className="text-rose-500" />}
                  </div>
                </button>
              );
            })}
          </div>

          <AnimatePresence>
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-8 p-5 rounded-xl border ${isCorrect ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-rose-500/5 border-rose-500/20'}`}
              >
                <h4 className={`font-medium mb-2 flex items-center gap-2 ${isCorrect ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {isCorrect ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
                  {isCorrect ? 'Correct!' : 'Incorrect'}
                </h4>
                <p className="text-neutral-300 text-sm leading-relaxed">{question.explanation}</p>
                
                {!isCorrect && (
                  <div className="mt-4 pt-4 border-t border-neutral-800/50 flex justify-end">
                    <button className="text-blue-400 text-sm flex items-center gap-1 hover:text-blue-300 transition-colors">
                      <Brain size={14} /> Ask AI Coach
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={nextQuestion}
            disabled={!showExplanation}
            className={`px-8 py-3 rounded-xl font-medium transition-all ${
              showExplanation 
                ? 'bg-white text-black hover:bg-neutral-200' 
                : 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
            }`}
          >
            {currentQuestionIndex < QUESTIONS.length - 1 ? 'Next Question' : 'Finish Practice'}
          </button>
        </div>
      </div>
    );
  };

  const renderResult = () => {
    const correctCount = answers.filter((a, i) => a === QUESTIONS[i].correctAnswer).length;
    const score = Math.round((correctCount / QUESTIONS.length) * 100);

    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto text-center pt-8"
      >
        <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-500/10 rounded-full mb-6">
          <Target size={40} className="text-emerald-500" />
        </div>
        
        <h2 className="text-3xl font-serif text-white mb-2">Practice Complete 🎉</h2>
        <p className="text-neutral-400 mb-8">{selectedConcept}</p>

        <div className="grid grid-cols-3 gap-4 mb-10">
          <div className="bg-neutral-900 border border-neutral-800 p-5 rounded-2xl">
            <div className="text-3xl font-medium text-white mb-1">{score}%</div>
            <div className="text-xs text-neutral-500 uppercase tracking-wider">Score</div>
          </div>
          <div className="bg-neutral-900 border border-neutral-800 p-5 rounded-2xl">
            <div className="text-3xl font-medium text-white mb-1">{correctCount}/{QUESTIONS.length}</div>
            <div className="text-xs text-neutral-500 uppercase tracking-wider">Correct</div>
          </div>
          <div className="bg-neutral-900 border border-neutral-800 p-5 rounded-2xl">
            <div className="text-3xl font-medium text-emerald-400 mb-1">+40</div>
            <div className="text-xs text-neutral-500 uppercase tracking-wider">XP Earned</div>
          </div>
        </div>

        {score < 100 && (
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 text-left mb-8">
            <h3 className="text-lg font-medium text-white mb-4">Needs Practice</h3>
            <div className="flex items-center gap-3 text-rose-400 mb-2">
              <XCircle size={16} /> <span className="text-sm">Function Parameters</span>
            </div>
            <div className="flex items-center gap-3 text-rose-400">
              <XCircle size={16} /> <span className="text-sm">Return Values</span>
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {score < 100 && (
            <button 
              onClick={() => setStep('review')}
              className="px-6 py-3 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl font-medium transition-colors"
            >
              Review Mistakes
            </button>
          )}
          <button 
            onClick={() => {
              setStep('home');
              setAnswers([]);
              setCurrentQuestionIndex(0);
            }}
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-medium transition-colors"
          >
            Back to Practice
          </button>
        </div>
      </motion.div>
    );
  };

  const renderReview = () => (
    <div className="max-w-3xl mx-auto">
      <button onClick={() => setStep('result')} className="text-neutral-400 hover:text-white mb-6 flex items-center gap-2 text-sm">
        <ArrowRight size={16} className="rotate-180" /> Back to Results
      </button>

      <h2 className="text-2xl font-serif text-white mb-6">Review Mistakes</h2>
      
      <div className="space-y-6">
        {QUESTIONS.map((q, i) => {
          if (answers[i] === q.correctAnswer) return null;
          
          return (
            <div key={i} className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
              <div className="text-sm text-neutral-500 mb-3">Question {i + 1}</div>
              <h3 className="text-lg text-white mb-6">{q.question}</h3>
              
              <div className="space-y-3 mb-6">
                <div className="p-3 bg-rose-500/5 border border-rose-500/20 rounded-lg">
                  <div className="text-xs text-rose-400 mb-1">Your answer</div>
                  <div className="text-neutral-300">{q.options[answers[i]]}</div>
                </div>
                <div className="p-3 bg-emerald-500/5 border border-emerald-500/20 rounded-lg">
                  <div className="text-xs text-emerald-400 mb-1">Correct answer</div>
                  <div className="text-neutral-300">{q.options[q.correctAnswer]}</div>
                </div>
              </div>

              <div className="p-4 bg-neutral-950 rounded-lg">
                <div className="text-sm text-neutral-400 mb-1">Explanation</div>
                <p className="text-sm text-neutral-300 leading-relaxed">{q.explanation}</p>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white text-sm rounded-lg transition-colors">
                  Ask AI Coach
                </button>
                <button 
                  onClick={() => resetSession()}
                  className="px-4 py-2 bg-white text-black hover:bg-neutral-200 text-sm rounded-lg transition-colors font-medium"
                >
                  Practice Similar
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {step === 'home' && renderHome()}
          {step === 'choose' && renderChoose()}
          {step === 'setup' && renderSetup()}
          {step === 'session' && renderSession()}
          {step === 'result' && renderResult()}
          {step === 'review' && renderReview()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
