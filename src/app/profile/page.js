import { useAuth } from "@/hooks/useAuth";
import User from "@/models/User";
import Image from "next/image";
async function getUser(email) {
  const user = await User.findOne({email:email});
  return user;
}

export default async function Profile() {
  const auth = await useAuth.fromServer();
  const email = auth?.email;
  console.log(email);
  const user = await getUser(email);
  const userCreatedDate=user.createdAt.toString();
  const date=new Date(userCreatedDate);
  const formatedDate=date.toLocaleDateString('en-US');
  return (
    <div className="flex justify-center h-screen items-center">
      <div className="bg-white w-1/2 h-2/3 rounded-2xl p-8">
        <div className="float-left h-full  w-1/4">
            <div className="w-full h-56 rounded-full items-center flex justify-center">
                <img src={user.userPhoto} className="rounded-full"></img>
            </div>
            <div className="w-full p-2 text-center ">
                <label className="text-2xl font-bold text-indigo-400">{user.full_name}</label>
            </div>
        </div>
        <div className="float-right h-full flex flex-col p-8 w-3/4 ">
            <div className=" w-full h-14 flex items-center justify-center text-2xl shadow-xl text-indigo-600">
                USER INFORMATION
            </div>
            <div className="w-full h-3/4 p-4 justify-center items-center flex ">
                <div className="h-full w-full mt-16">
                    <div className="">
                        <div className="text-2xl text-indigo-400 font-bold ">Full Name </div>
                        <div className="text-xl text-gray-600 mt-1 ml-4">{user.full_name}</div>
                    </div>
                    <div className="mt-8">
                        <div className="text-2xl text-indigo-400 font-bold ">Email </div>
                        <div className="text-xl text-gray-600 mt-1 ml-4">{user.email}</div>
                    </div>
                    <div className="mt-8">
                        <div className="text-2xl text-indigo-400 font-bold ">User's role </div>
                        <div className="text-xl  text-gray-600 mt-1 ml-4">{user.role}</div>
                    </div>
                    <div className="mt-8">
                        <div className="text-2xl text-indigo-400 font-bold ">Profile Created Date </div>
                        <div className="text-xl text-gray-600 mt-1 ml-4">{formatedDate}</div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
