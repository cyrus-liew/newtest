import React from 'react'
import Header from './components/header/Header';
import { Outlet, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getUserProfile } from '../../services/index/users';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';


const AdminLayout = () => {

    const navigate = useNavigate();
    const userState = useSelector(state => state.user);
    //retrieve user data to check if is admin
    const {
        data: profileData, 
        isLoading: profileIsLoading, 
    } = useQuery({
        queryFn: () => {
            return getUserProfile({token: userState.userInfo.token});
        },
        queryKey: ['profile'],
        onSuccess: (data) => {
            if(!data?.admin){
                // navigate to home page if not admin
                navigate("/");
                toast.error("You are not allowed to access admin panel");
            }
        },
        onError: (err) => {
            console.log(err);
            navigate("/");
            toast.error("You are not allowed to access admin panel");
        }
    });

    //hANDLE LOADING
    if(profileIsLoading){
        return (
            <div className="w-full h-screen flex justify-center items-center">
                <h3 className="text-2xl text-slate-700"> Loading </h3>
            </div>
        )
    }

    return (
        <div className="flex flex-col h-screen lg:flex-row">
         <Header />
         <main className="bg-[#F9F9F9] flex-1 p-4 lg:p-6">
            {/* oulet does, wat we put in app.js routue component will render in route */}
            <Outlet />
         </main>
        </div>
    );
};

export default AdminLayout