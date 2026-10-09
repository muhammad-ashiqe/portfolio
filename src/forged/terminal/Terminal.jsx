import { useEffect, useRef, useState } from "react";
import { usePortfolio } from "../context";
import { execute, complete } from "./commands";
import { ExternalLink } from "../ui";
import { profile } from "../content";
import { palettes, saveAppearance } from "./palettes";
import PropTypes from "prop-types";
function Output({ item }) {
  if (item.kind === "project")
    return (
      <article className="terminal-project">
        <h2>{item.project.title}</h2>
        <p>{item.project.description}</p>
        <p>{item.project.tools.join(" · ")}</p>
        <ExternalLink href={item.project.github}>
          {item.project.github}
        </ExternalLink>
        <ExternalLink href={item.project.demo}>
          {item.project.demo}
        </ExternalLink>
      </article>
    );
  if (item.kind === "link")
    return (
      <p>
        <ExternalLink href={item.href}>{item.text} ↗</ExternalLink>
      </p>
    );
  return <p className="terminal-line">{item.text}</p>;
}
Output.propTypes = { item: PropTypes.object.isRequired };
export default function Terminal() {
  const { switchMode, terminal, setTerminal, setPaletteOpen } = usePortfolio();
  const { session, entries, input } = terminal;
  const inputRef = useRef();
  const endRef = useRef();
  const [historyIndex, setHistoryIndex] = useState(null);
  const draft = useRef("");
  const [announcement, setAnnouncement] = useState("");
  const [newOutput, setNewOutput] = useState(false);
  const follow = useRef(true);
  const suggestions = complete(input, session);
  const suggestion = suggestions[0];
  useEffect(() => {
    if (window.matchMedia("(pointer:fine)").matches) inputRef.current?.focus();
  }, []);
  useEffect(() => {
    if (follow.current) endRef.current?.scrollIntoView({ block: "end" });
    else setNewOutput(true);
  }, [entries]);
  useEffect(() => {
    const scroll = () => {
      follow.current =
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 100;
    };
    window.addEventListener("scroll", scroll, { passive: true });
    return () => window.removeEventListener("scroll", scroll);
  }, []);
  const setInput = (value) =>
    setTerminal((current) => ({ ...current, input: value }));
  function submit(value = input) {
    if (!value.trim()) return;
    const result = execute(value, session);
    if (result.appearance) saveAppearance(result.appearance);
    follow.current =
      window.scrollY + window.innerHeight >=
      document.documentElement.scrollHeight - 150;
    setTerminal((current) => ({
      ...current,
      session: result.state,
      input: "",
      entries:
        result.action === "clear"
          ? []
          : [
              ...current.entries,
              {
                command: value,
                cwd: session.cwd,
                output: result.output,
                error: result.error,
              },
            ],
    }));
    setHistoryIndex(null);
    setAnnouncement(
      result.error
        ? "Command not recognized. Read the output for help."
        : `Command ${value.split(" ")[0]} completed.`,
    );
    if (result.action === "gui") switchMode("visual");
  }
  function keyDown(event) {
    if (event.ctrlKey && event.key.toLowerCase() === "l") {
      event.preventDefault();
      setTerminal((current) => ({ ...current, entries: [] }));
      return;
    }
    if (
      event.key === "Tab" &&
      suggestions.length &&
      suggestion !== input &&
      !event.shiftKey
    ) {
      event.preventDefault();
      setInput(suggestion);
      return;
    }
    if (["ArrowUp", "ArrowDown"].includes(event.key)) {
      event.preventDefault();
      if (!session.history.length) return;
      if (historyIndex === null) draft.current = input;
      const next =
        event.key === "ArrowUp"
          ? Math.max(0, (historyIndex ?? session.history.length) - 1)
          : Math.min(
              session.history.length,
              (historyIndex ?? session.history.length) + 1,
            );
      setHistoryIndex(next === session.history.length ? null : next);
      setInput(
        next === session.history.length ? draft.current : session.history[next],
      );
    }
  }
  return (
    <section
      className={"terminal-page palette-" + session.palette}
      style={{
        "--terminal": palettes.find((p) => p.id === session.palette).color,
      }}
    >
      <header className="terminal-header">
        <span>
          <i className="status-dot" /> ASHIQE SYSTEMS / PERSONAL ARCHIVE
        </span>
        <div>
          <button onClick={() => setPaletteOpen(true)}>⌘ K</button>
          <button onClick={() => switchMode("visual")}>
            Return to visual ↗
          </button>
        </div>
      </header>
      <div
        className="terminal-appearance"
        role="group"
        aria-label="Terminal appearance"
      >
        <span>Appearance</span>
        {palettes.map((p) => (
          <button
            key={p.id}
            aria-pressed={session.palette === p.id}
            onClick={() => {
              saveAppearance(p.id);
              setTerminal((current) => ({
                ...current,
                session: { ...current.session, palette: p.id },
              }));
            }}
          >
            <i style={{ background: p.color }} aria-hidden="true" />
            {p.label}
          </button>
        ))}
      </div>
      <div className="terminal-content">
        <div className="terminal-welcome">
          <span className="terminal-ascii" aria-hidden="true">
            &gt;_
          </span>
          <div>
            <h1>{profile.name}</h1>
            <p>{profile.introduction}</p>
            <p>
              Type <button onClick={() => submit("help")}>help</button> to
              explore. Tab completes. ↑ ↓ recall commands.
            </p>
          </div>
        </div>
        <div
          role="region"
          aria-label="Command output"
          className="terminal-transcript"
        >
          {entries.map((entry, i) => (
            <section
              className={
                entry.error ? "terminal-entry terminal-error" : "terminal-entry"
              }
              key={i}
            >
              <p className="terminal-command">
                <span>
                  ashiqe@portfolio:{entry.cwd.replace("/home/ashiqe", "~")}$
                </span>{" "}
                {entry.command}
              </p>
              {entry.output.map((item, j) => (
                <Output key={j} item={item} />
              ))}
            </section>
          ))}
        </div>
        <div ref={endRef} />
        <form
          className="terminal-prompt"
          onSubmit={(event) => {
            event.preventDefault();
            submit();
          }}
        >
          <label htmlFor="command-input">
            ashiqe@portfolio:{session.cwd.replace("/home/ashiqe", "~")}$
          </label>
          <input
            ref={inputRef}
            id="command-input"
            aria-label="Terminal command"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
            autoComplete="off"
            value={input}
            onChange={(e) => {
              setHistoryIndex(null);
              setInput(e.target.value);
            }}
            onKeyDown={keyDown}
          />
          <button type="submit" aria-label="Run command">
            ↵
          </button>
        </form>
        {input && suggestion && suggestion !== input && (
          <button
            className="terminal-suggestion"
            onClick={() => {
              setInput(suggestion);
              inputRef.current?.focus();
            }}
          >
            Tab → {suggestion}
          </button>
        )}
        <div className="command-chips">
          {["help", "projects", "skills", "experience", "contact", "clear"].map(
            (command) => (
              <button key={command} onClick={() => submit(command)}>
                {command}
              </button>
            ),
          )}
        </div>
        {newOutput && (
          <button
            className="new-output"
            onClick={() => {
              endRef.current?.scrollIntoView();
              setNewOutput(false);
            }}
          >
            New output ↓
          </button>
        )}
        <p role="status" className="sr-only">
          {announcement}
        </p>
      </div>
    </section>
  );
}
