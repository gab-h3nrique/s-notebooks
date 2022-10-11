/* components */

/* components */

export interface UserNotes {
      id: Number;
      title: String,
      description: String
}


export default function Card({notes}:any) {
  const {id, title, description,}:UserNotes = notes;
  return (
    <>
      <div className="default-card">
          <div className="default-content">
              
                  <div className="">
                  <div className="text-sm">
                      {description}
                    </div>
                  </div>

                  <div className="">
                    <div className="text-sm">
                      {description}
                    </div>
                  </div>

                  <div className="">
                  <div className="text-sm">
                      {description}
                    </div>
                  </div>

             
          </div>
      </div>
    </>
  )
}

// CARD ANTIGO

// export default function Card({notes}:any) {
//   const {id, title, description,}:UserNotes = notes;
//   return (
//     <>
//       <div className="default-card">
//           <div className="default-content">
//               <div className="flex flex-col h-full w-full space-y-5 ">

//                   <div className="default-title  w-full h-5">
//                     {title}
//                   </div>

//                   <div className="default-font h-full !text-clip overflow-hidden ">
//                     <div className="text-sm">
//                       {description}
//                     </div>
//                   </div>

//                   <div className="h-5 w-full !self-end justify-end">
//                       <div className="default-title text-sm text-right">
//                         15 hours ago
//                       </div>
//                   </div>

//               </div>
//           </div>
//       </div>
//     </>
//   )
// }
