import React, { useEffect, useState } from "react";
import { getImage } from "../../../../api/openaiService";
import { saveAs } from 'file-saver';
import { spinnerLoading } from "../../../../config/constants";

const DalleForm = () => {
  const [formData, setFormData] = useState({
    description: "",
    image_url: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0); // new state

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (isLoading) {
        let intervalId = setInterval(() => {
            setCurrentMessageIndex(prevIndex => (prevIndex + 1) % spinnerLoading.length);
        }, 4000); // every 4 seconds
        return () => clearInterval(intervalId); // cleanup function to stop the messages when isLoading is false or when component is unmounted
    }
}, [isLoading]);

  const handleDownload = async () => {
    const imageBase64 = formData.image_url.base.split(',')[1];
    const byteCharacters = atob(imageBase64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'image/png' });
    saveAs(blob, 'image.png');
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormData({ ...formData, image_url: null });
    setIsLoading(true);
    try {
      let prompt = `${formData.description}.`;
      const response = await getImage(prompt);
      setFormData({ ...formData, image_url: response });
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  return (
    <section className="bg-[#F8F8F8] py-[30px] px-[40px] min-h-screen">
      <div className="flex flex-col mb-[27px]">
        <h3 className="text-[36px] leading-[40px] font-bold mb-4">
          Generate Images
        </h3>
      </div>
      <div className="flex flex-col justify-center items-center w-full">
        <form onSubmit={handleSubmit} className="w-full text-center">
          <div className="mb-6">
            <label className="mb-2 block font-semibold text-black text-[18px] leading-[24px]">
              Describe the Image you wanna create
            </label>
            <textarea
              onChange={handleChange}
              name="description"
              value={formData.description}
              placeholder="Type here..."
              rows="4"
              className="rounded-[10px] resize-none w-full p-4 outline-0 text-md border border-gray-100 placeholder:text-gray-400"
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-cyan-400 rounded-full px-4 py-2 text-white"
          >
            Generate Image
          </button>
        </form>
        <div className="flex flex-col justify-center items-center mt-8 bg-white rounded-[10px] border border-gray-100 pt-8 pb-4 px-[22px] w-full">
          {formData.image_url && !isLoading && (
            <>
              <button onClick={handleDownload} className="ml-4 mb-4 bg-green-400 rounded-full px-4 py-2 text-white">
                Download Image
              </button>
              <img src={formData.image_url.result} alt="generated image" />
            </>
          )}
          {isLoading && <div className="flex items-center justify-center spinnerH">
            <img src="/images/sophia.png" className="w-1/2 bounce" alt="sophia" />
          </div>}
          {isLoading && <div className="flex items-center justify-center">
            <p className="text-gray-400 text-[22px] font-bold">{spinnerLoading[currentMessageIndex]}</p>
          </div>}
        </div>
      </div>
    </section>
  );
};

export default DalleForm;

