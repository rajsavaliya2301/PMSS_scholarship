import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Card from "../components/Card";  // Corrected import
import { CheckCircle, XCircle } from "lucide-react";
import Header from "./Header";
import Footer from "./Footer";
const stages = [
  "Apply",
  "sag_officer_verification",
  "finance_officer_verification",
  "Payment_Done",
];

const Track = () => {
  const [status, setStatus] = useState({});
  const [errorMessages, setErrorMessages] = useState({});
  const studentId = localStorage.getItem('studentId');

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/student-apply/progress/${studentId}`);
        const data = await response.json();

        if (response.status === 404) {
          setStatus(null);
        } else {
          setStatus(data);
          // Assuming the API sends specific error messages for each stage, we map those to errorMessages
          let errors='' 
          stages.forEach((stage) => {
            const stageKey = stage.toLowerCase().replace(/\s+/g, '_');
            if (data[stageKey] === 'error') {
                errors= data.errorMessage || `Error in ${stage}`;
            }
          });
          setErrorMessages(errors);
        }
      } catch (error) {
        console.error("Error fetching progress:", error);
      }
    };

    fetchProgress();
  }, [studentId]);

  return (
    <>
    <Header />
    <div className="flex flex-col items-center p-6 space-y-6 w-full">
      {status ? (
        stages.map((stage, index) => {
          const stageKey = stage.toLowerCase().replace(/\s+/g, '_');
          const isCompleted = status[stageKey] === "completed";
          const isError = status[stageKey] === "error";
          const errorMessage = errorMessages;

          return (
            <Card key={index} className="w-full max-w-md p-4 flex flex-col items-center border relative">
              <div className="flex items-center space-x-3">
                {isCompleted ? (
                  <CheckCircle className="text-green-500" size={24} />
                ) : isError ? (
                  <XCircle className="text-red-500" size={24} />
                ) : (
                  <div className="w-6 h-6 border-2 border-gray-400 rounded-full" />
                )}
                <span className="text-lg font-semibold">{stage}</span>
              </div>
              
              {isError && errorMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-red-500 text-sm mt-2"
                >
                  {errorMessage}
                </motion.div>
              )}
            </Card>
          );
        })
      ) : (
        <div className=" w-full h-[50.5vh]">
            <p className="text-gray-500 text-center">Yet Not Applyed</p>
        </div>
        
      )}
    </div>
    <Footer/>
    </>

    
    
  );
};

export default Track;
