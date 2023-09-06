import { useState, useEffect, useRef } from "react";
import { options } from "../../../config/constants";


const SelectTopic = ({ selectedOptions, setSelectedOptions, formData, setFormData }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [isClicked, setIsClicked] = useState(false);

    const handleSelectedOptions = () => {
        const selectedLabels = options.filter((option) =>
            selectedOptions.includes(option.topic)
        ).map((option) => option.topic);
        setFormData({ ...formData, topics: selectedLabels });
    };
    useEffect(() => {
        // add event listener for clicks outside of dropdown
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);

    useEffect(() => {
        if (selectedOptions) {
            handleSelectedOptions(options.filter(option =>
                selectedOptions.includes(option.id)).map(option => option.topic));
        }
    }, [selectedOptions]);

    return (<div className="relative" ref={dropdownRef}>
        <button type="button"
            className="flex justify-between items-center bg-white w-full text-left outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all border rounded-[10px] w-full px-4 h-[54px] outline-0 text-md border border-gray-100 placeholder:text-gray-400"
            onClick={() => { setIsOpen(!isOpen); setIsClicked(!isClicked); }} >
            <span>Select Topic</span>
            <span>
                <svg className={`${isClicked ? '' : 'rotate-180'}`} width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.000206642 6.35313C-0.00369421 6.51821 0.0477192 6.68032 0.147378 6.81692C0.247037 6.95352 0.390016 7.05783 0.556308 7.11534C0.722601 7.17285 0.903987 7.1807 1.0753 7.13781C1.24661 7.09492 1.39923 7.00341 1.51209 6.87601L5.9862 2.01494L10.4587 6.87601C10.5283 6.96414 10.6167 7.03794 10.7183 7.09281C10.82 7.14767 10.9327 7.1824 11.0495 7.19483C11.1662 7.20726 11.2845 7.19713 11.3968 7.16505C11.5091 7.13298 11.6132 7.07966 11.7024 7.00844C11.7915 6.93722 11.8639 6.84962 11.915 6.75114C11.9661 6.65266 11.9948 6.54542 11.9994 6.43613C12.0039 6.32684 11.9842 6.21785 11.9414 6.116C11.8986 6.01415 11.8336 5.92162 11.7506 5.84421L6.63464 0.278732C6.55451 0.191333 6.45505 0.121151 6.34296 0.0730272C6.23086 0.0249029 6.10886 -1.75701e-05 5.98541 -1.75716e-05C5.86197 -1.75731e-05 5.73996 0.0249029 5.62787 0.0730272C5.51578 0.121151 5.41622 0.191333 5.33609 0.278732L0.215205 5.84421C0.0810395 5.98481 0.00495993 6.16514 0.000206642 6.35313Z" fill="#716F6F" />
                </svg>
            </span>
        </button>
        {isOpen && (
            <div className="border border-[#C6C6C6] absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md max-h-[260px] overflow-y-scroll">
                <div className="py-2">
                    {options.map((option) => (
                        <div key={option.id} className="px-4 py-2">
                            <label className="text-black border-gray-300 rounded focus:ring-blue-500 inline-flex items-center">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                                    checked={selectedOptions.includes(option.topic)}
                                    onChange={(event) => {
                                        const optionTopic = option.topic;
                                        const isChecked = event.target.checked;
                                        setSelectedOptions((prevSelectedOptions) => {
                                            if (isChecked) {
                                                return [...prevSelectedOptions, optionTopic];
                                            } else {
                                                return prevSelectedOptions.filter(
                                                    (topic) => topic !== optionTopic
                                                );
                                            }
                                        });
                                    }}
                                />
                                <span className="ml-2">{option.topic}</span>
                            </label>
                        </div>
                    ))}
                </div>
            </div>
        )
        }
    </div>
    );
}

export default SelectTopic