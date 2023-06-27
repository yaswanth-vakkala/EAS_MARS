import { Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Paginate = ({
  pages,
  page,
  isAdmin = false,
  keyword = '',
  isFinanceDepartment = false,
  isProject = false,
}) => {
  return (
    pages > 1 && (
      <Pagination>
        <LinkContainer
          to={
            !isAdmin
              ? isFinanceDepartment
                ? keyword
                  ? `/userlist/search/${keyword}/page/1`
                  : '/userlist/page/1'
                : keyword
                ? `/${keyword}/page/1`
                : `/page/1`
              : isProject
              ? keyword
                ? `/admin/projectlist/search/${keyword}/page/1`
                : `/admin/projectlist/page/1`
              : keyword
              ? `/admin/userlist/search/${keyword}/page/1`
              : `/admin/userlist/page/1`
          }
        >
          <Pagination.First />
        </LinkContainer>
        <LinkContainer
          to={
            !isAdmin
              ? isFinanceDepartment
                ? keyword
                  ? `/userlist/search/${keyword}/page/${page - 1}`
                  : `/userlist/page/${page - 1}`
                : keyword
                ? `/${keyword}/page/${page - 1}`
                : `/page/${page - 1}`
              : isProject
              ? keyword
                ? `/admin/projectlist/search/${keyword}/page/${page - 1}`
                : `/admin/projectlist/page/${page - 1}`
              : keyword
              ? `/admin/userlist/search/${keyword}/page/${page - 1}`
              : `/admin/userlist/page/${page - 1}`
          }
        >
          <Pagination.Prev />
        </LinkContainer>
        {/* {[...Array(pages).keys()].map((x) => (
          <LinkContainer
            key={x + 1}
            to={
              !isAdmin
                ? keyword
                  ? `/${keyword}/page/${x + 1}`
                  : `/page/${x + 1}`
                : keyword
                ? `/admin/userlist/search/${keyword}/page/${x + 1}`
                : `/admin/userlist/page/${x + 1}`
            }
          >
            <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
          </LinkContainer>
        ))} */}
        <LinkContainer
          key={page}
          to={
            !isAdmin
              ? isFinanceDepartment
                ? keyword
                  ? `/userlist/search/${keyword}/page/${page}`
                  : `/userlist/page/${page}`
                : keyword
                ? `/${keyword}/page/${page}`
                : `/page/${page}`
              : isProject
              ? keyword
                ? `/admin/projectlist/search/${keyword}/page/${page}`
                : `/admin/projectlist/page/${page}`
              : keyword
              ? `/admin/userlist/search/${keyword}/page/${page}`
              : `/admin/userlist/page/${page}`
          }
        >
          <Pagination.Item active={page === page}>{page}</Pagination.Item>
        </LinkContainer>
        {page < pages && (
          <LinkContainer
            key={page + 1}
            to={
              !isAdmin
                ? isFinanceDepartment
                  ? keyword
                    ? `/userlist/search/${keyword}/page/${page + 1}`
                    : `/userlist/page/${page + 1}`
                  : keyword
                  ? `/${keyword}/page/${page + 1}`
                  : `/page/${page + 1}`
                : isProject
                ? keyword
                  ? `/admin/projectlist/search/${keyword}/page/${page + 1}`
                  : `/admin/projectlist/page/${page + 1}`
                : keyword
                ? `/admin/userlist/search/${keyword}/page/${page + 1}`
                : `/admin/userlist/page/${page + 1}`
            }
          >
            <Pagination.Item active={page === page + 1}>
              {page + 1}
            </Pagination.Item>
          </LinkContainer>
        )}
        {page < pages - 1 && (
          <LinkContainer
            key={page + 2}
            to={
              !isAdmin
                ? isFinanceDepartment
                  ? keyword
                    ? `/userlist/search/${keyword}/page/${page + 2}`
                    : `/userlist/page/${page + 2}`
                  : keyword
                  ? `/${keyword}/page/${page + 2}`
                  : `/page/${page + 2}`
                : isProject
                ? keyword
                  ? `/admin/projectlist/search/${keyword}/page/${page + 2}`
                  : `/admin/projectlist/page/${page + 2}`
                : keyword
                ? `/admin/userlist/search/${keyword}/page/${page + 2}`
                : `/admin/userlist/page/${page + 2}`
            }
          >
            <Pagination.Item active={page === page + 2}>
              {page + 2}
            </Pagination.Item>
          </LinkContainer>
        )}
        {page < pages - 2 && (
          <LinkContainer
            key={page + 3}
            to={
              !isAdmin
                ? isFinanceDepartment
                  ? keyword
                    ? `/userlist/search/${keyword}/page/${page + 3}`
                    : `/userlist/page/${page + 3}`
                  : keyword
                  ? `/${keyword}/page/${page + 3}`
                  : `/page/${page + 3}`
                : isProject
                ? keyword
                  ? `/admin/projectlist/search/${keyword}/page/${page + 3}`
                  : `/admin/projectlist/page/${page + 3}`
                : keyword
                ? `/admin/userlist/search/${keyword}/page/${page + 3}`
                : `/admin/userlist/page/${page + 3}`
            }
          >
            <Pagination.Item active={page === page + 3}>
              {page + 3}
            </Pagination.Item>
          </LinkContainer>
        )}
        {page < pages - 3 && (
          <LinkContainer
            key={page + 4}
            to={
              !isAdmin
                ? isFinanceDepartment
                  ? keyword
                    ? `/userlist/search/${keyword}/page/${page + 4}`
                    : `/userlist/page/${page + 4}`
                  : keyword
                  ? `/${keyword}/page/${page + 4}`
                  : `/page/${page + 4}`
                : isProject
                ? keyword
                  ? `/admin/projectlist/search/${keyword}/page/${page + 4}`
                  : `/admin/projectlist/page/${page + 4}`
                : keyword
                ? `/admin/userlist/search/${keyword}/page/${page + 4}`
                : `/admin/userlist/page/${page + 4}`
            }
          >
            <Pagination.Item active={page === page + 4}>
              {page + 4}
            </Pagination.Item>
          </LinkContainer>
        )}

        <LinkContainer
          to={
            !isAdmin
              ? isFinanceDepartment
                ? keyword
                  ? `/userlist/search/${keyword}/page/${page + 1}`
                  : `/userlist/page/${page + 1}`
                : keyword
                ? `/${keyword}/page/${page + 1}`
                : `/page/${page + 1}`
              : isProject
              ? keyword
                ? `/admin/projectlist/search/${keyword}/page/${page + 1}`
                : `/admin/projectlist/page/${page + 1}`
              : keyword
              ? `/admin/userlist/search/${keyword}/page/${page + 1}`
              : `/admin/userlist/page/${page + 1}`
          }
        >
          <Pagination.Next />
        </LinkContainer>
        <LinkContainer
          to={
            !isAdmin
              ? isFinanceDepartment
                ? keyword
                  ? `/userlist/search/${keyword}/page/${pages}`
                  : `/userlist/page/${pages}`
                : keyword
                ? `/${keyword}/page/${pages}`
                : `/page/${pages}`
              : isProject
              ? keyword
                ? `/admin/projectlist/search/${keyword}/page/${page}`
                : `/admin/projectlist/page/${pages}`
              : keyword
              ? `/admin/userlist/search/${keyword}/page/${pages}`
              : `/admin/userlist/page/${pages}`
          }
        >
          <Pagination.Last />
        </LinkContainer>
      </Pagination>
    )
  );
};

export default Paginate;
