import Swal from "sweetalert2";

const AlertService = {
    success: (title: string) => {
        Swal.fire({
            title: title,
            icon: "success",
            toast: true,
            timer: 3000,
            showConfirmButton: false,
            color: "white",
            position: "bottom",
            timerProgressBar: true,
            background: "#59de3c",
        })
    },

    error: (title: string) => {
        Swal.fire({
            title: title,
            icon: "error",
            toast: true,
            timer: 3000,
            showConfirmButton: false,
            color: "white",
            position: "bottom",
            timerProgressBar: true,
            background: "#e02828",
        })
    },

}

export default AlertService;