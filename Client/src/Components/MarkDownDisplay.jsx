/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";

const MarkDownDisplay = ({ message }) => {
  return (
    <h5 className="text-gray-100 bg-gray-600 p-2 rounded-lg max-w-[800px] text-base font-normal leading-snug">
      <ReactMarkdown
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            return !inline && match ? (
              <SyntaxHighlighter
                style={dracula}
                language={match[1]}
                PreTag="div"
                customStyle={{
                  whiteSpace: "pre-wrap",
                  wordWrap: "break-word",
                }}
                {...props}
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {message}
      </ReactMarkdown>
    </h5>
  );
};

export default MarkDownDisplay;
