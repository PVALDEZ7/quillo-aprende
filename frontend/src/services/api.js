const BASE=import.meta.env.VITE_API_URL||'http://localhost:3001/api';
async function req(path,options={}){
  const token=localStorage.getItem('quillo_token');
  const headers={'Content-Type':'application/json',...(options.headers||{})};
  if(token) headers.Authorization=`Bearer ${token}`;
  const r=await fetch(`${BASE}${path}`,{...options,headers});
  const data=await r.json().catch(()=>({}));
  if(!r.ok) throw new Error(data.message||'Error de conexión');
  return data;
}
export const api={
 catalog:()=>req('/catalog'), materials:()=>req('/materials'), challenge:id=>req(`/challenges?material_id=${id}`),
 login:(email,password)=>req('/auth/login',{method:'POST',body:JSON.stringify({email,password})}),
 createMaterial:x=>req('/materials',{method:'POST',body:JSON.stringify(x)}),
 updateMaterial:(id,x)=>req(`/materials/${id}`,{method:'PUT',body:JSON.stringify(x)}),
 deleteMaterial:id=>req(`/materials/${id}`,{method:'DELETE'}),
 users:()=>req('/users'), stats:()=>req('/stats'),
 createUser:x=>req('/users',{method:'POST',body:JSON.stringify(x)}),
 updateUser:(id,x)=>req(`/users/${id}`,{method:'PUT',body:JSON.stringify(x)}),
 deleteUser:id=>req(`/users/${id}`,{method:'DELETE'})
};
