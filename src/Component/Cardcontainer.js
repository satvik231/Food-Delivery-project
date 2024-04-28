import Restaurantcard from "./Restaurantcard";
import Carousel from "./Carousel";
import Title1 from "./title1";
//import data from "../utils/config";
//import masterData from "../utils/dummyData"
import { useState, useEffect } from 'react';
import { URL } from "../utils/config";
import Shimmer from "./Shimmer";
import Carshimmer from "./Carshimmer";
const Cardcontainer = () => {
    const [collection, setCollection] = useState([]);
    const [restaurant, setRestaurant] = useState([]);
    const [masterData, setMasterData] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [category, setActiveCategory] = useState("");
    const [titled, setTitled] = useState([]);

    const getData = async () => {
        try {
            const Data = await fetch(URL);
            const json = await Data.json();
            console.log("responsedata", json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
            setCollection(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
            setMasterData(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
            setRestaurant(json?.data?.cards[0]?.card?.card?.imageGridCards?.info);
            setTitled(json?.data?.cards[0]?.card?.card?.header?.title);
        }
        catch (err) {
            console.log("error", err);
        }
    }
    const searchData = () => {
        console.log("search", searchText);
        const filteredData = masterData.filter(resItem => resItem?.info?.name.toLowerCase().includes(searchText.toLowerCase()));
        setCollection(filteredData);
    }

    const handleRating = () => {
        const filteredData = masterData.filter(resItem => resItem?.info?.avgRating > 4.5);
        if (collection !== masterData && category === "rating") {
            handleReset();
        }
        else {
            setCollection(filteredData);
            setActiveCategory("rating");
            //console.log(masterData[0]?.data?.cards[0]?.card?.card?.header?.title)
        }
    }

    const handleReset = () => {
        setCollection(masterData)
    }

    const handleDeliveryTime = () => {
        const filteredData = masterData.filter(resItem => resItem?.info?.sla?.deliveryTime < 30);
        if (collection !== masterData && category === "deliveryTime") {
            handleReset();
        }
        else {
            setCollection(filteredData);
            setActiveCategory("deliveryTime");
        }
    }

    const handleCategory = () => {
        const filteredData = masterData.filter(resItem => resItem?.info?.veg);
        if (collection !== masterData && category === "veg") {
            handleReset()
        }
        else {
            setCollection(filteredData);
            setActiveCategory("veg");
        }
    }
    const handleSearchText = (e) => {
        setSearchText(e.target.value)
    }
    useEffect(() => {
        getData()
    }, [])
    return (

        <div className="container adjust">

            <form className=" container d-flex mt-4">
                <input className="form-control me-2" value={searchText} onChange={handleSearchText} type="text" placeHolder="Search" />
                <button className="btn btn-dark" type="button" onClick={searchData}>Search</button>
            </form>
            
            <div className="container mt-4">

                <Title1
                    head={titled}
                />

            </div>
            <div className="container pt-4">

                <div className="d-flex imgscroll">
                    {
                        //errorMessage ?{errorMessage} :
                            restaurant.length !== 0 ?
                                restaurant.map((imgData) => {
                                    return (
                                        <Carousel
                                            img={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/" + imgData?.imageId}

                                        />
                                    )
                                }) : <Carshimmer />
                    }
                </div>
                <div className="border mt-5"></div>
            </div>
            <div className="container d-flex mt-5">
                <button type="button" className="filterbutton mx-2" category="rating" onClick={handleRating}>Rating 4.5+</button>
                <button type="button" className="filterbutton mx-2" category="deliveryTime" onClick={handleDeliveryTime}>Fast Delivery</button>
                <button type="button" className="filterbutton mx-2" category="veg" onClick={handleCategory}>Pure Veg</button>
                <button type="button" className="filterbutton mx-2" onClick={handleReset}>Reset</button>
            </div>
            <div className="container">

            </div>
            <div className=" container d-flex justify-content-center flex-wrap align-content-start pt-4 mt-4 gap-4">
                {/* <Restaurantcard url={imgURL} name={name} rating={rating} deliveryTime={deliveryTime} cuisines={cuisines} Location={Location}/>
            <Restaurantcard url={imgURL} name={name} rating={rating} deliveryTime={deliveryTime} cuisines={cuisines} Location={Location}/>
            <Restaurantcard url={imgURL} name={name} rating={rating} deliveryTime={deliveryTime} cuisines={cuisines} Location={Location}/>
            <Restaurantcard url={imgURL} name={name} rating={rating} deliveryTime={deliveryTime} cuisines={cuisines} Location={Location}/>
            <Restaurantcard url={imgURL} name={name} rating={rating} deliveryTime={deliveryTime} cuisines={cuisines} Location={Location}/>  */}

                {
                    collection.length !== 0 ?
                        collection.map((card) => {
                            return (
                                // <Restaurantcard
                                // url={card?.imgURL}
                                // name={card?.name}
                                // rating={card?.rating}
                                // deliveryTime={card?.deliveryTime}
                                // cuisines={card?.cuisines}
                                // Location={card?.Location}
                                // />/
                                <Restaurantcard
                                    key={card?.info?.id}
                                    {...card?.info}
                                // imgURL ={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/"+card?.info?.cloudinaryImageId}
                                // name ={card?.info?.name}
                                // rating ={card?.info?.avgRating}
                                // deliveryTime ={card?.info?.sla?.deliveryTime}
                                // cuisines ={card?.info?.cuisines.join(", ")}
                                // Location ={card?.info?.areaName}
                                />
                            )
                        }) : <Shimmer />

                }
            </div>
        </div>
    )
}
export default Cardcontainer;

