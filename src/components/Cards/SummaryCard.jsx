import { getInitials } from "../../utils/helper";

const SummaryCard = ({ role, description, experience, lastUpdated, topicsToFocus, questions, onSelect, onDelete }) => {
  return (
    <div className="relative card w-96 bg-base-100 dark:bg-base-200 border border-base-300 dark:border-base-300 shadow-xl transition-transform hover:scale-105 duration-300" >

      {/* Close (X) Button */}
      <div className="absolute top-2 right-2" >
        <button className="btn btn-square btn-sm btn-ghost hover:bg-error hover:text-white dark:hover:bg-error" onClick={()=>onDelete()}>
          
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Top Section */}
      <div className="p-4 flex items-center gap-4" onClick={()=>onSelect()}>
        <div className="bg-secondary text-secondary-content rounded-lg w-12 h-12 flex items-center justify-center text-xl font-bold">
          {getInitials(role)}
        </div>

        <div>
          <h3 className="text-lg font-bold text-base-content">{role}</h3>
          <p className="text-sm text-base-content">{topicsToFocus}</p>
        </div>
      </div>

      {/* Details */}
      <div className="p-4 space-y-2">
        <div className="flex gap-2 flex-wrap">
          <span className="badge badge-outline text-sm">
            Experience: {experience} 
          </span>
          <span className="badge badge-outline text-sm">
            {questions?.length || 0} Q&A
          </span>
          <span className="badge badge-outline text-sm">
            Last Updated: {lastUpdated}
          </span>
        </div>
        <p className="text-sm text-base-content">
          {description || "Preparing for frontend dev roles"}
        </p>
      </div>
    </div>
  );
};

export default SummaryCard;
