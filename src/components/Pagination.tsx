interface Props {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

const Pagination = ({ currentPage, totalPages, onPageChange }: Props) => {
  const pages: number[] = []

  let start = Math.max(1, currentPage - 2)
  let end = Math.min(totalPages, currentPage + 2)

  if (end - start < 4) {
    if (start === 1) end = Math.min(totalPages, start + 4)
    else start = Math.max(1, end - 4)
  }

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  return (
    <div className="pagination">
      <button
        className="page-btn"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        style={currentPage === 1 ? { opacity: 0.4, cursor: 'not-allowed' } : undefined}
      >
        ‹
      </button>

      {start > 1 && (
        <>
          <button className="page-btn" onClick={() => onPageChange(1)}>1</button>
          {start > 2 && <span className="page-dots">…</span>}
        </>
      )}

      {pages.map(p => (
        <button
          key={p}
          className={`page-btn ${p === currentPage ? 'active' : ''}`}
          onClick={() => onPageChange(p)}
        >
          {p}
        </button>
      ))}

      {end < totalPages && (
        <>
          {end < totalPages - 1 && <span className="page-dots">…</span>}
          <button className="page-btn" onClick={() => onPageChange(totalPages)}>{totalPages}</button>
        </>
      )}

      <button
        className="page-btn"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        style={currentPage === totalPages ? { opacity: 0.4, cursor: 'not-allowed' } : undefined}
      >
        ›
      </button>
    </div>
  )
}

export default Pagination
