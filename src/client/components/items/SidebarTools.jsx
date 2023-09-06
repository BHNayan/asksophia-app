const SidebarTools = ({ title }) => {
    return (
        <>
            <div className="flex cursor-pointer items-center mb-8">
                <span className="mr-[20px]">
                    <svg width="7" height="10" viewBox="0 0 7 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M2.38145 9.58711L5.98845 5.98011C6.53159 5.43697 6.53159 4.55959 5.98845 4.01646L2.38145 0.40946C1.50408 -0.467917 0 0.158781 0 1.39825L0 8.61224C0 9.85171 1.50408 10.4645 2.38145 9.58711Z" fill="#A5A8B7" />
                    </svg>
                </span>
                <p className="text-[16px] leading-[24px]">{title}</p>
            </div>
        </>
    )
}
export default SidebarTools