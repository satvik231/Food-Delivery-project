import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import Carshimmer from "./Carshimmer";
const Menu = () => {
    const searchparams = useParams();
    const { resId } = searchparams;
    const Menu_Url = `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=19.07480&lng=72.88560&restaurantId=${resId}&catalog_qa=undefined&submitAction=ENTER`;
    const imgUrl = "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/";
    console.log("params", searchparams)
    const [menuList, setMenuList] = useState([]);
    const setMenu = async () => {
        try {
            const menuData = await fetch(Menu_Url);
            const json = await menuData.json();
            console.log("menuData", json.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card);
            console.log("menuData", json.data?.cards);
            setMenuList(json?.data?.cards);
        }
        catch (error) {
            console.log("error", error);
        }
    }

    useEffect(() => {
        setMenu();
    }, [])
    if (menuList.length === 0) {
        return (
            <div><Carshimmer /></div>
        )
    }
    else {
        const { name, cuisines, areaName, feeDetails, avgRating, totalRatingsString, sla } = menuList[0]?.card?.card?.info;
        console.log("value",menuList[0]?.card?.card?.info);
        //const {itemCards } = menuList[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2].card.card;
        const filteredData = menuList[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(listItem =>
            listItem?.card?.card['@type'] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory")
        const nestedData = menuList[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(listItem =>
            listItem?.card?.card['@type'] === "type.googleapis.com/swiggy.presentation.food.v2.NestedItemCategory")
        return (
            <div className="container mt-3" style={{ width: "70%" }}>
                <div className="d-flex justify-content-between align-items-center box">
                    <div>
                        <h5>{name}</h5>
                        <div className="text-secondary">{cuisines.join(", ")}</div>
                        <div className="text-secondary">{areaName},{" "}{sla?.lastMileTravelString}</div>
                        <div className="text-secondary mt-3 boxbottom">🚲{feeDetails?.message}</div>
                    </div>
                    <div>
                        <h6 className="text-success">⭐{avgRating}</h6>
                        <hr className="mt-0"></hr>
                        <div className="text-secondary">{totalRatingsString}</div>

                    </div>
                </div>
                {
                    filteredData.map(filtereditems =>
                        <div className="pt-4" key={filtereditems?.card?.card?.title} style={{ borderBottom: "15px solid #f0f0f0" }}>
                            <h5>{filtereditems?.card?.card?.title}</h5>
                            {
                                filtereditems?.card?.card?.itemCards.map(itemCard =>
                                    <div className="d-flex justify-content-between align-items-center border-bottom border-secondary pb-4 pt-4 ">
                                        <div>
                                            <div>{itemCard?.card?.info?.isVeg ? <img src="https://clipground.com/images/veg-logo-png-5.png" style={{ width: "37px" }} /> : <img src="https://www.pngkey.com/png/full/245-2459071_non-veg-icon-non-veg-symbol-png.png" style={{ width: "30px" }} />}</div>
                                            <h6>{itemCard?.card?.info?.name}</h6>
                                            <div>₹.{(itemCard?.card?.info?.price / 100) || (itemCard?.card?.info?.defaultPrice / 100)}</div>
                                            <div className="text-secondary">{itemCard?.card?.info?.description}</div>
                                        </div>
                                        <div className="Thumbnail">
                                            <img src={imgUrl + itemCard?.card?.info?.imageId} style={{ width: "118px", height: "96px", objectFit: "cover", borderRadius: "5px" }} />
                                            <button className="btn btn-light text-success">ADD</button>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    )
                }
                {
                    nestedData.map(nestedItem =>
                        <div className="pt-4" key={nestedItem?.card?.card?.title} style={{ borderBottom: "15px solid #f0f0f0" }}>
                            <h5>{nestedItem?.card?.card?.title}</h5>
                            {
                                nestedItem?.card?.card?.categories.map(category =>
                                    <div key={category?.title}>
                                        <h6>{category?.title}</h6>
                                        {
                                            category?.itemCards.map(itemCard =>
                                                <div className="d-flex justify-content-between align-items-center border-bottom border-secondary pb-4 pt-4 ">
                                                    <div>
                                                        <div>{itemCard?.card?.info?.isVeg ? <img src="https://clipground.com/images/veg-logo-png-5.png" style={{ width: "37px" }} /> : <img src="https://www.pngkey.com/png/full/245-2459071_non-veg-icon-non-veg-symbol-png.png" style={{ width: "30px" }} />}</div>
                                                        <h6>{itemCard?.card?.info?.name}</h6>
                                                        <div>₹.{(itemCard?.card?.info?.price / 100) || (itemCard?.card?.info?.defaultPrice / 100)}</div>
                                                        <div className="text-secondary">{itemCard?.card?.info?.description}</div>
                                                    </div>
                                                    <div className="Thumbnail">
                                                        <img src={imgUrl + itemCard?.card?.info?.imageId} style={{ width: "118px", height: "96px", objectFit: "cover", borderRadius: "5px" }} />
                                                        <button className="btn btn-light text-success">ADD</button>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    </div>
                                )
                            }
                        </div>
                    )
                }

            </div>
        )
    }
}
export default Menu 