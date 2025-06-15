import { LuPinOff, LuPin, LuSparkles } from "react-icons/lu";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const markdownComponents = {
    p({ node, children }) {
      // Check if any child of this paragraph is a block-level element
      const hasBlockChild = node.children.some(
        (child) =>
          child.type === "element" &&
          ["pre", "div", "table", "blockquote", "ul", "ol"].includes(child.tagName)
      );
  
      if (hasBlockChild) {
        // Return children as-is without wrapping in <p>
        return <>{children}</>;
      }
  
      return <p className="mb-4 leading-6">{children}</p>;
    },
    strong({ children }) {
      return <strong className="font-semibold text-gray-90 ">{children}</strong>;
    },
    em({ children }) {
      return <em className="italic">{children}</em>;
    },
    ul({ children }) {
      return <ul className="list-disc list-inside mb-4">{children}</ul>;
    },
    ol({ children }) {
      return <ol className="list-decimal pl-6 my-2">{children}</ol>;
    },
    li({ children }) {
      return <li className="mb-1">{children}</li>;
    },
    blockquote({ children }) {
      return (
        <blockquote className="border-l-4 border-indigo-500 pl-4 italic mb-4">
          {children}
        </blockquote>
      );
    },
    code({ inline, className = "", children }) {
      const match = /language-(\w+)/.exec(className || "");
      if (!inline) {
        return (
          <pre
          className="bg-gray-800 dark:bg-gray-900 text-gray-100 rounded-md px-4 py-3 overflow-x-auto text-sm leading-relaxed"
          style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}
        >
            <code className={`language-${match?.[1] ?? ""}`}>{children}</code>
          </pre>
        );
      }
    
      return (
        <code className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded px-1.5 py-0.5 text-[13px] font-mono break-words">
          {children}
        </code>
      );
    },
    
    a({ href, children }) {
      return (
        <a
          href={href}
          className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-600 underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      );
    },
    hr() {
      return <hr className="my-6 border-gray-300 dark:border-gray-700" />;
    },
    table({ children }) {
      return (
        <table className="table-auto border-collapse border border-gray-300 dark:border-gray-700 mb-6">
          {children}
        </table>
      );
    },
    thead({ children }) {
      return <thead className="bg-gray-100 dark:bg-gray-800">{children}</thead>;
    },
    tbody({ children }) {
      return <tbody>{children}</tbody>;
    },
    tr({ children }) {
      return <tr className="border-b border-gray-300 dark:border-gray-700">{children}</tr>;
    },
    th({ children }) {
      return <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">{children}</th>;
    },
    td({ children }) {
      return <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">{children}</td>;
    },
  };

const QuestionCard = ({ question, answer, onLearnMore, isPinned, onTogglePin }) => {
  const uniqueId = `question-checkbox-${Math.random().toString(36).substring(2, 9)}`;
          console.log(isPinned)
  return (
    <div className="max-w-5xl mx-auto px-4 py-4">
      <div className="collapse collapse-arrow bg-base-100 border border-base-300 rounded-lg shadow-md w-full">
        <input type="checkbox" id={uniqueId} className="peer hidden" />
        <label
  htmlFor={uniqueId}
  className="collapse-title flex flex-wrap md:flex-nowrap items-start md:items-center justify-between gap-3 font-semibold text-lg dark:text-gray-100"
>
  <span className="text-indigo-600 dark:text-indigo-400 font-mono">Q:</span>
  <div className="flex-1 break-words whitespace-pre-wrap text-wrap text-left">
    {question}
  </div>

<div
  onClick={(e) => e.stopPropagation()}
  className="ml-4 flex items-center gap-2 shrink-0"
>
  <button
    onClick={onTogglePin}
    className="btn btn-ghost btn-sm p-1 rounded-md hover:bg-indigo-100 dark:hover:bg-indigo-700 transition-colors"
    aria-label={isPinned ? "Unpin question" : "Pin question"}
  >
    <div className="tooltip" data-tip={isPinned ? "Unpin question" : "Pin question"}>
      {isPinned ? <LuPinOff size={20} /> : <LuPin size={20} />}
    </div>
  </button>

  <button
    onClick={onLearnMore}
    className="btn btn-ghost btn-sm p-1 rounded-md hover:bg-yellow-100 dark:hover:bg-yellow-700 transition-colors"
    aria-label="Learn more"
  >
    <div className="tooltip" data-tip="Learn More">
    <label htmlFor="my-drawer-4" className="drawer-button">
    <LuSparkles size={20} className="text-yellow-500" />
      </label>
      
    </div>
  </button>
</div>
        </label>
        <div
  role="region"
  aria-labelledby={uniqueId}
  className="collapse-content prose prose-sm dark:prose-invert max-w-none leading-relaxed dark:text-gray-300 transition-all duration-300 ease-in-out break-words whitespace-pre-wrap max-h-[500px] overflow-y-auto"
>
  <span className="text-indigo-600 dark:text-indigo-400 font-mono mr-1">A:</span>
  <ReactMarkdown components={markdownComponents} remarkPlugins={[remarkGfm]}>
    {answer}
  </ReactMarkdown>
</div>
      </div>
    </div>
  );
};

export default QuestionCard;