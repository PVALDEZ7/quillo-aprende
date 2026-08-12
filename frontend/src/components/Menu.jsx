const items=[
  {view:'home',icon:'⌂',label:'Inicio'},
  {view:'student',icon:'▤',label:'Aprende'},
  {view:'teacher-login',icon:'✎',label:'Docente'},
  {view:'admin-login',icon:'⚙',label:'Administrador'}
];
export default function Menu({go}){
  return <nav className="appNav" aria-label="Navegación principal"><div className="appNavInner">
    {items.map(i=><button key={i.view} type="button" onClick={()=>go(i.view)}><span aria-hidden="true">{i.icon}</span>{i.label}</button>)}
  </div></nav>
}
