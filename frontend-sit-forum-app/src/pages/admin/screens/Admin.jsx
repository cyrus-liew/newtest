import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getAllUser } from '../../../services/index/users';
import EditUser from './EditUser';


const Admin = () => {
    const [users, setUsers] = useState([]);
    const [adminStatus, setadminStatus] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(10); // Number of comments to display per page
    const userState = useSelector(state => state.user);
    const token = userState.userInfo.token;
    const [isEditMode, setIsEditMode] = useState(false);
    const [selectedValue, setSelectedValue] = useState(users.admin); // Initialize with the actual value from your data

    useEffect(() => {
      const fetchUsers = async () => {
          try {
              const responses = await getAllUser({ token });
              setUsers(responses);
          } catch (error) {
              console.error('Error fetching users: ', error);
          }
      }
      fetchUsers();
  }, [token]);


  const handleEditClick = () => {
    setIsEditMode(true);
  };

    
    // Calculate the index of the last user on the current page
    const indexOfLastUser = currentPage * usersPerPage;
    // Calculate the index of the first user on the current page
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    // Get the users to display on the current page
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    // Change page
    const paginate = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= Math.ceil(users.length / usersPerPage)) {
            setCurrentPage(pageNumber);
        }
    };

  return (
          <div>
              <h1 className='text-2xl font-semibold'>Dashboard</h1>
              <div class="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
                  <div class="py-8" style={{ maxHeight: '75vh', overflowY: 'auto' }}>
                      <div class="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
                          <div class="inline-block w-full overflow-hidden rounded-lg shadow" >
                              <table class="min-w-full leading-normal">
                                  <thead>
                                      <tr>
                                          <th scope="col" class="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                                              Name
                                          </th>
                                          <th scope="col" class="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                                              Email
                                          </th>
                                          <th scope="col" class="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                                              Admin Status
                                          </th>
                                          <th scope="col" class="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                                          </th>
                                      </tr>
                                  </thead>
                                  <tbody>
                                      {users.slice((currentPage - 1) * usersPerPage, currentPage * usersPerPage).map((user) => (
                                          <tr key={user.id}>
                                              <td className="px-5 py-2 text-sm bg-white border-b border-gray-200" style={{ maxWidth: '200px' }}>
                                                  <p className="text-gray-900 whitespace-no-wrap break-all">
                                                      {user.name}
                                                  </p>
                                              </td>
                                              <td className="px-5 py-2 text-sm bg-white border-b border-gray-200" style={{ maxWidth: '200px' }}>
                                                  <p className="text-gray-900 whitespace-no-wrap break-all">
                                                      {user.email}
                                                  </p>
                                              </td>
                                              <td className="px-5 py-2 text-sm bg-white border-b border-gray-200"> 
                                                  <p className="text-gray-900 whitespace-no-wrap">
                                                      {user.admin.toString()}
                                                  </p>
                                              </td>
                                              <td className="px-5 py-2 text-sm bg-white border-b border-gray-200">
                                                  <EditUser 
                                                  name={user.name} 
                                                  email={user.email} 
                                                  adminstatus = {user.admin} 
                                                />
                                              </td>
                                          </tr>
                                      ))}
                                  </tbody>
                              </table>
                              
                          </div>
                      </div>
                  </div>
              </div>
              <div class="flex flex-col items-center px-5 py-5 bg-white xs:flex-row xs:justify-between" style={{ height: 'auto' }}>
                  <div class="flex items-center">
                      <button
                          type="button"
                          onClick={() => paginate(currentPage - 1)}

  class="w-full p-4 text-base text-gray-600 bg-white border rounded-l-xl hover:bg-gray-100"
                          disabled={currentPage === 1}
                      >
                          {"<"}
                      </button>
                      <button type="button" class="w-full p-4 text-base text-indigo-500 bg-white border-t border-b ">
                          {currentPage}
                      </button>
                      <button
                          type="button"
                          onClick={() => paginate(currentPage + 1)}
                          class="w-full p-4 text-base text-gray-600 bg-white border-t border-b border-r rounded-r-xl hover:bg-gray-100"
                          disabled={indexOfLastUser >= users.length}
                      >
                          {">"}
                      </button>
                  </div>
              </div>
          </div>

      )
}
export default Admin