
const Languages = ({ language, handleChange }) => {

  return (
    <>
        <div className="mb-6">
          <label className="mb-2 block font-semibold text-black text-[18px] leading-[24px]">
            Languages
          </label>
          <select name="language" onChange={handleChange} value={language ? language : "English"} className="rounded-[10px] w-full px-4 h-[54px] outline-0 text-md border border-gray-100 placeholder:text-gray-400">
            <option>Select Language</option>
            <option  value="English">English</option>
            <option  value="French">French</option>
          </select>
        </div>
   </>
  )
}

export default Languages