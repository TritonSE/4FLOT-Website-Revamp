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
  CreateEventDetailsRequest,
  EventDetails,
  createEventDetails,
  getAllEventDetails,
  getEventDetails,
  updateEventDetails,
} from "@/api/eventDetails";
import EventSidebar from "@/components/EventSidebar";
import PageToggle from "@/components/PageToggle";

export default function EventCreator() {
  const columns: GridColDef<(typeof rows)[number]>[] = [
    {
      field: "name",
      headerName: "Event Title",
      width: 223,
      editable: false,
      resizable: false,
      headerClassName: `${styles.headingBackground} ${styles.cellBorderStyle} ${styles.Headings}`,
      cellClassName: `${styles.cellEntry} ${styles.cellBorderStyle}`,
      disableColumnMenu: true,
      renderHeader: () => <div>Event Title</div>,
    },
    {
      field: "description_short",
      headerName: "Description Short",
      width: 223,
      editable: false,
      resizable: false,
      headerClassName: `${styles.Headings} ${styles.headingBackground} ${styles.cellBorderStyle}`,
      cellClassName: `${styles.cellEntry} ${styles.cellBorderStyle}`,
      disableColumnMenu: true,
      renderHeader: () => <div>Description (short)</div>,
    },

    {
      field: "description",
      headerName: "Description Long",
      width: 223,
      editable: false,
      resizable: false,
      headerClassName: `${styles.Headings} ${styles.headingBackground} ${styles.cellBorderStyle}`,
      cellClassName: `${styles.cellEntry} ${styles.cellBorderStyle}`,
      disableColumnMenu: true,
      renderHeader: () => <div>Description (long)</div>,
    },
    {
      field: "date",
      headerName: "DateTime",
      width: 223,
      editable: false,
      resizable: false,
      headerClassName: `${styles.Headings} ${styles.headingBackground} ${styles.cellBorderStyle}`,
      cellClassName: `${styles.cellEntry} ${styles.cellBorderStyle}`,
      disableColumnMenu: true,
      renderHeader: () => <div>Date/Time</div>,
      renderCell: (params) => {
        const { date, startTime, endTime } = params.row;
        const formattedDate = new Date(date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
        return `${formattedDate}. ${startTime} - ${endTime}`;
      },
    },

    {
      field: "location",
      headerName: "Location",
      width: 225.4,
      editable: false,
      resizable: false,
      headerClassName: `${styles.Headings} ${styles.headingBackground} ${styles.cellBorderStyle}`,
      cellClassName: `${styles.cellEntry} ${styles.cellBorderStyle}`,
      disableColumnMenu: true,
      renderHeader: () => <div>Location</div>,
    },
  ];

  const [rows, setRow] = useState<EventDetails[]>([]);
  const [rowsCurrent, setRowsCurrent] = React.useState(rows);
  const [currentEvents, setCurrentEvents] = useState<EventDetails[]>([]);
  const [pastEvents, setPastEvents] = useState<EventDetails[]>([]);
  const [pageToggle, setPageToggle] = useState(0);
  const [selectedRow, setSelectedRow] = useState<GridRowId | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(Math.ceil(rows.length / 14));
  const [selectedEvent, setSelectedEvent] = useState<EventDetails | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [rerenderKey, setRerenderKey] = useState(0);

  useEffect(() => {
    getAllEventDetails()
      .then((result) => {
        if (result.success) {
          const now = new Date();
          const utcDateCurrent = now;

          const filteredCurrent = result.data.filter((item) => {
            const dateObj = new Date(item.date);

            const utcDateitem = dateObj.getTime();

            console.log(utcDateitem);

            if (utcDateitem >= utcDateCurrent.getTime()) {
              return true;
            }
            return false;
          });

          const formattedCurrentRows = filteredCurrent.map((item) => ({
            ...item,
            id: item._id.toString(),
          }));

          setCurrentEvents(formattedCurrentRows);

          const filteredPast = result.data.filter((item) => {
            const dateObj = new Date(item.date);
            const utcDateitem = dateObj.getTime();

            console.log(utcDateitem);

            if (utcDateitem < utcDateCurrent.getTime()) {
              return true;
            }
            return false;
          });

          const formattedPastRows = filteredPast.map((item) => ({
            ...item,
            id: item._id.toString(),
          }));

          setPastEvents(formattedPastRows);

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
      getEventDetails(selectedRow?.toString())
        .then((result) => {
          if (result.success) {
            setSelectedEvent(result.data);
            setRerenderKey((prevKey) => prevKey + 1);
          } else {
            console.error("ERROR:", result.error);
          }
        })
        .catch((error) => {
          alert(error);
        });
    } else {
      setSelectedEvent(null);
    }
  }, [selectedRow]);

  useEffect(() => {
    if (sidebarOpen) {
      setRerenderKey((prevKey) => prevKey + 1);
    }
  }, [sidebarOpen]);

  const handleTogglePage = (index: number) => {
    if (index === 0) {
      setRowsCurrent(currentEvents);
    } else if (index === 1) {
      setRowsCurrent(pastEvents);
    }
    setPageToggle(index);
  };

  const openEvent = (createNew: boolean) => {
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
      openEvent(false);
    }
  };

  const handleSetSidebarOpen = (open: boolean) => {
    if (!open) {
      setSelectedRow(null);
    }
    setSidebarOpen(open);
  };
  const handleUpdateEvent = (eventData: EventDetails) => {
    console.log("page.tsx handleUpdateEvent");
    updateEventDetails(eventData)
      .then((result) => {
        if (!result.success) {
          console.log("result was not a success");
          alert(result.error);
          console.error("ERROR:", result.error);
        }
      })
      .catch((error) => {
        console.log("catching error after updateEventDetails");
        alert(error);
      });
  };

  const handleCreateEvent = (eventData: CreateEventDetailsRequest) => {
    console.log("page.tsx eventData ", eventData);
    createEventDetails(eventData)
      .then((result) => {
        if (!result.success) {
          alert(result.error);
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
            <EventSidebar
              key={rerenderKey}
              eventDetails={selectedEvent}
              setSidebarOpen={handleSetSidebarOpen}
              updateEvent={handleUpdateEvent}
              createEvent={handleCreateEvent}
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
              pages={["Current Events", "Past Events"]}
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
            {pageToggle === 0 && (
              <button
                onClick={() => {
                  openEvent(true);
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
                Add Event
              </button>
            )}
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
