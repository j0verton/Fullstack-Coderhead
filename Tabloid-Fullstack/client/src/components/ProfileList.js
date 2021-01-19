import React from "react";
import ProfileSummaryCard from "./ProfileSummaryCard"
const ProfileList = ({ profiles }) => {
    return (
        <div>
            {profiles.map((profile) => (
                <div className="m-4" key={profile.id}>
                    <ProfileSummaryCard profile={profile} />
                </div>
            ))}
        </div>
    );
};

export default ProfileList;