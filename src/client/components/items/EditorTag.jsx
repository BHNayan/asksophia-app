

const EditorTag = ({ formData, setFormData, setHashtags }) => {


    const handleQuillChange = (e) => {
        const regex = /(#\w+)/g;
        let match;
        const newHashtags = [];
        while ((match = regex.exec(e.target.value)) !== null) {
            newHashtags.push(match[1]);
        }
     
        setHashtags(newHashtags);
        setFormData({ ...formData, template: e.target.value })
    };


    return (
        <textarea
            value={formData.template}
            placeholder='Type here...'
            onChange={handleQuillChange}
            className='rounded-[10px] resize-none w-full px-4 py-2 h-[200px] outline-0 text-md border border-gray-100 placeholder:text-gray-400'
        />
    )
}

export default EditorTag