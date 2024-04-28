import { useRouteError } from "react-router-dom"
const Error = () => {
    const errorDetails = useRouteError();
    console.log("errorDetails",errorDetails);
    return (
        <div className=" d-flex flex-column justify-content-center align-items-center mt-5">
            <div>
                <img src="https://flyclipart.com/thumb2/gamerxbluefire-on-scratch-179031.png" alt="err" style={{
                    height: "200px",
                    objectFit: "cover"
                }} />
            </div>
            <div>
                <h1>{errorDetails?.data}</h1>
            </div>
            <div><h2>{errorDetails?.status}{' '}{errorDetails?.statusText}</h2></div>

        </div>
    )
}
export default Error