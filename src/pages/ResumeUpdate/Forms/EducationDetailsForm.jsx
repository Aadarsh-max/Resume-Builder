import React from "react";
import Input from "../../../components/Inputs/Input";
import { LuPlus, LuTrash2 } from "react-icons/lu";

const EducationDetailsForm = ({ educationInfo, updateArrayItem, addArrayItem, removeArrayItem}) => {
    return <div className="px-5 pt-5">
        <h2 className="text-lg font-semibold text-gray-900">Education</h2>

        <div className="mt-4 flex flex-col gap-4 mb-3">
            {educationInfo.map((education, index) => (
            <div
             key={index}
             className="border border-gray-200/80 p-4 rounded-lg relative"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                 label="Degree"
                 placeholder="B.tech in Computer Science"
                 type="text"
                 value={education.degree || ""}
                 onChange={({target}) => 
                 updateArrayItem(index, "degree", target.value)
                }
                />

                <Input
                 label="Institution"
                 placeholder="XYZ University"
                 type="text"
                 value={education.institution || ""}
                 onChange={({target}) => 
                 updateArrayItem(index, "institution", target.value)
                }
                />

                <Input
                 label="Start Date"
                 type="month"
                 value={education.startDate || ""}
                 onChange={({target}) => 
                 updateArrayItem(index, "startDate", target.value)
                }
                />

                <Input
                 label="End Date"
                 type="month"
                 value={education.endDate || ""}
                 onChange={({target}) => 
                 updateArrayItem(index, "endDate", target.value)
                }
                />
            </div>
            
            {educationInfo.length > 1 && (
                <button
                 type="button"
                 className="absolute top-3 right-3 text-sm text-red-600 hover:underline cursor-pointer"
                 onClick={() => removeArrayItem(index)}
                >
                 <LuTrash2/>
                </button>
            )}
            </div>
        ))}

         <button
          type="button"
          className="self-start flex items-center gap-2 px-4 py-2 rounded bg-purple-100 text-purple-800 text-sm font-medium hover:bg-purple-200 cursor-pointer"
          onClick={() => 
            addArrayItem({
                degree: "",
                institution: "",
                startDate: "",
                endDate: "",
            })
          }
         >
            <LuPlus/> Add Education
         </button>
        </div>
    </div>
    
}

export default EducationDetailsForm;