"use client";
import Box from "@mui/material/Box";
import {
  DataGrid,
  GridColDef,
  GridEventListener,
  GridRowClassNameParams,
  GridRowId,
} from "@mui/x-data-grid";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import styles from "./page.module.css";

import AlertBanner from "@/components/AlertBanner";
import EmailCopyBtn from "@/components/EmailCopyBtn";
import RowCopyBtn from "@/components/RowCopyBtn";
import RowDeleteBtn from "@/components/RowDeleteBtn";

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
          <EmailCopyBtn onClick={handleCopyEmails} />
        </div>
      ),
    },
  ];

  const rows = [
    {
      id: 1,
      lastName: "Snow",
      firstName: "Jon",
      memberSince: "2021-10-10",
      email: "tsejenny4flot@gmail.com",
    },
    {
      id: 2,
      lastName: "Lannister",
      firstName: "Cersei",
      memberSince: "2021-10-10",
      email: "tsekev4flot@gmail.com",
    },
    {
      id: 3,
      lastName: "Lannister",
      firstName: "Jaime",
      memberSince: "2021-10-10",
      email: "tsesophia4flot@gmail.com",
    },
    {
      id: 4,
      lastName: "Stark",
      firstName: "Arya",
      memberSince: "2021-10-10",
      email: "tsejen4flot@gmail.com",
    },
    {
      id: 5,
      lastName: "Targaryen",
      firstName: "Daenerys",
      memberSince: "2021-10-10",
      email: "tsekevin4flot@gmail.com",
    },
    {
      id: 6,
      lastName: "Melisandre",
      firstName: "bacad",
      memberSince: "2021-10-10",
      email: "tsesophia4flot@gmail.com",
    },
    {
      id: 7,
      lastName: "Clifford",
      firstName: "Ferrara",
      memberSince: "2021-10-10",
      email: "tseabc4flot@gmail.com",
    },
    {
      id: 8,
      lastName: "Frances",
      firstName: "Rossini",
      memberSince: "2021-10-10",
      email: "tsevaia4flot@gmail.com",
    },
    {
      id: 9,
      lastName: "Roxie",
      firstName: "Harvey",
      memberSince: "2021-10-10",
      email: "tsebcdadf4flot@gmail.com",
    },
    {
      id: 10,
      lastName: "Melisandre",
      firstName: "konichiwa",
      memberSince: "2021-10-10",
      email: "tsesophia4flot@gmail.com",
    },
    {
      id: 11,
      lastName: "Clifford",
      firstName: "Ferrara",
      memberSince: "2021-10-10",
      email: "tseabc4flot@gmail.com",
    },
    {
      id: 12,
      lastName: "Frances",
      firstName: "Rossini",
      memberSince: "2021-10-10",
      email: "tsevaia4flot@gmail.com",
    },
    {
      id: 13,
      lastName: "Roxie",
      firstName: "Harvey",
      memberSince: "2021-10-10",
      email: "tsebcdadf4flot@gmail.com",
    },
    {
      id: 14,
      lastName: "Melisandre",
      firstName: "bakakaka",
      memberSince: "2021-10-10",
      email: "tsesophia4flot@gmail.com",
    },
    {
      id: 15,
      lastName: "Clifford",
      firstName: "Ferrara",
      memberSince: "2021-10-10",
      email: "tseabc4flot@gmail.com",
    },
    {
      id: 16,
      lastName: "Frances",
      firstName: "Rossini",
      memberSince: "2021-10-10",
      email: "tsevaia4flot@gmail.com",
    },
    {
      id: 17,
      lastName: "Roxie",
      firstName: "Harvey",
      memberSince: "2021-10-10",
      email: "tsebcdadf4flot@gmail.com",
    },
  ];

  const [selectedRow, setSelectedRow] = React.useState<GridRowId | null>(null);

  const handleCellClick: GridEventListener<"rowClick"> = (
    params, // GridRowParams
  ) => {
    setSelectedRow(params.id === selectedRow ? null : params.id);
  };

  const getRowClassName = (params: GridRowClassNameParams) => {
    let rowClasses = "";

    // Add alternating row colors
    rowClasses += params.indexRelativeToCurrentPage % 2 === 0 ? "evenRow" : "oddRow";

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
        setShowAlert(true);
      })
      .catch((error) => {
        console.error("Error copying text: ", error);
        // You can optionally show an error message here
      });
  };

  const handleCopyRow = () => {
    const rowToCopy = () => {
      return "TODO: implement copying the current row selection";
    };
    navigator.clipboard
      .writeText(rowToCopy())
      .then(() => {
        setShowAlert(true);
      })
      .catch((error) => {
        console.error("Error copying text: ", error);
        // You can optionally show an error message here
      });
  };

  const handleDeleteRow = () => {
    console.log("TODO: implement delete row");
  };

  const handleCloseAlert = () => {
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

  return (
    <Box sx={{ height: 720, width: 1119 }}>
      {showAlert && (
        <AlertBanner
          text="Copied to clipboard"
          img="/copy_icon_dark.svg"
          onClose={handleCloseAlert}
        />
      )}
      <Box sx={{ my: 5, display: "flex", flexDirection: "row", justifyContent: "flex-end" }}>
        {selectedRow !== null && <RowCopyBtn onClick={handleCopyRow} />}
        {selectedRow !== null && <RowDeleteBtn onClick={handleDeleteRow} />}
        <div>
          <h4>Insert search bar</h4>
        </div>
      </Box>
      <DataGrid
        columns={columns}
        rows={rows.slice((currentPage - 1) * 14, currentPage * 14)}
        autoHeight
        rowHeight={48}
        hideFooter
        rowSelectionModel={selectedRow !== null ? [selectedRow] : []}
        onCellClick={handleCellClick}
        getRowClassName={getRowClassName}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 14, // Set page size
            },
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
