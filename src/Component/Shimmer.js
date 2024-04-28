const Shimmer = () => {
    return (
        new Array(20).fill(0).map((card) =>{
            return(
            <div className="custom-card d-flex flex-column gap-2">
            <div className="imgContainer"></div>
            <div className="nameContainer"></div>
            <div className="d-flex justify-content-between font">
                <div className="ratingContainer"></div>
                <div className="timeContainer"></div>
            </div>
            <div className="cuisineContainer"></div>
            <div className="areaContainer"></div>
        </div>)
        })
        
    )
}
export default Shimmer