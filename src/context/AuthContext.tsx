import {
  createContext,
  Dispatch,
  useEffect,
  useReducer,
} from "react";
import { useNavigate } from "react-router-dom";
import { Profile } from "../pages/Profile";
import { checkError, supabase } from "../services/supabase";

type Profile = {
  firstName: string;
  lastName: string;
  avatarUrl: string;
  mainCourse: string;
};
interface AuthContextValue {
  state: AuthState,
  dispatch: Dispatch<authReducerAction>,
  signOut: () => void,
  signIn: (email: string, password: string) => Promise<void>,
  signUp: (email: string, password: string) => Promise<void>,

}
//TODO
// Refactor Context Provider
//change the state to useReducer
type AuthState = {
  loading: boolean;
  error?: {
    message: string;
    details: any;
  };
  userId: string;
  userInfo: Profile;
};

const initial_state = {} as AuthState;

type authReducerAction =
  | {
      type: "fetchStart" | "fetchEnd" | 'reset';
    }
  | {
      type: "fetchError";
      payload: {
        error: {
          message: string;
          details: any;
        };

      };
    }
  | {
      type: "updateUserInfo";
      payload: {
        userInfo: Partial<Profile>;
      };
    }
  | {
      type: "setUserId";
      payload: {
        userId: string;
      };
    }

const authReducer = (state: AuthState, action: authReducerAction) =>  {
  if(state.error) {
    state = {
      ...state,
      error: undefined
    }
  }
  switch (action.type) {
    case "fetchStart": {
      state = {
        ...state,
        loading: true 
      }
      break;
    }
    case "fetchEnd": {
      state = {
        ...state,
        loading: false 
      }
      break;
    }
    case "fetchError": {
      state = {
        ...state,
        error: { ...action.payload.error }
      }
      console.log(state.error);
      break;
    }
    case "updateUserInfo":{
      state = {
        ...state,
        userInfo: {
          ...state.userInfo,
          ...action.payload.userInfo
        }
      }
      break;
    }
    case "setUserId":{
      state = {
        ...state,
        userId: action.payload.userId
      }
      break;
    }
    case "reset":{
      state = initial_state;
      break;
    }
    // case "updateMainCourse": {
    //   try {
    //     const { data: mainCourseUpdate, error: mainCourseUpdateError } =
    //       await supabase
    //         .from("profile")
    //         .update({ main_course: action.payload.courseUid })
    //         .match({ user_id: state.userId });

    //     if (
    //       checkError<{ main_course: string }>(
    //         mainCourseUpdate,
    //         mainCourseUpdateError
    //       )
    //     ) {
    //       if (!state.userInfo) throw "Error while updating main course";
    //       state.userInfo = {
    //         ...state.userInfo,
    //         mainCourse: mainCourseUpdate[0].main_course,
    //       };
    //     }
    //   } catch (error) {
    //     state.error = {
    //       message: "Main course selection failed",
    //       details: error,
    //     };
    //   }
    //   break;
    // }
    // case "updateAvatarUrl": {
    //   state.loading = true;
    //   try {
    //     async function deleteCurAvatar() {
    //       try {
    //         const { data: listResponse, error: listError } =
    //           await supabase.storage.from("avatar").list(`${profile.userId}`);

    //         if (!listResponse || listResponse?.length === 0 || listError)
    //           throw listError || { message: "No file found" };

    //         const { data: deleteResponse, error: deleteError } =
    //           await supabase.storage
    //             .from("avatar")
    //             .remove(
    //               listResponse.map((file) => `${profile.userId}/${file.name}`)
    //             );

    //         if (!deleteResponse || deleteResponse?.length === 0 || deleteError)
    //           throw deleteError || { message: "Error deleting files" };

    //         return true;
    //       } catch (error) {
    //         throw error;
    //       }
    //     }

    //     deleteCurAvatar();

    //     const avatarFile: File = action.payload.data.avatar[0];
    //     const fileName = avatarFile.name;

    //     const { data: response, error } = await supabase.storage
    //       .from("avatar")
    //       .upload(`${state.userId}/${fileName}`, avatarFile, {
    //         upsert: true,
    //       });

    //     if (error || !response) {
    //       throw error || "Could not upload avatar";
    //     }

    //     const { publicURL } = supabase.storage
    //       .from("avatar")
    //       .getPublicUrl(`${state.userId}/${fileName}`);

    //     const { data: responseProfile, error: errorProfile } = await supabase
    //       .from("profile")
    //       .update({ avatar_url: publicURL })
    //       .match({ user_id: state.userId });

    //     if (
    //       !checkError<{ avatar_url: string }>(responseProfile, errorProfile)
    //     ) {
    //       throw errorProfile;
    //     }

    //     state.userInfo = {
    //       ...state.userInfo,
    //       avatarUrl: responseProfile[0].avatar_url,
    //     } as Profile;
    //   } catch (error) {
    //     state.error = { message: "Could not update avatar", details: error };
    //   } finally {
    //     state.loading = false;
    //   }
    // }
    default: {
      return state;
    }
  }
  return state;
};

export const AuthContext = createContext({} as AuthContextValue);

export function AuthContextProvider({
  children,
}: React.PropsWithChildren<any>) {

  const navigate = useNavigate();

  async function getUserInfo() {
    try {
      dispatch({ type: "fetchStart" });

      if (!state.userId) {
        const session = supabase.auth.session();
        if (!session || !session.user) {
          throw { message: "No session found" };
        }
        dispatch({type: "setUserId", payload: {userId: session.user.id}})
      }

      const { data, error } = await supabase.from("profile").select(`
          first_name,
          last_name,
          avatar_url,
          main_course
        `);

      if (
        checkError<{
          first_name: string;
          last_name: string;
          avatar_url: string;
          main_course: string;
        }>(data, error)
      ) {
        dispatch({type: "updateUserInfo", payload: {userInfo: {
          firstName: data[0].first_name,
          lastName: data[0].last_name,
          mainCourse: data[0].main_course,
          avatarUrl: data[0].avatar_url
        }}})
      }
    } catch (error) {
      dispatch({
        type: "fetchError",
        payload: {
          error:{
            message: "Error retrieving user profile",
            details: error,
          }
        },
      });
    } finally {
      dispatch({ type: "fetchEnd" })
    }
  }

  async function signOut(){
    const { error } = await supabase.auth.signOut();
    if (error) {
      return { 
        error: {
          message: "Could not sign out",
          details: error,
        }
      };
    }
    dispatch({type: 'reset'})
    navigate('/')
  }

  async function signIn(email:string, password:string){
    const { user, session, error } = await supabase.auth.signIn({
      email: email,
      password: password,
    });

    if (error || !session || !user){
      dispatch({type: 'fetchError', payload: {error: { message: "Could not sign in", details: error } }})
      return;
    }
    dispatch({type: 'setUserId', payload: {userId: user.id}})
  }

  async function signUp(email:string, password:string){
    const { user, session, error } = await supabase.auth.signUp({
      email: email,
      password:password,
    });

    if (error || !session || !user){ 
      dispatch({type: 'fetchError', payload: {error: { message: "Could not sign up", details: error } }})
      return
    }

    dispatch({type: 'setUserId', payload: {userId: user.id}})
  }

  const [state, dispatch] = useReducer(authReducer, initial_state);

  useEffect(() => {
    getUserInfo();
  }, [state.userId]);

  return (
    <AuthContext.Provider
      value={{state: state, dispatch, signIn, signOut, signUp}}
    >
      {children}
    </AuthContext.Provider>
  );
}
