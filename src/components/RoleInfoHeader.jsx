

const RoleInfoHeader = ({
  role,
  description,
  experience,
  lastUpdated,
  topicsToFocus,
  questions,
  onSelect,
}) => {
  return (
    <div className="sticky top-16 z-40 mt-10 w-full bg-base-100 dark:bg-base-200 border-b border-base-300 shadow-md">
      <div className="relative px-6 py-5 md:px-12 flex flex-col gap-4">

       

        {/* Header Title and Subtitle */}
        <div>
          <h1 className="text-2xl font-bold text-base-content">{role}</h1>
          {topicsToFocus && (
            <p className="text-sm text-base-content/70 mt-1">{topicsToFocus}</p>
          )}
        </div>

        {/* Badges for Meta Info */}
        <div className="flex flex-wrap gap-3 text-sm">
          <span className="badge badge-outline">
            Experience: {experience} yrs
          </span>
          <span className="badge badge-outline">
            {questions?.length || 0} Q&A
          </span>
          <span className="badge badge-outline">
            Last Updated: {lastUpdated}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-base-content">
          {description || "Preparing for frontend dev roles"}
        </p>
      </div>
    </div>
  );
};

export default RoleInfoHeader;
