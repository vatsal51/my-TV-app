import React from 'react'

 const Pagination = ({page,setPage}) => {
    const Previous = () => {
        if (page !== 1) {
          setPage(page - 1);
        } else {
          setPage(page);
        }
       
      };
    
      const Next = () => {
        // if (page < 10) {
          setPage(page + 1);
        // }
        
      };
    
  return (
    <>
    <div className="my-3 d-flex justify-content-between align-items-center">
      <button
        className="px-3 py-1 m-1 text-center btn btn-light"
        onClick={Previous}
      >
        <i class="bi bi-caret-left"></i>
        Previous
      </button>
      <button
        className="px-3 py-1 m-1 text-center btn btn-light"
        onClick={Next}
      >
        Next
        <i class="bi bi-caret-right"></i>
      </button>
    </div>
  </>
  )
}
 
export default Pagination;