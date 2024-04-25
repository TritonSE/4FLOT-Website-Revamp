"use client";
import Box from "@mui/material/Box";
import {
  DataGrid,
  GridColDef,
  GridEventListener,
  GridRowClassNameParams,
  GridCellParams,
  GridRowId,
  GridRowModel,
} from "@mui/x-data-grid";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import AlertBanner from "@/components/AlertBanner";
import EmailCopyBtn from "@/components/EmailCopyBtn";
import RowCopyBtn from "@/components/RowCopyBtn";
import RowDeleteBtn from "@/components/RowDeleteBtn";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { getAllMailingListEntries,MailingListEntries,deleteMailingListEntry } from '@/api/mailinglistentries'; // Import your MailingListEntry type




export default function MailingList() {

  const columns: GridColDef<(typeof rows)[number]>[] = [
    {
      field: "lastName",
      headerName: "Last name",
      width: 280,
      editable: false,
      resizable: false,
      headerClassName: `${styles.headingBackground} ${styles.cellBorderStyle} ${styles.Headings}`,
      cellClassName: `${styles.cellEntry} ${styles.cellBorderStyle}`,
      disableColumnMenu: true,
      renderHeader: () => <div>Last Name</div>,
    },
    {
      field: "firstName",
      headerName: "First Name",
      width: 280,
      editable: false,
      resizable: false,
      headerClassName: `${styles.Headings} ${styles.headingBackground} ${styles.cellBorderStyle}`,
      cellClassName: `${styles.cellEntry} ${styles.cellBorderStyle}`,
      disableColumnMenu: true,
      renderHeader: () => <div>First Name</div>,
    },

    {
      field: "memberSince",
      headerName: "Member Since",
      width: 280,
      editable: false,
      resizable: false,
      headerClassName: `${styles.Headings} ${styles.headingBackground} ${styles.cellBorderStyle}`,
      cellClassName: `${styles.cellEntry} ${styles.cellBorderStyle}`,
      disableColumnMenu: true,
      renderHeader: () => <div>Member Since</div>,
    },

    {
      field: "email",
      headerName: "Email",
      width: 280,
      sortable: false,
      editable: false,
      resizable: false,
      flex: 1,
      headerClassName: `${styles.Headings} ${styles.headingBackground}`,
      cellClassName: styles.cellEntry,
      disableColumnMenu: true,
      renderHeader: () => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ marginRight: "180px" }}>Email</div>
          <EmailCopyBtn onClick={handleCopyEmails} onHover={handleEmailHover}/>
        </div>
      ),
    },
  ];

  const [rows, setRow] = useState<MailingListEntries[]>([]);

  useEffect(() => {
    getAllMailingListEntries()
      .then(result => {
        if (result.success) {
          console.log('Data:', result.data); // Log the data
          setRow(result.data);
        } else {
          console.error('ERROR:', result.error); // Log any errors
        }
      });
  }, []);


  const [rowsCurrent, setRowsCurrent] = React.useState(rows);

  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const [filteredRows, setRows] = useState<{ id: number; lastName: string; firstName: string; memberSince: string; email: string; }[]>([]);

  const handleEmailHover = (hovering: boolean) => {
    if (hovering) {
      setHover(true);
    } else {
      setHover(false);
    }
  };

  const handleSearch = () => {
    const searchTerms = searchTerm.toLowerCase().split(' ');
  
    let filteredRows = rows.filter((row) => {
      const firstName = row.firstName.toLowerCase();
      const lastName = row.lastName.toLowerCase();
  
      return searchTerms.every((term) => firstName.includes(term) || lastName.includes(term));
    });
  
    if (filteredRows.length !== rows.length) {
      setRowsCurrent(filteredRows);
    }
  

    if (searchTerm === "") {
      setRowsCurrent(rows);
    }
  
    console.log("filteredRows:", rowsCurrent);
  };
  const [alertType, setAlertType] = useState("");
  const [hover, setHover] = useState(false);
  const [selectedRow, setSelectedRow] = useState<GridRowId | null>(null);


  const handleCellClick: GridEventListener<"rowClick"> = (
    params, // GridRowParams
  ) => {
    setSelectedRow(params.id === selectedRow ? null : params.id);
  };


  const getCellClassName = (params: GridCellParams) => {
    let colClasses = "";
    if (params.colDef.field === "email" && hover) {
      colClasses += ` ${styles.selectedCol}`;
      if (params.id === 2) {
        colClasses += ` ${styles.selectedColStart}`;
      }
      if (params.id === 14) {
        colClasses += ` ${styles.selectedColEnd}`;
      }
    }
    return colClasses;
  };

  const getRowClassName = (params: GridRowClassNameParams) => {
    let rowClasses = "";
  
    // Add alternating row colors
    rowClasses += params.indexRelativeToCurrentPage % 2 === 0 ? styles.evenRow : styles.oddRow;
  
    // Add border to the selected row
    if (selectedRow === params.id) {
      rowClasses += ` ${styles.selectedRow}`;
    }
    return rowClasses;
  };

  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [totalPages, setTotalPages] = useState(Math.ceil(rows.length / 14)); // Calculate total pages
  const [showAlert, setShowAlert] = useState(false);

  const handleCopyEmails = () => {
    const emailsToCopy = () => {
      const values = rows.map((row) => row.email);
      const copiedText = values.join("\n");
      return copiedText;
    };
    navigator.clipboard
      .writeText(emailsToCopy())
      .then(() => {
        setAlertType("copyEmails");
        setShowAlert(true);
      })
      .catch((error) => {
        console.error("Error copying text: ", error);
        // You can optionally show an error message here
      });
  };

  const selectedRowContents = rows.find((row) => row.id === selectedRow);
  const email = selectedRowContents !== undefined ? selectedRowContents.email : "";

  const handleCopyRow = () => {
    const rowToCopy = () => {
      return "TODO: implement copying the current row selection";
    };
    navigator.clipboard
      
      .writeText(email)
      .then(() => {
        setAlertType("copyRow");
        setShowAlert(true);
      })
      .catch((error) => {
        console.error("Error copying text: ", error);
        // You can optionally show an error message here
      });
  };

  const handleDeleteRow = () => {
    if (selectedRow !== null) {
      const selectedRowData = rows.find((row) => row.id === selectedRow);
      if (selectedRowData) {
        // Store a copy of the row data before deletion
        const deletedRowCopy = { ...selectedRowData };

        
        // Make an API call to delete the row
        console.log("selectedRowData:", selectedRowData._id);
        deleteMailingListEntry(selectedRowData._id)
          .then((response) => {
            if (response.success) {
              // Remove the deleted row from the local state
              setRow((prevRows) => prevRows.filter((row) => row.id !== selectedRow));
              
              // Optionally, show an alert/banner indicating successful deletion
              setAlertType("deleteRow");
              setShowAlert(true);
            } else {
              // Handle error response from API
              console.error("Error deleting row:", response.error);
              // Optionally, show an error message
            }
          })
          .catch((error) => {
            console.error("Error deleting row:", error);
            // Optionally, show an error message
          });
      }
    }
  };
  
  const handleUndoDelete = () => {
    alert("TODO: implement undo delete (need backend to be completed first)");
    setAlertType("");
    setShowAlert(false);
  };

  const handleCloseAlert = () => {
    setAlertType("");
    setShowAlert(false);
  };

  useEffect(() => {
    // Update total pages when rows change
    setTotalPages(Math.ceil(rows.length / 14));
  }, [rows]);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const alertContent = () => {
    switch (alertType) {
      case "copyEmails":
        return {
          text: "Emails copied to clipboard",
          icon: "/copy_icon_dark.svg",
        };
      case "copyRow":
        return { text: "Contact copied", icon: "/copy_icon_dark.svg" };
      case "deleteRow":
        return { text: "Contact deleted", icon: "/trash_icon_dark.svg", undo: handleUndoDelete };
      default:
        alert("Error: Unknown alert type");
        return { text: "", icon: "" };
    }
  };


  React.useEffect(() => {
    handleSearch();}); 

  return (
    <Box sx={{ height: 720, width: 1119 }}>
      {showAlert && (
        <AlertBanner
          text={alertContent().text}
          img={alertContent().icon}
          undo={alertContent().undo}
          onClose={handleCloseAlert}
        />
      )}
      <Box sx={{ 
        my: 5, 
        display: "flex", 
        flexDirection: "row", 
        justifyContent: "flex-end", 
        alignItems: "center" 
      }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '8px' 
        }}>
          {selectedRow !== null && <RowCopyBtn onClick={handleCopyRow} />}
          {selectedRow !== null && <RowDeleteBtn onClick={handleDeleteRow} />}
          <div style={{ 
            display: 'flex', 
            width: '256px', 
            padding: '8px', 
            alignItems: 'center', 
            gap: '8px', 
            borderRadius: '4px', 
            border: '1px solid #D8D8D8', 
            background: '#FFF', 
            position: 'relative', 
            marginLeft: '16px',
          }}>
            <input
              type="text"
              placeholder="Search By Name..."
              onChange={(e) => {
                setSearchTerm(e.target.value);
                console.log("searchTerm:", e.target.value);
                // handleSearch();
              }}
              style={{ 
                paddingLeft: '30px', 
                border: 'none', 
                flex: '1',
                color: '#484848',
                fontFamily: 'Open Sans',
                fontSize: '16px',
                fontStyle: 'normal',
                fontWeight: '400',
                lineHeight: '24px'
              }} // Make room for the image
            />
            <img 
              src="/ic_search.png" 
              alt="search icon" 
              style={{ 
                position: 'absolute', 
                left: '8px', 
                top: '50%', 
                transform: 'translateY(-50%)', 
                height: '20px', 
                width: '20px' 
              }} 
            />
          </div>
        </div>
      </Box>
      <DataGrid
        columns={columns}
        rows={rowsCurrent.slice((currentPage - 1) * 14, currentPage * 14)}
        autoHeight
        rowHeight={48}
        hideFooter
        rowSelectionModel={selectedRow !== null ? [selectedRow] : []}
        onCellClick={handleCellClick}
        getRowClassName={getRowClassName} // Here's where you pass the function
        getCellClassName={getCellClassName}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 14, // Set page size
            },
          },
        }}
        sx={{
          "& .MuiDataGrid-row:hover": {
            background: "rgba(105, 76, 151, 0.05)",
          },
        }}
        disableRowSelectionOnClick
      />
      <Box
        sx={{ width: 245, height: 32, position: "relative", gap: 16, marginLeft: 53, marginTop: 5 }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontFamily: "Open Sans",
            fontWeight: 400,
            fontSize: "16px",
            lineHeight: "24px",
            color: "#909090",
          }}
        >
          <Image
            src="/ic_caretleft.svg" //
            alt="Previous page"
            width={24}
            height={24}
            className={styles.arrow}
            onClick={handlePreviousPage}
            style={{ marginRight: 15, opacity: currentPage === 1 ? 0.5 : 1 }} // Adjust opacity for disabled state
          />
          <span style={{ marginRight: "15px" }}>Page </span>
          <div
            style={{
              display: "inline-block",
              padding: "2px 11px",
              margin: "0 5px",
              fontFamily: "Open Sans",
              fontWeight: 400,
              fontSize: "16px",
              lineHeight: "24px",
              color: "#000000",
              borderRadius: "4px",
              border: "1px solid #D8D8D8",
            }}
          >
            {currentPage}
          </div>
          <span style={{ marginLeft: "15px" }}> of </span>
          <span style={{ marginLeft: "15px" }}> {totalPages}</span>
          <Image
            src="/ic_caretright.svg"
            alt="Next page"
            width={24}
            height={24}
            className={styles.arrow}
            onClick={handleNextPage}
            style={{ marginLeft: 15, opacity: currentPage === totalPages ? 0.5 : 1 }} // Adjust opacity for disabled state
          />
        </div>
      </Box>
    </Box>
  );
}
