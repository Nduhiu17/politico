const logout = () => {
  localStorage.clear()
   window.location.replace("signin.html");//redirecting to sign in  page after a successful logout
}