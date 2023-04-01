import React, { useState } from "react";
import NewProduct from "../components/Profile/NewProduct";
import { useQuery } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import Product from "../components/Profile/Product";
import Auth from "../utils/jwt-auth";
import fabricBg from "../Images/fabricbackground.jpg";
import woodBg from "../Images/Tileable-Wood-Texture.jpg";

function Profile() {
  const [userData, setUserData] = useState(null);

  if (!Auth.loggedIn()) {
    window.location.replace('/login');
  };

  useQuery(GET_ME, {
    onCompleted: (data) => setUserData(data.me),
  });

  const handleDeleteProduct = (productId) => {
    // Filter out the product with the given ID
    const updatedProducts = userData.products.filter(product => product._id !== productId);
    setUserData({
      ...userData,
      products: updatedProducts,
    });
  };

  const handleAddProduct = ({addProduct}) => {
    const currentProducts = userData.products;
    currentProducts.push(addProduct);
    setUserData({
      ...userData,
      products: currentProducts,
    });
  };

  return (
    <div className="font">
      {!userData ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-8 text-center">
          <div className="col-span-8 lg:col-span-2 bg-stone-800">
            <div className="flex flex-col p-3 mx-3 text-white py-4">
              <div className="flex flex-col">
                <h2 className="text-4xl font-iight text-white my-3 border-b pb-2" >ACCOUNT</h2>
                <img
                  className="rounded-full w-28 m-auto"
                  src="https://storage.googleapis.com/farmers-market-images/1680277238037-farmlogo.webp"
                  alt="farm logo"
                >
                </img>
                <ul className="m-auto">
                  <li>Username: {userData.username}</li>
                  <li>email: {userData.email}</li>
                </ul>
              </div>
              {!userData.merchant ? null : (
                <ul className="mt-8">
                  <li className="text-4xl font-iight text-white my-3 border-b pb-2" >{userData.business_name}</li>
                  <li><img className="m-auto" src={userData.image} alt={userData.business_name}></img></li>
                  <li><p className="my-5">{userData.business_description}</p></li>
                  <li className="text-sm font-bold">CONTACT: {userData.phone_number}</li>

                </ul>

              )}


            </div>

          </div>
          <div className="col-span-8 lg:col-span-6 mx-auto"
            style={{
              backgroundImage: `url(${fabricBg})`,
              backgroundSize: '28rem',
              backgroundRepeat: 'repeat',
            }}>

            <h2 className="text-6xl text-black shadow-lg h-28 shadow-black font-bold pt-7"
              style={{
                backgroundImage: `url(${woodBg})`,
                backgroundSize: '18rem',
                backgroundRepeat: 'repeat',
              }}
            >
              INVENTORY
            </h2>
            {!userData.merchant ? null : (
              <div className="flex flex-col justify-center py-4 rounded-2xl">

                <NewProduct onAddProduct={handleAddProduct}/>
                {userData.products.length ? (
                  <div className="flex flex-row flex-wrap">
                    {userData.products.map((product) => (
                      <Product key={product._id} product={product} onDeleteProduct={handleDeleteProduct} />
                    ))}
                  </div>
                ) :
                  (
                    <p>You have no products</p>
                  )}

              </div>
            )}
            <div className="flex flex-col justify-center my-20 py-4 rounded-2xl">
              <h2 className="text-3xl font-bold pb-5 underline" >My Purchases</h2>
              {userData.purchases.length ? null : (
                <p>You have made no purchases</p>
              )}
            </div>

          </div>
        </div>

      )}
    </div>
  )

}

export default Profile;