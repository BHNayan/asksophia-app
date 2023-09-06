import React from "react";
import ToneOfVoice from "../../layouts/ToneOfVoice";
import Languages from "../../layouts/Languages";

const ToolForm = ({tool, formData, setFormData, handleSubmit }) => {

  const {tone, language}= formData;
  const handleChange = (event, fieldLabel) => {
    setFormData(prevValues => ({
      ...prevValues,
      [fieldLabel]: event.target.value,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
     {tool.fields.map((field, index) => (
        <div className="mb-6" key={index}>
          <label className="text-[18px] font-semibold text-black leading-[20px]">
            {field.label}
          </label>
          {field.type === 'input' ? (
            <input
              type={field.inputType}
              name={field.label}
              onChange={(event) => handleChange(event, field.label)}
              placeholder={field.placeholder}
              className="rounded-[10px] mt-3 w-full px-4 h-[54px] outline-0 text-md border border-gray-100 placeholder:text-gray-400"
            />
          ) : (
            <textarea
              onChange={(event) => handleChange(event, field.label)}
              name={field.label}
              placeholder={field.placeholder}
              rows="4"
              className="rounded-[10px] resize-none w-full p-4 outline-0 text-md border border-gray-100 placeholder:text-gray-400"
            ></textarea>
          )}
        </div>
      ))}
      <Languages
      language={language}
      handleChange={(event)=>handleChange(event, "language")}
       />
     <ToneOfVoice 
        tone={tone}
        toolName={tool.name?.title}
        handleChange={(event)=>handleChange(event, "tone")}
     />
      <button type="submit" className="bg-cyan-400 rounded-full px-4 py-2 text-white">
        Generate
      </button>
    </form>
  );
};

export default ToolForm;
