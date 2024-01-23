import React, { useState, useEffect } from "react";
import { useTable, usePagination } from "react-table";
import Modal from "react-modal";
Modal.setAppElement("#root");

const fetchUsers = async () => {
  try {
    const response = await fetch("http://localhost:5000/loadUsers");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    fetchUsers().then((data) => {
      setUsers(data);
      setFilteredUsers(data);
    });
  }, []);

  const data = React.useMemo(() => filteredUsers, [filteredUsers]);

  const columns = React.useMemo(
    () => [
      { Header: "Name", accessor: "name", style: { width: "20%" } },
      { Header: "Family Name", accessor: "family", style: { width: "20%" } },
      { Header: "Email", accessor: "email", style: { width: "30%" } },
      { Header: "Role", accessor: "role", style: { width: "20%" } },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: ({ row }) => (
          <>
            <button style={{color:'black',backgroundColor:'lightblue',marginRight:'10px',padding:'5px'}} onClick={() => handleEdit(row.original)}>Edit</button>
            <button style={{color:'black',backgroundColor:'red',padding:'5px'}} onClick={() => handleDelete(row.original.id)}>
              Delete
            </button>
          </>
        ),
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state: { pageIndex, pageSize },
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
  } = useTable(
    { columns, data, initialState: { pageIndex: 0, pageSize: 10 } },
    usePagination
  );

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleDelete = (userId) => {
    console.log(`Deleting user with ID ${userId}`);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
  };

  return (
    <div>
      <div style={{ padding: "20px" }}>
        <input
          type="text"
          placeholder="Search by name or email..."
          onChange={(e) => {
            const searchTerm = e.target.value.toLowerCase();
            const filteredUsers = users.filter(
              (user) =>
                user.name.toLowerCase().includes(searchTerm) ||
                user.email.toLowerCase().includes(searchTerm) ||
                user.family.toLowerCase().includes(searchTerm)
            );
            setFilteredUsers(filteredUsers);
          }}
        />
      </div>
      <table {...getTableProps()} style={{ width: "100%", padding: "20px" }}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  style={{ textAlign: "left", padding: "10px" }}
                  {...column.getHeaderProps()}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td style={{ padding: "10px" }} {...cell.getCellProps()}>
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div
        style={{
          padding: "20px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>
          <span>Show{"   "}</span>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[3, 10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
          <span>{"   "}entries</span>
        </div>
        <div>
          <span>
            Page {pageIndex + 1} of {pageOptions.length}
          </span>{" "}
          <button
            style={{
              padding: "5px",
              backgroundColor: "lightgreen",
              color: "black",
            }}
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
          >
            {"<<"}
          </button>{" "}
          <button
            style={{
              padding: "5px",
              backgroundColor: "lightgreen",
              color: "black",
            }}
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          >
            {"<"}
          </button>{" "}
          <button
            style={{
              padding: "5px",
              backgroundColor: "lightgreen",
              color: "black",
            }}
            onClick={() => nextPage()}
            disabled={!canNextPage}
          >
            {">"}
          </button>{" "}
          <button
            style={{
              padding: "5px",
              backgroundColor: "lightgreen",
              color: "black",
            }}
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            {">>"}
          </button>
        </div>
      </div>

      {/* Edit User Modal */}
      <Modal isOpen={isModalOpen} onRequestClose={closeModal}>
        <h2>Edit User</h2>
        {selectedUser && (
          <form onSubmit={(e) => e.preventDefault()}>
            <div>
              <label>Name:</label>
              <input
                type="text"
                value={selectedUser.name}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, name: e.target.value })
                }
              />
            </div>
            <div>
              <label>Family Name:</label>
              <input
                type="text"
                value={selectedUser.familyName}
                onChange={(e) =>
                  setSelectedUser({
                    ...selectedUser,
                    familyName: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label>Email:</label>
              <input
                type="text"
                value={selectedUser.email}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, email: e.target.value })
                }
              />
            </div>
            <div>
              <label>Role:</label>
              <input
                type="text"
                value={selectedUser.role}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, role: e.target.value })
                }
              />
            </div>
            <button type="submit">Save Changes</button>
          </form>
        )}
        <button onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
};

export default UsersTable;
