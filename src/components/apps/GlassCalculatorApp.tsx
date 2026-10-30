import React, { useState } from 'react';
import { Delete } from 'lucide-react';
import { GlassStyleTokens, calculateExpression } from '../../utils/launcherLogic';

interface GlassCalculatorAppProps {
  tokens: GlassStyleTokens;
  onClose: () => void;
}

export const GlassCalculatorApp: React.FC<GlassCalculatorAppProps> = ({ tokens }) => {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');

  const handleInput = (val: string) => {
    if (val === 'C') {
      setExpression('');
      setResult('');
      return;
    }
    if (val === 'DEL') {
      setExpression((prev) => prev.slice(0, -1));
      return;
    }
    if (val === '=') {
      if (!expression) return;
      const res = calculateExpression(expression);
      if (res.error) {
        setResult(res.result);
      } else {
        setResult(res.result);
        setExpression(res.result);
      }
      return;
    }

    // Append operator or digit
    setExpression((prev) => prev + val);
  };

  const buttons = [
    { label: 'C', type: 'func', val: 'C' },
    { label: '(', type: 'func', val: '(' },
    { label: ')', type: 'func', val: ')' },
    { label: '÷', type: 'op', val: '÷' },

    { label: '7', type: 'num', val: '7' },
    { label: '8', type: 'num', val: '8' },
    { label: '9', type: 'num', val: '9' },
    { label: '×', type: 'op', val: '×' },

    { label: '4', type: 'num', val: '4' },
    { label: '5', type: 'num', val: '5' },
    { label: '6', type: 'num', val: '6' },
    { label: '-', type: 'op', val: '-' },

    { label: '1', type: 'num', val: '1' },
    { label: '2', type: 'num', val: '2' },
    { label: '3', type: 'num', val: '3' },
    { label: '+', type: 'op', val: '+' },

    { label: '0', type: 'num', val: '0' },
    { label: '.', type: 'num', val: '.' },
    { label: 'DEL', type: 'func', val: 'DEL' },
    { label: '=', type: 'eq', val: '=' },
  ];

  return (
    <div className="flex flex-col h-full justify-between p-4 select-none">
      {/* Display Screen */}
      <div
        className="w-full min-h-[120px] rounded-3xl p-4 flex flex-col justify-end items-end shadow-inner mb-4 transition-all"
        style={{
          background: tokens.textColor === '#0f172a' ? 'rgba(0, 0, 0, 0.06)' : 'rgba(0, 0, 0, 0.35)',
          border: tokens.border,
        }}
      >
        <div
          className="text-sm font-mono tracking-wider opacity-70 break-all text-right max-h-12 overflow-hidden"
          style={{ color: tokens.subtextColor }}
        >
          {expression || '0'}
        </div>
        <div
          className="text-4xl font-extrabold font-mono tracking-tight text-right mt-1"
          style={{ color: tokens.textColor }}
        >
          {result || expression || '0'}
        </div>
      </div>

      {/* Button Keypad */}
      <div className="grid grid-cols-4 gap-2.5">
        {buttons.map((btn, idx) => {
          let btnBg = 'bg-white/10 hover:bg-white/20 active:scale-95';
          let textColor = tokens.textColor;

          if (btn.type === 'op') {
            btnBg = 'bg-cyan-500/30 hover:bg-cyan-500/50 text-cyan-200 border-cyan-400/40 active:scale-95';
          } else if (btn.type === 'eq') {
            btnBg = 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold shadow-lg active:scale-95';
          } else if (btn.type === 'func') {
            btnBg = 'bg-white/20 hover:bg-white/30 text-amber-200 active:scale-95';
          }

          return (
            <button
              key={idx}
              onClick={() => handleInput(btn.val)}
              className={`
                h-14 rounded-2xl flex items-center justify-center text-lg font-semibold
                border border-white/20 backdrop-blur-md shadow-md cursor-pointer transition-all
                ${btnBg}
              `}
              style={{ color: textColor }}
            >
              {btn.val === 'DEL' ? <Delete className="w-5 h-5" /> : btn.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
