import { useGetIdentity, useOne } from "@pankod/refine-core";

import { Profile } from "components";
import { auth } from "../firebase";

const MyProfile = () => {
  const user = auth.currentUser;

  return (
    <Profile
      type="My"
      name={user?.displayName}
      email={user?.email}
      avatar={user?.photoURL}
      // properties={myProfile.allProperties}
    />
  );
};

export default MyProfile;
