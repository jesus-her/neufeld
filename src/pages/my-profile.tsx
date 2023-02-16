import { useGetIdentity, useOne } from "@pankod/refine-core";

import { Profile } from "components";
import { auth } from "../firebase";

const MyProfile = () => {
  const user = auth.currentUser;
  // const { user } = useGetIdentity();
  //   const { data, isLoading, isError } = useOne({
  //     resource: "users",
  //     id: user?.uid,
  //   });

  //   const myProfile = data?.data ?? [];

  //   if (isLoading) return <div>loading...</div>;
  //   if (isError) return <div>error...</div>;

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
