import axios from 'axios';
import { ReqAuth, SocialLogin } from '@/lib/types';

export const baseAxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const getNaverAuth = (req: ReqAuth) => {
  const baseURL = 'https://nid.naver.com/oauth2.0/authorize';
  window.location.href=`${baseURL}?response_type=${req.code}&client_id=${req.client_id}&redirect_uri=${req.redirect_uri}&state=${req.state}`
};

export const getKakaoAuth = async (req: ReqAuth) => {
  const baseURL = 'https://kauth.kakao.com/oauth/authorize';
  window.location.href=`${baseURL}?response_type=${req.code}&client_id=${req.client_id}&redirect_uri=${req.redirect_uri}`
}

export const login = async (reqbody: SocialLogin) => {
  try{
    const resTokenApi = await getAccessToken(reqbody);
    const {token, userId} = resTokenApi;
    const resUserInfo = await getUserInfo(token);
    console.log(resUserInfo)
  }catch(error){
    console.error(error);
  }
} 
export const getAccessToken = async (reqbody: SocialLogin) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  const resTokenAPI = await baseAxiosInstance.post('/memberLogin', reqbody, {headers});
  const token = resTokenAPI.headers.authorization;
  const userId = resTokenAPI.data.userId;
  console.log(resTokenAPI);
  console.log(token);
  console.log(userId);
  return {token, userId}
  //const resUserInfo = await getUserInfo(accessToken);
  //console.log(resUserInfo);
  //let userInfo = {...resUserInfo.data, id: userId};
  //console.log(userInfo);
  //return {accessToken, userInfo};
}

export const getUserInfo = async (token: string) => {
  const headers = {
    'Authorization' : token,
    //'Authorization' : 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0QGdtYWlsLmNvbSIsInByb3ZpZGVyVHlwZSI6IkRFRkFVTFQiLCJleHAiOjE2OTQ5NjY4Mjh9.Ls1wnxU41I99ijXRyKfkYI2w3kd-Q_qA2QgCLgpDTKk'
  }
  //const res = await baseAxiosInstance.get('/member/mypage',{headers});
  const res = baseAxiosInstance.get('/member/mypage', {
    headers: {
      Authorization: token
    }
  })
  console.log(res);
  return res;
}