"use client";
import Box from "@mui/material/Box";
import {
  DataGrid,
  GridCellParams,
  GridColDef,
  GridEventListener,
  GridRowClassNameParams,
  GridRowId,
} from "@mui/x-data-grid";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import styles from "./page.module.css";

import {
  Newsletter,
  getAllNewsletters
} from "@/api/newsletter";
import EmailCopyBtn from "@/components/EmailCopyBtn";
import RowCopyBtn from "@/components/RowCopyBtn";
import RowDeleteBtn from "@/components/RowDeleteBtn";

export default function MailingList() {
  const columns: GridColDef<(typeof rows)[number]>[] = [
    {
      field: "title",
      headerName: "Newsletter Title",
      width: 372.29,
      editable: false,
      resizable: false,
      headerClassName: `${styles.headingBackground} ${styles.cellBorderStyle} ${styles.Headings}`,
      cellClassName: `${styles.cellEntry} ${styles.cellBorderStyle}`,
      disableColumnMenu: true,
      renderHeader: () => <div>Newsletter Title</div>,
    },
    {
      field: "description",
      headerName: "Subtitle",
      width: 372.29,
      editable: false,
      resizable: false,
      headerClassName: `${styles.Headings} ${styles.headingBackground} ${styles.cellBorderStyle}`,
      cellClassName: `${styles.cellEntry} ${styles.cellBorderStyle}`,
      disableColumnMenu: true,
      renderHeader: () => <div>Subtitle</div>,
    },

    {
      field: "date",
      headerName: "Date",
      width: 372.29,
      editable: false,
      resizable: false,
      headerClassName: `${styles.Headings} ${styles.headingBackground} ${styles.cellBorderStyle}`,
      cellClassName: `${styles.cellEntry} ${styles.cellBorderStyle}`,
      disableColumnMenu: true,
      renderHeader: () => <div>Date</div>,
    },

  ];

  const [rows, setRow] = useState<Newsletter[]>([]);
  const [rowsCurrent, setRowsCurrent] = React.useState(rows);
  const [alertType, setAlertType] = useState("");
  const [hover, setHover] = useState(false);
  const [selectedRow, setSelectedRow] = useState<GridRowId | null>(null);
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [totalPages, setTotalPages] = useState(Math.ceil(rows.length / 14)); // Calculate total pages
  const [showAlert, setShowAlert] = useState(false);
  const [deletedRow, setDeletedRow] = useState<Newsletter | null>(null);


  useEffect(() => {
    getAllNewsletters()
      .then((result) => {
        if (result.success) {
          console.log("Data:", result.data);

          const formattedRows = result.data.map((item) => ({
            ...item,
            id: item._id.toString(),
          }));

          setRow(formattedRows);
          setRowsCurrent(formattedRows);
        } else {
          console.error("ERROR:", result.error);
        }
      })
      .catch((error) => {
        alert(error);
      });
  }, []);



  useEffect(() => {
    // Update total pages when rows change
    setTotalPages(Math.ceil(rows.length / 14));
  }, [rows]);


  const handleCellClick: GridEventListener<"rowClick"> = (params) => {
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


  return (
    <div className={styles.page}>
      <Box sx={{ height: 720, width: 1119 }}>
        <Box
          sx={{
            my: 3.5,
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >

        <button
            style={{
                position: 'relative',
                fontFamily: "Open Sans",
                fontWeight: 700,
                fontSize: "16px",
                lineHeight: "24px",
                letterSpacing: "0.32",
                width: 196,
                height: 40,
                backgroundColor: '#694C97', 
                color: '#FFF',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                
            }}
            
        >
            <img src="/ic_add.svg" alt="Add Icon" style={{ width: 24, height: 24, marginRight: 5 }} />Add Newsletter
        </button>

            
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
          sx={{
            width: 245,
            height: 80,
            position: "relative",
            gap: 16,
            marginLeft: 53,
            marginTop: 5,
          }}
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
    </div>
  );
}
