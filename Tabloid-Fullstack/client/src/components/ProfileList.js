import React from "react";

const ProfileList = ({ profiles }) => {
    return (
        <div>
            {profiles.map((profile) => (
                <div className="m-4" key={profile.id}>
                    <ProfileSummaryCard post={profile} />
                </div>
            ))}
        </div>
    );
};

export default ProfileList;