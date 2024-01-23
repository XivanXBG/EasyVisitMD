import React, { useState, useEffect,useContext } from "react";
import AuthContext from "../../contexts/AuthContext";
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

  const {updateUser,deleteUser} = useContext(AuthContext);
  const [formValues, setFormValues] = useState({
    name: "",
    family: "",
    email: "",
    role: "",
  });

  // Update form values as the user types
  const handleInputChange = (field, value) => {
    setFormValues({
      ...formValues,
      [field]: value,
    });
  };

  // Function to handle form submission
  const handleFormSubmit = () => {
    // You can use formValues for further processing
    updateUser(formValues)

    // Reset form values or close modal as needed
    setFormValues({
      name: "",
      family: "",
      email: "",
      role: "",
    });
    closeModal();
  };

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
            <button
              style={{
                color: "black",
                backgroundColor: "lightblue",
                marginRight: "10px",
                padding: "5px",
              }}
              onClick={() => handleEdit(row.original)}
            >
              Edit
            </button>
            <button
              style={{ color: "black", backgroundColor: "red", padding: "5px" }}
              onClick={() => handleDelete(row.original._id)}
            >
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
    setFormValues(user); // Set form values when editing
    setIsModalOpen(true);
  };

  const handleDelete = (userId) => {
    deleteUser(userId);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setFormValues({
      name: "",
      family: "",
      email: "",
      role: "",
    });
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
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={modalStyles}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h2 style={{ marginBottom: "20px" }}>Edit User</h2>
          {selectedUser && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleFormSubmit();
              }}
              style={{ width: "100%" }}
            >
              <div style={{ marginBottom: "15px" }}>
                <label style={{ marginBottom: "5px" }}>Name:</label>
                <input
                  type="text"
                  value={formValues.name}
                  onChange={(e) =>
                    handleInputChange("name", e.target.value)
                  }
                  style={inputStyle}
                />
              </div>
              <div style={{ marginBottom: "15px" }}>
                <label style={{ marginBottom: "5px" }}>Family Name:</label>
                <input
                  type="text"
                  value={formValues.family}
                  onChange={(e) =>
                    handleInputChange("family", e.target.value)
                  }
                  style={inputStyle}
                />
              </div>
              <div style={{ marginBottom: "15px" }}>
                <label style={{ marginBottom: "5px" }}>Email:</label>
                <input
                  type="text"
                  value={formValues.email}
                  onChange={(e) =>
                    handleInputChange("email", e.target.value)
                  }
                  style={inputStyle}
                />
              </div>
              <div style={{ marginBottom: "15px" }}>
                <label style={{ marginBottom: "5px" }}>Role:</label>
                <input
                  type="text"
                  value={formValues.role}
                  onChange={(e) =>
                    handleInputChange("role", e.target.value)
                  }
                  style={inputStyle}
                />
              </div>
              <button type="submit" style={buttonStyle}>
                Save Changes
              </button>
            </form>
          )}
          <button onClick={closeModal} style={buttonStyle2}>
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
};

const modalStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  content: {
    maxWidth: "400px",
    margin: "auto",
    height: "600px",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
  },
};

const inputStyle = {
  width: "90%",
  padding: "8px",
  marginBottom: "10px",
  borderRadius: "4px",
  border: "1px solid #ccc",
};

const buttonStyle = {
  backgroundColor: "#4caf50",
  color: "white",
  padding: "10px",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

const buttonStyle2 = {
  backgroundColor: "darkred",
  color: "white",
  padding: "10px",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

export default UsersTable;
