import { useEffect, useReducer, useState } from 'react'
import { initialState, toneReducer } from '../../../Reducers/toneReducer';
import { fetchAllTones } from '../../../api/toneService';

const ToneOfVoice = ({ tone, toolName, handleChange }) => {
  const [isDisplay, setIsDisplay] = useState(false);
  const [toneState, dispatch] = useReducer(toneReducer, initialState)
  const { tones } = toneState;

  useEffect(() => {
    if (toolName === "SEO Content Brief" 
    || toolName === "Rewrite With Keywords") {
      setIsDisplay(false);
    } else { setIsDisplay(true) }
  }, [toolName])

    const getTones = async () => {
      await fetchAllTones(dispatch);
  }

  useEffect(() => {
      getTones()
  }, [])


  return (
    <>
      {isDisplay &&
        <div className="mb-6">
          <label className="mb-2 block font-semibold text-black text-[18px] leading-[24px]">
            Tone of voice
          </label>
          <select name="tone" onChange={handleChange} value={tone ? tone : "friendly"} className="rounded-[10px] w-full px-4 h-[54px] outline-0 text-md border border-gray-100 placeholder:text-gray-400">
            <option>Select Tone</option>
            {toneState && tones && tones.map((tone)=>{
              return  <option key={tone._id} value={tone.title}>{tone.title}: {tone.description}</option>
            })}
          </select>
        </div>}
      {toolName === "SEO Website Copy" && <div className=" mb-6">
        <label className="text-[18px] font-semibold text-black leading-[20px]">
        Website Structure (separated by commas)
        </label>
        <input
          type="text"
          name="tone"
          value={tone}
          onChange={handleChange}
          placeholder="e.g Title"
          className="rounded-[10px] mt-3 w-full px-4 h-[54px] outline-0 text-md border border-gray-100 placeholder:text-gray-400"
        />
      </div>
    }
   </>
  )
}

export default ToneOfVoice