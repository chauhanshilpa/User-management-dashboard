import React from 'react'

const Pagination = () => {
    return (
        <div className='pagination'>
            <span className='pageBox'><svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m15 19-7-7 7-7" />
            </svg>
            </span>
            {[1, 2, 3].map((pageNum: number) => <div>
                <span className='pageBox pageNumber'>{pageNum}</span>
            </div>
            )}
            <span className='pageBox'><svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 5 7 7-7 7" />
            </svg>
            </span>
        </div>
    )
}

export default Pagination
