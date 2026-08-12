import crypto from 'crypto';import 'dotenv/config';
const secret=()=>process.env.JWT_SECRET||'cambiar-en-produccion';
const b64=o=>Buffer.from(JSON.stringify(o)).toString('base64url');
export function signToken(user){const h=b64({alg:'HS256',typ:'JWT'});const p=b64({sub:user.id_usuario,rol:user.rol,nombre:user.nombre,exp:Math.floor(Date.now()/1000)+8*3600});const s=crypto.createHmac('sha256',secret()).update(`${h}.${p}`).digest('base64url');return `${h}.${p}.${s}`}
export function verifyToken(token){const[h,p,s]=String(token||'').split('.');if(!h||!p||!s)throw Error('Token inválido');const ex=crypto.createHmac('sha256',secret()).update(`${h}.${p}`).digest('base64url');if(Buffer.byteLength(s)!==Buffer.byteLength(ex)||!crypto.timingSafeEqual(Buffer.from(s),Buffer.from(ex)))throw Error('Firma inválida');const data=JSON.parse(Buffer.from(p,'base64url').toString());if(data.exp<Math.floor(Date.now()/1000))throw Error('Token vencido');return data}
export function hashPassword(password,salt=crypto.randomBytes(16).toString('hex')){return `${salt}:${crypto.scryptSync(password,salt,64).toString('hex')}`}
export function comparePassword(password,stored){const[salt,hash]=String(stored).split(':');if(!salt||!hash)return false;const a=crypto.scryptSync(password,salt,64),b=Buffer.from(hash,'hex');return a.length===b.length&&crypto.timingSafeEqual(a,b)}
export function auth(req,res,next){try{req.user=verifyToken((req.headers.authorization||'').replace(/^Bearer\s+/,''));next()}catch{res.status(401).json({message:'No autorizado'})}}
export const allow=(...roles)=>(req,res,next)=>roles.includes(req.user?.rol)?next():res.status(403).json({message:'Acceso denegado'});
