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
  
      return <p className="mb-4 leading-6 dark:text-gray-200">{children}</p>;
    },
    strong({ children }) {
      return <strong className="font-semibold text-gray-900 dark:text-gray-100">{children}</strong>;
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
    code({ inline, className = "", children, ...props }) {
        const match = /language-(\w+)/.exec(className || "");
        return !inline ? (
          <pre
            className="bg-gray-900 text-gray-100 rounded p-4 overflow-x-auto max-w-full"
            style={{ whiteSpace: "pre", wordBreak: "break-word" }}
          >
            <code className={`language-${match?.[1] ?? ""}`}>{children}</code>
          </pre>
        ) : (
          <code className="bg-gray-200 dark:bg-gray-700 rounded px-1 py-0.5 text-sm font-mono break-words">
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

  return (
    <div className="max-w-5xl mx-auto px-4 py-4">
      <div className="collapse collapse-arrow bg-base-100 border border-base-300 rounded-lg shadow-md w-full">
        <input type="checkbox" id={uniqueId} className="peer hidden" />
        <label
          htmlFor={uniqueId}
          className="collapse-title flex items-center cursor-pointer select-none gap-3 font-semibold text-lg text-gray-800 dark:text-gray-100"
        >
          <span className="text-indigo-600 dark:text-indigo-400 font-mono">Q:</span>
          <span className="flex-1">{question}</span>

          <div className="ml-auto flex items-center gap-2  dark:text-gray-400">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onTogglePin();
              }}
              className="btn btn-ghost btn-sm p-1 rounded-md hover:bg-indigo-100 dark:hover:bg-indigo-700 transition-colors"
              aria-label={isPinned ? "Unpin question" : "Pin question"}
            >
              <div className="tooltip" data-tip={isPinned ? "Unpin question" : "Pin question"}>
                {isPinned ? <LuPinOff size={20} /> : <LuPin size={20} />}
              </div>
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onLearnMore();
              }}
              className="btn btn-ghost btn-sm p-1 rounded-md hover:bg-yellow-100 dark:hover:bg-yellow-700 transition-colors"
              aria-label="Learn more"
            >
              <div className="tooltip" data-tip="Learn More">
                <LuSparkles size={20} className="text-yellow-500" />
              </div>
            </button>
          </div>
        </label>
        <div
  role="region"
  aria-labelledby={uniqueId}
  className="collapse-content prose prose-sm dark:prose-invert max-w-none leading-relaxed text-gray-700 dark:text-gray-300 transition-all duration-300 ease-in-out"
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