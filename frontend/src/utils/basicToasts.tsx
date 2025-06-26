import { toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

export const notify_success = (success:string) => {
toast.success(`Success! ${success}`, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
})}

export const notify_error = (error:string) => {
toast.error(`error ${error}`, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    })}

// export const notify_promise = (promiseContainer:Promise<void>, successMessage:string, errorMessage:string) => {
//     toast.promise(
//         promiseContainer,
//         {
//             pending: {
//                 render() {
//                   return "Promise pending...";
//                 },
//                 theme: "light",
//               },
//               success: {
//                 render() {
//                   return `Success! ${successMessage}`;
//                 },
//                 // icon: "🟢",
//               },
//               error: {
//                 render({ data }) {
//                   return `Error: ${data?.response?.data?.detail || errorMessage}`;
//                 },
//                 theme: "light",
//               },
//         }
//     )
// }

export const validation_info_error = (err : any) => {
  try{
    let obj = JSON.parse(err?.request?.response)
    const text = Object.entries(obj)
      .map(([key, value]) => `${key.replace('_', ' ')}: ${value}`)
      .join('\n');
    notify_error('\n' + text)
  }catch (error){

    notify_error('Something went wrong')
  }
}

export const notify_loading = (promiseContainer:Promise<void>, successMessage:string) => {
  toast.promise(
      promiseContainer,
      {
          pending: {
              render() {
                return "Loading...";
              },
              theme: "light",
            },
            success: {
              render() {
                return `Success! ${successMessage}`;
              },
              // icon: "🟢",
              autoClose: 500,
            },

      }
  )
}