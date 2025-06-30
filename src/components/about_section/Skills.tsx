import React from "react";
import { info } from "../../data/info";

interface SkillsProps {
  skills: (typeof info)["about"]["skills"];
}

export default function Skills(props: SkillsProps) {
  const { skills } = props;

  return skills.length === 0 ? (
    <div></div>
  ) : (
    <div className="flex flex-col space-y-4 lg:w-1/2 mx-4">
      <h1 className="text-3xl font-bold">Skills</h1>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
         <span
         key={index}
         className="px-3 py-1 bg-white text-black border border-gray-400 dark:bg-gray-800 dark:text-white rounded-full text-lg"
       >
         {skill}
       </span>
       
        ))}
      </div>
    </div>
  );
}
