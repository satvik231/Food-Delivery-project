import { IMG_URL } from "../utils/config";
import { Link } from "react-router-dom";
const Restaurantcard = ({ cloudinaryImageId, name, avgRating, sla, cuisines, areaName, aggregatedDiscountInfoV3,id,veg }) => {
    return (
        <>
            <Link to={`/menu/${id}`} className="custom-card ">
                <div>
                <div className="textCustom">{aggregatedDiscountInfoV3?.header}{" "}{aggregatedDiscountInfoV3?.subHeader}</div>
                    <img  src={IMG_URL + cloudinaryImageId}
                        alt="restroimg"
                        width="100%"
                        style={{
                            height: "150px",
                            objectFit: "cover",
                            borderRadius: "10px"
                        }} 
                        />
                    {/* <div className="textCustom">{aggregatedDiscountInfoV3?.header}{" "}{aggregatedDiscountInfoV3?.subHeader}</div> */}
                    
                </div>
                <div className="cuisines font">{name}</div>
                <div>{veg ? <img src="https://clipground.com/images/veg-logo-png-5.png" style={{ width: "37px" }} /> : <img src="https://www.pngkey.com/png/full/245-2459071_non-veg-icon-non-veg-symbol-png.png" style={{ width: "30px" }} />}</div>
                <div className="d-flex justify-content-between font">
                    <div className="font">⭐{avgRating}</div>
                    <div>{sla?.deliveryTime} mins</div>
                </div>
                <div className="text-secondary cuisines">{cuisines}{","}</div>
                <div className="text-secondary">{areaName}</div>
            </Link>
        </>
    )
}

export default Restaurantcard