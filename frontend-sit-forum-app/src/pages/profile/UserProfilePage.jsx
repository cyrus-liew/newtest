import React, {useEffect, useMemo} from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import MainLayout from '../../components/MainLayout'
import { useDispatch, useSelector } from 'react-redux';
//fetching user data
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getUserProfile } from "../../services/index/users"
import ProfilePicture from '../../components/ProfilePicture';
import { useMutation } from '@tanstack/react-query';
//update user data
import { updateProfile } from '../../services/index/users';
import { userActions } from '../../store/reducers/userReducers';
import toast from 'react-hot-toast';


const UserProfilePage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const queryClient = useQueryClient();
    //user login state
    const userState = useSelector(state => state.user);

    //retrieve user data
    const {
        data: profileData, 
        isLoading: profileIsLoading, 
    } = useQuery({
        queryFn: () => {
            return getUserProfile({token: userState.userInfo.token});
        },
        queryKey: ['profile'],
    });

    const {mutate, isLoading: updateProfileIsLoading} = useMutation({
        mutationFn: ({name, email, password}) => {
            return updateProfile({
                token: userState.userInfo.token,
                userData: {name, email, password},
            });
        },
        onSuccess: (data) => {
            dispatch(userActions.setUserInfo(data));
            localStorage.setItem('account', JSON.stringify(data));
            queryClient.invalidateQueries(['profile']);
            //show msg user info updated
            toast.success("Profile Information Updated.")
        },
        onError: (error) => {
            toast.error(error.message)
            console.log(error);
        },
    });

    useEffect(() => {
        //login successful login to home page
        if(!userState.userInfo){
            navigate("/");
        }
    }, [navigate, userState.userInfo])
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
        values: useMemo(() => {
            return {
                name: profileIsLoading ? "" : profileData.name,
                email: profileIsLoading ? "" : profileData.email,
            }
        }, [profileData?.email, profileData?.name, profileIsLoading]) ,
        mode: "onChange",
    });
    const submitHandler = (data) => {
      const {name, email, password} = data;
      mutate({name, email, password});
     };


    return <MainLayout>
        <section className="container mx-auto px-5 py-10">
            <div className="w-full max-w-sm mx-auto">
                {/* <p>{profileData?.name}</p> */}
                <ProfilePicture avater={profileData?.avater} />
                <form onSubmit={handleSubmit(submitHandler)}>
                    <div className="flex flex-col mb-6 w-full">
                        <label htmlFor="name" className="text-[#5a7184] font-semibold block"> Name </label>
                        <input type="text" id="name"
                            {...register("name", {
                                minLength: {
                                    value: 6,
                                    message: "Name Length Must be more than 6 characters",
                                },
                                required: {
                                    value: true,
                                    message: "Name is required",
                                },
                                pattern: {
                                    value: /^[A-Za-z\s]+$/i,  // Only alphabetic characters and spaces (case insensitive)
                                    message: "Please enter only alphabetic characters and spaces for the name",
                                },
                            })}
                            placeholder="Enter Name" className={`placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none ${errors.name ? "border border-red-500" : "border border-[#c3cad9]"}`} />
                        {errors.name && (
                            <p className="text-red-500 text-xs mt-1"> {errors.name.message} </p>
                        )}


                    </div>

                    <div className="flex flex-col mb-6 w-full">
                        <label htmlFor="email" className="text-[#5a7184] font-semibold block"> Email </label>
                        <input type="email" id="email"
                            {...register("email", {
                                pattern: {
                                    value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                    message: 'Please enter a valid email',
                                },
                                required: {
                                    value: true,
                                    message: "Email is required",
                                },
                            })}
                            placeholder="Enter Email" className={`placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none ${errors.email ? "border border-red-500" : "border border-[#c3cad9]"}`} />
                        {errors.email && (
                            <p className="text-red-500 text-xs mt-1"> {errors.email.message} </p>
                        )}

                    </div>

                    <div className="flex flex-col mb-6 w-full">
                        <label htmlFor="password" className="text-[#5a7184] font-semibold block"> New Password (Optional) </label>
                        <input type="password" id="password"
                            {...register("password")}
                            placeholder="Enter new Password" className={`placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none ${errors.password ? "border border-red-500" : "border border-[#c3cad9]"}`} />
                     {errors.password && (
                            <p className="text-red-500 text-xs mt-1"> {errors.password.message} </p>
                        )}
                    </div>

                   
                    {/* //form validate not passed button is disabled */}
                    <button type="submit" disabled={!isValid || profileIsLoading || updateProfileIsLoading} className="bg-primary text-white font-bold text-lg py-4 px-8 w-full rounded-lg mb-6 disabled:opacity-70 disabled:cursor-not-allowed">
                        Update Account
                    </button>

                </form>
            </div>



        </section>
    </MainLayout>
};

export default UserProfilePage;