import React, { useEffect, useState } from "react";

// it provide more social logins like: amazon, github, linkedin
import { LoginSocialGoogle, LoginSocialFacebook } from "reactjs-social-login";

// it provide more social login buttons like: amazon, github, linkedin
import {
  GoogleLoginButton,
  FacebookLoginButton,
} from "react-social-login-buttons";

import "dotenv/config";
import axios from "axios";

const Home = () => {

  
  // in this you will get user profile object
  // this will also provide you an access token, send it to backend with provider name
  const [provider, setProvider] = useState("");
  console.log("provider :", provider);

  // in this you will get user profile provider
  // i.e google, facebook, apple, linkedin
  const [profile, setProfile] = useState(null);
  console.log("profile :", profile);

  const baseUrl = "http://localhost:5002"; // backend server url

  useEffect(() => {
    const socialLogin = async () => {
      if (!provider) {
        console.log("provider is missing");
        return;
      }

      if (!profile) {
        console.log("profile is missing");
        return;
      }

      try {
        // /api/v1/google-login
        // /api/v1/facebook-login
        const response = await axios.post(
          `${baseUrl}/api/v1/${provider}-login`,
          {
            accessToken: profile.accessToken,
          },
          {
            withCredentials: true,
          }
        );

        console.log(response.data.profile); // user authenticated data now save in context api or redux and use
      
      } catch (error) {
        console.log("error: ", error);
      }
    };

    socialLogin();
  }, [profile, provider]);

  return (
    <>
      {/* facebook */}

      <LoginSocialFacebook
        isOnlyGetToken
        appId={process.env.FACEBOOK_APP_ID || ""} // get your id from your google cloud console account
        onResolve={({ provider, data }) => {
          setProvider(provider);
          setProfile(data);
        }}
        onReject={(err) => {
          console.log(err);
        }}
      >
        <FacebookLoginButton />
      </LoginSocialFacebook>

      {/* google */}
      <LoginSocialGoogle
        isOnlyGetToken
        client_id={process.env.GOOGLE_APP_ID || ""} // get your id from your facebook meta for developers account
        onResolve={({ provider, data }) => {
          setProvider(provider);
          setProfile(data);
        }}
        onReject={(err) => {
          console.log(err);
        }}
      >
        <GoogleLoginButton />
      </LoginSocialGoogle>
    </>
  );
};

export default Home;
