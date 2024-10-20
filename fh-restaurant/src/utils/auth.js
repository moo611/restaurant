// src/utils/auth.js
export function setUser(user) {
  localStorage.setItem('user', user);
}

export function getUser() {
  return localStorage.getItem('user');
}
export function setToken(token){
  localStorage.setItem('token',token)
}

export function getToken(){
  return localStorage.getItem('token')
}


export function clear() {
  localStorage.removeItem('user');
  localStorage.removeItem('token')
  
}


