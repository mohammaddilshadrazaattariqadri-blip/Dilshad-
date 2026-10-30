import React, { useState, useEffect } from 'react';
import { Plus, Trash2, CheckCircle2, Circle } from 'lucide-react';
import { GlassStyleTokens } from '../../utils/launcherLogic';

interface NoteItem {
  id: string;
  title: string;
  content: string;
  completed: boolean;
  date: string;
  color: string;
}

interface GlassNotesAppProps {
  tokens: GlassStyleTokens;
  onClose: () => void;
}

export const GlassNotesApp: React.FC<GlassNotesAppProps> = ({ tokens }) => {
  const [notes, setNotes] = useState<NoteItem[]>(() => {
    try {
      const saved = localStorage.getItem('liquid_launcher_notes');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [
      {
        id: '1',
        title: 'Liquid Glass Ideas',
        content: 'Test obsidian black and opal white themes with fluid animations.',
        completed: true,
        date: 'Today',
        color: '#38bdf8',
      },
      {
        id: '2',
        title: 'Android Launcher Features',
        content: 'Check dock blur, app drawer category tabs, and real haptics.',
        completed: false,
        date: 'Oct 30',
        color: '#a855f7',
      },
    ];
  });

  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('liquid_launcher_notes', JSON.stringify(notes));
    } catch {}
  }, [notes]);

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newNote: NoteItem = {
      id: Date.now().toString(),
      title: newTitle.trim(),
      content: newContent.trim(),
      completed: false,
      date: 'Just now',
      color: ['#38bdf8', '#34d399', '#f43f5e', '#a855f7', '#fbbf24'][notes.length % 5],
    };

    setNotes([newNote, ...notes]);
    setNewTitle('');
    setNewContent('');
    setIsAdding(false);
  };

  const toggleComplete = (id: string) => {
    setNotes(notes.map((n) => (n.id === id ? { ...n, completed: !n.completed } : n)));
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter((n) => n.id !== id));
  };

  return (
    <div className="flex flex-col h-full p-4 overflow-y-auto select-none gap-3">
      {/* Header and Add Button */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold tracking-tight" style={{ color: tokens.textColor }}>
            Liquid Notes
          </h2>
          <span className="text-[11px] opacity-70" style={{ color: tokens.subtextColor }}>
            {notes.length} notes saved
          </span>
        </div>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-cyan-500/80 hover:bg-cyan-500 text-white text-xs font-semibold shadow-md active:scale-95 transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Note</span>
        </button>
      </div>

      {/* Add Note Form */}
      {isAdding && (
        <form onSubmit={handleAddNote} className="p-3 rounded-2xl bg-white/10 border border-white/20 flex flex-col gap-2 shadow-lg animate-in fade-in duration-200">
          <input
            type="text"
            placeholder="Note Title..."
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="w-full bg-white/10 px-3 py-1.5 rounded-xl text-xs font-semibold outline-none border border-white/20 placeholder:opacity-50"
            style={{ color: tokens.textColor }}
            autoFocus
          />
          <textarea
            placeholder="Write details or checklist..."
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            rows={2}
            className="w-full bg-white/10 px-3 py-1.5 rounded-xl text-xs outline-none border border-white/20 placeholder:opacity-50 resize-none"
            style={{ color: tokens.textColor }}
          />
          <div className="flex justify-end gap-2 mt-1">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-3 py-1 rounded-lg text-xs opacity-75 hover:opacity-100"
              style={{ color: tokens.textColor }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-1 rounded-lg text-xs font-bold bg-cyan-500 text-white shadow"
            >
              Save Note
            </button>
          </div>
        </form>
      )}

      {/* Notes List */}
      <div className="flex flex-col gap-2 mt-1 flex-1">
        {notes.length === 0 ? (
          <div className="text-center py-12 opacity-60">
            <p className="text-xs">No notes yet. Tap &quot;New Note&quot; to begin!</p>
          </div>
        ) : (
          notes.map((note) => (
            <div
              key={note.id}
              className={`
                p-3 rounded-2xl border transition-all duration-200 flex items-start gap-3 backdrop-blur-md
                ${note.completed ? 'bg-white/5 opacity-60' : 'bg-white/10 hover:bg-white/15'}
              `}
              style={{
                borderColor: 'rgba(255, 255, 255, 0.15)',
                borderLeft: `4px solid ${note.color}`,
              }}
            >
              <button
                onClick={() => toggleComplete(note.id)}
                className="mt-0.5 text-cyan-400 hover:scale-110 transition-transform"
              >
                {note.completed ? <CheckCircle2 className="w-4 h-4 fill-cyan-500 text-slate-900" /> : <Circle className="w-4 h-4" />}
              </button>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3
                    className={`text-xs font-bold truncate ${note.completed ? 'line-through opacity-60' : ''}`}
                    style={{ color: tokens.textColor }}
                  >
                    {note.title}
                  </h3>
                  <span className="text-[10px] opacity-60 ml-2 font-mono">{note.date}</span>
                </div>
                {note.content && (
                  <p
                    className={`text-[11px] mt-1 break-words ${note.completed ? 'line-through opacity-50' : 'opacity-80'}`}
                    style={{ color: tokens.subtextColor }}
                  >
                    {note.content}
                  </p>
                )}
              </div>

              <button
                onClick={() => deleteNote(note.id)}
                className="text-white/40 hover:text-rose-400 p-1 transition-colors"
                title="Delete note"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
