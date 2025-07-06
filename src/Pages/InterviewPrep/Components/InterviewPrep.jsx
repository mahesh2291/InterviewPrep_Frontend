import React, { useRef, useState, useEffect } from "react";
import Drawer from "./Drawer";
import Skeleton from "../../../components/Loader/Skeleton";
import DashboardLayout from "../../../components/Layouts/DashboardLayout";
import RoleInfoHeader from "../../../components/RoleInfoHeader";
import QuestionCard from "../../../components/Cards/QuestionCard";
import { API_PATHS } from "../../../utils/apiPaths";
import axiosInstance from "../../../utils/axiosInstance";
import moment from "moment";
import { AnimatePresence, motion } from "framer-motion";
import toast from "react-hot-toast";
import { useParams } from 'react-router-dom';

const InterviewPrep = () => {
  const { sessionId } = useParams();
  const drawerRef = useRef(null);
  const [sessionData, setSessionData] = useState(null);
  const [explaination, setExplaination] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdateLoader, setIsUpdateLoader] = useState(false);
  const [error, setError] = useState("");

  const fetchSessionDetailsById = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.SESSIONS.GET_BY_ID(sessionId));
      if (response.data?.session) {
        setSessionData(response.data.session);
      }
    } catch (error) {
      console.error("Error fetching session details:", error);
      setError("Failed to fetch session data.");
    }
  };

  const generateConceptExplaination = async (question) => {
    try {
      setError("");
      setExplaination(null);
      setIsLoading(true);
      const response = await axiosInstance.post(API_PATHS.AI.GENERATE_EXPLAINATION, {
        question,
      });

      if (response.data) {
        setExplaination(response.data);
        setTimeout(() => {
          if (drawerRef.current) drawerRef.current.checked = true;
        }, 50);
      }
    } catch (error) {
      console.error("Error", error);
      setError("Failed to fetch Explaination, try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleQuestionPinStatus = async (questionId) => {
    try {
      const response = await axiosInstance.post(API_PATHS.TOGGLE_QUESTION.PIN(questionId));
      if (response.data && response.data.question) {
        fetchSessionDetailsById();
      }
    } catch (error) {
      console.error("Error toggling pin status:", error);
    }
  };

  const uploadMoreQuestions = async () => {
    try {
      setIsUpdateLoader(true);
      const aiResponse = await axiosInstance.post(
        API_PATHS.AI.GENERATE_QUESTIONS,
        {
          role: sessionData?.role,
          experience: sessionData?.experience,
          topicsToFocus: sessionData?.topicsToFocus,
          numberOfQuestions: 10,
        },
        { timeout: 90000 }
      );

      const generatedQuestions = aiResponse.data;
      const response = await axiosInstance.post(API_PATHS.QUESTION.ADD_TO_SESSION, {
        sessionId,
        questions: generatedQuestions,
      });

      if (response.data) {
        toast.success("Added More Q&A!!");
        fetchSessionDetailsById();
      }
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsUpdateLoader(false);
    }
  };

  useEffect(() => {
    if (sessionId) {
      fetchSessionDetailsById();
    }
  }, [sessionId]);

  return (
    <DashboardLayout>
      <RoleInfoHeader
        role={sessionData?.role || ""}
        description={sessionData?.description || ""}
        topicsToFocus={sessionData?.topicsToFocus || ""}
        experience={sessionData?.experience || ""}
        questions={sessionData?.questions || ""}
        lastUpdated={
          sessionData?.updatedAt
            ? moment(sessionData.updatedAt).format("Do MMM YYYY")
            : ""
        }
      />

      <div className="container mx-auto pt-4 pb-4 px-4 md:px-0">
        <h2 className="text-lg font-semibold ml-10">Interview Q & A</h2>

        <div className="grid grid-cols-12 gap-4 mt-5 mb-10">
          <div className="col-span-12 md:col-span-8">
            <AnimatePresence>
              {sessionData?.questions?.length ? (
                sessionData.questions.map((data, index) => {
                  const questionId = data?._id || `index-${index}`;
                  const isPinned = !!data?.isPinned;

                  return (
                    <motion.div
                      key={questionId}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{
                        duration: 0.4,
                        type: "spring",
                        stiffness: 100,
                        delay: index * 0.1,
                        damping: 15,
                      }}
                      layout
                      layoutId={`question-${questionId}`}
                    >
                      <QuestionCard
                        question={data?.question || ""}
                        answer={data?.answer || ""}
                        isPinned={isPinned}
                        onLearnMore={() => generateConceptExplaination(data?.question)}
                        onTogglePin={() => toggleQuestionPinStatus(data?._id)}
                      />
                    </motion.div>
                  );
                })
              ) : (
                <p className="text-sm text-gray-500 mt-4">No questions available.</p>
              )}
            </AnimatePresence>

            <div className="flex justify-center mt-4">
              <button className="btn btn-lg btn-success" onClick={uploadMoreQuestions}>
                {isUpdateLoader ? (
                  <span className="loading loading-spinner loading-xl"></span>
                ) : (
                  "Load More Questions"
                )}
              </button>
            </div>
          </div>

          {/* DaisyUI Drawer */}
          <div className="drawer drawer-end">
            <input
              id="my-drawer-4"
              type="checkbox"
              className="drawer-toggle"
              ref={drawerRef}
            />
            <div className="drawer-content"></div>
            <div className="drawer-side">
              <label htmlFor="my-drawer-4" className="drawer-overlay" />
              <ul className="menu bg-base-200 text-gray-800 dark:text-white min-h-full w-[640px] p-4">
                {isLoading ? (
                  <Skeleton />
                ) : (
                  <Drawer
                    title={explaination?.title}
                    explaination={explaination?.explanation}
                    onClose={() => {
                      if (drawerRef.current) drawerRef.current.checked = false;
                    }}
                  />
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default InterviewPrep;
