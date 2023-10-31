import { CheckCircle, XCircle } from "phosphor-react";
import { useContext, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { AuthContext } from "../context/AuthContext";
import { checkError, supabase } from "../services/supabase";
import { SlideLeftFadeRigth } from "./SlideLeftFadeRigth";

interface FormInput {
  firstName: string;
  lastName: string;
}

//todo -> fix confirm button showing after avatar change
// Refactor -> useContext for methods instead of receiving all these props

export function UserProfile(profile: {
  closeProfile: () => void;
}) {


  const { state, dispatch } = useContext(AuthContext)

  const avatar = state.userInfo.avatarUrl;
  const [previewAvatarUrl, setPreviewAvatarUrl] = useState(avatar);
  const [avatarLoading, setAvatarLoading] = useState(false);

  const { register, handleSubmit } = useForm<FormInput>({
    defaultValues: {
      firstName: state.userInfo.firstName,
      lastName: state.userInfo.lastName,
    },
  });

  const { register: registerAvatar, handleSubmit: handleSubmitAvatar } = useForm<{ avatar: FileList }>({
      defaultValues: {
        avatar: undefined,
      },
    });

  const previewAvatar: SubmitHandler<{ avatar: FileList }> = (data) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      setPreviewAvatarUrl(event.target?.result as string);
    };
    reader.readAsDataURL(data.avatar[0]);
  };

  async function deleteCurAvatar() {
    try {
      const { data: listResponse, error: listError } = await supabase.storage.from('avatar').list(`${state.userId}`)
      
      if(!listResponse || listResponse?.length === 0  || listError) throw listError || {message: 'No file found'}
      
      const { data: deleteResponse, error: deleteError } = await supabase.storage.from('avatar').remove(listResponse.map((file) => `${state.userId}/${file.name}`))      
      
      if(!deleteResponse || deleteResponse?.length === 0  || deleteError) throw deleteError || {message: 'Error deleting files'}

      return true

    } catch (error) {
      console.log(error)
      return false
    }
  }
  
  const uploadAvatar: SubmitHandler<{ avatar: FileList }> = async (data) => {
    setAvatarLoading(true);
    
    if(!(await deleteCurAvatar())) return

    const avatarFile = data.avatar[0];
    const fileName = data.avatar[0].name
    const { data: response, error } = await supabase.storage
      .from("avatar")
      .upload(`${state.userId}/${fileName}`, avatarFile, {
        upsert: true,
      });

    if (error) {
      console.log(error);
      return;
    }

    if (!response) return;
    
    
    const { publicURL } = supabase.storage
      .from("avatar")
      .getPublicUrl(`${state.userId}/${fileName}`);

    const { data: responseProfile, error: errorProfile } = await supabase
      .from("profile")
      .update({ avatar_url: publicURL })
      .match({ user_id: state.userId });

    if(errorProfile) { 
      console.log(errorProfile)
      return
    }

    console.log(responseProfile, errorProfile);
    
    dispatch({
      type: 'updateUserInfo',
      payload: {
        userInfo: {
          ...state.userInfo,
          avatarUrl: responseProfile[0].avatar_url
        }
      }
    })
    
    setAvatarLoading(false);
    setPreviewAvatarUrl(responseProfile[0].avatar_url)
  };

  const updateProfile: SubmitHandler<FormInput> = async ({
    firstName,
    lastName,
  }) => {
    if (firstName !== state.userInfo.firstName || lastName !== state.userInfo.lastName) {
      try {
        dispatch({
          type: 'fetchStart'
        })
        const { data, error } = await supabase
          .from("profile")
          .update({ first_name: firstName, last_name: lastName })
          .eq("user_id", state.userId);

        if (
          checkError<{
            first_name: string;
            last_name: string;
            avatar_url: string;
            main_course: string;
          }>(data, error)
        ) {
          dispatch({
            type: 'updateUserInfo',
            payload: {
              userInfo:{
                firstName: data[0].first_name,
                lastName: data[0].last_name
              }
            }
          })
        }
      } catch (error) {
        dispatch({
          type: 'fetchError',
          payload: {
            error: {
              message: "Error updating profile",
              details: error,
            }
          }
        })
      } finally {
        dispatch({
          type: 'fetchEnd'
        })
      }
    }
    profile.closeProfile();
  };

  return (
    <div className="pb-10 px-14">
      <div className="flex justify-around items-center gap-8"> 
        <img
          src={avatar !== previewAvatarUrl ? previewAvatarUrl : avatar }
          alt="Profile avatar"
          className={`max-h-full h-32 w-32 rounded-full border-4 border-blue-500 flex items-center justify-center text-center text-xs`}
        />
        <form
          className="text-center leading-relaxed"
          onSubmit={handleSubmitAvatar(uploadAvatar)}
        >
          <h1 className="text-2xl text-gray-50 leading-relaxed">Meu perfil</h1>
          <div className="flex w-full text-center justify-center">
            <SlideLeftFadeRigth toggle={avatar === previewAvatarUrl}>
              <label
                className={`hover:underline text-gray-300 hover:cursor-pointer `}
              >
                Alterar avatar
                <input
                  id="avatar"
                  type="file"
                  className="hidden"
                  {...registerAvatar("avatar", {
                    validate: {
                      isImage: (file) =>
                        /(image\/)\w/.test(file[0].type) ||
                        "Avatar selecionado precisa ser uma imagem",
                      lessThan1Mb: (file) =>
                        file[0].size < 10 ** 6 ||
                        "Tamanho nao pode ultrapassar 1Mb",
                    },
                  })}
                  onChange={handleSubmitAvatar(
                    (data) => previewAvatar(data),
                    (error) => console.log(error)
                  )}
                />
              </label>
            </SlideLeftFadeRigth>
            <SlideLeftFadeRigth toggle={avatar !== previewAvatarUrl}>
              {!avatarLoading ? (
                <div className={`flex gap-4`}>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setPreviewAvatarUrl(avatar);
                    }}
                  >
                    <XCircle size={24} className="text-red-600" />
                  </button>
                  <button type="submit">
                    <CheckCircle size={24} className="text-green-500" />
                  </button>
                </div>
              ) : (
                <p>Loading</p>
              )}
            </SlideLeftFadeRigth>
          </div>
        </form>
      </div>

      <form
        onSubmit={handleSubmit(updateProfile)}
        className="flex flex-col mt-5"
      >
        <label htmlFor="firstName" className="font-bold px-4 mb-2">
          Nome
        </label>
        <input
          {...register("firstName", { required: "Input is required" })}
          className="bg-gray-900 px-4 py-1 mb-4 rounded-3xl font-normal border focus-visible:outline focus-visible:outline-1 focus-visible:outline-gray-50"
        />
        <label htmlFor="lastName" className="font-bold px-4 mb-2">
          Sobrenome
        </label>
        <input
          {...register("lastName", { required: "Input is required" })}
          className="bg-gray-900 px-4 py-1 mb-8 rounded-3xl font-normal border focus-visible:outline focus-visible:outline-1 focus-visible:outline-gray-50"
        />
        <button
          type="submit"
          className="p-4 text-sm flex items-center rounded font-bold uppercase gap-2 justify-center bg-green-500 hover:bg-green-700 transition-colors"
        >
          Alterar
        </button>
      </form>
    </div>
  );
}
