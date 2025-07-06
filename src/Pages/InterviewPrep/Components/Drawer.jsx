import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const markdownComponents = {
  p({ node, children }) {
    const hasBlockChild = node.children.some(
      (child) =>
        child.type === "element" &&
        ["pre", "div", "table", "blockquote", "ul", "ol"].includes(child.tagName)
    );
    return hasBlockChild ? <>{children}</> : (
      <p className="mb-4 leading-6">{children}</p>
    );
  },
  strong({ children }) {
    return <strong className="font-semibold">{children}</strong>;
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
        <pre className="bg-gray-800 dark:bg-gray-900 text-gray-100 rounded-md px-4 py-3 overflow-x-auto text-sm leading-relaxed">
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
    return (
      <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">
        {children}
      </th>
    );
  },
  td({ children }) {
    return (
      <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
        {children}
      </td>
    );
  },
};

const Drawer = ({ title, explaination, onClose }) => {
    return (
      <div className="fixed inset-0 z-50 flex items-stretch">
  <div
    className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
    
  />

  <div className="relative ml-auto w-full sm:w-[500px] lg:w-[640px] max-w-full h-full bg-base-200 text-base-content shadow-2xl border-l border-base-300 p-6 flex flex-col">
    {/* Header */}
    <div className="flex items-center justify-between border-b border-base-300 pb-4 mb-4">
      <h2 className="text-2xl font-bold">{title}</h2>
      
      
    </div>

    {/* Content */}
    <div className="flex-1 overflow-y-auto text-sm leading-relaxed pr-1">
      <ReactMarkdown
        components={markdownComponents}
        remarkPlugins={[remarkGfm]}
      >
        {explaination || "_No explanation provided._"}
      </ReactMarkdown>
    </div>
  </div>
</div>
    );
  };

export default Drawer;
