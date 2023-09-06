import React from 'react'
import ProfileEdit from '../components/Profile/ProfileEdit'
import { Helmet } from 'react-helmet-async'

const Profile = () => {
    return (
        <>
            <Helmet>
                <title>Profile | AskSophia</title>
            </Helmet>
            <section className="bg-[#F8F8F8] py-[30px] px-[40px] min-h-screen">
                <div className="flex flex-col mb-[20px]">
                    <h3 className="text-[36px] leading-[40px] font-semibold mb-4">
                        Edit Profile
                    </h3>
                </div>
                <ProfileEdit />
            </section>
        </>
    )
}

export default Profile