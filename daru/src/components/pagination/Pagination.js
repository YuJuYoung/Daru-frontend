import { useState } from 'react';

function Pagination(props) {
  const [pagination] = useState(() => {
    const curPage = props.pagination.curPage;
    const totalPage = props.pagination.totalPage;
    const maxPageCnt = props.pagination.maxPageCnt;

    let startPage = 1;
    let endPage = 1;

    if (totalPage <= maxPageCnt) {
      startPage = 1;
      endPage = totalPage;
    } else {
      let startPage = curPage - maxPageCnt / 2;
      let endPage = curPage + maxPageCnt - (maxPageCnt / 2 + 1);

      if (startPage < 1) {
        endPage += 1 - startPage;
        startPage = 1;
      }
      if (endPage > totalPage) {
        startPage -= endPage - totalPage;
        endPage = totalPage;
      }

      startPage = 1;
      endPage = totalPage;
    }

    return {
      curPage: curPage,
      totalPage: totalPage,
      maxPageCnt: maxPageCnt,
      startPage: startPage,
      endPage: endPage
    };
  });

  return (
    <div className="Pagination">
      <nav aria-label="Page navigation">
        <div className="mb-4">
          <ul className="pagination justify-content-center">
            <li className="page-item">
              <span className="page-link" onClick={() => props.handlePaginationClick(props.pagination.curPage - 1)}>&lt;</span>
            </li>
            {
              pagination != null
              ? Array(pagination.endPage - pagination.startPage + 1).fill().map((v, index) => pagination.startPage + index).map((page, index) => (
                  <li className="page-item" key={index}>
                    <span className="page-link" onClick={() => props.handlePaginationClick(page)}>{page}</span>
                  </li>
                ))
              : null
            }
            <li className="page-item">
              <span className="page-link" onClick={() => props.handlePaginationClick(pagination.curPage + 1)}>&gt;</span>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Pagination;