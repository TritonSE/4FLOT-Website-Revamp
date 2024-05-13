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

import {
  CreateNewsletterRequest,
  Newsletter,
  createNewsletter,
  getAllNewsletters,
  getNewsletter,
  updateNewsletter,
} from "@/api/newsletter";
import NewsletterSidebar from "@/components/NewsletterSidebar";
import PageToggle from "@/components/PageToggle";

export default function NewsletterCreator() {
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
  const [currentNewsletters, setCurrentNewsletters] = useState<Newsletter[]>([]);
  const [archiveNewsletters, setArchiveNewsletters] = useState<Newsletter[]>([]);
  const [pageToggle, setPageToggle] = useState(0);
  const [selectedRow, setSelectedRow] = useState<GridRowId | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(Math.ceil(rows.length / 14));
  const [selectedNewsletter, setSelectedNewsletter] = useState<Newsletter | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [rerenderKey, setRerenderKey] = useState(0);

  useEffect(() => {
    getAllNewsletters()
      .then((result) => {
        if (result.success) {
          const currentYear = new Date().getFullYear();

          const filteredCurrent = result.data.filter((item) => {
            const itemDate = new Date(item.date);
            return itemDate.getFullYear() === currentYear;
          });

          const formattedCurrentRows = filteredCurrent.map((item) => ({
            ...item,
            id: item._id.toString(),
          }));

          setCurrentNewsletters(formattedCurrentRows);

          const filteredArchive = result.data.filter((item) => {
            const itemDate = new Date(item.date);
            return itemDate.getFullYear() < currentYear;
          });

          const formattedArchiveRows = filteredArchive.map((item) => ({
            ...item,
            id: item._id.toString(),
          }));

          setArchiveNewsletters(formattedArchiveRows);

          setRow(formattedCurrentRows);
          setRowsCurrent(formattedCurrentRows);
        } else {
          console.error("ERROR:", result.error);
        }
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  useEffect(() => {
    if (selectedRow) {
      getNewsletter(selectedRow?.toString())
        .then((result) => {
          if (result.success) {
            setSelectedNewsletter(result.data);
            setRerenderKey((prevKey) => prevKey + 1);
          } else {
            console.error("ERROR:", result.error);
          }
        })
        .catch((error) => {
          alert(error);
        });
    } else {
      setSelectedNewsletter(null);
    }
  }, [selectedRow]);

  useEffect(() => {
    if (sidebarOpen) {
      setRerenderKey((prevKey) => prevKey + 1);
    }
  }, [sidebarOpen]);

  const handleTogglePage = (index: number) => {
    if (index === 0) {
      setRowsCurrent(currentNewsletters);
    } else if (index === 1) {
      setRowsCurrent(archiveNewsletters);
    }
    setPageToggle(index);
  };

  const openNewsletter = (createNew: boolean) => {
    if (createNew) {
      setSelectedRow(null);
    }
    setSidebarOpen(true);
  };

  useEffect(() => {
    // Update total pages when rows change
    setTotalPages(Math.ceil(rows.length / 14));
  }, [rows]);

  const handleCellClick: GridEventListener<"rowClick"> = (params) => {
    if (!sidebarOpen) {
      setSelectedRow(params.id === selectedRow ? null : params.id);
      openNewsletter(false);
    }
  };

  const handleSetSidebarOpen = (open: boolean) => {
    setSidebarOpen(open);
  };
  const handleUpdateNewsletter = (newsletterData: Newsletter) => {
    updateNewsletter(newsletterData)
      .then((result) => {
        if (result.success) {
          // TODO: add success message, update table
        } else {
          console.error("ERROR:", result.error);
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  const handleCreateNewsletter = (newsletterData: CreateNewsletterRequest) => {
    console.log(newsletterData);
    createNewsletter(newsletterData)
      .then((result) => {
        if (result.success) {
          //TODO: add success message, update table
        } else {
          console.error("ERROR:", result.error);
        }
      })
      .catch((error) => {
        alert(error);
      });
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
      <Box sx={{ height: 720, width: 1119, justifyContent: "space-between" }}>
        {sidebarOpen && (
          <div className={`${styles.sidebarContainer} ${sidebarOpen ? styles.open : ""}`}>
            <NewsletterSidebar
              key={rerenderKey}
              newsletter={selectedNewsletter}
              setSidebarOpen={handleSetSidebarOpen}
              updateNewsletter={handleUpdateNewsletter}
              createNewsletter={handleCreateNewsletter}
            />
          </div>
        )}

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "30px",
            marginTop: "50px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <PageToggle
              pages={["Current Newsletter", "Archive"]}
              onTogglePage={handleTogglePage}
              currPage={pageToggle}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <button
              onClick={() => {
                openNewsletter(true);
              }}
              style={{
                position: "relative",
                fontFamily: "Open Sans",
                fontWeight: 700,
                fontSize: "16px",
                lineHeight: "24px",
                letterSpacing: "0.32",
                width: 196,
                height: 40,
                backgroundColor: "#694C97",
                color: "#FFF",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "4px",
              }}
            >
              <img
                src="/ic_add.svg"
                alt="Add Icon"
                style={{ width: 24, height: 24, marginRight: 5 }}
              />
              Add Newsletter
            </button>
          </Box>
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
