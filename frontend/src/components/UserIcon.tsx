import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Logout from "@mui/icons-material/Logout";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Image from "next/image";
import { redirect } from "next/navigation";
import * as React from "react";

import { firebaseSignOut } from "@/app/admin/firebase/firebase";
import { useAuth } from "@/app/admin/firebase/firebaseProvider";

export default function UserIcon() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const auth = useAuth();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = async () => {
    if (auth) {
      await firebaseSignOut(auth);
    }
  };

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Image
          src="/Checker.png"
          width={32}
          height={32}
          className="rounded-full cursor-default"
          alt="Profile Picture"
        />

        <h1 className="ml-4 cursor-default">John Doe</h1>
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ ml: 2 }}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <KeyboardArrowDownIcon />
        </IconButton>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        sx={{
          boxShadow: "0px 5px 10px 0px rgba(0,0,0,0.15)",
        }}
      >
        <MenuItem
          onClick={() => {
            logout().catch((error) => {
              alert(error);
            });
            handleClose();
            redirect("/admin");
          }}
        >
          <ListItemIcon>
            <Logout fontSize="small" htmlColor="#ef4444" />
          </ListItemIcon>
          <p className="text-[#ef4444]">Logout</p>
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
