import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import * as Dialog from "@radix-ui/react-dialog";
import { UserProfile } from "./UserProfile";
import { X } from "phosphor-react";

export function UserProfileMenu() {
  const { state, signOut } = useContext(AuthContext);

  const [profileOpen, setProfileOpen] = useState(false);

  const navigate = useNavigate();

  return (
    <>
      {!(state.loading) ? (
        <Dialog.Root
          open={profileOpen}
          onOpenChange={() => setProfileOpen(!profileOpen)}
        >
          <Dialog.Portal>
            <Dialog.Overlay className="bg-gray-900 h-full w-full fixed top-0 opacity-90" />
            <Dialog.Content className="bg-gray-700 rounded-lg fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <Dialog.Close className="flex w-full justify-end p-4">
                <X size={24} className='text-gray-200' />
              </Dialog.Close> 
              <UserProfile                
                closeProfile={() => setProfileOpen(false)}
              />
            </Dialog.Content>
          </Dialog.Portal>
          <div className="flex items-center gap-3">
            <Dialog.Trigger>
              <img
                src={state.userInfo?.avatarUrl}
                alt="Profile avatar"
                className="max-h-full h-14 w-14 rounded-full border-4 border-blue-500 flex items-center justify-center text-center text-xs"
              />
            </Dialog.Trigger>
            <p className="text-base font-bold text-gray-50 leading-relaxed">
              {`${state.userInfo?.firstName} ${state.userInfo?.lastName}`}
            </p>
            <button
              className="text-sm text-gray-400 hover:underline"
              onClick={(e) => {
                e.preventDefault();
                signOut();
                navigate("/");
              }}
            >
              Sign out
            </button>
          </div>
        </Dialog.Root>
      ) : (
        <h1>Loading</h1>
      )}
    </>
  );
}
