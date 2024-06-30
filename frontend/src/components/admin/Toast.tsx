import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Slide, SlideProps, Snackbar, createTheme } from "@mui/material";

type ToastProps = {
  message: string;
  open: boolean;
  handleClose: () => void;
  Icon?: React.ComponentType;
};

const theme = createTheme({
  transitions: {
    easing: {
      easeInOut: "cubic-bezier( 0.68, -0.55, 0.265, 1.55 )",
      easeOut: "cubic-bezier(0.95, 0.05, 0.795, 0.035);",
    },
  },
});

function SlideTransition(props: SlideProps) {
  return (
    <Slide
      {...props}
      direction="down"
      timeout={{ enter: 400, exit: 800 }}
      easing={{ enter: theme.transitions.easing.easeInOut, exit: theme.transitions.easing.easeOut }}
    />
  );
}

export default function Toast({ message, open, handleClose, Icon }: ToastProps) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={5000}
      anchorOrigin={{ horizontal: "center", vertical: "top" }}
      onClose={handleClose}
      TransitionComponent={SlideTransition}
    >
      <div className="w-[315px] h-14 px-[18px] py-4 bg-green-100 rounded-lg shadow border border-green-500 justify-between items-center inline-flex">
        {Icon && <Icon />}
        <p className="text-black text-base font-normal font-['Open Sans'] leading-normal">
          {message}
        </p>
        <div className="text-black hover:scale-110 active:scale-[2] transition-all ease-out duration-200">
          <button onClick={handleClose}>
            <CloseRoundedIcon />
          </button>
        </div>
      </div>
    </Snackbar>
  );
}
