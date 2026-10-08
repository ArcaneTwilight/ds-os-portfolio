import React, { useState, useRef, useEffect } from 'react';
import { AppId, WallpaperId } from '../../types/os';
import { DEVELOPER_PROFILE, VIRTUAL_FILES } from '../../data/portfolioData';

interface TerminalAppProps {
  onOpenApp: (appId: AppId) => void;
  onSetWallpaper?: (wp: WallpaperId) => void;
  onExternalLink: (url: string) => void;
}

interface CommandHistoryItem {
  id: string;
  command: string;
  output: React.ReactNode;
}

export const TerminalApp: React.FC<TerminalAppProps> = ({ onOpenApp, onSetWallpaper, onExternalLink }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<CommandHistoryItem[]>([
    {
      id: 'init-1',
      command: 'ds --version',
      output: (
        <div className="text-slate-300">
          DS OS v2.6.4 (x86_64-ds-webos)
          <br />
          Host: WebAssembly Compositor · Architecture: Client-Side React 19
          <br />
          Engineer: Deevann Shrestha · Type <span className="text-emerald-400 font-semibold">help</span> to view available system commands.
        </div>
      )
    }
  ]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [commandList, setCommandList] = useState<string[]>(['ds --version']);

  const bottomRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const rawCmd = input.trim();
    if (!rawCmd) return;

    const parts = rawCmd.split(' ');
    const cmd = parts[0].toLowerCase();
    const arg = parts.slice(1).join(' ').trim();

    setCommandList((prev) => [...prev, rawCmd]);
    setHistoryIndex(-1);

    let output: React.ReactNode = null;

    switch (cmd) {
      case 'help':
        output = (
          <div className="space-y-1 text-slate-300">
            <div className="text-sky-300 font-semibold mb-1">Available System Commands:</div>
            <div><span className="text-emerald-400 font-mono w-28 inline-block">help</span> — Display this manual</div>
            <div><span className="text-emerald-400 font-mono w-28 inline-block">about</span> — Show developer identity and specs</div>
            <div><span className="text-emerald-400 font-mono w-28 inline-block">experience</span> — View career trajectory and roles</div>
            <div><span className="text-emerald-400 font-mono w-28 inline-block">open [app|url]</span> — Launch an app or request an external link (about|projects|experience|resume|customizer|files|personal|walkthrough)</div>
            <div><span className="text-emerald-400 font-mono w-28 inline-block">cat [file]</span> — Print file content (e.g. cat about.txt)</div>
            <div><span className="text-emerald-400 font-mono w-28 inline-block">wallpaper [name]</span> — Change wallpaper (aurora|cyberpunk|deep-space|slate|sunset)</div>
            <div><span className="text-emerald-400 font-mono w-28 inline-block">whoami</span> — Print current active user</div>
            <div><span className="text-emerald-400 font-mono w-28 inline-block">clear</span> — Purge terminal history</div>
          </div>
        );
        break;

      case 'about':
        output = (
          <div className="space-y-1 text-slate-300">
            <div className="text-white font-bold">{DEVELOPER_PROFILE.name}</div>
            <div className="text-sky-400">{DEVELOPER_PROFILE.role}</div>
            <div className="text-slate-400">{DEVELOPER_PROFILE.location} · {DEVELOPER_PROFILE.yearsExperience}</div>
            <p className="mt-2 text-slate-300">{DEVELOPER_PROFILE.tagline}</p>
          </div>
        );
        break;

      case 'experience':
        onOpenApp('experience');
        output = <div className="text-emerald-400">Launching application: experience...</div>;
        break;

      case 'whoami':
        output = <div className="text-slate-200">deevann@ds-os (permissions: read, execute, inspect)</div>;
        break;

      case 'open':
        if (!arg) {
          output = <div className="text-rose-400">Error: Please specify target app. Usage: open &lt;about|projects|experience|resume|customizer|files&gt;</div>;
        } else {
          if (/^https?:\/\//i.test(arg)) {
            onExternalLink(arg);
            output = <div className="text-amber-300">External link confirmation requested: {arg}</div>;
            break;
          }
          const target = arg.toLowerCase() as AppId;
          const validApps: AppId[] = ['about', 'projects', 'experience', 'resume', 'customizer', 'files', 'personal', 'walkthrough'];
          if (validApps.includes(target)) {
            onOpenApp(target);
            output = <div className="text-emerald-400">Launching application: {target}...</div>;
          } else {
            output = <div className="text-rose-400">Application not recognized: {arg}. Type 'help' for options.</div>;
          }
        }
        break;

      case 'cat':
        if (arg === 'about.txt') {
          const file = VIRTUAL_FILES.find((f) => f.name === 'About.txt');
          output = <pre className="font-mono text-xs text-slate-300 whitespace-pre-wrap">{file?.content}</pre>;
        } else if (arg === 'resume.pdf') {
          onOpenApp('resume');
          output = <div className="text-indigo-400">Binary PDF stream detected. Spawning native Resume reader window...</div>;
        } else {
          output = <div className="text-rose-400">File not found: {arg || '[empty]'}. Available files: about.txt, resume.pdf</div>;
        }
        break;

      case 'wallpaper':
        const validWps: WallpaperId[] = ['aurora', 'cyberpunk', 'deep-space', 'slate', 'sunset'];
        if (validWps.includes(arg as WallpaperId) && onSetWallpaper) {
          onSetWallpaper(arg as WallpaperId);
          output = <div className="text-emerald-400">Desktop wallpaper transitioned to: {arg}</div>;
        } else {
          output = <div className="text-rose-400">Invalid wallpaper. Options: {validWps.join(', ')}</div>;
        }
        break;

      case 'clear':
        setHistory([]);
        setInput('');
        return;

      default:
        output = (
          <div className="text-rose-400">
            command not found: {cmd}. Type <span className="text-white underline">help</span> for valid commands.
          </div>
        );
        break;
    }

    setHistory((prev) => [
      ...prev,
      {
        id: `cmd-${Date.now()}`,
        command: rawCmd,
        output
      }
    ]);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandList.length === 0) return;
      const nextIdx = historyIndex === -1 ? commandList.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIdx);
      setInput(commandList[nextIdx]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex === -1) return;
      const nextIdx = historyIndex + 1;
      if (nextIdx >= commandList.length) {
        setHistoryIndex(-1);
        setInput('');
      } else {
        setHistoryIndex(nextIdx);
        setInput(commandList[nextIdx]);
      }
    }
  };

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      className="flex-1 flex flex-col h-full bg-[#0a0c10] p-4 font-mono text-xs text-slate-300 overflow-y-auto cursor-text select-text"
    >
      <div className="space-y-3">
        {history.map((item) => (
          <div key={item.id} className="space-y-1">
            <div className="flex items-center gap-2 text-slate-400">
              <span className="text-emerald-400 font-semibold">deevann@ds-os</span>
              <span className="text-slate-600">:</span>
              <span className="text-sky-400">~</span>
              <span className="text-slate-400">$</span>
              <span className="text-white font-bold">{item.command}</span>
            </div>
            <div className="pl-4">{item.output}</div>
          </div>
        ))}
      </div>

      {/* Input prompt line */}
      <form onSubmit={handleCommand} className="flex items-center gap-2 mt-3">
        <span className="text-emerald-400 font-semibold">deevann@ds-os</span>
        <span className="text-slate-600">:</span>
        <span className="text-sky-400">~</span>
        <span className="text-slate-400">$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent border-none outline-none text-white font-mono text-xs caret-emerald-400"
          autoFocus
          spellCheck={false}
          autoComplete="off"
        />
      </form>

      <div ref={bottomRef} />
    </div>
  );
};
